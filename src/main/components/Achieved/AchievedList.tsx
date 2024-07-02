import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../../redux/store";
import { Button } from "../Button";
import {
  LuTrash2,
  LuClipboardEdit,
  LuArrowUp,
  LuArrowDown,
  LuSearch,
} from "react-icons/lu";
import { Task, handleDeleteTask } from "../../../redux/task/taskSlice";
import Modal from "../Modal/Modal";

const AchievedList = () => {
  const { tasks } = useSelector((state: StoreState) => state.task);
  const dispatch = useDispatch();
  const [highlightedRow, setHighlightedRow] = useState<string | null>(null);
  const [ascend, setAscend] = useState(false);
  const [filteredData, setFilteredData] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pickedAchieve, setPickedAchieve] = useState<Task | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  useEffect(() => {
    
    setFilteredData(tasks);
  }, [tasks]);

  useEffect(() => {
    if (isModalOpen) {
      const modalElement = document.getElementById(
        "my_modal_5"
      ) as HTMLDialogElement | null;
      modalElement?.showModal();
    }
  }, [isModalOpen]);

  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  const handleDeleteAchieved = useCallback((id: string) => {
    dispatch(handleDeleteTask(id));
  }, [dispatch]);

  const handleEditAchieved = (achieve: Task) => {
    setPickedAchieve(achieve);
    setIsModalOpen(true);
    const modalElement = document.getElementById(
      "my_modal_5"
    ) as HTMLDialogElement | null;
    modalElement?.showModal();
  };

  const handleSearchAchieved = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchTerm = e.target.value.toLowerCase().trim();
      setFilteredData(
        searchTerm
          ? tasks.filter((task) =>
              task.title.toLowerCase().includes(searchTerm)
            )
          : tasks
      );
    },
    [tasks]
  );

  const handleSortAchieved = () => {
    setAscend((prevAscend) => !prevAscend);
  };

  const currentTasks = filteredData.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  const sortedTasks = [...currentTasks].sort((a, b) => {
    const dateA = new Date(a.datetime).getTime();
    const dateB = new Date(b.datetime).getTime();
    return ascend ? dateA - dateB : dateB - dateA;
  });

  const renderPagination = () => {
    const totalPages = Math.ceil(tasks.length / tasksPerPage);
    return (
      <div className="join">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`px-2 py-1 mr-2 ${
              currentPage === index + 1
                ? "bg-slate-300 text-white"
                : "bg-gray-100"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  };

  const renderTasks =  sortedTasks.slice().reverse().map((task) => (
    <tr
      className={`py-1 hover:cursor-pointer hover:transition-all hover:translate-x-1 ${
        task.id === highlightedRow ? "bg-base-200" : ""
      }`}
      key={task.id}
      onClick={() => setHighlightedRow(task.id!)}
    >
      <td className="w-32">{task.title}</td>
      <td className="w-52">{task.message}</td>
      <td className="w-14">{task.datetime}</td>
      <td className="w-14">{task.weather}</td>
      <th className="w-10 flex gap-1">
        <Button
          onClick={() => handleEditAchieved(task)}
          icon={<LuClipboardEdit />}
        />
        <Button
          onClick={() => handleDeleteAchieved(task.id!)}
          icon={<LuTrash2 />}
        />
      </th>
    </tr>
  ));

  return (
    <>
      <div className="flex gap-2 items-center mb-5">
        <section>
          <div className="flex gap-2 items-center">
            <label className="input input-bordered w-1/2 flex items-center gap-2">
              <input
                type="text"
                onChange={handleSearchAchieved}
                className="grow"
                placeholder="Search for title"
              />
              <LuSearch />
            </label>
            <div className="flex gap-2 w-[400px]">
              <Button
                onClick={handleSortAchieved}
                title="Sort by date"
                icon={ascend ? <LuArrowUp /> : <LuArrowDown />}
              />
            </div>
          </div>
        </section>
      </div>

      <div className="w-full border-solid h-2/3 max-lg:h-[250px] border-1 overflow-y-scroll flex flex-col justify-between">
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="text-sm">
              <tr>
                <th className="w-32">Title</th>
                <th className="w-32">Description</th>
                <th className="w-24">Date & Time</th>
                <th className="w-10">Humidity</th>
                <th className="w-10">Edit & Delete</th>
              </tr>
            </thead>
            <tbody>{renderTasks}</tbody>
          </table>
          {isModalOpen && <Modal pickedAchieve={pickedAchieve} />}
        </div>
        {renderPagination()}
      </div>
    </>
  );
};

export default AchievedList;

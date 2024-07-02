import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../../redux/store";
import { Button } from "../Button";
import { LuTrash2, LuClipboardEdit } from "react-icons/lu";
import { handleDeleteTask } from "../../../redux/task/taskSlice";

const AchievedList = () => {
  const { tasks, searchResult } = useSelector(
    (state: StoreState) => state.task
  );
  const dispatch = useDispatch();
  const [highlightedRow, setHighlightedRow] = useState<string | null>(null);
  //Calculate pagination---------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;

  const totalPages = Math.ceil(tasks.length / tasksPerPage);
  const renderPagination = useCallback(() => {
    const pageNumbers = [];
    for (let index = 1; index <= totalPages; index++) {
      pageNumbers.push(
        <button
          key={index}
          className={`px-2 py-1 mr-2 ${
            currentPage === index ? "bg-slate-300 text-white" : "bg-gray-300"
          }`}
          onClick={() => handlePageChange(index)}
        >
          {index}
        </button>
      );
    }
    return (
      <div className="join">
        <p className="join-item btn">{pageNumbers}</p>
      </div>
    );
  }, [currentPage, totalPages]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  //pagination-------------------------------------

  const tasksToDisplay = searchResult.length > 0 ? searchResult : tasks;
  const currentTasks = tasksToDisplay.slice(indexOfFirstTask, indexOfLastTask);

  const handleDeleteAchieved = (id: string) => {
    dispatch(handleDeleteTask(id));
  };

  const renderTasks = useCallback(() => {
    return currentTasks.map((task, index) => (
      <tr
        className={`py-1 hover:cursor-pointer hover:transition-all hover:translate-x-1 ${
          task.id === highlightedRow ? "bg-base-200" : ""
        }`}
        key={index}
        onClick={() => setHighlightedRow(task.id as string)}
      >
        <td className="w-32">{task.title}</td>
        <td className="w-52">{task.message}</td>
        <td className="w-14">{task.datetime}</td>
        <th className="w-10 flex gap-1">
          <Button
            onClick={() => handleDeleteAchieved(task.id!)}
            icon={<LuClipboardEdit />}
          />
          <Button
            onClick={() => handleDeleteAchieved(task.id!)}
            icon={<LuTrash2 />}
          />
        </th>
      </tr>
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTasks]);

  return (
    <>
      <div className="w-full border-solid h-fit max-lg:h-[250px] border-1 overflow-y-scroll flex flex-col justify-between">
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="text-sm">
              <tr>
                <th className="w-32">Title</th>
                <th className="w-32">Description</th>
                <th className="w-24">Date & Time</th>
                <th className="w-10">Edit & Delete</th>
              </tr>
            </thead>
            <tbody>{renderTasks()}</tbody>
          </table>
        </div>
        {renderPagination()}
      </div>
    </>
  );
};

export default AchievedList;

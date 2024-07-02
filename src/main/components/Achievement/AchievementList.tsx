import React, { useState } from "react";
import { useSelector } from "react-redux";
import { StoreState } from "../../../redux/store";

const AchievementList = () => {
  const { tasks } = useSelector((state: StoreState) => state.task);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  // Calculate pagination
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const renderTasks = () => {
    return currentTasks.map((task, index) => (
      <tr
        className="hover:cursor-pointer hover:transition-all hover:translate-x-1"
        key={index}
      >
        <td className="w-24">{task.title}</td>
        <td className="w-64">{task.message}</td>
        <td className="w-24">{task.date}</td>
        <td className="w-24">{task.time}</td>
      </tr>
    ));
  };

  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`px-3 py-1 mr-2 ${
            currentPage === i ? "bg-blue-300 text-white" : "bg-gray-300"
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return <div className="mt-4">{pageNumbers}</div>;
  };

  return (
    <div className="w-full border-solid h-[550px] max-lg:h-[250px] border-1 overflow-y-scroll flex flex-col justify-between">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th className="w-10">Title</th>
              <th className="w-64">Description</th>
              <th className="w-24">Date</th>
              <th className="w-24">Time</th>
            </tr>
          </thead>
          <tbody>{renderTasks()}</tbody>
        </table>
      </div>
      {renderPagination()}
    </div>
  );
};

export default AchievementList;

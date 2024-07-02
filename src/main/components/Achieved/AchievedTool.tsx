import React, { useCallback, useState } from "react";
import { LuSearch, LuArrowDown, LuArrowUp } from "react-icons/lu";
import {
  handleClearSearchResult,
  handleSearchTask,
  handleSortTask,
} from "../../../redux/task/taskSlice";
import { useDispatch } from "react-redux";
import { Button } from "../Button";

const AchievedTool = () => {
  const dispatch = useDispatch();
  const [ascend, setAscend] = useState(false);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchTerm = e.target.value;
      if (searchTerm.trim() !== "") {
        dispatch(handleSearchTask(searchTerm));
      } else {
        dispatch(handleClearSearchResult());
      }
    },
    [dispatch]
  );

  const handleSortAchieved = () => {
    const sortOrder = ascend ? "asc" : "desc";
    dispatch(handleSortTask(sortOrder));
    setAscend(!ascend);
  };

  return (
    <div className="flex gap-2 items-center mb-5">
      <section>
        <label className="text-sm">Search</label>
        <div className="flex gap-2 items-center">
          <label className="input input-bordered w-1/2 flex items-center gap-2">
            <input
              type="text"
              onChange={handleSearch}
              className="grow"
              placeholder="Search for title"
            />
            <LuSearch />
          </label>
          <div className="flex gap-2 w-[400px]">
            <Button
              onClick={handleSortAchieved}
              title="Sort by date"
              icon={ascend ? <LuArrowDown /> : <LuArrowUp />}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AchievedTool;

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { Button } from "../Button";
import {
  LuSendHorizonal,
  LuUndo2,
  LuCalendarDays,
  LuSearch,
} from "react-icons/lu";
import { Task, handleAddTask, handleClearSearchResult, handleSearchTask } from "../../../redux/task/taskSlice";
import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

const schema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Title must be at most 50 characters"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(300, "Message must be at most 300 characters"),
  datetime: z
    .string()
    .refine((value) => /^\d{2}:\d{2} \d{2}-\d{2}-\d{4}$/.test(value), {
      message: "Date time with correct format is required",
    }),
});

const AchievedForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = useCallback(
    (data: Task) => {
      const taskData = {
        id: uuidv4(),
        title: data.title,
        message: data.message,
        datetime: data.datetime,
      };
      dispatch(handleAddTask(taskData));
      reset();
    },
    [dispatch, reset]
  );

  const handleAutoFillDateTime = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, "0");
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const year = currentDate.getFullYear();
      const hours = String(currentDate.getHours()).padStart(2, "0");
      const minutes = String(currentDate.getMinutes()).padStart(2, "0");
      const formattedDateTime = `${hours}:${minutes} ${day}-${month}-${year}`;
      setValue("datetime", formattedDateTime);
    },
    [setValue]
  );

  const handleReset = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      reset();
    },
    [reset]
  );

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

  return (
    <div className="pt-3 flex flex-col">
      <label className="input input-bordered flex items-center gap-2">
        <input type="text" onChange={handleSearch} className="grow" placeholder="Search for title" />
        <LuSearch />
      </label>

      <form
        className="text-sm h-screen w-full flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit as any)}
      >
        <div className="flex flex-col gap-2">
          <section>
            <div className="flex justify-between">
              <label htmlFor="title">Title</label>
              {errors.title && (
                <p className="text-red-500">{errors.title.message as string}</p>
              )}
            </div>
            <textarea
              className="textarea textarea-bordered w-full"
              id="title"
              {...register("title")}
            />
          </section>

          <section>
            <div className="flex justify-between">
              <label htmlFor="message">Description</label>
              {errors.message && (
                <p className="text-red-500">
                  {errors.message.message as string}
                </p>
              )}
            </div>
            <textarea
              className="textarea textarea-bordered w-full"
              id="message"
              {...register("message")}
            />
          </section>

          <section>
            <div className="flex justify-between">
              <label htmlFor="datetime">DateTime (HH:MM DD-MM-YYYY)</label>
              {errors.datetime && (
                <p className="text-red-500">
                  {errors.datetime.message as string}
                </p>
              )}
            </div>
            <div className="flex gap-1 justify-between">
              <input
                className="input input-bordered w-full max-w-xs"
                id="datetime"
                {...register("datetime")}
                placeholder="HH:MM DD-MM-YYYY"
              />
              <Button

                onClick={handleAutoFillDateTime}
                icon={<LuCalendarDays />}
              />
            </div>
          </section>
        </div>

        <div className="flex justify-between">
          <Button icon={<LuSendHorizonal />} title="Submit" />
          <Button onClick={handleReset} icon={<LuUndo2 />} title="Reset" />
        </div>
      </form>
    </div>
  );
};

export default AchievedForm;
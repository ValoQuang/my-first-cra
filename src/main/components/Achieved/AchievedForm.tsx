import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { Button } from "../Button";
import { LuSendHorizonal, LuUndo2, LuCalendarDays } from "react-icons/lu";
import { Task, handleAddTask } from "../../../redux/task/taskSlice";
import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { schema } from "../../../utils";
import { Loading } from "../Loading";

const AchievedForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    watch
  } = useForm({
    resolver: zodResolver(schema),
  });
  const watchedFields = watch();

  const onSubmit = useCallback(
    async (data: Task) => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.data.gov.sg/v1/environment/relative-humidity?date_time=${data.datetime}`
        );
        if (response.ok) {
          setLoading(false);
          setFetchError(false);
          const weatherData = await response.json();
          const taskData = {
            id: uuidv4(),
            title: data.title,
            message: data.message,
            datetime: data.datetime,
            weather: weatherData?.items[0].readings[0].value,
          };
          dispatch(handleAddTask(taskData));
        } 
        if (response.status === 500) {
          setFetchError(true);
        }
      } catch (error: any) {
        console.error(error.message);
        setFetchError(true);
      } finally {
        setLoading(false);
        reset();
      }
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
      const seconds = String(currentDate.getSeconds()).padStart(2, "0");
      const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
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

  return (
    <div className="max-lg:relative max-lg:bottom-72 flex flex-col items-center">
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
              <label htmlFor="datetime">DateTime (HH:MM YYYY-MM-DD)</label>
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
          {loading ? (
            <Loading />
          ) : (
            <Button icon={<LuSendHorizonal />} title="Submit" />
          )}
          {Object.keys(watchedFields).length > 0 && (
            <Button onClick={handleReset} icon={<LuUndo2 />} title="Reset" />
          )}
        </div>
        {fetchError && (
          <p className="text-red-500">
            This error is due to api failture, check the date if it is valid.
            The date must be within range and not in the future !
          </p>
        )}
      </form>
    </div>
  );
};

export default AchievedForm;

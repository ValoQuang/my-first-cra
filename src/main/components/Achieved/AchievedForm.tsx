import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { Button } from "../Button";
import { LuSendHorizonal, LuUndo2, LuCalendarDays } from "react-icons/lu";
import {
  AchievementType,
  handleAddTask,
} from "../../../redux/achievement/achievementSlice";
import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { schema } from "../../../utils";
import { Loading } from "../Loading";
import { getAchievementDataApi } from "../../../redux/achievement/achievementApi";
import dayjs from "dayjs";

const AchievedForm = () => {
  const dispatch = useDispatch();
  const [getHumidity, { isFetching, isError }] =
    getAchievementDataApi.useLazyGetHumidityDataQuery();
  const [getTemperature, { isFetching: isTempFetching, isError: isTempError }] =
    getAchievementDataApi.useLazyGetTemperatureDataQuery();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const watchedFields = watch();

  const onSubmit = useCallback(
    async (data: AchievementType) => {
      try {
        const response = await Promise.all([
          getHumidity(data.datetime).unwrap(),
          getTemperature(data.datetime).unwrap(),
        ]);
        if (response) {
          const achievementData = {
            id: uuidv4(),
            title: data.title,
            message: data.message,
            datetime: data.datetime,
            humidity: response[0].items[0].readings[0].value,
            temperature: response[1].items[0].readings[0].value,
          };
          dispatch(handleAddTask(achievementData));
        }
      } catch (error: any) {
        console.error(error.message);
      } finally {
        reset();
      }
    },
    [dispatch, getHumidity, getTemperature, reset]
  );

  const handleAutoFillDateTime = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const currentDate = new Date().toString();
      const formattedDate = dayjs(currentDate).format("YYYY-MM-DDTHH:mm:ss");
      setValue("datetime", formattedDate);
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
          {isFetching && isTempFetching ? (
            <Loading />
          ) : (
            <Button icon={<LuSendHorizonal />} title="Submit" />
          )}
          {Object.keys(watchedFields).length > 0 && (
            <Button onClick={handleReset} icon={<LuUndo2 />} title="Reset" />
          )}
        </div>
        {isError ||
          (isTempError && (
            <p className="text-red-500">
              This error is due to api failture, check the date if it is valid.
              The date must be within range and not in the future !
            </p>
          ))}
      </form>
    </div>
  );
};

export default AchievedForm;

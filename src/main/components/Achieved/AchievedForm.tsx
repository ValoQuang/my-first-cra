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
import React from "react";

const AchievedForm = () => {
  const dispatch = useDispatch();
  const [getHumidity, { isFetching, error: isHumidError }] =
    getAchievementDataApi.useLazyGetHumidityDataQuery();
  const [getTemperature, { isFetching: isTempFetching, error: isTempError }] =
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
        console.error(error);
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
      const formattedDate = dayjs(currentDate).format("YYYY-MM-DD[T]HH:mm:ss");
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
            <label className="input input-bordered w-full flex items-center gap-2">
              <input
                type="text"
                {...register("title")}
                className="grow"
                placeholder="What did you achieve today ?"
              />
            </label>
            {errors.title && (
              <p className="text-red-500 text-sm">
                {errors.title.message as string}
              </p>
            )}
          </section>

          <section>
            <div className="flex justify-between"></div>
            <textarea
              className="textarea textarea-bordered w-full"
              id="message"
              placeholder="Describe abit more"
              {...register("message")}
            />
            {errors.message && (
              <p className="text-red-500">{errors.message.message as string}</p>
            )}
          </section>

          <section>
            <div className="flex gap-1 justify-between">
            <label className="input input-bordered w-full flex items-center gap-2">
                <input
                  className="grow"
                  id="datetime"
                  {...register("datetime")}
                  placeholder="Date time HH:MM DD-MM-YYYY"
                />
              </label>
              <div className="w-fit">
                {" "}
                <Button
                  onClick={handleAutoFillDateTime}
                  icon={<LuCalendarDays />}
                />
              </div>
            </div>
            {errors.datetime && (
              <p className="text-red-500">
                {errors.datetime.message as string}
              </p>
            )}
          </section>
        </div>
        <div className="flex justify-between gap-1">
          {isFetching && isTempFetching ? (
            <Loading />
          ) : (
            <div className="w-1/2">
              <Button icon={<LuSendHorizonal />} title="Submit" />
            </div>
          )}
          {Object.keys(watchedFields).length > 0 && (
            <div className="w-1/2">
              <Button onClick={handleReset} icon={<LuUndo2 />} title="Reset" />
            </div>
          )}
        </div>
        {(isHumidError || isTempError) && (
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

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { Button } from "../Button";
import {
  LuSendHorizonal,
  LuUndo2,
  LuCalendarDays,
  LuCalendarClock,
} from "react-icons/lu";
import { Task, handleAddTask } from "../../../redux/task/taskSlice";

const schema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Title must be at most 30 characters"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(300, "Message must be at most 300 characters"),
  date: z.string().refine((value) => /^\d{2}-\d{2}-\d{4}$/.test(value), {
    message: "Date must be in format DD-MM-YYYY",
  }),
  time: z.string().refine((value) => /^\d{2}:\d{2}$/.test(value), {
    message: "Time must be in format HH:MM",
  }),
});

const Form = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: Task) => {
    const taskData = {
      title: data.title,
      message: data.message,
      date: data.date,
      time: data.time,
    };
    dispatch(handleAddTask(taskData));
  };

  const handleAutoFillDate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    setValue("date", formattedDate);
  };

  const handleAutoFillTime = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const currentTime = new Date();
    const hours = String(currentTime.getHours()).padStart(2, "0");
    const minutes = String(currentTime.getMinutes()).padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;
    setValue("time", formattedTime);
  };

  const handleReset = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    reset();
  }

  return (
    <div>
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
            <input
              className="input input-bordered w-screen max-w-xs"
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
              <label htmlFor="date">Date (DD-MM-YYYY)</label>
              {errors.date && (
                <p className="text-red-500">{errors.date.message as string}</p>
              )}
            </div>
            <div className="flex gap-1 justify-between">
              <input
                className="input input-bordered w-full max-w-xs"
                id="date"
                {...register("date")}
                placeholder="DD-MM-YYYY"
              />
              <Button onClick={handleAutoFillDate} icon={<LuCalendarDays />} />
            </div>
          </section>

          <section>
            <div className="flex justify-between">
              <label htmlFor="time">Time (HH:MM)</label>
              {errors.time && (
                <p className="text-red-500">{errors.time.message as string}</p>
              )}
            </div>
            <div className="flex gap-1 justify-between">
              {" "}
              <input
                className="input input-bordered w-full max-w-xs"
                id="time"
                {...register("time")}
                placeholder="HH:MM"
              />
              <Button onClick={handleAutoFillTime} icon={<LuCalendarClock />} />
            </div>
          </section>
        </div>

        <div className="flex justify-between">
          <Button
            icon={<LuSendHorizonal />}
            title="Submit"
          />
          <Button onClick={handleReset} icon={<LuUndo2 />} title="Reset" />
        </div>
      </form>
    </div>
  );
};

export default Form;

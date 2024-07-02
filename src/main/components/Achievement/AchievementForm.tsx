import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { Button } from "../Button";
import { LuSendHorizonal, LuUndo2 } from "react-icons/lu";
import { Task, handleAddTask } from "../../../redux/task/taskSlice";

const schema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(300, "Message must be at most 300 characters"),
});

const AchievementForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: Task) => {
    const taskData = {
      name: data.name,
      email: data.email,
      message: data.message,
    };
    dispatch(handleAddTask(taskData));
  };
  return (
    <div>
      <form
        className="text-sm h-screen w-full"
        onSubmit={handleSubmit(onSubmit as any)}
      >
        <div className="flex flex-col gap-2">
          <section>
            <div className="flex justify-between">
              <label htmlFor="name">Name</label>
              {errors.name && (
                <p className="text-red-500">{errors.name?.message as string}</p>
              )}
            </div>
            <input
              className="input input-bordered w-full max-w-xs"
              id="name"
              {...register("name")}
            />
          </section>

          <section>
            <div className="flex justify-between">
              <label htmlFor="email">Email</label>
              {errors.email && (
                <p className="text-red-500">
                  {errors.email?.message as string}
                </p>
              )}
            </div>

            <input
              className="input input-bordered w-full max-w-xs"
              id="email"
              {...register("email")}
            />
          </section>

          <section>
            <div className="flex justify-between">
              <label htmlFor="message">Message</label>
              {errors.message && (
                <p className="text-red-500">
                  {errors.message?.message as string}
                </p>
              )}
            </div>
            <textarea
              className="textarea textarea-bordered w-full"
              id="message"
              {...register("message")}
            />
          </section>
        </div>
        <div className="flex justify-between">
          <Button icon={<LuSendHorizonal />} title="Submit" />
          <Button onClick={reset} icon={<LuUndo2 />} title="Reset" />
        </div>
      </form>
    </div>
  );
};

export default AchievementForm;

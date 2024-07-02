import { useEffect, useState } from "react";
import { Task } from "../../../redux/task/taskSlice";
import { Button } from "../Button";
import { schema } from "../../../utils";

type ModalType = {
  pickedAchieve: Task | null | undefined;
};

const Modal = ({ pickedAchieve }: ModalType) => {
  const [formData, setFormData] = useState({
    title: pickedAchieve?.title || "",
    message: pickedAchieve?.message || "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setFormData({
      title: pickedAchieve?.title || "",
      message: pickedAchieve?.message || "",
    });
  }, [pickedAchieve]);

  const handleChange = (
    id: string,
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [id]: e.target.value }));
  };

  const handleUpdateAchieve = () => {
    const result = schema.safeParse(formData);
    if (!result.success) {
      const newErrors = result.error.errors.reduce(
        (acc, error) => ({
          ...acc,
          [error.path[0]]: error.message,
        }),
        {}
      );
      setErrors(newErrors);
    } else {
      setErrors({});
      //dispatch();
    }
  };

  const handleCloseModal = () => {
    setErrors({});
    setFormData({
      title: pickedAchieve?.title || "",
      message: pickedAchieve?.message || "",
    });
  };

  return (
    <div>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <p>Edit modal</p>
          <section className="text-sm">
            <div className="flex justify-between">
              <label htmlFor="title">Title</label>
            </div>
            <textarea
              className="textarea textarea-bordered w-full"
              id="title"
              value={formData?.title}
              onChange={(e) => handleChange("title", e)}
            />
            {errors.title && <p className="text-red-500">{errors.title}</p>}
          </section>
          <section className="text-sm">
            <div className="flex justify-between">
              <label htmlFor="title">Message</label>
            </div>
            <textarea
              className="textarea textarea-bordered w-full"
              id="title"
              value={formData?.message}
              onChange={(e) => handleChange("message", e)}
            />
            {errors.message && <p className="text-red-500">{errors.message}</p>}
          </section>
          <div className="modal-action">
            <Button title="Save change" onClick={handleUpdateAchieve} />  
            <form
              method="dialog"
              className="flex gap-2 justify-between align-middle items-center"
            >
              {" "}
              <Button onClick={handleCloseModal} title="Close" />
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;

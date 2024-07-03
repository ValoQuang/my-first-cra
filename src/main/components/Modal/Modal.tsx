import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AchievementType,
  handleEditTask,
} from "../../../redux/achievement/achievementSlice";
import { Button } from "../Button";
import { schema } from "../../../utils";
import { useDispatch } from "react-redux";
import { LuX, LuCheck } from "react-icons/lu";

type ModalProps = {
  pickedAchieve: AchievementType | null | undefined;
};

const Modal = ({ pickedAchieve }: ModalProps) => {
  const dispatch = useDispatch();
  const currentAchievement: AchievementType = useMemo(() => ({
    id: pickedAchieve?.id || "",
    title: pickedAchieve?.title || "",
    message: pickedAchieve?.message || "",
    humidity: pickedAchieve?.humidity || "",
    temperature: pickedAchieve?.temperature || "",
    datetime: pickedAchieve?.datetime || "",
  }), [pickedAchieve]);

  const [formData, setFormData] = useState<AchievementType>(currentAchievement);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Update form data when pickedAchieve changes
  useEffect(() => {
    setFormData(currentAchievement);
    setErrors({});
  }, [currentAchievement]);

  const handleChange = useCallback(
    (id: keyof AchievementType, value: React.ChangeEvent<HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    },
    []
  );

  const handleUpdateAchieve = useCallback(() => {
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
      dispatch(handleEditTask(formData));
    }
  }, [dispatch, formData]);

  const handleCloseModal = useCallback(() => {
    setErrors({});
    if (pickedAchieve) {
      setFormData({
        id: pickedAchieve.id || "",
        title: pickedAchieve.title || "",
        message: pickedAchieve.message || "",
        humidity: pickedAchieve.humidity,
        temperature: pickedAchieve.temperature,
        datetime: pickedAchieve.datetime,
      });
    }
  }, [pickedAchieve]);

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
            <Button
              title="Save change"
              icon={<LuCheck />}
              onClick={handleUpdateAchieve}
            />
            <form
              method="dialog"
              className="flex gap-2 justify-between align-middle items-center"
            >
              {" "}
              <Button icon={<LuX />} onClick={handleCloseModal} title="Close" />
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;

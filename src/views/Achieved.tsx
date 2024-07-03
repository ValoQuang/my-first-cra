import { Toast } from "../main/components";
import { AchievedForm, AchievedList } from "../main/components/Achieved";

const ToDo = () => {
  return (
    <div className="flex gap-5 px-5 max-lg:px-3 pt-12 max-lg:pt-5 max-lg:flex-col">
      <div className="w-2/3 h-screen max-lg:w-full">
        <AchievedList />
      </div>
      <div className="w-1/3 max-lg:w-full">
        <AchievedForm />
      </div>
      <Toast />
    </div>
  );
};

export default ToDo;

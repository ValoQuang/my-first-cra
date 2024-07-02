import { AchievedForm, AchievedList } from "../main/components/Achieved";

const ToDo = () => {
  return (
    <div className="flex gap-5 px-10 max-lg:px-5 pt-16 max-lg:pt-5 max-lg:flex-col">
      <div className="w-2/3 max-lg:w-full">
        <AchievedList />
      </div>
      <div className="w-1/3 max-lg:w-full">
        <AchievedForm />
      </div>
    </div>
  );
};

export default ToDo;

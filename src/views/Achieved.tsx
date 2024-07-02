import { AchievedForm, AchievedList, AchievedTool } from "../main/components/Achieved";

const ToDo = () => {
  return (
    <div className="flex gap-5 px-20 max-lg:px-5 pt-12 max-lg:pt-5 max-lg:flex-col">
      <div className="w-2/3 h-screen max-lg:w-full">
        <AchievedTool />
        <AchievedList />
      </div>
      <div className="w-1/3 max-lg:w-full">
        <AchievedForm />
      </div>
    </div>
  );
};

export default ToDo;

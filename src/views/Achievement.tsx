import { AchievementForm, AchievementList } from "../main/components";
//import { addContact } from '../redux/actions';

const ToDo = () => {
  return (
    <div className="flex gap-5 px-20 max-lg:px-5 pt-20 max-lg:pt-5 max-lg:flex-col">
      <div className="w-2/3 max-lg:w-full">
        <AchievementList />
      </div>
      <div className="w-1/3 max-lg:w-full">
        <AchievementForm />
      </div>
    </div>
  );
};

export default ToDo;

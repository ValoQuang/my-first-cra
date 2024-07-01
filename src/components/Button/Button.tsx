import { ReactNode } from "react";

type ButtonProp = {
  title?: string | "";
  icon?: ReactNode;
  onClick?: any;
};

const Button = ({ title, icon, onClick }: ButtonProp) => {
  const header = title ? title.charAt(0).toUpperCase() + title!.slice(1) : "";
  return (
    <div>
      <button onClick={onClick} className="btn btn-md btn-outline">
        <div className="lg:hidden">{icon}</div>
        <div className="max-lg:hidden">{icon}</div>
        <div className="max-lg:hidden">{header}</div>
      </button>
    </div>
  );
};

export default Button;

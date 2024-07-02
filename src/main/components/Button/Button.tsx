import { ReactNode } from "react";

type ButtonProp = {
  title?: string;
  icon?: ReactNode;
  onClick?: (prop?: any) => void;
  disabled?: boolean;
};

const Button = ({ title, icon, onClick, disabled }: ButtonProp) => {
  const header = title ? title.charAt(0).toUpperCase() + title!.slice(1) : "";
  return (
    <div>
      <button
        disabled={disabled}
        onClick={onClick}
        className="btn btn-md btn-outline"
      >
        <div className="lg:hidden">{icon}</div>
        <div className="max-lg:hidden">{icon}</div>
        {header && <div className="max-lg:hidden">{header}</div>}
      </button>
    </div>
  );
};

export default Button;

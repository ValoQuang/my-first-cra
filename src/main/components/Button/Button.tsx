import { ReactNode } from "react";

type ButtonProp = {
  title?: string | "";
  icon?: ReactNode;
  onClick?: (prop?: any) => void;
  anchor?: string;
  disabled?: boolean;
};

const Button = ({ title, icon, onClick, anchor, disabled }: ButtonProp) => {
  const header = title ? title.charAt(0).toUpperCase() + title!.slice(1) : "";
  return (
    <div>
      <a href={anchor}>
        <button disabled={disabled} onClick={onClick} className="btn btn-md btn-outline">
          <div className="lg:hidden">{icon}</div>
          <div className="max-lg:hidden">{icon}</div>
          <div className="max-lg:hidden">{header}</div>
        </button>
      </a>
    </div>
  );
};

export default Button;

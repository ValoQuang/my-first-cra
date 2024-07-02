import React from "react";
import Button from "../Button/Button";
import { LuSendHorizonal } from "react-icons/lu";

interface Project {
  name: string;
  description: string;
  image: string;
  link: string;
  tech: string[];
}

type CardProp = {
  value: Project;
};

const Card = ({ value }: CardProp) => {
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-xl hover:scale-105 transition-all">
        <figure>
          <img src={value?.image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{value.name}</h2>
          <p className="text-sm">{value?.description}</p>
          <div className="card-actions justify-end">
            {value.tech.map((stack, index) => {
              return <div key={index} className="badge badge-outline">{stack}</div>;
            })}
          </div>
          <Button
            icon={<LuSendHorizonal />}
            anchor={value?.link}
            title="Link"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;

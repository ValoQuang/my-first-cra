import React from "react";
import Button from "../Button/Button";
import { LuSendHorizonal } from "react-icons/lu";

const Card = ({ value }: any) => {
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
            <div className="badge badge-outline">Fashion</div>
            <div className="badge badge-outline">Products</div>
          </div>
          <Button icon={<LuSendHorizonal />}anchor={value?.link} title="Link" />
        </div>
      </div>
    </div>
  );
};

export default Card;

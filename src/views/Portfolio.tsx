import { memo } from "react";
import { Card } from "../main/components";
import { projects } from "../assets/";

const Portfolio = memo(() => {
  return (
    <div className="animate-fadeIn flex gap-2 h-screen">
      {projects.map((value, key) => {
        return (
          <div key={key}>
            <Card value={value}/>
          </div>
        );
      })}
    </div>
  );
});

export default Portfolio;

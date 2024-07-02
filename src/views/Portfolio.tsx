import { memo } from "react";
import { Card } from "../main/components";
import { projects } from "../assets/";

const Portfolio = memo(() => {
  return (
    <div className="animate-fadeIn flex gap-2 h-screen max-lg:flex-col pt-24">
      {projects.map((value, index) => {
        return (
          <div
            data-aos={`${index % 2 ? "fade-up" : "fade-down"}`}
            data-aos-delay={index * 2000}
            key={index}
          >
            <Card value={value} />
          </div>
        );
      })}
    </div>
  );
});

export default Portfolio;

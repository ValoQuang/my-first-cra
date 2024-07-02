import React, { memo } from "react";
import { biography } from "../assets";
import AOS from "aos";
import "aos/dist/aos.css";

const Biography = memo(() => {
  React.useEffect(() => {
    AOS.init({
      duration: 2000, // animation duration in milliseconds
      once: true, // whether animation should happen only once
    });
  }, []);

  return (
    <div className="py-20 text-lg max-lg:hidden">
      <ul className="timeline timeline-vertical right-72 max-lg:right-20 ">
        {biography.map((point, index) => (
          <li
            data-aos="slide-left"
            data-aos-offset="200"
            data-aos-delay={index * 2000}
            key={index}
          >
            <div className="timeline-start">{point.year}</div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-end timeline-box">
              {point.work}
              {point.pic === "" ? (
                <></>
              ) : (
                <img
                  className="rounded-xl w-96 h-64"
                  src={point.pic}
                  alt="pic"
                />
              )}
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Biography;

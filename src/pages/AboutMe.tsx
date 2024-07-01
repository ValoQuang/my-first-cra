import Button from "../components/Button/Button";

const AboutMe = () => {
  return (
    <div className=" animate-fadeIn">
      <div className="hero bg-base-100 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Hello, I am Quang Truong!</h1>
            <p className="py-8">
              I graduated in 2018 in Helsinki, Finland, with bachelor degree in
              Renewable Energy Technology.
            </p>
            <Button title="Get to know me more" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;

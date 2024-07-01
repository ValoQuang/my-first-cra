import React, { memo, useCallback } from "react";
import Button from "../components/Button/Button";
import {
  LuFacebook,
  LuLinkedin,
  LuGithub,
  LuBookOpenCheck,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleChangeTheme } from "../redux/theme/themeSlice";

const socialMediaLink = [
  {
    name: "linkedin",
    icon: <LuLinkedin />,
    link: "https://www.linkedin.com/in/quang-truong-07b150215/",
  },
  {
    name: "github",
    icon: <LuGithub />,
    link: "https://github.com/ValoQuang",
  },
  {
    name: "facebook",
    icon: <LuFacebook />,
    link: "https://www.facebook.com/ngoc.quang.995/",
  },
];

const Navigation: React.FC = memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigateToDo = () => {
    navigate("/to-do");
  };

  const handleNavigate = useCallback((address: string) => {
    const newTab = socialMediaLink.find((link) => link.name === address);
    if (newTab) {
      window.open(newTab.link, "_blank")?.focus();
    }
  }, []);

  const handleRenderButtons = useCallback(() => {
    return (
      <>
        <Button
          title="To-Do App"
          onClick={handleNavigateToDo}
          icon={<LuBookOpenCheck />}
        />
        {socialMediaLink.map((value, index) => (
          <div key={index}>
            <Button
              title={value.name}
              icon={value.icon}
              onClick={() => handleNavigate(value.name)}
            />
          </div>
        ))}
        <Button
          title="Theme"
          onClick={() => dispatch(handleChangeTheme())}
          icon={<LuBookOpenCheck />}
        />
      </>
    );
  }, []);

  return (
    <div className="w-[100%] flex items-center justify-between max-lg:px-5">
      <div className="text-3xl">Quang Truong</div>
      <div className="flex gap-2">{handleRenderButtons()}</div>
    </div>
  );
});

export default Navigation;

import React, { memo, useCallback } from "react";
import Button from "../Button/Button";
import {
  LuFacebook,
  LuLinkedin,
  LuGithub,
  LuBookOpenCheck,
  LuAlignJustify,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleChangeTheme } from "../../../redux/theme/themeSlice";

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

  const handleNavigate = useCallback(
    (endpoint: string) => {
      navigate(endpoint);
    },
    [navigate]
  );

  const handleRenderButtons = useCallback(() => {
    return (
      <>
        <Button
          title="Achievement App"
          onClick={() => handleNavigate("/achievement")}
          icon={<LuBookOpenCheck />}
          anchor="achievement"
        />
        {socialMediaLink.map((value, index) => (
          <div key={index}>
            <Button title={value.name} icon={value.icon} />
          </div>
        ))}
        <Button
          title="Theme"
          onClick={() => dispatch(handleChangeTheme())}
          icon={<LuBookOpenCheck />}
        />
      </>
    );
  }, [dispatch, handleNavigate]);

  return (
    <div className="w-[100%] flex items-center justify-between max-lg:px-5">
      <div
        className="text-3xl hover:cursor-pointer"
        onClick={() => handleNavigate("/")}
      >
        <a href="/">Quang Truong</a>
      </div>
      <div className="flex gap-2 max-lg:hidden">{handleRenderButtons()}</div>

      <div className="dropdown-bottom dropdown-end dropdown lg:hidden">
        <div tabIndex={0}>
          <Button icon={<LuAlignJustify />} />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-[70px] p-1 shadow"
        >
          <li className="flex flex-col">{handleRenderButtons()}</li>
        </ul>
      </div>
    </div>
  );
});

export default Navigation;

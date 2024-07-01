import sayduck from "../assets/sayduck.png";
import shareme from "../assets/shareme.png";
import blog from "../assets/blog.png";

export const projects = [{
    name: "Basic Blog",
    description: "A simple full stack blog built with Vite, ReactJS, NodeJS and Typescript",
    image: blog,
    link: "https://github.com/ValoQuang/portfolio",
    tech: ["ReactJS", "Typescript", "NodeJS", "Vite", "Tailwindcss", "Express", "MonggoDB", "Firebase", "zod", "Redux"]
},
{
    name: "Insta Blog",
    description: "An image platform built with Google Oauth, ReactJS, for users to upload pictures as hobby",
    image: shareme,
    link: "https://github.com/ValoQuang/Social-App",
    tech: ["ReactJS", "Typescript", "Firebase", "Google Oauth 2.0", "Tailwindcss", "Firebase", "Redux", "Sanity io"]
},
{
    name: "Sayduck platform",
    description: "An 3D Ecommerce platform for users",
    image: sayduck,
    link: "https://www.sayduck.com/",
    tech: ["ReactJS", "Typescript", "NodeJS", "Tailwindcss", "Express", "Firebase", "zod", "Redux"]
},
]
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

export const biography = [
    {
        year: "2014 - 2018",
        work: "I first came to Finland in 2014, studied in Renewable Energy, I graduated in 2018",
        pic: "https://dontforgettomove.com/wp-content/uploads/2020/04/virtual-helsinki.jpg"
    },
    {
        year: "2019 - 2020",
        work: "I worked at wind turbine technician trainee, also I got bit of experience of programming language",
        pic: "https://justenergy.com/wp-content/uploads/2020/11/wind-energy-image-definition.jpg"
    },
    {
        year: "2020",
        work: "At peak Covid I got laidoff, I spent days maxing out level on COD, eventually got into early 30s existence crisis. Then, I decided to make a change, because I believe every 60s I waste, a minute passed",
        pic: ""
    },
    {
        year: "2021 - 2024",
        work: "I started coding, with focus on web application, my main specialty are ReactJS, Typescript, Tailwindcss",
        pic: ""
    }
]
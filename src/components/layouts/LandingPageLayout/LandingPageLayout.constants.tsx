import { FaFacebook, FaInstagram, FaTiktok, FaX, FaYoutube } from "react-icons/fa6"

const NAV_ITEMS = [
    {
        label: "Home",
        href: "/"
    },
    {
        label: "Explore",
        href: "/event"
    },
]

const BUTTON_ITEMS = [
    {
        label: "Register",
        href: "/auth/register",
        variant: "dashed"
    },
    {
        label: "Login",
        href: "/auth/login",
        variant: "solid"
    },
]   

const SOCIAL_ITEMS = [
    {
        label: "Instagram",
        href: "https://www.instagram.com/",
        icon: <FaInstagram/> 
    },
    {
        label: "Facebook",
        href: "https://www.facebook.com/",
        icon: <FaFacebook/>
    },
    {
        label: "Tiktok",
        href: "https://vt.tiktok.com/ZSFoY1234/",
        icon: <FaTiktok/>
    },
    {
        label: "Twitter",
        href: "https://twitter.com/",
        icon: <FaX/>
    },
    {
        label: "Youtube",
        href: "https://www.youtube.com/",
        icon: <FaYoutube/>
    },
]


export { NAV_ITEMS, BUTTON_ITEMS, SOCIAL_ITEMS }
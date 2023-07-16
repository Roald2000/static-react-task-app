import { useEffect, useState } from "react";

import { AiFillBulb, AiOutlineBulb } from "react-icons/ai";

export default function ThemeToggle({ iconSize = 24 }) {
    const [theme, setTheme] = useState('light');

    const toggle = () => {
        if (theme === "light") {
            setTheme('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            setTheme('light');
            localStorage.setItem('theme', 'light');
        }
    }

    useEffect(() => {
        const localTheme = localStorage.getItem('theme');
        if (localTheme) {
            setTheme(localTheme);
        }
    }, [])

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme])

    return (
        <button onClick={toggle} className="btn bg-base-300">
            {theme === 'light' ? <AiOutlineBulb size={iconSize} /> : <AiFillBulb size={iconSize} />}
        </button>
    );
}
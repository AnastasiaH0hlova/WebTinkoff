import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";

function Header() {
    return (
        <header className="header flex row space-between align-center padding-left-15px">
            <Link to="/" style={{ textDecoration: "none" }}>
                <Typography variant="h5" style={{ textShadow: "0px 4px 4px var(--shadow)" }} fontWeight={500} color="black">Админка фильмотеки</Typography>
            </Link>
            <Button>
                <Typography variant="h7" >Анастасия Хохлова 6409</Typography>
            </Button>
        </header>
    );
}

export default Header;
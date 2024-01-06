import React from "react";
import "./SideBarFooter.css";
import AddIcon from '@mui/icons-material/Add';
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function SideBarFooter({ visibleMovies }) {
    return (
        <div className="sidebar-footer flex row space-between align-center roboto font-12px">
            <Typography fontSize={12}>{`Найдено фильмов: ${visibleMovies ? visibleMovies.length : 0}`}</Typography>
            <Link to="/create" style={{ textDecoration: "none" }}>
                <Button>
                    <AddIcon />
                    Добавить
                </Button>
            </Link>
        </div>
    );
}

export default SideBarFooter;
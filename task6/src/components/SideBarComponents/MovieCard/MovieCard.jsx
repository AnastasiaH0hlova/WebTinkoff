import React from "react";
import "./MovieCard.css";
import { Typography } from "@mui/material";

function MovieCard({ title, year, genres, choosed }) {
    return (
        <div className={`movie-card flex col gap-6px justify-center pointer padding-left-15px ${choosed ? "choosed" : ""}`}>
            <Typography fontSize={12} color="black">{title}</Typography>
            <Typography color="grey" fontSize={11}>{`${year} | ${genres}`}</Typography>
        </div>
    );
}

export default MovieCard;
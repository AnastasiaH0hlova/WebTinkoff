import React from "react";
import { Typography } from "@mui/material";

function MovieDescription({ plot, rating }) {
    function getRatingColor() {
        if (rating < 5)
            return 'red';
        if (rating > 7)
            return 'green';
        return 'grey';
    }


    return (
        <div className="flex col gap-10px">
            <Typography fontSize={20} fontWeight={500}>Описание</Typography>
            <Typography fontSize={16}>{plot}</Typography>
            <div className="flex row gap-40px align-center">
                <Typography fontSize={16} fontWeight={500}>Текущий рейтинг</Typography>
                <Typography variant="h4" fontWeight={700} color={getRatingColor()}>{rating === undefined ? "-" : rating}</Typography>
            </div>
        </div>
    );
}

export default MovieDescription;
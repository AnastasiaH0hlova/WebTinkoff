import React from "react";
import { Typography } from "@mui/material";

function MovieParam({ param, value }) {
    return (
        <div className="flex row gap-6px">
            <Typography fontSize={16} color="grey">{param}</Typography>
            <Typography fontSize={16}>{value}</Typography>
        </div>
    );
}

export default MovieParam;
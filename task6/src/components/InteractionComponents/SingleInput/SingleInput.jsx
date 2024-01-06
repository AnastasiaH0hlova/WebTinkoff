import React from "react";
import "./SingleInput.css";
import { Typography } from "@mui/material";

function SingleInput({ label, placeholder, type, value, setValue }) {
    return (
        <div className="flex col gap-6px">
            <Typography fontSize={16}>{label}</Typography>
            {type === "input" ?
                <input placeholder={placeholder} className="interaction-input padding-left-15px roboto font-size-12px" value={value} onChange={(e) => { setValue(e.target.value) }}></input>
                :
                <textarea placeholder={placeholder} className="interaction-input padding-left-15px roboto font-size-12px" value={value} onChange={(e) => { setValue(e.target.value) }}></textarea>
            }
        </div>
    );
}

export default SingleInput;
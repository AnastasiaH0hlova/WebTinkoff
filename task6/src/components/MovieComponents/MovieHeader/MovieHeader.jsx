import React from "react";
import { Typography, Button } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CreateIcon from '@mui/icons-material/Create';
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

function MovieHeader({ id, title }) {
    return (
        <div className="flex row align-center space-between width-100">
            <div className="flex row gap-15px align-center">
                <Typography fontSize={14}>{`ID: ${id}`}</Typography>
                <ContentCopyIcon fontSize="14" className="pointer" titleAccess="Скопировать ID" onClick={() => { navigator.clipboard.writeText(id); toast.success(`ID фильма "${title}" скопирован!`); }} />
            </div>
            <Link to={`/edit/${id}`} style={{ textDecoration: "none" }}>
                <Button>
                    <CreateIcon fontSize="medium" />
                    <Typography fontSize={14}>Редактировать</Typography>
                </Button>
            </Link>
        </div>
    );
}

export default MovieHeader;
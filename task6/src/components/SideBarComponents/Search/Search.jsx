import React, { useState } from "react";
import "./Search.css";
import { Button } from "@mui/material";

function Search({ moviesList, setVisibleMovies }) {
    const [searchRequest, setSearchRequest] = useState("");

    function searchMovies() {
        if (moviesList === null)
            return;
            
        if (searchRequest === "")
            setVisibleMovies(moviesList);
        else {
            setVisibleMovies(moviesList.filter(x => x.title.includes(searchRequest)));
        }
    }

    return (
        <div className="flex row gap-13px roboto font-12px margin-top-10px search">
            <input className="search-input padding-left-15px" placeholder="Введите название фильма" onChange={(e) => setSearchRequest(e.target.value)} />
            <Button className="search-btn" onClick={() => { searchMovies() }}>
                Искать
            </Button>
        </div>
    );
}

export default Search;
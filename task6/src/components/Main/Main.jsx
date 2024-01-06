import React from "react";
import { Routes, Route } from 'react-router-dom'
import SideBar from "../../pages/SideBar/SideBar";
import MoviePage from "../../pages/MoviePage/MoviePage";
import InteractionPage from "../../pages/InteractionPage/InteractionPage";

function Main() {
    return (
        <main>
            <Routes>
                <Route path="/" element={<SideBar />} />
                <Route path="/movie/:id" element={<MoviePage />} />
                <Route path="/edit/:id" element={<InteractionPage />} />
                <Route path="/create" element={<InteractionPage />} />
            </Routes>
        </main>
    );
}

export default Main;
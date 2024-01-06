import React, { useState, useEffect } from "react";
import "./SideBar.css";
import Search from "../../components/SideBarComponents/Search/Search";
import MovieCard from "../../components/SideBarComponents/MovieCard/MovieCard";
import SideBarFooter from "../../components/SideBarComponents/SideBarFooter/SideBarFooter";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

function SideBar({ id }) {
    const [moviesList, setMoviesList] = useState(null);
    const [visibleMovies, setVisibleMovies] = useState(null);


    useEffect(() => {
        (async () => {
            await getMovies();
        })().catch(error => { toast.error(`При получении списка фильмов произошла ошибка: ${error}`); });
    }, []);


    async function getMovies() {
        const fetchedMovies = await fetch(`http://localhost:3004/movies`).then((response) => response.json());
        const favoritesMovies = await fetch(`http://localhost:3004/favorites`).then((response) => response.json());
        for (let movie of fetchedMovies) {
            movie.isFavorite = favoritesMovies.some(e => e.id === movie.id);
        }
        setMoviesList(fetchedMovies);
        setVisibleMovies(fetchedMovies);
    }


    return (
        <div className="flex col margin-top-10px sidebar space-between">
            <div>
                <Search moviesList={moviesList} setVisibleMovies={setVisibleMovies}></Search>
                <div className="flex col gap-8px">
                    {
                        visibleMovies && visibleMovies.map((movie) =>
                            <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }} key={movie.id}>
                                <MovieCard title={movie.title} year={movie.year} genres={movie.genres.join(", ")} choosed={Number(movie.id) === Number(id)} />
                            </Link>
                        )
                    }
                </div>
            </div>
            <SideBarFooter visibleMovies={visibleMovies}></SideBarFooter>
        </div>
    );
}

export default SideBar;
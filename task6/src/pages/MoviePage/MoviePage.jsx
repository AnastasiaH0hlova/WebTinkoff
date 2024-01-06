import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./MoviePage.css";
import SideBar from "../SideBar/SideBar";
import MovieHeader from "../../components/MovieComponents/MovieHeader/MovieHeader";
import MovieMain from "../../components/MovieComponents/MovieMain/MovieMain";
import MovieDescription from "../../components/MovieComponents/MovieDescription/MovieDescription";
import { toast } from "react-hot-toast";

function Movie() {
    const params = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);


    useEffect(() => {
        (async () => {
            await getMovie();
        })().catch(error => { toast.error(`При получении фильма произошла ошибка: ${error}`); });
    }, [params]);


    async function getMovie() {
        try {
            const gettedMovie = await fetch(`http://localhost:3004/movies/${params.id}`).then((response) => response.json());
            if (!gettedMovie || Object.keys(gettedMovie).length === 0) {
                toast.error(`Фильма с таким ID (${params.id}) не существует`);
                navigate("/");
            }

            const favoritesMovies = await fetch(`http://localhost:3004/favorites/${params.id}`).then((response) => response.json());
            if (Array.isArray(gettedMovie))
                gettedMovie.isFavorite = favoritesMovies.some(e => e.id === gettedMovie.id);
            else
                gettedMovie.isFavorite = favoritesMovies.id === gettedMovie.id;

            setIsFavorite(gettedMovie.isFavorite);
            setMovie(gettedMovie);
        } catch (error) {
            toast.error(`При получении фильма произошла ошибка: ${error}`);
            navigate("/");
        }
    }


    return (
        <div className="flex row">
            <SideBar id={params.id}></SideBar>
            {
                movie && <div className="movie">
                    <MovieHeader id={params.id}></MovieHeader>
                    <MovieMain movie={movie} setIsFavorite={setIsFavorite} isFavorite={isFavorite}></MovieMain>
                    <MovieDescription plot={movie.plot} rating={movie.rating}></MovieDescription>
                </div>
            }
        </div>
    );
}

export default Movie;
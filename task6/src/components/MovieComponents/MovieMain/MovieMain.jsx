import React from "react";
import "./MovieMain.css";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Typography } from "@mui/material";
import { toast } from "react-hot-toast";
import MovieParam from "../MovieParam/MovieParam";

function MovieMain({ movie, setIsFavorite, isFavorite }) {
    function getCorrectRuntime(runtime) {
        return `${Math.floor(Number(runtime) / 60)} ч. ${Number(runtime) % 60} мин.`
    }


    function showEmojiToast() {
        toast('Остальных посмотреть нельзя', {
            icon: '😏',
        });
    }


    async function handleFavoriteClick() {
        try {
            if (isFavorite) {
                await fetch(`http://localhost:3004/favorites/${movie.id}`, {
                    method: 'DELETE'
                });
            }
            else {
                await fetch('http://localhost:3004/favorites', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({ id: movie.id })
                });
            }
            toast.success(`Вы успешно ${isFavorite ? `убрали фильм "${movie.title}" из избранного` : `добавили фильм "${movie.title}" в избранное`}`);
            setIsFavorite(!isFavorite);
        } catch (error) {
            toast.error(`При изменении любимости произошла ошибка: ${error}`);
        }
    }


    function showActors(actors) {
        let content = [];
        let size = actors.length > 4 ? 4 : actors.length;
        for (let i = 0; i < size; ++i) {
            content.push(
                <Typography fontSize={16} key={actors[i]}>{actors[i]}</Typography>
            );
        }

        if (actors.length > 4)
            content.push(
                <Typography key={`Скрыто актёров: ${actors.length - 4}`} fontSize={16} color="var(--base-02)" className="pointer nonselected" onClick={() => { showEmojiToast(); }}>
                    {`Скрыто актёров: ${actors.length - 4}`}
                </Typography>
            );
        return content;
    }


    return (
        <div className="flex row gap-15px main-wrapper">
            <div className="movie-poster">
                <img src={movie.posterUrl} alt={movie.title} title={`Постер фильма "${movie.title}"`}/>
            </div>
            <div className="flex col gap-15px width-100">
                <div className="flex col">
                    <div className="flex row align-center gap-6px">
                        <Typography variant="h5" fontWeight={500}>{movie.title}</Typography>
                        <div className="pointer like" onClick={() => { handleFavoriteClick(); }}>
                            {isFavorite ? <FavoriteIcon titleAccess="Убрать фильм из избранного" /> : <FavoriteBorderIcon titleAccess="Добавить фильм в избранное" />}
                        </div>
                    </div>
                    <Typography color="grey" fontSize={16}>{movie.director}</Typography>
                </div>
                <div className="flex row space-between width-100">
                    <div className="flex col gap-10px">
                        <Typography variant="h5" fontSize={16} fontWeight={500}>Параметры</Typography>
                        <div className="flex col gap-6px">
                            <MovieParam param="Год производства: " value={movie.year}></MovieParam>
                            <MovieParam param="Длительность: " value={getCorrectRuntime(movie.runtime)}></MovieParam>
                            <MovieParam param="Жанры: " value={movie.genres.join(", ")}></MovieParam>
                        </div>
                    </div>
                    <div className="flex col gap-10px" >
                        <Typography fontSize={16} fontWeight={500} className="flex align-center pointer" onClick={() => { showEmojiToast(); }} >
                            В главных ролях
                            <ChevronRightIcon />
                        </Typography>
                        <div className="flex col">
                            {showActors(movie.actors.split(", "))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieMain;
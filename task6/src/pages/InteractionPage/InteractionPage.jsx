import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./InteractionPage.css";
import SideBar from "../SideBar/SideBar";
import { Typography, Button } from "@mui/material";
import InputPair from "../../components/InteractionComponents/InputPair/InputPair";
import SingleInput from "../../components/InteractionComponents/SingleInput/SingleInput";
import { toast } from "react-hot-toast";

function InteractionPage() {
    const params = useParams();
    const navigate = useNavigate();

    const [startTitle, setStartTitle] = useState("");

    const [titleInput, setTitleInput] = useState("");
    const [yearInput, setYearInput] = useState("");
    const [plotInput, setPlotInput] = useState("");
    const [posterUrlInput, setPosterUrlInput] = useState("");
    const [runtimeInput, setRuntimeInput] = useState("");
    const [ratingInput, setRatingInput] = useState("");
    const [actorsInput, setActorsInput] = useState("");
    const [directorInput, setDirectorInput] = useState("");
    const [genresInput, setGenresInput] = useState("");


    useEffect(() => {
        if (params.id !== undefined) {
            (async () => {
                await getMovie();
            })().catch(error => { toast.error(`При получении фильма произошла ошибка: ${error}`); });
        } else {
            initInputs("", "", "", "", "", "", "", "", "", "");
        }
    }, [params]);


    async function getMovie() {
        try {
            const gettedMovie = await fetch(`http://localhost:3004/movies/${params.id}`).then((response) => response.json());
            initInputs(
                gettedMovie.title,
                gettedMovie.title,
                gettedMovie.year,
                gettedMovie.plot,
                gettedMovie.posterUrl,
                gettedMovie.runtime,
                gettedMovie.rating === undefined ? "-" : gettedMovie.rating,
                gettedMovie.actors.replaceAll(",", ";"),
                gettedMovie.director,
                gettedMovie.genres.join("; ")
            );
        } catch (error) {
            toast.error(`При получении фильма произошла ошибка: ${error}`);
        }
    }


    function initInputs(startTitle_, title_, year_, plot_, posterUrl_, runtime_, rating_, actors_, director_, genres_) {
        setStartTitle(startTitle_);
        setTitleInput(title_);
        setYearInput(year_);
        setPlotInput(plot_);
        setPosterUrlInput(posterUrl_);
        setRuntimeInput(runtime_);
        setRatingInput(rating_);
        setActorsInput(actors_);
        setDirectorInput(director_);
        setGenresInput(genres_);
    }


    function validateForms() {
        if (isEmpty(titleInput)) {
            toast.error("Вы не ввели название фильма");
            return;
        }

        if (isEmpty(yearInput)) {
            toast.error("Вы не ввели год производства фильма");
            return;
        }

        if (isNotANumber(yearInput)) {
            toast.error("Год должен быть числом");
            return;
        }

        if (isEmpty(plotInput)) {
            toast.error("Вы не ввели описание фильма");
            return;
        }

        if (isEmpty(posterUrlInput)) {
            toast.error("Вы не ввели ссылку на обложку фильма");
            return;
        }

        if (isEmpty(runtimeInput)) {
            toast.error("Вы не ввели продолжительность фильма");
            return;
        }

        if (isNotANumber(runtimeInput)) {
            toast.error("Продолжительность фильма должна быть числом");
            return;
        }

        if (isEmpty(ratingInput)) {
            toast.error("Вы не ввели рейтинг фильма");
            return;
        }

        if (isNaN(ratingInput) || isNaN(parseFloat(ratingInput))) {
            toast.error("Рейтинг должен быть числом");
            return;
        }

        if (isEmpty(actorsInput)) {
            toast.error("Вы не ввели актёров фильма");
            return;
        }

        if (isEmpty(directorInput)) {
            toast.error("Вы не ввели режиссёра фильма");
            return;
        }

        if (isEmpty(genresInput)) {
            toast.error("Вы не ввели жанры фильма");
            return;
        }

        updateMovie();
    }


    async function updateMovie() {
        let updatedMovie = {
            title: titleInput,
            year: yearInput,
            plot: plotInput,
            posterUrl: posterUrlInput,
            runtime: runtimeInput,
            rating: ratingInput,
            actors: actorsInput.replaceAll(";", ","),
            director: directorInput,
            genres: genresInput.split("; ")
        }

        try {
            let fetchUrl;
            let fetchType;

            if (params.id !== undefined) {
                updatedMovie.id = params.id;
                fetchUrl = `http://localhost:3004/movies/${params.id}`;
                fetchType = "PUT";
            } else {
                let allMovies = await fetch(`http://localhost:3004/movies`).then((response) => response.json());
                updatedMovie.id = allMovies.length + 1;

                fetchUrl = `http://localhost:3004/movies`;
                fetchType = "POST";
            }

            await fetch(fetchUrl, {
                method: fetchType,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(updatedMovie)
            });

            toast.success(`Вы успешно ${params.id !== undefined ? "изменили" : "создали"} фильм "${params.id !== undefined ? startTitle : titleInput}"`);
            navigate(`/movie/${updatedMovie.id}`);
        } catch (error) {
            toast.error(`При ${params.id !== undefined ? "изменении" : "создании"} фильма произошла ошибка: ${error}`);
        }
    }


    function isEmpty(value) {
        return !value.replace(/\s/g, '').length;
    }


    function isNotANumber(value) {
        return isNaN(value) || isNaN(parseInt(value));
    }


    return (
        <div className="flex row">
            <SideBar></SideBar>
            <div className="movie flex col space-between">
                <div className="flex col gap-15px">
                    <Typography variant="h5" fontWeight={500}>{params.id !== undefined ? "Редактирование" : "Создание"}</Typography>
                    <InputPair label1="Название фильма" placeholder1="Введите название фильма" value1={titleInput} setValue1={setTitleInput} label2="Год выпуска" placeholder2="Введите год выпуска фильма" value2={yearInput} setValue2={setYearInput}></InputPair>
                    <InputPair label1="Обложка" placeholder1="Укажите ссылку на обложку фильма" value1={posterUrlInput} setValue1={setPosterUrlInput} label2="Продолжительность" placeholder2="Укажите продолжительность фильма" value2={runtimeInput} setValue2={setRuntimeInput}></InputPair>
                    <InputPair label1="Рейтинг" placeholder1="Укажите рейтинг фильма" value1={ratingInput} setValue1={setRatingInput} label2="Режиссёр" placeholder2="Укажите режиссёра фильма" value2={directorInput} setValue2={setDirectorInput}></InputPair>
                    <InputPair label1="Актёры" placeholder1="Введите актеров фильма (через ;)" value1={actorsInput} setValue1={setActorsInput} label2="Жанры" placeholder2="Введите жанры фильма (через ;)" value2={genresInput} setValue2={setGenresInput}></InputPair>
                    <SingleInput label="Описание" placeholder="Введите описание фильма" type="textarea" value={plotInput} setValue={setPlotInput}></SingleInput>
                </div>
                <div className="interatcion-footer flex row align-center width-100 gap-6px">
                    <Link to={params.id !== undefined ? `/movie/${params.id}` : "/"} style={{ textDecoration: "none" }}>
                        <Button>Отменить</Button>
                    </Link>
                    <Button onClick={() => { validateForms() }}>Сохранить</Button>
                </div>
            </div>
        </div>
    );
}

export default InteractionPage;
import React from "react";
import "./MovieCarousel.css";

// ✅ Import posters from assets
import new1 from "../assets/images/posters/madarasi.jpeg";
import new2 from "../assets/images/posters/coolie.jpeg";
import new3 from "../assets/images/posters/Maareesan.jpeg";
import new4 from "../assets/images/posters/don.jpeg";
import new5 from "../assets/images/posters/Hey-sinamika.jpeg";
import new6 from "../assets/images/posters/hero.jpeg";
import new7 from "../assets/images/posters/kanguva.jpeg";
import new8 from "../assets/images/posters/jailer.jpeg";
import new9 from "../assets/images/posters/indian2.jpeg";
import new10 from "../assets/images/posters/leo.jpeg";

import thrill1 from "../assets/images/posters/Maharaja.jpeg";
import thrill2 from "../assets/images/posters/Baby Jhon.jpeg";
import thrill3 from "../assets/images/posters/indian2.jpeg";
import thrill4 from "../assets/images/posters/jawaan.jpeg";
import thrill5 from "../assets/images/posters/kok.jpeg";
import thrill6 from "../assets/images/posters/leo.jpeg";
import thrill7 from "../assets/images/posters/maamanan.jpeg";
import thrill8 from "../assets/images/posters/madarasi.jpeg";
import thrill9 from "../assets/images/posters/merrychristmas.jpeg";
import thrill10 from "../assets/images/posters/ngk.jpeg";

import act1 from "../assets/images/posters/jailer.jpeg";
import act2 from "../assets/images/posters/Nani's Gang Leader.jpeg";
import act3 from "../assets/images/posters/okck.jpeg";
import act4 from "../assets/images/posters/pushpa 2.jpeg";
import act5 from "../assets/images/posters/pushpa.jpeg";
import act6 from "../assets/images/posters/pathan.jpeg";
import act7 from "../assets/images/posters/rrr.jpg";
import act8 from "../assets/images/posters/soopotru.jpeg";
import act9 from "../assets/images/posters/thug-life.jpeg";
import act10 from "../assets/images/posters/vettaiyan.jpeg";


const MovieCarousel = () => {
  const newMovies = [
    { id: 1, title: "MADARASI", poster: new1 },
    { id: 2, title: "COOLIE", poster: new2 },
    { id: 3, title: "MAARESAN", poster: new3 },
    { id: 4, title: "DON", poster: new4 },
    { id: 5, title: "HEY SINAMIKA", poster: new5 },
    { id: 6, title: "HERO", poster: new6 },
    { id: 7, title: "KANGUVA", poster: new7 },
    { id: 8, title: "JAILER", poster: new8 },
    { id: 9, title: "INDIAN 2", poster: new9 },
    { id: 10, title: "LEO", poster: new10 },
  ];

  const thrillerMovies = [
    { id: 1, title: "MAHARAJA", poster: thrill1 },
    { id: 2, title: "BABY JOHN", poster: thrill2 },
    { id: 3, title: "INDIAN 2", poster: thrill3 },
    { id: 4, title: "JAWAAN", poster: thrill4 },
    { id: 5, title: "KING OF KOTHA", poster: thrill5 },
    { id: 6, title: "LEO", poster: thrill6 },
    { id: 7, title: "MAAMANAN", poster: thrill7 },
    { id: 8, title: "MADARASI", poster: thrill8 },
    { id: 9, title: "MERRY CHRISTMAS", poster: thrill9 },
    { id: 10, title: "NGK", poster: thrill10 },
  ];

  const actionMovies = [
    { id: 1, title: "JAILER", poster: act1 },
    { id: 2, title: "NANI'S GANG LEADER", poster: act2 },
    { id: 3, title: "ODUM KUTHIRA CHADUM KUTHIRA", poster: act3 },
    { id: 4, title: "PUSHPA 2", poster: act4 },
    { id: 5, title: "PUSHPA", poster: act5 },
    { id: 6, title: "PATHAN", poster: act6 },
    { id: 7, title: "RRR", poster: act7 },
    { id: 8, title: "SOORARAI POTRU", poster: act8 },
    { id: 9, title: "THUG-LIFE", poster: act9 },
    { id: 10, title: "VETTAIYAN", poster: act10 },
  ];

  const renderRow = (title, movies) => (
    <div className="movie-row">
      <h2 className="movie-row-title">{title}</h2>
      <div className="movie-scroll">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img src={movie.poster} alt={movie.title} />
            <p className="movie-name">{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="movie-carousel">
      {renderRow("🎬 New Movies", newMovies)}
      {renderRow("🔥 Thriller Movies", thrillerMovies)}
      {renderRow("💥 Action Movies", actionMovies)}
    </div>
  );
};

export default MovieCarousel;

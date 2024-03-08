import {
  toggleDarkMode,
  searchBtn,
  options,
  checkDark,
  toggleDark,
  gotoSearch,
  addToWatchlist,
} from "./utilities.js";
const movieContainer = document.getElementById("movieContainer");
const creditsContainer = document.getElementById("creditsContainer");
document.addEventListener("DOMContentLoaded", async () => {
  checkDark();
  const id = new URLSearchParams(window.location.search).get("id");
  const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const movieTrailerUrl = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
  const movieCreditsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
  let res = await fetch(movieDetailsUrl, options);
  const movieDetails = await res.json();
  movieContainer.style.background = `url(http://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}) no-repeat center center / cover`;
  res = await fetch(movieTrailerUrl, options);
  const movieTrailer = await res.json();
  const videoTrailer = `
  <iframe src="https://www.youtube.com/embed/${movieTrailer.results[0].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  `;
  res = await fetch(movieCreditsUrl, options);
  const movieCredits = await res.json();
  const genres = movieDetails.genres.map((genre) => genre.name).join(", ");
  movieContainer.innerHTML += `
  <div id='imgContainer'>
  <img src='https://image.tmdb.org/t/p/w600_and_h900_bestv2/${
    movieDetails.poster_path
  }'>
  </div>
  <div id='movieInfo'>
  <h2>${movieDetails.title}</h2>
  <h3 class='tagline'>${movieDetails.tagline}</h3>
  <p><strong>Runtime: </strong>${movieDetails.runtime} minutes</p>
  <p><strong>Genres: </strong>${genres}</p>
  <p><strong>Ratings: </strong>${Math.round(
    movieDetails.vote_average * 10
  )}%</p>
  <p><strong>Release Date: </strong>${movieDetails.release_date}</p>
  <p><strong>Producer: </strong>${movieDetails.production_companies
    .map((company) => company.name)
    .join(", ")}</p>
  <p><strong>Homepage: </strong><a href='${
    movieDetails.homepage
  }' target='_blank'>Visit homepage</a></p>
  <button class='addToWatchlist' data-id='${
    movieDetails.id
  }'>Add to Watchlist</button>
  <p>${movieDetails.overview}</p>
  <h2>Trailer</h2>
  ${videoTrailer}
  </div>
  `;
  const castHtml = movieCredits.cast
    .map(
      (actor) => `
      <div class='cast'>
  <img src=${
    actor.profile_path
      ? `https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${actor.profile_path}`
      : "https://placehold.co/300x450"
  }>
  <h5>${actor.name}</h5>
  <h6>${actor.character}</h6>
  </div>
  `
    )
    .join("");
  creditsContainer.innerHTML += `
  <h2>Cast</h2>
  <div id='castContainer'>
  ${castHtml}
  </div>
  `;
});
document.addEventListener("click", (e) => {
  if (e.target.className === "addToWatchlist") {
    addToWatchlist(e);
  }
});
toggleDarkMode.addEventListener("click", () => {
  toggleDark();
});
searchBtn.addEventListener("click", () => {
  const value = document.getElementById("movieQuery").value;
  gotoSearch(value);
});

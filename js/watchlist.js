import {
  toggleDarkMode,
  searchBtn,
  options,
  checkDark,
  toggleDark,
  gotoMovie,
  gotoSearch,
  removeFromWatchlist,
} from "./utilities.js";
const watchlistContainer = document.getElementById("watchlist");
const watchlist = JSON.parse(localStorage.getItem("watchlist"));
document.addEventListener("DOMContentLoaded", () => {
  checkDark();
  watchlist.forEach(async (id) => {
    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    const res = await fetch(movieDetailsUrl, options);
    const movie = await res.json();
    watchlistContainer.innerHTML += `
    <div class='card' id='${movie.id}'>
    <img src='https://image.tmdb.org/t/p/w600_and_h900_bestv2/${
      movie.poster_path
    }' class='movieLink'>
    <h3  class='movieLink movieTitle'>${movie.title}</h3>
    <p>${
      movie.overview.length <= 200
        ? movie.overview
        : movie.overview.substring(0, 200) + "..."
    }</p>
    <button class='removeMovie' data-id='${id}'>Remove from Watchlist</button>
    </div>
    `;
  });
});
toggleDarkMode.addEventListener("click", () => {
  toggleDark();
});
document.addEventListener("click", (e) => {
  if (e.target.className === "removeMovie") {
    removeFromWatchlist(e);
  } else if (e.target.className.includes("movieLink")) {
    const id = e.target.parentElement.getAttribute("id");
    gotoMovie(id);
  }
});
searchBtn.addEventListener("click", () => {
  const value = document.getElementById("movieQuery").value;
  gotoSearch(value);
});

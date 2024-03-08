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
const searchQuery = "https://api.themoviedb.org/3/search/movie?query=";
const resultsContainer = document.getElementById("results");
document.addEventListener("DOMContentLoaded", async () => {
  checkDark();
  const title = new URLSearchParams(window.location.search).get("title");
  const res = await fetch(searchQuery + title, options);
  const movies = await res.json();
  movies.results.forEach((movie) => {
    if (movie.poster_path) {
      resultsContainer.innerHTML += `
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
    </div>
    `;
    }
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

import {
  toggleDarkMode,
  searchBtn,
  options,
  checkDark,
  toggleDark,
  gotoMovie,
  gotoSearch,
} from "./utilities.js";
const popular = document.getElementById("popular");
const topRated = document.getElementById("topRated");
const upcoming = document.getElementById("upcoming");
const nowPlaying = document.getElementById("nowPlaying");
const popularUrl =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
const topRatedUrl =
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
const upcomingUrl =
  "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
const nowPlayingUrl =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
const renderSection = async (container, url, options) => {
  const res = await fetch(url, options);
  const movies = await res.json();
  movies.results.forEach(({ title, overview, id, poster_path }) => {
    container.innerHTML += `
      <div class='card' id='${id}'>
      <img src='https://image.tmdb.org/t/p/w600_and_h900_bestv2/${poster_path}' class='movieLink'>
      <h3  class='movieLink movieTitle'>${title}</h3>
      <p>${
        overview.length <= 200 ? overview : overview.substring(0, 200) + "..."
      }</p>
      </div>
      `;
  });
};
document.addEventListener("DOMContentLoaded", async () => {
  await renderSection(popular, popularUrl, options);
  await renderSection(topRated, topRatedUrl, options);
  await renderSection(upcoming, upcomingUrl, options);
  await renderSection(nowPlaying, nowPlayingUrl, options);
  checkDark();
  let watchlist = localStorage.getItem("watchlist");
  if (!watchlist) {
    localStorage.setItem("watchlist", JSON.stringify([]));
  }
});
document.addEventListener("click", (e) => {
  if (e.target.className.includes("movieLink")) {
    const id = e.target.parentElement.getAttribute("id");
    gotoMovie(id);
  }
});
toggleDarkMode.addEventListener("click", () => {
  toggleDark();
});
searchBtn.addEventListener("click", () => {
  const value = document.getElementById("movieQuery").value;
  gotoSearch(value);
});

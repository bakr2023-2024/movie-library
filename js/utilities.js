const toggleDarkMode = document.getElementById("toggleDarkMode");
const searchBtn = document.getElementById("searchBtn");
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmRmZjMyNDM3Mzc2NzU0NWU3NmQxMjRmMDU1NGM4NCIsInN1YiI6IjY1ZTczN2RhNjMzMmY3MDE2MzkyN2E1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.roHmu62jq202L0qBJ3YKYx2YP66xkgkMZ6oT4zkLukc",
  },
};
const checkDark = () => {
  let isDark = localStorage.getItem("isDark");
  if (isDark) {
    isDark = JSON.parse(isDark);
    if (isDark) document.body.classList.add("darkMode");
    else document.body.classList.remove("darkMode");
  } else {
    localStorage.setItem("isDark", "false");
  }
};
const toggleDark = () => {
  const isDark = !JSON.parse(localStorage.getItem("isDark"));
  localStorage.setItem("isDark", String(isDark));
  if (isDark) document.body.classList.add("darkMode");
  else document.body.classList.remove("darkMode");
};
const gotoMovie = (id) => {
  window.location.href = "movieDetails.html?id=" + id;
};
const gotoSearch = (value) => {
  window.location.href = "searchResults.html?title=" + value;
};
const addToWatchlist = (e) => {
  const movieId = e.target.getAttribute("data-id");
  const watchlist = JSON.parse(localStorage.getItem("watchlist"));
  if (watchlist.includes(movieId)) {
    alert("already added to watchlist");
    return;
  }
  watchlist.push(movieId);
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
  e.target.textContent = "Added to Watchlist";
  e.target.setAttribute("disabled", "true");
};
const removeFromWatchlist = (e) => {
  const watchlist = JSON.parse(localStorage.getItem("watchlist"));
  watchlist.splice(
    watchlist.findIndex((id) => id === e.target.getAttribute("data-id")),
    1
  );
  e.target.parentElement.remove();
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
};
export {
  toggleDarkMode,
  searchBtn,
  options,
  checkDark,
  toggleDark,
  gotoMovie,
  gotoSearch,
  addToWatchlist,
  removeFromWatchlist,
};

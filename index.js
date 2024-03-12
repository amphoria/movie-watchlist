import noDataInitial from '/images/no-data-initial.png'
import star from '/images/star.png'

const omdbApiKey = "e8fa1a7c"

let watchList = []

//localStorage.clear()

if (localStorage.getItem("movie-watchlist")) {
    const jsonStr = localStorage.getItem("movie-watchlist")
    watchList = JSON.parse(jsonStr)
}

const searchText = document.getElementById("search-text")
const searchBtn = document.getElementById("search-btn")
const popup = document.getElementById("popup")
const movieList = document.getElementById("movie-list")

searchBtn.addEventListener("click", searchOmdb)

movieList.addEventListener("click", (e) => {
    if (e.target.dataset.id) {
        console.log("icon clicked")
         if (!watchList.includes(e.target.dataset.id)) {
            watchList.push(e.target.dataset.id)
            localStorage.setItem("movie-watchlist", JSON.stringify(watchList))
            popup.textContent = "Movie added to Watchlist"
            popup.style.display = 'flex'
            setTimeout(() => {
                popup.style.display = 'none'
            }, 2000)
        }
    }
})

movieList.innerHTML = `
    <img class="no-initial-data" src="${noDataInitial}">
`

async function searchOmdb() {
    let html = ""
    let res
    let data
    let index
    let rating

    const searchStr = searchText.value.replace(/ /g, "+")

    res = await fetch(`https://www.omdbapi.com/?apikey=${omdbApiKey}&s=${searchStr}`)
    const results = await res.json()
    if (results.Response === "False") {
        
        movieList.innerHTML = `
            <img class="no-initial-data" src="images/no-data-initial.png">
        `
        popup.textContent = `${results.Error}`
        popup.style.display = 'flex'
        setTimeout(() => {
            popup.style.display = 'none'
        }, 3000)
        return;
    }

    for (let item of results.Search) {

        res = await fetch(`https://www.omdbapi.com/?apikey=${omdbApiKey}&i=${item.imdbID}`) 
        data = await res.json()

        index = data.Ratings[0].Value.indexOf("/")
        rating = data.Ratings[0].Value.slice(0, index)

        html += `
            <div class="movie-item">
                <div class="poster">
                    <img class="poster-img" src="${data.Poster}">
                </div>
                <div class="title">${data.Title}</div>
                <div class="rating">
                    <img class="star" src="${star}">
                    <span>${rating}</span>
                </div>
                <div class="timing">${data.Runtime}</div>
                <div class="movie-genre">${data.Genre}</div>
                <div class="add-to-watchlist">
                    <button class="watchlist-btn">
                        <i class="fa-solid fa-plus watchlist-icon" data-id="${data.imdbID}"></i> 
                    </button>
                    <span class="add-text">Watchlist</span>
            </div>
                <div class="movie-plot">${data.Plot}</div>
            </div>
        `
    }
    movieList.innerHTML = html
}







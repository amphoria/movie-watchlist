import star from '/images/star.png'

const omdbApiKey = "e8fa1a7c"

let watchList = []

if (localStorage.getItem("movie-watchlist")) {
    const jsonStr = localStorage.getItem("movie-watchlist")
    watchList = JSON.parse(jsonStr)
}

const movieWatchlist = document.getElementById("movie-watchlist")

movieWatchlist.addEventListener("click", (e) => {
    if (e.target.dataset.id) {
        if (watchList.includes(e.target.dataset.id)) {
            const index = watchList.indexOf(e.target.dataset.id)
            watchList.splice(index, 1)
            localStorage.setItem("movie-watchlist", JSON.stringify(watchList))
            renderWatchlist()
        }
    }
})

async function renderWatchlist() {
    let html = ""
    let res
    let data
    let index
    let rating

    if (watchList.length > 0) {
        for (let item of watchList) {

            res = await fetch(`https://www.omdbapi.com/?apikey=${omdbApiKey}&i=${item}`) 
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
                    <div class="remove-from-watchlist">
                        <button class="watchlist-btn">
                            <i class="fa-solid fa-minus watchlist-icon" data-id="${data.imdbID}"></i>
                        </button>
                        <span class="remove-text">Remove</span>
                    </div>
                    <div class="movie-plot">${data.Plot}</div>
                </div>
            `
            movieWatchlist.innerHTML = html
        }
    } else {
        html += `
            <div class="empty-watchlist">
                <p class="empty-text">Your watchlist is looking a little empty...</p>
                <div>
                    <button class="watchlist-btn" id="watchlist-btn">
                        <i class="fa-solid fa-plus watchlist-icon"></i> 
                    </button>
                    <span>Let's add some moves!</span>
                </div>
            </div>
        `
        movieWatchlist.innerHTML = html
        const watchlistBtn = document.getElementById("watchlist-btn")
        watchlistBtn.addEventListener("click", () => {
            window.location.href = "/index.html"
        })
    }
}

renderWatchlist()



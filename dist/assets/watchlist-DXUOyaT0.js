import{s as d}from"./star-DmBqjON0.js";const m="e8fa1a7c";let s=[];if(localStorage.getItem("movie-watchlist")){const t=localStorage.getItem("movie-watchlist");s=JSON.parse(t)}const a=document.getElementById("movie-watchlist");a.addEventListener("click",t=>{if(t.target.dataset.id&&s.includes(t.target.dataset.id)){const e=s.indexOf(t.target.dataset.id);s.splice(e,1),localStorage.setItem("movie-watchlist",JSON.stringify(s)),o()}});async function o(){let t="",e,i,l,c;if(s.length>0)for(let n of s)e=await fetch(`https://www.omdbapi.com/?apikey=${m}&i=${n}`),i=await e.json(),l=i.Ratings[0].Value.indexOf("/"),c=i.Ratings[0].Value.slice(0,l),t+=`
                <div class="movie-item">
                    <div class="poster">
                        <img class="poster-img" src="${i.Poster}">
                    </div>
                    <div class="title">${i.Title}</div>
                    <div class="rating">
                        <img class="star" src="${d}">
                        <span>${c}</span>
                    </div>
                    <div class="timing">${i.Runtime}</div>
                    <div class="movie-genre">${i.Genre}</div>
                    <div class="remove-from-watchlist">
                        <button class="watchlist-btn">
                            <i class="fa-solid fa-minus watchlist-icon" data-id="${i.imdbID}"></i>
                        </button>
                        <span class="remove-text">Remove</span>
                    </div>
                    <div class="movie-plot">${i.Plot}</div>
                </div>
            `,a.innerHTML=t;else t+=`
            <div class="empty-watchlist">
                <p class="empty-text">Your watchlist is looking a little empty...</p>
                <div>
                    <button class="watchlist-btn" id="watchlist-btn">
                        <i class="fa-solid fa-plus watchlist-icon"></i> 
                    </button>
                    <span>Let's add some moves!</span>
                </div>
            </div>
        `,a.innerHTML=t,document.getElementById("watchlist-btn").addEventListener("click",()=>{window.location.href="/index.html"})}o();

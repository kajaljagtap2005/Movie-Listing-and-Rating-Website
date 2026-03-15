AOS.init();

const API_KEY = '8e2a1eabae410d694bc63eb39a4f8f99'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const targetMovies = [
    { title: "Zootopia 2", year: 2025 },
    { title: "Jolly LLB 3", year: 2025 },
    { title: "Dangal", year: 2016 },
    { title: "Maa", year: 2025 },
    { title: "Inception", year: 2010 }
];

async function loadApp() {
    const movieGrid = document.getElementById('movieGrid');
    movieGrid.innerHTML = '<p style="text-align:center; width:100%;">Loading Cinema...</p>';

    for (const item of targetMovies) {
        try {
            const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(item.title)}&year=${item.year}`);
            const data = await res.json();
            if (data.results && data.results[0]) {
                if (movieGrid.innerHTML.includes('Loading')) movieGrid.innerHTML = '';
                renderMovie(data.results[0]);
            }
        } catch (e) { console.error("API Error"); }
    }
}

function renderMovie(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.setAttribute('data-aos', 'fade-up');
    card.innerHTML = `
        <img src="${IMG_URL + movie.poster_path}" style="width:100%; height:380px; object-fit:cover;">
        <div style="padding:20px;">
            <h3>${movie.title}</h3>
            <p style="color:#888; margin-bottom:10px;">${movie.release_date.split('-')[0]}</p>
            <div class="stars" style="color:#f1c40f; margin-bottom:15px;">
                <i class="far fa-star" data-v="1"></i><i class="far fa-star" data-v="2"></i>
                <i class="far fa-star" data-v="3"></i><i class="far fa-star" data-v="4"></i>
                <i class="far fa-star" data-v="5"></i>
            </div>
            <button class="cta-btn" style="width:100%; padding:10px;" onclick="showTrailer(${movie.id})">Watch Trailer</button>
        </div>
    `;
    document.getElementById('movieGrid').appendChild(card);
    setupStars(card);
}
    `).join('');
}

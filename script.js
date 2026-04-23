const API_KEY = '32757d8e9c622dea1b16b754cf9a56cc';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const suggestBtn = document.getElementById('suggest-btn');
const genreSelect = document.getElementById('genre-select');
const resultContainer = document.getElementById('result-container');
const moviePoster = document.getElementById('movie-poster');
const movieTitle = document.getElementById('movie-title');
const movieDesc = document.getElementById('movie-desc');

suggestBtn.addEventListener('click', async () => {
    const selectedGenre = genreSelect.value;
    
    // Rastgele bir sayfa seç (TMDb'de popüler filmler ilk 20 sayfada yoğunlaşır)
    const randomPage = Math.floor(Math.random() * 20) + 1;
    
    let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=tr-TR&sort_by=popularity.desc&page=${randomPage}`;
    
    if (selectedGenre) {
        url += `&with_genres=${selectedGenre}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.results.length);
            const movie = data.results[randomIndex];
            showMovie(movie);
        } else {
            alert("Bu türde uygun bir film bulamadık, başka bir seçim yap canım.");
        }
    } catch (error) {
        console.error("Hata:", error);
        alert("Film getirilirken bir hata oluştu.");
    }
});

function showMovie(movie) {
    movieTitle.innerText = movie.title;
    movieDesc.innerText = movie.overview ? movie.overview : "Bu film için henüz Türkçe açıklama eklenmemiş.";
    
    if (movie.poster_path) {
        moviePoster.src = IMG_URL + movie.poster_path;
    } else {
        moviePoster.src = 'https://via.placeholder.com/200x300?text=Afiş+Yok';
    }

    resultContainer.style.display = 'flex';
    resultContainer.scrollIntoView({ behavior: 'smooth' });
}

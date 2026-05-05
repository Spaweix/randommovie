const API_KEY = '32757d8e9c622dea1b16b754cf9a56cc';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const suggestBtn = document.getElementById('suggest-btn');
const themeToggle = document.getElementById('theme-toggle');
const genreSelect = document.getElementById('genre-select');
const resultContainer = document.getElementById('result-container');
const moviePoster = document.getElementById('movie-poster');
const movieTitle = document.getElementById('movie-title');
const movieDesc = document.getElementById('movie-desc');

// Butonları Aktifleştirme (Aşağı Kaydırma)
const btnScrollSuggest = document.getElementById('scroll-to-suggest');
const btnScrollSearch = document.getElementById('scroll-to-search');
const filterBox = document.getElementById('main-filter-box');
const platformSelect = document.getElementById('platform-select');

btnScrollSuggest.addEventListener('click', () => {
    filterBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => genreSelect.focus(), 500); // Kutuyu seçili hale getir
});

btnScrollSearch.addEventListener('click', () => {
    filterBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => platformSelect.focus(), 500); // Kutuyu seçili hale getir
});

// Tema Kontrolü
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.innerText = 'Koyu Tema';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    themeToggle.innerText = isLight ? 'Koyu Tema' : 'Açık Tema';
});

// Film Önerisi
suggestBtn.addEventListener('click', async () => {
    const genre = genreSelect.value;
    const page = Math.floor(Math.random() * 20) + 1;
    let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=tr-TR&sort_by=popularity.desc&page=${page}`;
    if (genre) url += `&with_genres=${genre}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.results.length > 0) {
            const movie = data.results[Math.floor(Math.random() * data.results.length)];
            movieTitle.innerText = movie.title;
            movieDesc.innerText = movie.overview || "Bu film için Türkçe açıklama bulunamadı.";
            moviePoster.src = movie.poster_path ? IMG_URL + movie.poster_path : "https://via.placeholder.com/200x300?text=Afiş+Yok";
            resultContainer.style.display = 'flex';
            resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            alert("Uygun film bulunamadı.");
        }
    } catch (err) {
        alert("Bağlantı hatası oluştu.");
    }
});

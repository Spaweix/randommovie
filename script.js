const API_KEY = '32757d8e9c622dea1b16b754cf9a56cc';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const themeToggle = document.getElementById('theme-toggle');
const resultContainer = document.getElementById('result-container');
const moviePoster = document.getElementById('movie-poster');
const movieTitle = document.getElementById('movie-title');
const movieDesc = document.getElementById('movie-desc');

// Öneri Elementleri
const suggestBtn = document.getElementById('suggest-btn');
const genreSelect = document.getElementById('genre-select');
const platformSelect = document.getElementById('platform-select');

// Arama Elementleri
const navSearch = document.getElementById('nav-search');
const searchBox = document.getElementById('search-box');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// --- TEMA KONTROLÜ ---
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

// --- ARAMA KUTUSUNU AÇ/KAPAT ---
navSearch.addEventListener('click', (e) => {
    e.preventDefault();
    if (searchBox.style.display === 'none' || searchBox.style.display === '') {
        searchBox.style.display = 'flex';
        searchInput.focus();
    } else {
        searchBox.style.display = 'none';
    }
});

// --- İSİM İLE FİLM ARAMA ---
async function searchMovie() {
    const query = searchInput.value.trim();
    if (!query) {
        alert("Lütfen aramak için bir film adı yazın.");
        return;
    }

    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=tr-TR&query=${encodeURIComponent(query)}&page=1`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        
        if (data.results && data.results.length > 0) {
            const movie = data.results[0]; // İlk ve en alakalı sonucu göster
            showMovieData(movie);
        } else {
            alert(`"${query}" adında bir film bulunamadı.`);
        }
    } catch (err) {
        console.error("Hata Detayı:", err);
        alert("Arama yapılırken bağlantı hatası oluştu.");
    }
}

searchBtn.addEventListener('click', searchMovie);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchMovie();
});

// --- TÜR VE PLATFORM İLE RASTGELE FİLM ÖNERİSİ ---
const providers = {
    'netflix': 8,
    'prime': 119,
    'disney': 337,
    'apple': 350,
    'mubi': 11,
    'blutv': 341
};

suggestBtn.addEventListener('click', async () => {
    const genre = genreSelect.value;
    const platform = platformSelect.value;
    const page = Math.floor(Math.random() * 5) + 1; 
    
    let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=tr-TR&sort_by=popularity.desc&page=${page}`;
    
    if (genre) url += `&with_genres=${genre}`;
    if (platform && providers[platform]) url += `&with_watch_providers=${providers[platform]}&watch_region=TR`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        
        if (data.results && data.results.length > 0) {
            const movie = data.results[Math.floor(Math.random() * data.results.length)];
            showMovieData(movie);
        } else {
            alert("Seçtiğin kriterlerde film bulamadık. Lütfen farklı seçenekler dene.");
        }
    } catch (err) {
        console.error("Hata Detayı:", err);
        alert("Bağlantı hatası oluştu.");
    }
});

// --- EKRANA BASTIRMA FONKSİYONU ---
function showMovieData(movie) {
    movieTitle.innerText = movie.title;
    movieDesc.innerText = movie.overview || "Bu film için henüz Türkçe bir açıklama bulunmuyor.";
    moviePoster.src = movie.poster_path ? IMG_URL + movie.poster_path : "https://via.placeholder.com/200x300?text=Afiş+Yok";
    
    resultContainer.style.display = 'flex';
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

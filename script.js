const API_KEY = '32757d8e9c622dea1b16b754cf9a56cc';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const suggestBtn = document.getElementById('suggest-btn');
const themeToggle = document.getElementById('theme-toggle');
const genreSelect = document.getElementById('genre-select');
const platformSelect = document.getElementById('platform-select'); // Platform kutucuğunu yakaladık
const resultContainer = document.getElementById('result-container');
const moviePoster = document.getElementById('movie-poster');
const movieTitle = document.getElementById('movie-title');
const movieDesc = document.getElementById('movie-desc');

// Aşağı Kaydırma Butonları
const btnScrollSuggest = document.getElementById('scroll-to-suggest');
const btnScrollSearch = document.getElementById('scroll-to-search');
const filterBox = document.getElementById('main-filter-box');

btnScrollSuggest.addEventListener('click', () => {
    filterBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => genreSelect.focus(), 500);
});

btnScrollSearch.addEventListener('click', () => {
    filterBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => platformSelect.focus(), 500);
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

// Platform ID Eşleştirmeleri (TMDb Türkiye Verileri)
const providers = {
    'netflix': 8,
    'prime': 119,
    'disney': 337,
    'apple': 350,
    'mubi': 11,
    'blutv': 341
    // Not: Exxen ve Gain gibi yerel platformlar global TMDb API'sinde düzenli veri sağlamadığı için en stabil olanları eşleştirdik.
};

// Film Önerisi (Artık Hem Tür Hem Platform Filtreliyor)
suggestBtn.addEventListener('click', async () => {
    const genre = genreSelect.value;
    const platform = platformSelect.value;
    
    // Filtreler daraldığı için boş sayfa gelme ihtimaline karşı sayfa aralığını daraltıyoruz
    const page = Math.floor(Math.random() * 5) + 1; 
    
    let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=tr-TR&sort_by=popularity.desc&page=${page}`;
    
    // Eğer Tür seçildiyse URL'ye ekle
    if (genre) {
        url += `&with_genres=${genre}`;
    }
    
    // Eğer Platform seçildiyse URL'ye ekle (Türkiye bölgesi filtrelemesiyle birlikte)
    if (platform && providers[platform]) {
        url += `&with_watch_providers=${providers[platform]}&watch_region=TR`;
    }

    try {
        const res = await fetch(url);
        const data = await res.json();
        
        if (data.results && data.results.length > 0) {
            const movie = data.results[Math.floor(Math.random() * data.results.length)];
            movieTitle.innerText = movie.title;
            movieDesc.innerText = movie.overview || "Bu film için Türkçe açıklama bulunamadı.";
            moviePoster.src = movie.poster_path ? IMG_URL + movie.poster_path : "https://via.placeholder.com/200x300?text=Afiş+Yok";
            resultContainer.style.display = 'flex';
            resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            alert("Seçtiğin kriterlerde (Tür ve Platform kombinasyonu) film bulamadık. Lütfen farklı seçenekler dene!");
        }
    } catch (err) {
        console.error("Hata Detayı:", err);
        alert("Bağlantı hatası oluştu.");
    }
});

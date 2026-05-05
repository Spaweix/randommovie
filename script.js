// API ANAHTARLARI
const TMDB_API_KEY = '32757d8e9c622dea1b16b754cf9a56cc'; 

const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

// SAYFA ELEMENTLERİ
const sections = {
    home: document.getElementById('home-section'),
    lists: document.getElementById('lists-section'),
    ai: document.getElementById('ai-section')
};
const navLinks = {
    home: document.getElementById('nav-home'),
    lists: document.getElementById('nav-lists'),
    ai: document.getElementById('nav-ai')
};

const resultContainer = document.getElementById('result-container');
const moviePoster = document.getElementById('movie-poster');
const movieTitle = document.getElementById('movie-title');
const movieDesc = document.getElementById('movie-desc');

// --- SAYFA GEÇİŞ (NAVİGASYON) MANTIĞI ---
function switchSection(activeKey) {
    Object.values(sections).forEach(sec => sec.style.display = 'none');
    Object.values(navLinks).forEach(link => link.classList.remove('active'));
    resultContainer.style.display = 'none'; 
    
    sections[activeKey].style.display = 'flex';
    navLinks[activeKey].classList.add('active');

    if (activeKey === 'lists') loadMovieList('popular');
}

navLinks.home.addEventListener('click', () => switchSection('home'));
navLinks.lists.addEventListener('click', () => switchSection('lists'));
navLinks.ai.addEventListener('click', () => switchSection('ai'));

// --- ANA SAYFA (ARAMA VE ÖNERİ) ---
document.getElementById('nav-search').addEventListener('click', (e) => {
    e.preventDefault();
    switchSection('home');
    const searchBox = document.getElementById('search-box');
    if (searchBox.style.display === 'none' || searchBox.style.display === '') {
        searchBox.style.display = 'flex';
        document.getElementById('search-input').focus();
    } else {
        searchBox.style.display = 'none';
    }
});

async function searchMovie() {
    const query = document.getElementById('search-input').value.trim();
    if (!query) {
        alert("Lütfen aramak için bir film adı yazın.");
        return;
    }
    const url = `${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=tr-TR&query=${encodeURIComponent(query)}&page=1`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        if(data.results && data.results.length > 0) {
            showMovieData(data.results[0]);
        } else {
            alert(`"${query}" adında bir film bulunamadı.`);
        }
    } catch (err) {
        alert("Bağlantı hatası oluştu.");
    }
}

document.getElementById('search-btn').addEventListener('click', searchMovie);
document.getElementById('search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchMovie();
});

const providers = {
    'netflix': 8,
    'prime': 119,
    'disney': 337
};

document.getElementById('suggest-btn').addEventListener('click', async () => {
    const genre = document.getElementById('genre-select').value;
    const platform = document.getElementById('platform-select').value;
    const page = Math.floor(Math.random() * 5) + 1; 
    
    let url = `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=tr-TR&sort_by=popularity.desc&page=${page}`;
    
    if (genre) url += `&with_genres=${genre}`;
    if (platform && providers[platform]) url += `&with_watch_providers=${providers[platform]}&watch_region=TR`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        if(data.results && data.results.length > 0) {
            showMovieData(data.results[Math.floor(Math.random() * data.results.length)]);
        } else {
            alert("Seçtiğin kriterlerde film bulamadık. Lütfen farklı seçenekler dene.");
        }
    } catch (err) {
        alert("Bağlantı hatası oluştu.");
    }
});

// --- FİLM LİSTELERİ (GRID) ---
document.querySelectorAll('.list-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
        document.querySelectorAll('.list-tab').forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        loadMovieList(e.target.dataset.type);
    });
});

async function loadMovieList(type) {
    const grid = document.getElementById('movie-grid');
    grid.innerHTML = '<p style="text-align:center; width:100%;">Yükleniyor...</p>';
    const url = `${BASE_URL}/movie/${type}?api_key=${TMDB_API_KEY}&language=tr-TR&page=1`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        grid.innerHTML = '';
        data.results.slice(0, 15).forEach(movie => {
            const div = document.createElement('div');
            div.className = 'grid-item';
            div.innerHTML = `
                <img src="${movie.poster_path ? IMG_URL + movie.poster_path : 'https://via.placeholder.com/150x225?text=Afiş+Yok'}" alt="${movie.title}">
                <h3>${movie.title}</h3>
            `;
            div.addEventListener('click', () => {
                showMovieData(movie);
                resultContainer.scrollIntoView({ behavior: 'smooth', block: 'end' });
            });
            grid.appendChild(div);
        });
    } catch (e) { 
        grid.innerHTML = '<p style="text-align:center; width:100%;">Liste yüklenemedi.</p>'; 
    }
}

// --- YAPAY ZEKA (KENDİ SİMÜLASYONUMUZ) ---
document.getElementById('ai-btn').addEventListener('click', async () => {
    const prompt = document.getElementById('ai-prompt').value.toLowerCase().trim();
    const loadingText = document.getElementById('ai-loading');
    
    if(!prompt) {
        alert("Lütfen nasıl bir film istediğini yaz.");
        return;
    }

    loadingText.style.display = 'block';
    loadingText.innerText = "Yazdıkların analiz ediliyor...";
    resultContainer.style.display = 'none';

    // Anahtar kelime yakalama mantığı
    let selectedGenres = [];
    if (prompt.includes('uzay') || prompt.includes('gezegen') || prompt.includes('bilim kurgu')) selectedGenres.push(878); 
    if (prompt.includes('korku') || prompt.includes('kan') || prompt.includes('korkutucu')) selectedGenres.push(27);
    if (prompt.includes('komik') || prompt.includes('komedi') || prompt.includes('gülmek') || prompt.includes('eğlenceli')) selectedGenres.push(35);
    if (prompt.includes('aşk') || prompt.includes('romantik') || prompt.includes('sevgili')) selectedGenres.push(10749);
    if (prompt.includes('aksiyon') || prompt.includes('heyecan') || prompt.includes('dövüş') || prompt.includes('silah')) selectedGenres.push(28);
    if (prompt.includes('animasyon') || prompt.includes('çizgi') || prompt.includes('anime')) selectedGenres.push(16);
    if (prompt.includes('dram') || prompt.includes('üzücü') || prompt.includes('ağlamak')) selectedGenres.push(18);
    if (prompt.includes('gizem') || prompt.includes('katil') || prompt.includes('dedektif') || prompt.includes('zeka')) selectedGenres.push(9648);

    const page = Math.floor(Math.random() * 4) + 1; 
    let url = `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=tr-TR&sort_by=popularity.desc&page=${page}`;
    
    // Kelimelere göre eşleşen türler varsa URL'ye ekle
    if (selectedGenres.length > 0) {
        url += `&with_genres=${selectedGenres.join(',')}`;
    }

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.results && data.results.length > 0) {
            // Bulunanlar arasından rastgele birini göster
            const movie = data.results[Math.floor(Math.random() * data.results.length)];
            showMovieData(movie);
        } else {
            alert("Sana uygun bir film bulamadık. Kelimeleri değiştirerek tekrar dene.");
        }
    } catch (err) {
        alert("Bağlantı hatası oluştu.");
    } finally {
        loadingText.style.display = 'none';
        loadingText.innerText = "Yapay zeka düşünüyor..."; // Metni eski haline getir
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

// --- TEMA KONTROLÜ ---
const themeToggle = document.getElementById('theme-toggle');
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

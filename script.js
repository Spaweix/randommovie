// API ANAHTARLARI
const TMDB_API_KEY = '32757d8e9c622dea1b16b754cf9a56cc'; 
// DİKKAT: Yapay Zeka (AI) özelliğinin tam çalışması için Google AI Studio'dan ücretsiz bir Gemini API Anahtarı alıp buraya yazman gerekecek.
const GEMINI_API_KEY = 'BURAYA_GEMINI_ANAHTARI_GELECEK'; 

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
    // Tüm sekmeleri gizle
    Object.values(sections).forEach(sec => sec.style.display = 'none');
    Object.values(navLinks).forEach(link => link.classList.remove('active'));
    resultContainer.style.display = 'none'; // Sonuçları temizle
    
    // Seçileni göster
    sections[activeKey].style.display = 'flex';
    navLinks[activeKey].classList.add('active');

    // Eğer listeler açıldıysa, ilk veriyi çek
    if (activeKey === 'lists') loadMovieList('popular');
}

navLinks.home.addEventListener('click', () => switchSection('home'));
navLinks.lists.addEventListener('click', () => switchSection('lists'));
navLinks.ai.addEventListener('click', () => switchSection('ai'));

// --- ANA SAYFA (ARAMA VE ÖNERİ) ---
document.getElementById('nav-search').addEventListener('click', () => {
    switchSection('home');
    const searchBox = document.getElementById('search-box');
    searchBox.style.display = searchBox.style.display === 'none' ? 'flex' : 'none';
});

// Arama Motoru
document.getElementById('search-btn').addEventListener('click', async () => {
    const query = document.getElementById('search-input').value;
    const url = `${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=tr-TR&query=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const data = await res.json();
    if(data.results[0]) showMovieData(data.results[0]);
});

// Kutu Önerileri
document.getElementById('suggest-btn').addEventListener('click', async () => {
    const genre = document.getElementById('genre-select').value;
    let url = `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=tr-TR&sort_by=popularity.desc&page=${Math.floor(Math.random() * 5) + 1}`;
    if (genre) url += `&with_genres=${genre}`;
    const res = await fetch(url);
    const data = await res.json();
    if(data.results[0]) showMovieData(data.results[Math.floor(Math.random() * data.results.length)]);
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
    grid.innerHTML = '<p>Yükleniyor...</p>';
    const url = `${BASE_URL}/movie/${type}?api_key=${TMDB_API_KEY}&language=tr-TR&page=1`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        grid.innerHTML = '';
        data.results.slice(0, 15).forEach(movie => {
            const div = document.createElement('div');
            div.className = 'grid-item';
            div.innerHTML = `
                <img src="${movie.poster_path ? IMG_URL + movie.poster_path : 'https://via.placeholder.com/150x225'}" alt="${movie.title}">
                <h3>${movie.title}</h3>
            `;
            // Filme tıklayınca detayı aşağıda açsın
            div.addEventListener('click', () => showMovieData(movie));
            grid.appendChild(div);
        });
    } catch (e) { grid.innerHTML = 'Liste yüklenemedi.'; }
}

// --- YAPAY ZEKA (GEMINI API) ---
document.getElementById('ai-btn').addEventListener('click', async () => {
    const prompt = document.getElementById('ai-prompt').value;
    const loadingText = document.getElementById('ai-loading');
    
    if(!prompt) return alert("Lütfen yapay zekaya ne tür bir film istediğini yaz.");
    if(GEMINI_API_KEY === 'BURAYA_GEMINI_ANAHTARI_GELECEK') {
        return alert("AI özelliğini kullanmak için script.js dosyasına Gemini API anahtarını eklemelisin canım.");
    }

    loadingText.style.display = 'block';
    resultContainer.style.display = 'none';

    try {
        // 1. AŞAMA: Kullanıcının isteğini Gemini'ye yolla ve TEK BİR İNGİLİZCE FİLM ADI iste
        const aiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
        const aiRequest = {
            contents: [{ parts: [{ text: `Kullanıcı şu tarz bir film arıyor: "${prompt}". Bu tanıma en uygun olan, bilindik ve popüler olan 1 tane filmin SADECE orijinal adını yaz. Başka hiçbir kelime, nokta, yorum yazma.` }]}]
        };

        const aiResponse = await fetch(aiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(aiRequest) });
        const aiData = await aiResponse.json();
        
        // Yapay zekanın bulduğu film adı
        const recommendedMovieTitle = aiData.candidates[0].content.parts[0].text.trim();

        // 2. AŞAMA: Bu film adını TMDb'de arat ve afişini getir
        const tmdbUrl = `${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=tr-TR&query=${encodeURIComponent(recommendedMovieTitle)}`;
        const tmdbRes = await fetch(tmdbUrl);
        const tmdbData = await tmdbRes.json();

        if (tmdbData.results[0]) {
            showMovieData(tmdbData.results[0]);
        } else {
            alert(`Yapay zeka "${recommendedMovieTitle}" filmini önerdi ama veritabanında bulamadık.`);
        }
    } catch (err) {
        console.error(err);
        alert("Yapay zeka ile bağlantı kurulamadı.");
    } finally {
        loadingText.style.display = 'none';
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

// Tema Kontrolü
const themeToggle = document.getElementById('theme-toggle');
if (localStorage.getItem('theme') === 'light') { document.body.classList.add('light-mode'); themeToggle.innerText = 'Koyu Tema'; }
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    themeToggle.innerText = isLight ? 'Koyu Tema' : 'Açık Tema';
});

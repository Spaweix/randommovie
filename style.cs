/* Genel Ayarlar */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Montserrat', sans-serif;
    background: url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1920&q=80') no-repeat center center fixed;
    background-size: cover;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}

/* Arka plan karartma */
.overlay {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1;
}

.container {
    position: relative;
    z-index: 2;
    text-align: center;
    width: 90%;
    max-width: 600px;
}

/* Başlık Stili */
.main-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 5rem;
    letter-spacing: 5px;
    margin-bottom: 20px;
    color: #e50914; /* Netflix kırmızısı gibi bir ton */
    text-shadow: 2px 2px 10px rgba(0,0,0,0.5);
}

/* Kategori Butonları */
.genre-container {
    margin-bottom: 30px;
}

.genre-btn {
    background: transparent;
    border: 1px solid white;
    color: white;
    padding: 8px 15px;
    margin: 5px;
    cursor: pointer;
    border-radius: 20px;
    transition: 0.3s;
    font-family: 'Montserrat', sans-serif;
}

.genre-btn:hover, .genre-btn.active {
    background: white;
    color: black;
}

/* Kart Tasarımı (Buzlu Cam Efekti) */
.card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 8px 32px rgba(0,0,0,0.37);
    margin-bottom: 30px;
}

#poster {
    width: 200px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.5);
    margin-bottom: 20px;
}

/* Öner Butonu */
#suggest-btn {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.5rem;
    padding: 15px 40px;
    background-color: #e50914;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: transform 0.2s, background 0.3s;
}

#suggest-btn:hover {
    background-color: #f40612;
    transform: scale(1.05);
}

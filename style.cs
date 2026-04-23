/* Genel Ayarlar */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Montserrat', sans-serif;
    /* Arka plan için kaliteli bir sinema görseli */
    background: url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1920&q=80') no-repeat center center fixed;
    background-size: cover;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    overflow: hidden;
}

.overlay {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.75);
    z-index: 1;
}

.container {
    position: relative;
    z-index: 2;
    text-align: center;
    width: 90%;
    max-width: 500px;
}

/* İstediğin o havalı Başlık Stili */
.main-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 5rem;
    letter-spacing: 4px;
    margin-bottom: 10px;
    color: #e50914; /* Netflix Kırmızısı */
    text-shadow: 0 0 20px rgba(229, 9, 20, 0.4);
}

.genre-container {
    margin-bottom: 25px;
}

.genre-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    padding: 6px 14px;
    margin: 4px;
    cursor: pointer;
    border-radius: 20px;
    font-size: 0.8rem;
    transition: 0.3s;
}

.genre-btn.active, .genre-btn:hover {
    background: #e50914;
    border-color: #e50914;
}

/* Film Kartı - Cam Efekti */
.card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 25px;
    margin-bottom: 25px;
    box-shadow: 0 15px 35px rgba(0,0,0,0.5);
}

#poster {
    width: 180px;
    border-radius: 10px;
    margin-bottom: 15px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.4);
}

#title {
    font-size: 1.5rem;
    margin-bottom: 10px;
}

#overview {
    font-size: 0.9rem;
    font-weight: 300;
    line-height: 1.4;
    opacity: 0.8;
}

/* Ana Buton */
#suggest-btn {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.8rem;
    padding: 12px 50px;
    background-color: #e50914;
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    box-shadow: 0 5px 15px rgba(229, 9, 20, 0.4);
    transition: 0.3s ease;
}

#suggest-btn:hover {
    transform: translateY(-3px) scale(1.05);
    background-color: #ff0a16;
}

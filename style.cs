:root {
    --bg-color: #0b0e14;
    --card-bg: #161b22;
    --primary-gradient: linear-gradient(90deg, #8a2be2, #4b0082);
    --text-color: #ffffff;
    --secondary-text: #9ca3af;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
}

body {
    background-color: var(--bg-color);
    color: var(--text-color);
    min-height: 100vh;
}

/* Navbar */
.navbar {
    display: flex;
    justify-content: space-between;
    padding: 20px 50px;
    background: rgba(11, 14, 20, 0.8);
    backdrop-filter: blur(10px);
    position: fixed;
    width: 100%;
    z-index: 100;
}

.nav-links a {
    color: var(--secondary-text);
    text-decoration: none;
    margin-right: 20px;
    font-size: 0.9rem;
}

.nav-links a.active {
    color: white;
    font-weight: 600;
}

/* Hero Section */
.hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 150px;
    text-align: center;
}

.logo-text {
    font-size: 4rem;
    font-weight: 800;
    background: linear-gradient(to right, #a78bfa, #f472b6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
}

.subtitle {
    color: var(--secondary-text);
    margin-top: 20px;
    line-height: 1.6;
}

.subtitle span {
    color: #a78bfa;
    font-weight: 600;
}

/* Butonlar */
.main-actions {
    margin: 40px 0;
}

.btn-primary {
    background: var(--primary-gradient);
    border: none;
    color: white;
    padding: 12px 30px;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    margin-right: 15px;
}

.btn-secondary {
    background: #1f2937;
    border: 1px solid #374151;
    color: white;
    padding: 12px 30px;
    border-radius: 12px;
    cursor: pointer;
}

/* Filtreleme Alanı */
.filter-box {
    background: #1f2937;
    padding: 10px;
    border-radius: 12px;
    display: flex;
    gap: 10px;
    margin-bottom: 50px;
}

select, .btn-suggest {
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
    background: #374151;
    color: white;
    outline: none;
}

.btn-suggest {
    background: #6366f1;
    font-weight: 600;
    cursor: pointer;
}

/* API Notu */
.api-note {
    background: rgba(31, 41, 55, 0.5);
    padding: 15px 30px;
    border-radius: 8px;
    border-left: 4px solid #3b82f6;
    font-size: 0.8rem;
    color: var(--secondary-text);
    max-width: 600px;
}

// app.js ajustado para incluir un link de inicio de sesión y registro solo en la portada

document.addEventListener("DOMContentLoaded", () => {
    const professionsContainer = document.querySelector(".professions-list");
    const professionalsContainer = document.querySelector(".professionals");
    const searchInput = document.querySelector("#search");
    const contactSection = document.getElementById("contact-section");
    const contactName = document.getElementById("contact-name");
    const contactMessage = document.getElementById("contact-message");
    const sendMessageBtn = document.getElementById("send-message-btn");
    const favoritesContainer = document.getElementById("favorites-section");
    const loginLink = document.getElementById("login-link");
    const registerLink = document.getElementById("register-link");
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const logoutBtn = document.getElementById("logout-btn");

    let favorites = [];
    let currentUser = null;

    const data = {
        professions: [
            "Electricista", "Diseñador Gráfico", "Plomero", "Programador Web", "Carpintero", "Mecánico", "Jardinero", "Fotógrafo", "Chef", "Pintor"
        ],
        professionals: [
            { id: 1, name: "Juan Pérez", job: "Electricista", location: "Montevideo", price: 20, experience: 5, rating: 4.5, votes: 15, description: "Instalaciones eléctricas residenciales.", image: "https://via.placeholder.com/100", comments: ["Excelente servicio.", "Muy profesional."] },
            { id: 2, name: "María López", job: "Diseñador Gráfico", location: "Buenos Aires", price: 30, experience: 3, rating: 4.7, votes: 18, description: "Logotipos y branding visual.", image: "https://via.placeholder.com/100", comments: ["Trabajo creativo y rápido.", "Muy recomendable."] },
            { id: 3, name: "Carlos Gómez", job: "Plomero", location: "Córdoba", price: 25, experience: 10, rating: 4.2, votes: 10, description: "Soluciones rápidas para plomería.", image: "https://via.placeholder.com/100", comments: ["Resolvió el problema rápidamente.", "Buen precio."] }
        ]
    };

    let users = [
        { username: "cliente1", email: "cliente1@example.com", password: "1234", role: "client" },
        { username: "profesional1", email: "profesional1@example.com", password: "abcd", role: "professional" }
    ];

    // Mostrar el formulario de inicio de sesión
    loginLink.addEventListener("click", () => {
        document.getElementById("auth-section").style.display = "block";
        document.getElementById("app-content").style.display = "none";
    });

    // Mostrar el formulario de registro
    registerLink.addEventListener("click", () => {
        document.getElementById("auth-section").style.display = "block";
        document.getElementById("app-content").style.display = "none";
    });

    // Función para registrar usuarios nuevos
    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = document.getElementById("register-username").value;
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;

        if (users.some(user => user.email === email)) {
            alert("Este correo ya está registrado.");
            return;
        }

        users.push({ username, email, password, role: "client" });
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        registerForm.reset();
    });

    // Función para iniciar sesión
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        const user = users.find(user => user.email === email && user.password === password);
        if (!user) {
            alert("Correo o contraseña incorrectos.");
            return;
        }

        currentUser = user;
        alert(`Bienvenido, ${user.username}`);
        document.getElementById("auth-section").style.display = "none";
        document.getElementById("app-content").style.display = "block";
        logoutBtn.style.display = "inline-block";
    });

    // Función para cerrar sesión
    logoutBtn.addEventListener("click", () => {
        currentUser = null;
        alert("Has cerrado sesión.");
        document.getElementById("auth-section").style.display = "none";
        document.getElementById("app-content").style.display = "none";
        logoutBtn.style.display = "none";
    });

    // Renderizar profesiones
    function renderProfessions(professions) {
        professionsContainer.innerHTML = "";
        professions.forEach(profession => {
            const professionCard = document.createElement("div");
            professionCard.classList.add("profession-card");
            professionCard.textContent = profession;
            professionCard.addEventListener("click", () => showProfessionals(profession));
            professionsContainer.appendChild(professionCard);
        });
    }

    // Mostrar profesionales según profesión
    function showProfessionals(profession) {
        professionalsContainer.innerHTML = "";
        const filteredProfessionals = data.professionals.filter(pro => pro.job === profession);
        filteredProfessionals.forEach(professional => {
            const profileCard = document.createElement("div");
            profileCard.classList.add("profile-card");
            profileCard.innerHTML = `
                <img src="${professional.image}" alt="${professional.name}">
                <h3>${professional.name}</h3>
                <p>${professional.job} - ${professional.location}</p>
                <p>${professional.description}</p>
                <p>⭐ ${professional.rating} (${professional.votes} votos)</p>
                <p>Precio: $${professional.price}/hora</p>
                <button class="contact-btn" data-name="${professional.name}">Contactar</button>
                <button class="favorite-btn" data-id="${professional.id}">Agregar a Favoritos</button>
            `;
            professionalsContainer.appendChild(profileCard);
        });
        attachEventListeners();
    }

    // Agregar eventos dinámicos a botones
    function attachEventListeners() {
        const contactButtons = document.querySelectorAll(".contact-btn");
        const favoriteButtons = document.querySelectorAll(".favorite-btn");

        contactButtons.forEach(button => {
            button.addEventListener("click", () => {
                const name = button.getAttribute("data-name");
                openContactSection(name);
            });
        });

        favoriteButtons.forEach(button => {
            button.addEventListener("click", () => {
                const id = button.getAttribute("data-id");
                addToFavorites(id);
            });
        });
    }

    // Abrir la sección de contacto
    function openContactSection(name) {
        contactSection.scrollIntoView({ behavior: "smooth" });
        contactSection.style.display = "block";
        contactName.textContent = `Contactando a: ${name}`;
        contactMessage.value = "";
    }

    // Enviar mensaje
    sendMessageBtn.addEventListener("click", () => {
        const message = contactMessage.value.trim();
        if (!message) {
            alert("El mensaje no puede estar vacío.");
            return;
        }
        alert(`Mensaje enviado: ${message}`);
        contactSection.style.display = "none";
    });

    // Agregar a favoritos
    function addToFavorites(id) {
        const professional = data.professionals.find(pro => pro.id == id);
        if (!professional || favorites.some(fav => fav.id == id)) {
            alert("Este profesional ya está en favoritos o no existe.");
            return;
        }
        favorites.push(professional);
        renderFavorites();
    }

    // Renderizar favoritos
    function renderFavorites() {
        favoritesContainer.innerHTML = "<h2>Favoritos</h2>";
        if (favorites.length === 0) {
            favoritesContainer.innerHTML += "<p>No tienes favoritos aún.</p>";
            return;
        }
        favorites.forEach(fav => {
            const favCard = document.createElement("div");
            favCard.classList.add("favorite-card");
            favCard.innerHTML = `
                <p>${fav.name} (${fav.job})</p>
                <button class="remove-favorite-btn" data-id="${fav.id}">Eliminar</button>
            `;
            favoritesContainer.appendChild(favCard);
        });
        attachRemoveFavoriteListeners();
    }

    // Inicializar
    renderProfessions(data.professions);
});

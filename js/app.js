// app.js actualizado para solucionar problemas

document.addEventListener("DOMContentLoaded", () => {
    const professionsContainer = document.querySelector(".professions-list");
    const professionalsContainer = document.querySelector(".professionals");
    const searchInput = document.querySelector("#search");
    const contactSection = document.getElementById("contact-section");
    const contactName = document.getElementById("contact-name");
    const contactMessage = document.getElementById("contact-message");
    const sendMessageBtn = document.getElementById("send-message-btn");

    // Lista de profesiones y profesionales
    const data = {
        professions: [
            "Electricista", "Diseñador Gráfico", "Plomero", "Programador Web", "Carpintero", "Mecánico", "Jardinero", "Fotógrafo", "Chef", "Pintor", "Contador", "Abogado", "Doctor", "Psicólogo", "Profesor", "Ingeniero Civil", "Diseñador de Interiores", "Enfermero", "Traductor", "Marketing Digital"
        ],
        professionals: [
            { id: 1, name: "Juan Pérez", job: "Electricista", description: "Instalaciones eléctricas residenciales.", image: "https://via.placeholder.com/100" },
            { id: 2, name: "María López", job: "Diseñador Gráfico", description: "Logotipos y branding visual.", image: "https://via.placeholder.com/100" },
            { id: 3, name: "Carlos Gómez", job: "Plomero", description: "Soluciones rápidas para plomería.", image: "https://via.placeholder.com/100" }
        ]
    };

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
                <p>${professional.job}</p>
                <p>${professional.description}</p>
                <button class="contact-btn" data-name="${professional.name}">Contactar</button>
            `;
            professionalsContainer.appendChild(profileCard);
        });
        attachContactEventListeners();
    }

    // Agregar eventos a los botones "Contactar"
    function attachContactEventListeners() {
        const contactButtons = document.querySelectorAll(".contact-btn");
        contactButtons.forEach(button => {
            button.addEventListener("click", () => {
                const name = button.getAttribute("data-name");
                openContactSection(name);
            });
        });
    }

    // Abrir la sección de contacto
    function openContactSection(name) {
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

    // Inicializar lista de profesiones
    renderProfessions(data.professions);

    // Escuchar cambios en el buscador
    searchInput.addEventListener("input", filterProfessions);

    // Filtrar profesiones por búsqueda
    function filterProfessions() {
        const query = searchInput.value.toLowerCase();
        const filteredProfessions = data.professions.filter(profession => 
            profession.toLowerCase().includes(query)
        );
        renderProfessions(filteredProfessions);
    }
});


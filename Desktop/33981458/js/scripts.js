
document.addEventListener('DOMContentLoaded', function() {
    console.log('GameHub Solidario - Todo listo capo');
    iniciarAcceso();
    iniciarPanelAdministrador();
    iniciarFormularioColaboracion();
    iniciarGestionTorneos();
    iniciarDesplazamientoSuave();
    iniciarAnimaciones();
    iniciarValidacionFormularios();
    iniciarGaleria();
    console.log('¡Bienvenido/a a GameHub Solidario! 🎮💪');
});


function iniciarAcceso() {
    const loginForm = document.getElementById('formulario-acceso');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('nombre-usuario').value;
            const password = document.getElementById('contraseña').value;
            const errorDiv = document.getElementById('error-acceso');
            if (username === 'mari' && password === '123') {
                window.location.href = './admin.html?user=' + encodeURIComponent(username);
            } else {
                errorDiv.style.display = 'block';
                errorDiv.textContent = 'Usuario incorrecto';
                setTimeout(() => {
                    errorDiv.style.display = 'none';
                }, 3000);
                document.getElementById('nombre-usuario').value = '';
                document.getElementById('contraseña').value = '';
            }
        });
    }
}


function iniciarPanelAdministrador() {
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get('user');
    
    if (!user && window.location.pathname.endsWith('admin.html')) {
        window.location.href = './index.html#login';
        return;
    }

    if (user) {
        const welcomeMessage = document.getElementById('welcomeMessage');
        if (welcomeMessage) {
            welcomeMessage.textContent = `Bienvenido/a ${user}`;
        }
    }

    const tournamentForm = document.getElementById('tournamentForm');
    if (tournamentForm) {
        tournamentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            window.saveTournament();
        });
    }
}

window.cerrarSesion = function() {
    window.location.href = './index.html#login';
};

function iniciarGestionTorneos() {
    window.verReglamento = function(tournamentId) {
        const reglamentos = {
            'valorant': {
                titulo: 'Reglamento - Valorant Charity Cup',
                contenido: `
                    <h6>Formato del Torneo</h6>
                    <ul>
                        <li>Sistema de eliminación directa (Bo3)</li>
                        <li>Final en formato Bo5</li>
                        <li>32 equipos participantes</li>
                        <li>Mapas: Haven, Split, Bind, Icebox, Breeze</li>
                    </ul>
                    
                    <h6>Reglas de Juego</h6>
                    <ul>
                        <li>Prohibido usar bugs o glitches</li>
                        <li>Tiempo máximo de preparación: 90 segundos</li>
                        <li>Timeouts: 1 por equipo por mapa (5 minutos)</li>
                        <li>Desconexiones: máximos 5 minutos por mapa</li>
                    </ul>
                    
                    <h6>Inscripciones</h6>
                    <ul>
                        <li>Equipos de 5 jugadores + 2 suplentes</li>
                        <li>Costo de inscripción: $1,000 por equipo</li>
                        <li>100% del dinero va al Hospital de Niños</li>
                        <li>Requisito: nivel 20+ en Valorant</li>
                    </ul>
                    
                    <h6>Premios</h6>
                    <ul>
                        <li>1er puesto: $10,000 + Gaming Gear Pro</li>
                        <li>2do puesto: $5,000 + Merchandising</li>
                        <li>3er puesto: $2,500 + Juegos digitales</li>
                    </ul>
                `
            },
            'fifa': {
                titulo: 'Reglamento - FIFA Solidario 2025',
                contenido: `
                    <h6>Formato del Torneo</h6>
                    <ul>
                        <li>Fase de grupos: 4 grupos de 4 jugadores</li>
                        <li>Eliminatorias: Partidos únicos</li>
                        <li>Final: Ida y vuelta</li>
                        <li>128 jugadores máximos</li>
                    </ul>
                    
                    <h6>Reglas de Juego</h6>
                    <ul>
                        <li>Duración: 6 minutos por tiempo</li>
                        <li>Dificultad: Legendaria</li>
                        <li>Clima: Despejado</li>
                        <li>No se puede pausar mucho tiempo</li>
                    </ul>
                    
                    <h6>Inscripciones</h6>
                    <ul>
                        <li>Costo: $500 por jugador</li>
                        <li>Plataformas: PS5, Xbox Series X/S, PC</li>
                        <li>Todo el dinero va a comedores comunitarios</li>
                    </ul>
                    
                    <h6>Premios</h6>
                    <ul>
                        <li>Campeón: $8,000 + Consola Next Gen</li>
                        <li>Subcampeón: $4,000 + Gaming Bundle</li>
                        <li>Tercero: $2,000 + Juegos FIFA</li>
                    </ul>
                `
            },
            'lol': {
                titulo: 'Reglamento - LoL Community Shield',
                contenido: `
                    <h6>Formato del Torneo</h6>
                    <ul>
                        <li>16 equipos participantes</li>
                        <li>Fase de grupos: Best of 1</li>
                        <li>Playoffs: Best of 3</li>
                        <li>Gran Final: Best of 5</li>
                    </ul>
                    
                    <h6>Reglas de Juego</h6>
                    <ul>
                        <li>Pick/Ban estándar competitivo</li>
                        <li>5 bans por equipo</li>
                        <li>Prohibido compartir cuentas</li>
                        <li>Hay que tener buen comportamiento deportivo</li>
                    </ul>
                    
                    <h6>Inscripciones</h6>
                    <ul>
                        <li>Equipos de 5 jugadores</li>
                        <li>Costo: $2,000 por equipo</li>
                        <li>Nivel mínimo: Oro II</li>
                        <li>El beneficio es para educación rural</li>
                    </ul>
                    
                    <h6>Premios</h6>
                    <ul>
                        <li>Campeón: $15,000 + Periféricos Razer</li>
                        <li>Subcampeón: $8,000 + Gaming Chair</li>
                        <li>Semifinalistas: $3,000 cada uno</li>
                    </ul>
                `
            }
        };
        
        const reglamento = reglamentos[tournamentId];
        if (reglamento) {
            const modalTitle = document.querySelector('#reglamentoModal .modal-title');
            const modalContent = document.querySelector('#reglamentoModal #reglamentoContent');
            
            if (modalTitle && modalContent) {
                modalTitle.textContent = reglamento.titulo;
                modalContent.innerHTML = reglamento.contenido;
                const modal = new bootstrap.Modal(document.getElementById('reglamentoModal'));
                modal.show();
            }
        }
    };
}

let currentTournamentId = null;

window.editTournament = function(tournamentId) {
    const row = document.querySelector(`tr[data-tournament-id="${tournamentId}"]`);
    const form = document.getElementById('tournamentForm');
    const modalElement = document.getElementById('tournamentModal');
    if (!row || !form || !modalElement) {
        return;
    }

    const cells = row.querySelectorAll('td');
    document.getElementById('tournamentTitle').value = cells[1].textContent.trim();
    document.getElementById('tournamentGame').value = cells[2].textContent.trim().toLowerCase().includes('valorant') ? 'valorant' :
        (cells[2].textContent.trim().toLowerCase().includes('fifa') ? 'fifa' :
        (cells[2].textContent.trim().toLowerCase().includes('league of legends') ? 'lol' : ''));
    document.getElementById('tournamentPlatform').value = cells[3].textContent.trim().toLowerCase().includes('pc') && !cells[3].textContent.trim().toLowerCase().includes('multi') ? 'pc' :
        (cells[3].textContent.trim().toLowerCase().includes('playstation') ? 'ps5' :
        (cells[3].textContent.trim().toLowerCase().includes('xbox') ? 'xbox' :
        (cells[3].textContent.trim().toLowerCase().includes('nintendo') ? 'nintendo' :
        (cells[3].textContent.trim().toLowerCase().includes('multi') ? 'multi' : ''))));
    document.getElementById('tournamentDate').value = cells[4].textContent.trim();
    document.getElementById('tournamentSlots').value = parseInt(cells[5].textContent.trim()) || '';
    document.getElementById('tournamentObjective').value = '';
    document.getElementById('tournamentRules').value = '';
    document.getElementById('tournamentPrizes').value = '';
    document.getElementById('tournamentStream').value = '';
    document.getElementById('tournamentReglamento').value = '';

    const titleElement = document.getElementById('tournamentModalTitle');
    if (titleElement) {
        titleElement.textContent = 'Editar Torneo';
    }

    currentTournamentId = tournamentId;
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
};

window.deleteTournament = function(tournamentId) {
    if (confirm('¿Estás seguro de que querés borrar este torneo? Esta acción no se puede deshacer.')) {
        const row = document.querySelector(`tr[data-tournament-id="${tournamentId}"]`);
        if (row) {
            row.remove();
            const totalTorneos = document.getElementById('totalTournaments');
            if (totalTorneos) {
                const actual = parseInt(totalTorneos.textContent) || 0;
                totalTorneos.textContent = actual > 0 ? actual - 1 : 0;
            }
            mostrarNotificacion('Torneo borrado correctamente', 'success');
        }
    }
};

window.saveTournament = function() {
    const form = document.getElementById('tournamentForm');
    const modalElement = document.getElementById('tournamentModal');
    const tableBody = document.querySelector('#tournamentsTable tbody');
    if (!form || !modalElement || !tableBody) {
        return;
    }

    const title = document.getElementById('tournamentTitle').value;
    const game = document.getElementById('tournamentGame').value;
    const platform = document.getElementById('tournamentPlatform').value;
    const date = document.getElementById('tournamentDate').value;
    const slots = document.getElementById('tournamentSlots').value;

    if (!title || !game || !platform || !date || !slots) {
        form.reportValidity();
        return;
    }

    if (currentTournamentId) {
        const row = document.querySelector(`tr[data-tournament-id="${currentTournamentId}"]`);
        if (row) {
            const cells = row.querySelectorAll('td');
            cells[1].textContent = title;
            cells[2].textContent = game === 'valorant' ? 'Valorant' : (game === 'fifa' ? 'FIFA 25' : (game === 'lol' ? 'League of Legends' : game));
            cells[3].textContent = platform === 'pc' ? 'PC' : (platform === 'ps5' ? 'PS5' : (platform === 'xbox' ? 'Xbox' : (platform === 'nintendo' ? 'Nintendo Switch' : 'Multi')));
            cells[4].textContent = date;
            cells[5].textContent = slots;
        }
        mostrarNotificacion('Torneo actualizado correctamente', 'success');
    } else {
        const newId = Date.now();
        const row = document.createElement('tr');
        row.setAttribute('data-tournament-id', newId);
        row.innerHTML = `
            <td>#${newId}</td>
            <td>${title}</td>
            <td>${game === 'valorant' ? 'Valorant' : (game === 'fifa' ? 'FIFA 25' : (game === 'lol' ? 'League of Legends' : game))}</td>
            <td>${platform === 'pc' ? 'PC' : (platform === 'ps5' ? 'PS5' : (platform === 'xbox' ? 'Xbox' : (platform === 'nintendo' ? 'Nintendo Switch' : 'Multi')))}</td>
            <td>${date}</td>
            <td>${slots}</td>
            <td><span class="badge bg-info">Próximo</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="editTournament(${newId})">
                    <i class="fas fa-edit"></i> Modificación
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteTournament(${newId})">
                    <i class="fas fa-trash"></i> Baja
                </button>
            </td>
        `;
        tableBody.appendChild(row);

        const totalTorneos = document.getElementById('totalTournaments');
        if (totalTorneos) {
            const actual = parseInt(totalTorneos.textContent) || 0;
            totalTorneos.textContent = actual + 1;
        }
        mostrarNotificacion('Torneo agregado correctamente', 'success');
    }

    const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    modal.hide();
    form.reset();
    currentTournamentId = null;
};

function iniciarFormularioColaboracion() {
    const collaborationRadios = document.querySelectorAll('input[name="tipoColaboracion"]');
    const moneyFields = document.getElementById('campos-dinero');
    const workFields = document.getElementById('campos-trabajo');
    const diffusionFields = document.getElementById('campos-difusion');
    
    collaborationRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            moneyFields.style.display = 'none';
            workFields.style.display = 'none';
            diffusionFields.style.display = 'none';
            
            if (this.value === 'dinero') {
                moneyFields.style.display = 'block';
            } else if (this.value === 'trabajo') {
                workFields.style.display = 'block';
            } else if (this.value === 'difusion') {
                diffusionFields.style.display = 'block';
            }
        });
    });
    
    const collaborationForm = document.getElementById('formulario-colaboracion');
    if (collaborationForm) {
        collaborationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!this.checkValidity()) {
                this.reportValidity();
                return;
            }
            
            const modal = new bootstrap.Modal(document.getElementById('exitoModal'));
            modal.show();
            
            setTimeout(() => {
                this.reset();
                moneyFields.style.display = 'none';
                workFields.style.display = 'none';
                diffusionFields.style.display = 'none';
            }, 2000);
        });
    }
}

function iniciarModalTorneo() {}

function iniciarModalPatrocinador() {}

function iniciarDesplazamientoSuave() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function iniciarAnimaciones() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    document.querySelectorAll('.tarjeta-torneo, .tarjeta-testimonio, .item-galeria, .item-estadistica').forEach(el => {
        observer.observe(el);
    });
}

function iniciarValidacionFormularios() {
    const forms = document.querySelectorAll('.needs-validation');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
}

function iniciarGaleria() {
    const galleryItems = document.querySelectorAll('.item-galeria img');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${this.src}" alt="${this.alt}">
                    <button class="lightbox-close">&times;</button>
                </div>
            `;
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
            `;
            const content = lightbox.querySelector('.lightbox-content');
            content.style.cssText = `
                position: relative;
                max-width: 90%;
                max-height: 90%;
            `;
            const img = lightbox.querySelector('img');
            img.style.cssText = `
                width: 100%;
                height: auto;
                border-radius: 8px;
            `;
            const closeBtn = lightbox.querySelector('.lightbox-close');
            closeBtn.style.cssText = `
                position: absolute;
                top: -40px;
                right: 0;
                color: white;
                font-size: 40px;
                background: none;
                border: none;
                cursor: pointer;
            `;
            document.body.appendChild(lightbox);
            
            lightbox.addEventListener('click', function() {
                document.body.removeChild(lightbox);
            });
            
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                document.body.removeChild(lightbox);
            });
        });
    });
}

function agregarFilaTorneo() {}

function actualizarFilaTorneo() {}

function agregarFilaPatrocinador() {}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .lightbox {
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);

function mostrarNotificacion(mensaje, tipo = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${tipo} alert-dismissible fade show notification`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    notification.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

window.editarPatrocinador = function(patrocinadorId) {
    console.log('Editar patrocinador:', patrocinadorId);
};

window.eliminarPatrocinador = function(patrocinadorId) {
    if (confirm('¿Estás seguro de que querés borrar este patrocinador?')) {
        const fila = document.querySelector(`tr[data-patrocinador-id="${patrocinadorId}"]`);
        if (fila) {
            fila.remove();
            
            const totalPatrocinadores = document.getElementById('totalPatrocinadores');
            if (totalPatrocinadores) {
                const actual = parseInt(totalPatrocinadores.textContent);
                totalPatrocinadores.textContent = actual - 1;
            }
            
            mostrarNotificacion('Patrocinador borrado correctamente', 'success');
        }
    }
};

window.saveSponsor = function() {
    const sponsorForm = document.getElementById('sponsorForm');
    const sponsorModal = document.getElementById('sponsorModal');
    if (!sponsorForm || !sponsorModal) {
        return;
    }

    if (!sponsorForm.checkValidity()) {
        sponsorForm.reportValidity();
        return;
    }

    mostrarNotificacion('Sponsor guardado correctamente', 'success');
    const modal = bootstrap.Modal.getInstance(sponsorModal) || new bootstrap.Modal(sponsorModal);
    modal.hide();
    sponsorForm.reset();
};

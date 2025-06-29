// 📌 Fonction pour transformer une date au format ISO avec décalage horaire en un format spécifique
function transformDateToCustomFormat(isoDate) {
	const date = moment.parseZone(isoDate);
	return date.format('YYYY-MM-DDTHH:mm:ss');
}

// 📌 Ensemble pour suivre les IDs des créneaux injectés
window.injectedSlotIds = window.injectedSlotIds || new Set();

// 📌 Fonction pour ajouter un créneau visuellement dans FullCalendar v3
window.addTestSlotFC3 = function (beginAt, endAt, title = 'Tes creneaux', id = 'test-slot') {
	// Transformation des dates au format ISO
	const start_date_transformée = transformDateToCustomFormat(beginAt);
	const end_date_transformée = transformDateToCustomFormat(endAt);

	// Génération d'un ID unique pour le créneau incluant la date de début
	const slotId = `${id}-${start_date_transformée}`;

	// Vérification si le créneau a déjà été injecté
	if (window.injectedSlotIds.has(slotId)) {
		return;
	}

	// Définition des propriétés du créneau
	const slot = {
		id: slotId,
		title, // Texte "Tes creneaux"
		start: start_date_transformée,
		end: end_date_transformée,
		className: 'custom-slot-class',
		allDay: false,
		editable: false, // Rendre le créneau non modifiable
		eventClick: null, // Désactiver l'action de clic
		url: 'javascript:void(0)' // 👈 pour éviter redirection
	};

	// Ajout du créneau au calendrier
	if (window.$ && $('#calendar').fullCalendar) {
		$('#calendar').fullCalendar('renderEvent', slot, true);
		window.injectedSlotIds.add(slotId); // Marquer le créneau comme injecté
	} else {
		console.error('❌ FullCalendar v3 non détecté.');
	}
};

// 📌 Fonction pour afficher un toast non bloquant
function showToast(message) {
	const toast = document.createElement('div');
	toast.innerText = message;
	Object.assign(toast.style, {
		position: 'fixed', bottom: '80px', right: '20px', zIndex: 10000,
		background: '#333', color: '#fff', padding: '10px 20px', borderRadius: '6px',
		opacity: 0, transition: 'opacity 0.5s'
	});
	document.body.appendChild(toast);
	requestAnimationFrame(() => toast.style.opacity = 1);
	setTimeout(() => {
		toast.style.opacity = 0;
		setTimeout(() => toast.remove(), 500);
	}, 3000);
}

// 📌 Style global injecté pour tous les créneaux personnalisés
(function injectGlobalStyles() {
	const style = document.createElement('style');
	style.textContent = `
        .custom-slot-class {
            background-color: rgba(128, 0, 128, 0.8) !important; /* Violet lisible */
            border-color: rgba(128, 0, 128, 1) !important; /* Bordure violette */
            color: #fff !important; /* Texte blanc */
            border-width: 2px !important;
            border-style: solid !important;
        }
    `;
	document.head.appendChild(style);
})();

// 📦 Fonction pour récupérer les créneaux de profil via une API
async function fetchProfile(start, end) {
	const url = `https://profile.intra.42.fr/slots.json?start=${start}&end=${end}`;
	const response = await fetch(url, { credentials: 'include' });
	return response.ok ? response.json() : [];
}

// 🚀 Fonction pour charger et afficher les créneaux dans le calendrier
async function loadCalendarData() {
	const today = new Date();
	const start = today.toISOString().split('T')[0];
	const end = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

	const profileSlots = await fetchProfile(start, end);

	if (!window.$ || !$('#calendar').fullCalendar) {
		console.error('❌ FullCalendar v3 non détecté.');
		return;
	}

	// Supprimer tous les anciens créneaux injectés
	window.injectedSlotIds.forEach(id => {
		$('#calendar').fullCalendar('removeEvents', id);
	});
	window.injectedSlotIds.clear();

	// Réinjecter les nouveaux créneaux
	profileSlots.forEach(slot => {
		if (slot.start && slot.end) {
			if (slot.title != "Available")
				addTestSlotFC3(slot.start, slot.end, 'Tes créneaux (pris)', slot.id || `slot-${Date.now()}-${Math.random()}`);
			else
				addTestSlotFC3(slot.start, slot.end, 'Tes créneaux', slot.id || `slot-${Date.now()}-${Math.random()}`);
		}
	});

}

// 🚀 Chargement automatique des créneaux au rafraîchissement de la page
(async function autoLoadCalendarData() {
	console.log('%c[Inject.js]', 'color: blue', 'Chargement automatique des créneaux au rafraîchissement de la page');
	await loadCalendarData();
})();

// 🚫 Désactiver le clic sur les événements custom
$(document).on('click', '.fc-event.custom-slot-class', function (e) {
	e.stopImmediatePropagation();
	e.preventDefault();
});

// 📌 Injection du bouton pour charger les créneaux
function injectButton() {

	const button = document.createElement('button');
	button.innerText = 'Charger mes créneaux';
	Object.assign(button.style, {
		position: 'fixed',
		bottom: '20px',
		right: '20px',
		zIndex: 9999,
		padding: '12px 24px',
		fontSize: '16px',
		border: 'none',
		borderRadius: '8px',
		backgroundColor: '#2563eb',
		color: '#fff',
		cursor: 'pointer',
		boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
	});

	button.addEventListener('click', () => {
		showToast('Chargement des créneaux en cours...');
		loadCalendarData();
	});

	document.body.appendChild(button);
}

// 📌 Attendre que le calendrier soit prêt avant d'injecter le bouton
function waitForCalendarAndInjectButton() {
	const interval = setInterval(() => {
		if (window.$ && $('#calendar').length) {
			clearInterval(interval);
			injectButton();
		}
	}, 500);
}
waitForCalendarAndInjectButton();
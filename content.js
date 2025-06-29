// Crée un nouvel élément <script>
const script = document.createElement('script');

// Définit la source du script à injecter, en utilisant l'URL du fichier inject.js de l'extension
script.src = chrome.runtime.getURL('inject.js');

// Lorsque le script est chargé, le retire du DOM pour garder la page propre
script.onload = () => script.remove();

// Ajoute le script dans la page (dans <head> ou <html> si <head> n'existe pas)
(document.head || document.documentElement).appendChild(script);

# ✅ 42 Slot Conflict Avoider

👨‍🏫 Ne rate plus jamais une correction à cause d’un créneau où tu es toi-même correcteur.

Ce script injecte **tes créneaux de correcteur** dans le **calendrier du projet que tu veux te faire corriger** sur l’intra 42.
Il te permet de **visualiser les conflits potentiels** et **éviter de réserver un slot** à un moment où tu es déjà pris pour corriger quelqu’un.

---

## 🎯 Objectif

Sur l’intra, il existe **deux calendriers indépendants** :
- 🟩 Le **calendrier de projet** (où tu réserves un slot pour être corrigé)
- 🟪 Le **calendrier de correction** (où tu ouvres des créneaux pour corriger)

Le problème ?
🔁 Ces calendriers **ne se croisent jamais** ! Tu peux donc **réserver une correction pendant un autre slot** ou tu dois corriger quelqu'un.

✅ Ce script te permet de **fusionner visuellement les deux** en **affichant tes slots de correction dans le calendrier des projets**.

---

## 📦 Fonctionnalités

- 🔁 Charge automatiquement tes créneaux de correcteur depuis `profile.intra.42.fr/slots`
- 🟪 Les rend visibles dans le calendrier des projets via FullCalendar v3
- 🚫 Empêche tout clic accidentel sur ces slots injectés
- 🔘 Ajoute un bouton flottant "Charger mes créneaux" pour forcer l’affichage
- 🌈 Affichage violet lisible avec texte blanc pour les différencier

---

## 🖥️ Installation via une extension Chrome

1. Clone le dépôt ou télécharge le code source dans un dossier

```bash
git clone https://github.com/rom98759/42-Slot-Conflict-Avoider.git
```
2. Ouvre Chrome et va dans `chrome://extensions`
3. Active le **mode développeur** en haut à droite
4. Clique sur **"Charger l’extension non empaquetée"**
5. Sélectionne le dossier cloné
6. L’extension est maintenant installée et active !
7. Va sur l’intra dans un projet pour te faire corriger et magique !

---

## 🧪 Utilisation

1. Va sur la page de l’intra du projet où tu veux te faire corriger
2. Clique sur le bouton de l’extension en bas à droite (ou attends le chargement automatique)
3. Tes créneaux de correcteur apparaîtront dans le calendrier en violet
4. Tu peux désormais éviter tout conflit lors de ta réservation !

---

## 📷 Aperçu

*(ajoute une capture si tu veux)*

---

## 🛠️ Améliorations futures possibles

* [ ] Détection automatique des conflits avec alertes visuelles

---

## 👤 Auteur

* **Romain** – [Github lien](https://github.com/rom98759)
* **Contributeurs** – N’hésite pas à proposer des améliorations ou corrections !

---

## 📝 Licence

MIT

<div align="center">

# 💀 BugMortem
### *Cyfrowe Prosektorium Awarii i Generator Raportów Post-Mortem*
**Zgłoszenie do oficjalnego hackathonu Devpost: KIROWEEN {2026}**  
*Kategoria konkursowa: Costume Contest (Spooky & Distinctive Developer Tools)*

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![pnpm](https://img.shields.io/badge/pnpm-fast-orange?style=for-the-badge&logo=pnpm)](https://pnpm.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-rose?style=for-the-badge)](LICENSE)

</div>

---

## 🎃 O Projekcie (The Nightmare Incident Morgue)

Każdy programista i inżynier SRE przeżył ten koszmar: produkcja leży trupem, a logi krzyczą niezrozumiałym stosem błędów. 

**BugMortem** to cyfrowe prosektorium incydentów oprogramowania. Zamiast paniki w konsoli, aplikacja przeprowadza zautomatyzowaną sekcję zwłok awarii:
1. **Analiza przyczyny zgonu (Root Cause Analysis - RCA)** – precyzyjna diagnoza patologii kodu.
2. **Rekonstrukcja osi czasu (Timeline of Doom)** – chronologiczne odtworzenie ostatnich sekund przed katastrofą.
3. **Sekcja zwłok kodu (Code Autopsy Diff)** – zestawienie przeklętego kodu ze wskrzeszonym, bezpiecznym odpowiednikiem SRE.
4. **Generator protokołu sekcyjnego (SRE Post-Mortem)** – gotowy raport z podsumowaniem biznesowym i środkami zapobiegawczymi.

---

## 🔮 Zgodność z Kiro Specs (`/.kiro`)

Projekt został od podstaw zaprojektowany z myślą o integracji z **Kiro Agent**:
- `/.kiro/specs/bugmortem/requirements.md` – formalna specyfikacja wymagań funkcjonalnych i technicznych.
- `/.kiro/specs/bugmortem/tasks.md` – plan zadań wdrożeniowych dla agenta Kiro.
- `/.kiro/steering/rules.md` – wytyczne architektoniczne i standardy czystego kodu.

---

## 🛠️ Architektura i Żelazne Zasady

- **Skalowalna architektura i18n (PL / EN)**: Brak flag binarnych; pełne słowniki w `src/i18n/locales/`.
- **100% kluczy w interfejsie**: Zero sztywno zaszytych tekstów w kodzie komponentów.
- **Zero inline-styles**: Czysty Tailwind CSS v4 z adaptacją pod motyw ciemny (`dark:`) i jasny.
- **Prywatność i RODO**: Zgodny z prawem banner cookies z podziałem zgód oraz modale prawne.
- **Mobile-First**: Pełna responsywność na smartfonach i desktopie.

---

## 🚀 Szybki Start

```bash
pnpm install
pnpm dev
```

---

## 👨‍💻 Autor & Licencja
- **Autor**: Adam Gierczak ([@AdamBabinicz](https://github.com/AdamBabinicz))
- **Hackathon**: Kiroween {2026} by Kiro & Devpost
- **Licencja**: [MIT](LICENSE)

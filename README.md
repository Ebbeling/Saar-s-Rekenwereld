# Saar's Rekenwereld

Een Nederlandse rekenapp voor kinderen van groep 3 tot en met groep 8. Installeerbaar op
een tablet of telefoon, werkt volledig offline, en groeit mee met het niveau.

## Wat je kunt oefenen

**Rekenen** — plus, min, keer, deel, tafels, deeltafels, deel met rest, verhaaltjessommen,
alles door elkaar

**Slim met getallen** — ontbrekend getal, dubbel en half, splitsen, groter of kleiner,
afronden, kommagetallen, onder nul, gemiddelde

**Meten, geld en tijd** — klokkijken, tijdsduur, geld, meten en omrekenen, kalender,
oppervlakte en omtrek

**Deel van een geheel** — breuken, procenten, verhoudingen

Zesentwintig onderwerpen in totaal. Je stelt één keer de groep in (3 t/m 8) en de app
bepaalt daarmee de moeilijkheid van alles én welke onderwerpen een kind te zien krijgt.

## Sparen en uitdagingen

Elk goed antwoord is een punt, punten worden stickers, en een vol stickervel geeft een
beloning. Door de vellen kun je terugbladeren; een ouder vinkt achter een code af dat de
beloning gegeven is, met een notitie erbij.

Een **challenge** is een langere reeks die net iets pittiger is dan gewoon oefenen.
Tijdens een challenge lever je geen punten in: haal je hem, dan krijg je 2 stickers, en
bij een foutloze challenge een gouden **supersticker** met confetti erbij.

Het **rapport** laat per onderdeel zien wat al goed gaat en wat meer aandacht nodig heeft,
met de tafels apart en een lijstje vragen die het vaakst misgaan.

## Zelf hosten

Zet alle bestanden in één map op een webserver met **https** (installeren en offline
werken vragen dat). Zie **[LEESMIJ.md](LEESMIJ.md)** voor de stap-voor-stap uitleg,
inclusief hoe je de app op het beginscherm van een tablet zet en hoe je een nieuwe versie
uitrolt.

```
index.html              de app zelf
vragen.js               alle vraaginhoud, los aan te passen
sw.js                   maakt de app offline bruikbaar
manifest.webmanifest    naam en icoon op het beginscherm
fonts/ icons/           lettertypes en app-iconen
```

De app haalt niets van buitenaf: geen lettertypes van een CDN, geen scripts van derden.

## De vragen aanpassen

Alle inhoud staat in `vragen.js`, gescheiden van de app: de onderwerpen met hun niveau per
groep, de verhaaltjeszinnen, namen, eenheden, maanden en breukwoorden. Op de eerste regel
na is het gewoon JSON, dus een zin toevoegen is één regel erbij. `LEESMIJ.md` legt uit
waar je op moet letten.

## Instellingen

De instellingen zitten achter een code, zodat een kind ze niet zelf verzet. Die code staat
in `index.html` (`var CODE = ...`) en is dus zichtbaar voor wie de broncode bekijkt — het
is een drempel voor een kind, geen beveiliging.

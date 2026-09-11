# Saar's Rekenwereld — zelf hosten

Een installeerbare web-app (PWA). Op een tablet komt hij op het beginscherm te staan
en opent hij zonder browserbalk, ook zonder internet.

## Wat je uploadt

Zet deze bestanden samen in één map op je webserver, met dezelfde namen en indeling:

```
index.html
vragen.js
manifest.webmanifest
sw.js
fonts/
  nunito-latin.woff2
  lilita-one-latin.woff2
icons/
  icon-192.png
  icon-512.png
  icon-maskable-512.png
  apple-touch-icon.png
```

De app haalt niets van buitenaf: geen lettertypes van Google, geen scripts van een CDN.
Alles wat hij nodig heeft staat in deze map, en de service worker zet het na de eerste
keer openen op het apparaat. Daarna werkt de app volledig zonder internet — ook de
letters zien er dan hetzelfde uit.

Alle verwijzingen zijn relatief, dus de map mag overal staan:
`https://jouwdomein.nl/` of `https://jouwdomein.nl/rekenen/` werkt allebei.

## Eén eis: HTTPS

Installeren en offline werken gaan alleen via **https://** (of via `http://localhost`
tijdens het testen). Op gewoon http laadt de app wel, maar kun je hem niet op het
beginscherm zetten en werkt hij niet offline.

## Op de tablet zetten

**Android / Chrome:** open de pagina. Rechtsboven verschijnt een groene knop
**App installeren**; anders staat het in het menu (⋮) onder *App installeren*.

**iPad / iPhone (Safari):** open de pagina, tik onderin op **Deel** en dan op
**Zet op beginscherm**. De app toont daar zelf een tip over. Let op: op iOS moet dit
in Safari gebeuren, niet in Chrome.

Daarna start de app vanaf het beginscherm met eigen icoon, zonder adresbalk.

## Een wijziging doorvoeren

De service worker bewaart de app op het apparaat. Als je `index.html` of `vragen.js` aanpast:

1. Pas in `sw.js` de regel `var VERSIE = "rekenwereld-v14";` aan naar `v15`, `v16`, enzovoort.
2. Pas in `index.html` de regel `var APPVERSIE = "14";` aan naar hetzelfde nummer.
3. Upload de gewijzigde bestanden.

Zonder die ophoging blijven al geïnstalleerde tablets de oude versie tonen.

Onderaan de app staat het versienummer, zodat je altijd kunt zien welke versie er op een
apparaat draait.

De app opent altijd eerst uit de cache — dat is waarom hij het zonder internet doet en
meteen start. Staat er een nieuwe versie op de server, dan verschijnt onderin de balk
**"Er is een nieuwe versie van de app · Nu vernieuwen"**. Eén tik en de nieuwe versie
staat er. Wie die balk negeert, krijgt de nieuwe versie automatisch bij de volgende start.

Dit is nagemeten op een testserver: een schone installatie toont de balk níet, een echte
nieuwe versie wél, en met de server volledig uit start de app nog steeds compleet uit de
cache — inclusief `vragen.js`.

## Waar blijven de punten en instellingen?

Punten, stickers en de ingestelde getalbereiken staan in de `localStorage` van het
apparaat zelf — dus per tablet, en niet gedeeld tussen apparaten. Ze blijven staan als
de app wordt afgesloten. Onderin de app staat *opnieuw beginnen* om de punten te wissen;
de getallen zet je terug met *Standaard terugzetten* in het instellingenscherm. Ook de
gekozen groep, de onderwerpschakelaars en het rapport horen bij die opgeslagen gegevens.

## Instellingen (code: 1985)

Rechtsboven in de app staat **Instellingen**. Die zitten achter een code, zodat Saar ze
niet zelf verzet: **1985**. De code blijft geldig zolang de app open is; na afsluiten
moet hij opnieuw ingetypt worden.

De code staat in `index.html` in de regel `var CODE = "1985";` — daar pas je hem aan.
Het is een drempel voor een kind, geen beveiliging: wie de broncode bekijkt, ziet hem staan.

### De groep (3 t/m 8)

Bovenaan de instellingen kies je de groep waarin Saar zit. Dat is de hoofdknop van de
hele app: de groep bepaalt hoe moeilijk elk onderwerp is én welke onderwerpen op het
beginscherm staan.

**Let op:** een andere groep kiezen zet de getalbereiken, de tafels en het klokniveau
opnieuw. Dat is met opzet — zo is het één handeling in plaats van twaalf. Wat je daarna
handmatig bijstelt blijft staan tot de volgende groepswissel.

| Groep | Plus en min | Keer | Tafels | Klok |
| --- | --- | --- | --- | --- |
| 3 | t/m 20 | — | — | hele en halve uren |
| 4 | t/m 100 | t/m 10 | 1,2,3,4,5,10 | met kwartieren |
| 5 | t/m 1000 | t/m 10 | 1 t/m 10 | per 5 minuten |
| 6 | t/m 10.000 | t/m 20 | 1 t/m 10 | per 5 minuten |
| 7 | t/m 100.000 | t/m 50 | 1 t/m 10 | per 5 minuten |
| 8 | t/m 100.000 | t/m 100 | 1 t/m 10 | per 5 minuten |

Onder de knoppen staat een zin die vertelt wat de gekozen groep betekent en welke
onderwerpen er nieuw bij komen. Die zin wordt uit de instellingen zelf afgeleid, dus hij
kan niet verouderen.

### Welke onderwerpen ziet Saar?

De app heeft vijfentwintig onderwerpen. Standaard ziet Saar alleen wat bij haar groep
past — groep 3 geeft tien tegels, groep 8 alle zesentwintig. Per onderwerp kun je dat
overrulen met een schakelaar van drie standen:

- **volgt groep** (standaard) — zichtbaar zodra de groep het toelaat
- **aan** — ook zichtbaar onder de eigen groep, om vooruit te werken
- **uit** — nooit zichtbaar

Uitzetten wist geen cijfers: het rapport blijft alles bijhouden.

### Getallen voor de sommen

Voor plus, min, keer en deel kun je het bereik daarnaast nog handmatig zetten, met een
voorbeeldsom die meteen meeverandert. De andere onderwerpen halen hun moeilijkheid
volledig uit de groep.

Bij min wordt het grootste getal altijd vooraan gezet, dus de uitkomst is nooit negatief.
Bij *Deel* gaat het altijd zonder rest; daarvoor is er een apart onderwerp *Deel met rest*.

De tafels en het klokkijken houden hun eigen keuzescherm.

### Lengte van een reeks

Ook in het instellingenscherm: hoeveel sommen een gewone ronde telt (3 t/m 50, standaard 10)
en hoeveel vragen een challenge telt (5 t/m 100, standaard 25). De slaaggrens van een
challenge schuift automatisch mee: vier van de vijf goed, dus 20 bij 25 vragen en 8 bij 10.
Er mag altijd minstens één fout gemaakt worden.

### Sparen voor een beloning

In hetzelfde scherm stel je in hoeveel punten één sticker kost (1 t/m 100, standaard 10)
en hoeveel stickers één beloning kost (1 t/m 50, standaard 10). Eronder staat hoeveel
goede antwoorden een beloning dan kost. De beloningskaart op het beginscherm krijgt
automatisch het juiste aantal stickerplekken.

Let op: stickers worden berekend uit het totaal aantal punten. Zet je het aantal punten
per sticker lager, dan stijgt het aantal stickers dus met terugwerkende kracht.

### Stickervellen en beloningen

Op het beginscherm staat het stickervel met pijltjes eromheen: daarmee blader je terug
naar eerdere vellen. De knop *Alle vellen bekijken* opent het **stickerboek**, waar ze
allemaal onder elkaar staan met het nieuwste bovenaan.

Zodra een vel vol is, verschijnt er een regel *Beloning gegeven*. Die knop vraagt om de
code en opent een venstertje waarin je kunt afvinken dat Saar de beloning gekregen heeft,
met een korte notitie erbij (bijvoorbeeld "naar het zwembad"). Daarna staat er op het vel:
*Gegeven op 11 september — naar het zwembad*. Met *Wijzigen* haal je het vinkje er weer af.

De code hoef je maar één keer per keer-dat-de-app-open-is in te typen; daarna staan de
instellingen én het afvinken open tot de app wordt afgesloten.

### Punten wissen

Staat ook in het instellingenscherm, achter dezelfde code, en vraagt om een tweede tik
ter bevestiging. De ingestelde getallen blijven daarbij staan.

## Rapport en challenges

Op het beginscherm staan twee knoppen: **Challenges** en **Rapport**.

Het **rapport** houdt per onderdeel bij hoeveel vragen er gemaakt zijn en hoeveel daarvan
goed waren, met een oordeel erbij (sterk / gaat goed / meer oefenen / nog weinig geoefend).
De tafels staan er apart in, per tafel, en daaronder de vragen die het vaakst misgaan.
Onderaan staat één advies: waar valt nu de meeste winst te halen.

Een **challenge** is standaard 25 vragen lang (instelbaar). Tijdens een challenge levert een
goed antwoord géén punten en dus geen stickers op: de hele beloning komt aan het eind, en
alleen als de challenge gehaald is.

| Uitkomst | Wat je krijgt |
| --- | --- |
| minder dan vier van de vijf goed | niets |
| gehaald | 2 stickers |
| **alles goed** | 2 stickers **plus de supersticker** — een gouden ster die op het stickervel blijft glanzen, met een confettiregen erbij |

Er zijn vier soorten challenges, en de app beveelt er één aan op basis van het rapport:

| Challenge | Wat het doet |
| --- | --- |
| 🎯 Tafelbaas | de drie tafels waar Saar het meest mee worstelt |
| 🕐 Klokmeester | klokvragen, één niveau hoger dan nu ingesteld |
| ⚡ Rekenracer | alle soorten door elkaar, met grotere getallen dan gewoon |
| 🔁 Herkansing | vragen die eerder misgingen (verschijnt vanaf 8 missers) |

De app onthoudt maximaal 40 misgegane vragen. Maak je zo'n vraag later goed, dan gaat hij
weer van dat lijstje af.

## De vragen aanpassen: `vragen.js`

Alle inhoud van de vragen staat los van de app, in `vragen.js`. Je kunt dat bestand met
elke teksteditor openen en aanpassen zonder `index.html` aan te raken. Erin staan:

| Sleutel | Wat het is |
| --- | --- |
| `ONDERWERPEN` | alle 26 onderwerpen: naam, icoon, kleur, vanaf welke groep, en de moeilijkheid per groep |
| `SJABLONEN`, `NAMEN`, `DINGEN` | de zinnen, namen en voorwerpen van de verhaaltjessommen |
| `MAATEN`, `MAANDEN`, `DAGEN`, `SPULLEN`, `NOEMERWOORD` | de tabellen voor meten, kalender, verhoudingen en breuken |
| `GROEPGETALLEN` | welke getallen bij welke groep horen |
| `STICKERS`, `KLEUREN`, `LOF` | de stickers, hun kleuren en de complimentjes |
| `VAKKEN`, `GROEPEN`, `BEREIKEN`, `NIVEAUS`, `KLOKSOORTEN` | indeling van het beginscherm, het rapport en de klok |

Op de eerste regel na (`window.REKENVRAGEN = {`) is het gewone JSON: objecten, lijsten,
teksten en getallen. Een nieuwe verhaaltjeszin toevoegen is dus één regel erbij in de
juiste lijst, met een komma ertussen.

**Drie dingen om op te letten:**

1. **Bewaar het als UTF-8**, anders verdwijnen de emoji en tekens als ½ en ⌀.
2. **Het veld `maak`** noemt de naam van een rekenfunctie die in `index.html` staat. Die
   namen kun je niet zelf verzinnen; de app zegt het als er een onbekende naam staat.
3. **De volgorde van `ONDERWERPEN`** bepaalt de volgorde van de tegels op het beginscherm.

Gaat er iets mis — een komma vergeten, het bestand niet geüpload — dan start de app niet
met een leeg scherm, maar met een uitleg die zegt wat er ontbreekt. `index.html` werkt
vanaf nu dus niet meer los: de twee bestanden horen bij elkaar.

## De onderwerpen

Het beginscherm is verdeeld in vier vakken. Alleen wat bij de groep past is zichtbaar.

| Vak | Onderwerpen |
| --- | --- |
| Rekenen | plus, min, keer, deel, tafels, deeltafels, deel met rest, verhaaltjes, alles door elkaar |
| Slim met getallen | ontbrekend getal, dubbel en half, splitsen, groter of kleiner, afronden, kommagetallen, onder nul, gemiddelde |
| Meten, geld en tijd | klokkijken, tijdsduur, geld, meten, kalender, oppervlakte |
| Deel van een geheel | breuken, procenten, verhoudingen |

Vier soorten antwoorden: een getal intypen, een keuze uit knoppen (groter/kleiner, de
klok, welke dag), een bedrag met komma, of twee vakjes naast elkaar (`17 : 5 = 3 rest 2`
en `1 uur 20 min`). Bij twee vakjes springt OK van het eerste naar het tweede vak.

Geld en kommagetallen worden intern in centen en tienden gerekend, nooit met kommagetallen
in de computer zelf. Daardoor kan `0,1 + 0,2` niet als fout gerekend worden.

## Klokkijken

Onder **Klokkijken** kies je twee dingen: de soort vraag (analoge klok aflezen, digitale
tijd opzoeken, of door elkaar) en hoe moeilijk de tijden zijn (hele en halve uren,
ook kwartieren, of stappen van vijf minuten). Beide keuzes worden onthouden en staan
samengevat op de knop op het beginscherm.

## Tafels kiezen

Onder **Tafels** tik je aan welke tafels je wilt oefenen — één, een paar (bijvoorbeeld 6,
7 en 8) of allemaal. De sommen komen er dan door elkaar uit. Gekozen tafels zijn geel,
niet-gekozen zijn leeg. De keuze wordt onthouden en staat op de knop op het beginscherm.

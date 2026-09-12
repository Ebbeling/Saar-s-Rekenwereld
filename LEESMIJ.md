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

## De eerste keer openen

Wie de app voor het eerst in een browser opent, krijgt niet meteen de sommen te zien maar
eerst drie vragen: **van wie is de app**, **welke kleur** het icoon krijgt, en **in welke
groep** je zit. Daarbij staat dat de code van de instellingen om te beginnen **0000** is.
Pas als de naam en de groep ingevuld zijn, verschijnen er twee knoppen: *Op mijn
beginscherm zetten* en *Verder in de browser*.

Dat is met opzet zo. Een tablet legt de naam en het icoon vast op het moment dat je de app
toevoegt; staat er dan nog "Saar" in het roze terwijl je Lotte in het paars wilde, dan krijg
je dat er alleen af door de app te verwijderen en opnieuw toe te voegen.

Kies je *Op mijn beginscherm zetten*, dan **herlaadt de pagina eerst**. Dat is nodig: de
browser leest het manifest — waar naam en icoon in staan — één keer per paginabezoek. De
app schrijft het nieuwe manifest weg, herlaadt, en biedt dan pas de installatieknop aan.
Zonder die stap zou je alsnog het oude icoon krijgen.

Dit scherm komt alleen bij een lege app. Wie de app al gebruikt — er staan punten of
instellingen in — merkt er niets van, ook niet na een update.

**De ingevulde gegevens reizen mee in de app zelf.** Het startadres in het manifest wordt
`index.html?naam=…&kleur=…&groep=…`. Een app op een beginscherm opent altijd dat adres, dus
komt hij hoe dan ook met de goede naam, kleur en groep op — ook op een apparaat waar de
geïnstalleerde app de opslag van de browser niet deelt. Bij het opstarten worden die
waarden alleen gebruikt als er nog helemaal niets bewaard is; wat je later in de
instellingen verandert wordt er dus nooit door overschreven.

**Tijdens het laden** staat er een kort tussenschermpje met drie stuiterende stippen en
*Even laden…*. Dat vervangt het witte vlak dat je anders ziet terwijl de browser de app uit
de cache haalt. Het verdwijnt zodra het eerste scherm klaarstaat, en anders sowieso na acht
seconden — zo blijft een app die ergens op vastloopt nooit achter een laadscherm hangen.

## Op de tablet zetten

**Android / Chrome:** open de pagina. Rechtsboven verschijnt een groene knop
**App installeren**; anders staat het in het menu (⋮) onder *App installeren*.

**iPad / iPhone (Safari):** open de pagina, tik onderin op **Deel** en dan op
**Zet op beginscherm**. De app toont daar zelf een tip over. Let op: op iOS moet dit
in Safari gebeuren, niet in Chrome.

Daarna start de app vanaf het beginscherm met eigen icoon, zonder adresbalk.

## Een wijziging doorvoeren

De service worker bewaart de app op het apparaat. Als je `index.html` of `vragen.js` aanpast:

1. Pas in `sw.js` de regel `var VERSIE = "rekenwereld-v34";` aan naar `v35`, `v36`, enzovoort.
2. Pas in `index.html` de regel `var APPVERSIE = "34";` aan naar hetzelfde nummer.
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

## Instellingen (code: 0000)

Rechtsboven in de app staat **Instellingen**. Die zitten achter een code, zodat Saar ze
niet zelf verzet. De code is standaard **0000** en kun je in dat scherm zelf wijzigen naar
vier andere cijfers. Hij wordt **elke keer opnieuw gevraagd** — ook als je net nog in de
instellingen was, en ook voor het afvinken van een beloning. Zo staat de app nooit open
omdat iemand de code een keer eerder heeft ingetypt.

Het scherm is verdeeld in drie tabbladen: **Niveau** (groep, onderwerpen, getallen),
**Sparen** (lengte van een reeks, punten, stickers) en **De app** (naam en icoon, de code,
de versie, opnieuw beginnen).

**Alles wat je verandert is meteen bewaard.** Er is geen *Opslaan*-knop: een knop werkt
zodra je hem aantikt, en een invulveld zodra je het verlaat. Onderaan staat alleen *Klaar*
om het scherm te sluiten, en *Alles terug naar de standaard* als je terug wilt.

Wat je in een getalveld typt wordt bij het verlaten opgeschoond en **teruggeschreven in
het veld**: te grote getallen worden afgekapt, en een *van* die hoger is dan de *tot* wordt
omgewisseld. Zo zie je altijd wat er werkelijk geldt.

Eén uitzondering: **de code**. Een code van drie cijfers bestaat niet, dus die wordt pas
overgenomen als er vier cijfers staan. Klopt het niet, dan komt de oude code terug in het
veld en staat eronder waarom.

Het wachtwoord staat als stipjes in beeld. Met de knop **Tonen** ernaast kun je even
kijken wat er staat.

**Vergeet hem niet.** Ben je hem kwijt, dan kun je hem terugzetten door in de browser de
opgeslagen gegevens van de app te wissen — daarmee verdwijnen ook de punten en stickers.

### Wat staat er anders dan de groep?

Bovenaan het tabblad **Niveau** staat één regel die vertelt wat er is afgeweken van wat de
groep zou geven: *Anders dan groep 5: 2 onderwerpen staan vast aan of uit · 1 onderwerp
heeft eigen getallen.* Wijkt er niets af, dan staat er *Alles volgt groep 5.*

Zodra er iets afwijkt verschijnt ernaast de knop **Terug naar groep N**. Die zet alleen dít
tabblad terug: de onderwerpen, de getallen, de geldkeuze, de tafels en het klokniveau. De
knop onderaan, **Alles terug naar de standaard**, doet dat óók, plus de lengtes, de punten
en de stickerinstellingen — en dat is precies waarom het er twee zijn.

Geen van beide raakt de punten, de stickers of het rapport aan; daarvoor is *Punten wissen*.

### Van wie is deze app?

Onder *Van wie is deze app?* (tabblad **De app**) vul je een naam in, hoogstens twaalf
letters. Die naam gaat overal mee: de titel, het logo, de welkomkaart, de kopjes in de
instellingen en het rapport, en de verhaaltjes over geld, tijd en gemiddelde. Naast het
veld zie je meteen hoe het **app-icoon** eruit komt te zien; dat wordt met dezelfde
vormgeving opnieuw getekend met de nieuwe naam, in de kleur die bij het eerste openen
gekozen is. Laat je het veld leeg, dan valt alles terug op *Saar*.

Onder het naamveld staan de zes kleuren, zodat je het icoon ook later nog kunt omkleuren.
Ze staan in `vragen.js` onder `ICOONKLEUREN`, elk met een achtergrondkleur en een kleur voor
het sterretje. Een kleur erbij is één regel.

**Hoe het icoon op een beginscherm meeverandert.** In de browser — tabbladicoon en titel —
is het meteen goed. Voor een app die al op een beginscherm staat ligt het anders: de
tablet heeft naam en icoon vastgelegd toen je hem toevoegde. De app biedt de browser nu
wel het juiste aan: `manifest.webmanifest` houdt zijn gewone adres, maar de service worker
serveert er een versie met de nieuwe naam en het nieuwe icoon. Chrome kijkt daar uit
zichzelf periodiek naar en werkt het beginscherm-icoon dan bij — dat is zijn eigen
schema, meestal binnen een dag. Wil je het meteen goed hebben, gebruik dan de knop
**Op het beginscherm zetten**: haal de app er één keer af (icoon ingedrukt houden,
verwijderen) en zet hem opnieuw neer.

Er bestaat geen manier waarop een webpagina dat zelf kan afdwingen; dit is zo dicht als
je erbij kunt komen.

### Staat er een nieuwe versie klaar?

Onder *Nieuwe versie* staat welke versie er nu draait, met een knop **Nu kijken**. Die
vraagt de server meteen of er iets nieuwers is, in plaats van te wachten tot de app dat
bij een volgende start zelf merkt. Is er niets, dan zegt hij dat. Is er wél iets, dan
verandert de knop in **Nu vernieuwen** en haalt één tik de nieuwe versie binnen.

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

**Elk jaar na de zomer** vraagt de app zelf of de groep omhoog moet. Vanaf 31 juli staat er
op het beginscherm *Zit Saar na de zomer in groep 6?* met een ja en een nee. Die vraag blijft
staan tot er een van beide gekozen is — hij verdwijnt dus niet als je hem wegklikt. Bij *ja*
gaat de groep één omhoog en groeien de sommen mee; bij *nee* verandert er niets. Daarna komt
hij pas het jaar erop weer terug. In groep 8 wordt er niets meer gevraagd.

### Onderwerpen en getallen

De app heeft vijfentwintig onderwerpen, verdeeld over vier vakken. Elk vak staat
**ingeklapt** met een teller erachter — *3 van de 8 aan · 2 zelf ingesteld* — zodat het
scherm kort blijft. Tik een vak open om de onderwerpen te zien.

Elk onderwerp is **één rij**: of het op het beginscherm staat én met welke getallen. Voor de
naam staat een **groen of rood bolletje** — staat dit onderwerp nu op het beginscherm of
niet — en eronder een samenvatting, bijvoorbeeld *aan, volgt de groep · 1 t/m 20*. Is er
iets zelf ingesteld, dan staat er *(zelf)* achter.

Tik een rij open en je krijgt alles wat er bij dit onderwerp te kiezen valt. Eerst de drie
standen:

- **volgt groep** (standaard) — zichtbaar zodra de groep het toelaat
- **aan** — ook zichtbaar onder de eigen groep, om vooruit te werken
- **uit** — nooit zichtbaar

Uitzetten wist geen cijfers: het rapport blijft alles bijhouden.

Daaronder staat, afhankelijk van het onderwerp, één van vier dingen:

| Onderwerpen | Wat je krijgt |
| --- | --- |
| plus, min, keer, deel | *van* en *tot en met*, met een voorbeeldsom die meteen meeverandert |
| vijftien andere | *tot en met* (bij *Splitsen* ook een *van*), met eronder welke groep het nu volgt |
| Tafels, Klokkijken | een knop naar hun eigen keuzescherm |
| Afronden, Kalender, Verhoudingen, Deeltafels | een regel die uitlegt waarom er niets in te stellen valt |

Negentien onderwerpen zijn dus bij te stellen. Bij de meeste is het simpelweg het grootste
getal dat in de som mag voorkomen; bij een paar betekent het iets specifieks, en dat staat
er dan bij: bij *Kommagetallen* het hele getal vóór de komma, bij *Geld* het hoogste bedrag
in hele euro's, bij *Meten* het getal vóór het omrekenen (9 bij `9 m = 900 cm`), bij
*Tijdsduur* de langste duur in minuten, en bij *Deel met rest* de uitkomst vóór de rest.

Alleen *Splitsen* heeft een ondergrens én een bovengrens. Bij de andere bepaalt de
generator zelf waar hij begint — meestal 1 of 2 — en stel je alleen het maximum in.

Bij min wordt het grootste getal altijd vooraan gezet, dus de uitkomst is nooit negatief.
Bij *Deel* gaat het altijd zonder rest; daarvoor is er een apart onderwerp *Deel met rest*.
Dat staat ook in die rijen zelf.

**Een andere groep kiezen zet alles weer terug**, ook deze bereiken. Wat je niet aanraakt
blijft de groep volgen, ook na een wissel.

De **tafelkiezer** en de **klokkiezer** zijn vanuit hun eigen rij te bereiken. Kom je daar
vandaan, dan heet de knop daar *Klaar* en bewaart hij je keuze; kom je er via de tegel op
het beginscherm, dan blijft het zoals het was en start je vanaf daar een ronde.

Een groepswissel of een terugzetting laat de opengeklapte vakken en je plek op het scherm
staan, zodat je kunt zien wat er verandert. Verlaat je de instellingen en kom je terug, dan
staat alles weer dicht.

### Hele euro's, halve of tot op de cent

Klap in het vak *Meten, geld en tijd* de rij **Geld** open. Onder het bedrag staat een
rijtje van vier knoppen voor de nauwkeurigheid van de bedragen:

| Keuze | Wat je krijgt |
| --- | --- |
| *volgt groep* | zoals altijd: groep 3 en 4 hele euro's, hoger ook centen |
| *hele euro's* | alleen bedragen als € 3 en € 12, nooit een komma |
| *halve euro's* | hele en halve bedragen, dus ook € 3,50 |
| *tot op de cent* | elk bedrag, dus ook € 3,47 |

Onder de knoppen staat meteen een voorbeeld van wat je gekozen hebt.

Kies je zelf iets, dan geldt dat voor alle geldvragen, ongeacht de groep. Handig als het
rekenen met komma's nog te vroeg komt, of juist als het al te makkelijk is. Een bedrag
blijft altijd binnen het maximum dat erboven staat.

Een **bewaarde** vraag — een misser die in het rapport terugkomt — houdt de vorm waarin hij
gesteld werd. Stond er € 3,47 in, dan vraagt hij ook na een wissel naar hele euro's nog om
een bedrag met komma. Anders zou het antwoord van toen ineens niet meer kloppen.

**Een andere groep kiezen en *Standaard terugzetten* zetten dit weer op *volgt groep*.**

### Lengte van een reeks

Ook in het instellingenscherm: hoeveel sommen een gewone ronde telt (3 t/m 50, standaard 10)
en hoeveel vragen een challenge telt (5 t/m 100, standaard 25). De slaaggrens van een
challenge schuift automatisch mee: vier van de vijf goed, dus 20 bij 25 vragen en 8 bij 10.
Er mag altijd minstens één fout gemaakt worden.


### Komen missers terug?

Onder *Hoe lang is een reeks?* staat een rijtje van drie knoppen:

| Keuze | Wat er gebeurt |
| --- | --- |
| *niet* | missers komen alleen terug in de challenge **Herkansing** |
| *soms* (standaard) | er komt één eerdere misser per gewone ronde terug |
| *vaak* | er komen er twee per ronde terug |

De app bewaart maximaal veertig fout beantwoorde sommen. Die komen ergens midden in
een ronde terug — nooit als eerste vraag, nooit als laatste — met precies de getallen van
toen. Nooit meer dan een derde van de reeks, dus bij een ronde van drie sommen blijft het
bij één.

Een misser verdwijnt uit de lijst zodra hij goed gemaakt is. Oefen je *Keer*, dan komen
alleen keer-missers terug; bij *Alles door elkaar* alle onderwerpen die op dat moment op
het beginscherm staan.

Onder de knoppen staat hoeveel missers er op dit moment klaarstaan.

### Wanneer tellen de punten?

Op het tabblad **Sparen**, onder een eigen kopje, staan twee knoppen:

| Keuze | Wat er gebeurt |
| --- | --- |
| *meteen* (standaard) | elk goed antwoord levert meteen een punt op, zoals de app het altijd deed |
| *pas na de reeks* | de punten van een reeks komen er pas bij als de reeks helemaal af is |

Staat hij op *pas na de reeks*, dan blijft de puntenteller tijdens het oefenen stilstaan
en verschijnt eronder in het groen hoeveel punten er onderweg zijn: *+3 straks*. Bij de
laatste som worden ze in één keer bijgeschreven, en het klaarscherm meldt dat: *10 punten
erbij, want de reeks is af*. Levert dat nieuwe stickers op, dan komt die melding daar ook
pas.

Stop je halverwege, of loop je weg naar het beginscherm, dan **vervallen die punten**.
Dat is precies de bedoeling van de instelling: een reeks afmaken wordt er iets waard door.
De app waarschuwt ervoor in het venster dat bij *Stoppen* verschijnt.

Een **challenge** werkt hoe dan ook zo: losse antwoorden leveren daar niets op, de stickers
komen aan het eind en alleen als de challenge gehaald is. Daar verandert deze knop niets
aan. Ook het voortgangsrapport blijft gewoon elk antwoord noteren — dat gaat over oefenen,
niet over belonen.

### Uitleg bij een fout antwoord

Bij een fout antwoord staat het goede antwoord in beeld, en waar het kan een tussenstap
eronder — niet wát het is, maar hoe je eraan komt:

| Soort som | Wat erbij komt te staan |
| --- | --- |
| keer en de tafels | *10 × 8 = 80, en 7 × 8 is 3 keer 8 minder: 56.* |
| twee keer iets | *2 × 9 is het dubbele van 9: 18.* |
| vijf keer iets | *10 × 8 = 80, en 5 × 8 is de helft: 40.* |
| deel en de deeltafels | *8 × 7 = 56, dus 56 : 8 = 7.* |
| deel met rest | *4 × 5 = 20, en van 23 blijft er dan 3 over.* |
| plus over het tiental | *37 + 3 = 40, en dan nog 5 erbij: 45.* |
| min over het tiental | *52 − 2 = 50, en dan nog 5 eraf: 45.* |

De tafel waarmee gerekend wordt is altijd een getal t/m tien — de tafel van twaalf kent een
kind niet — en als de som omgekeerd stond eindigt de uitleg met de vraag zoals hij er stond.

Past er geen tussenstap bij, dan komt er niets. Dat geldt voor alle andere onderwerpen, en
ook voor sommen die zichzelf uitleggen zoals `10 × 8` of `40 + 8`. Er valt hier niets in te
stellen: de tekst wordt uit de getallen van de som zelf afgeleid.

### Stoppen midden in een reeks

**Stoppen vraagt eerst.** Tik je tijdens een reeks op *Stoppen*, dan verschijnt er een
venster: *Stoppen met deze reeks?* Het vertelt hoever je bent en wat het kost — bij een
challenge dat die alleen telt als je hem afmaakt, en bij punten die pas na de reeks tellen
dat ze dan weg zijn. *Doorgaan* zet je terug in de reeks, *Toch stoppen* brengt je naar het
beginscherm. Heb je nog geen enkele som beantwoord, dan komt het venster niet: er valt dan
niets te verliezen.

### Stickers en beloningen uitzetten

Bovenaan het tabblad **Sparen** staat een vinkje *stickers en beloningen gebruiken*. Dat
staat standaard **aan** en dan werkt de app zoals hij altijd deed.

Zet je het uit, dan blijven alleen de punten over. Weg zijn: de tegels *Stickers* en
*Beloningen* (de puntentegel neemt de hele breedte), het stickervel op het beginscherm, het
stickerboek, het afvinken van beloningen, de melding bij een nieuwe sticker, en het venster
bij een vol stickervel. Een challenge blijft gewoon te halen — hij levert er alleen niets
extra's voor op, ook niet bij alles goed. De velden die alleen over stickers gaan
verdwijnen dan ook uit de instellingen, zodat je niet zit te draaien aan iets dat toch
niets doet.

**Wat al gespaard is blijft bewaard.** Punten, stickers en afgevinkte beloningen blijven
gewoon in de opslag staan; zet je het vinkje weer aan, dan staat alles er precies zoals je
het achterliet.

### Wat een challenge oplevert

Onder *Stickers en beloningen*: **hoeveel stickers** een gehaalde challenge oplevert
(0 t/m 10, standaard 2) en of er **bij alles goed een supersticker** bij komt. Zet je die
uit, dan is een foutloze challenge gewoon een gehaalde challenge. Onder de velden staat
meteen wat je keuzes betekenen.

Dit stond eerder bij de lengte van een challenge; het hoort bij de stickers, en daar staat
het nu ook.

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

## Vandaag geoefend

Onder de knop *Voor Saar* staat een smalle regel met wat er vandaag al gedaan is, en hoe
veel dagen er achter elkaar geoefend is: *🔥 vandaag 11 sommen · 6 dagen achter elkaar*.

Elk beantwoord vraagje telt mee, goed of fout. De reeks loopt door zolang er elke dag iets
gedaan wordt; sla je een dag over, dan begint hij opnieuw bij één. De dag erna staat hij er
nog — je kunt hem dan nog voortzetten — en pas daarna verdwijnt hij. Is er vandaag nog
niets gedaan en gisteren wel, dan staat er *gisteren geoefend*.

Valt er niets te melden, dan staat de regel er ook niet. *Punten wissen* wist de teller mee.

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
| gehaald | het ingestelde aantal stickers (standaard 2) |
| **alles goed** | datzelfde aantal **plus de supersticker** — een gouden ster die op het stickervel blijft glanzen, met een confettiregen erbij |

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
| `STICKERS`, `KLEUREN` | de stickers en hun kleuren |
| `LOF`, `TROOST` | wat de app zegt bij een goed en bij een fout antwoord |
| `VAKKEN`, `GROEPEN`, `BEREIKEN`, `NIVEAUS`, `KLOKSOORTEN` | indeling van het beginscherm, het rapport en de klok |

Op de eerste regel na (`window.REKENVRAGEN = {`) is het gewone JSON: objecten, lijsten,
teksten en getallen. Een nieuwe verhaaltjeszin toevoegen is dus één regel erbij in de
juiste lijst, met een komma ertussen.

**Vier dingen om op te letten:**

1. **Bewaar het als UTF-8**, anders verdwijnen de emoji en tekens als ½ en ⌀.
2. **Het veld `maak`** noemt de naam van een rekenfunctie die in `index.html` staat. Die
   namen kun je niet zelf verzinnen; de app zegt het als er een onbekende naam staat.
3. **De volgorde van `ONDERWERPEN`** bepaalt de volgorde van de tegels op het beginscherm.
4. **Zet nieuwe namen, voorwerpen en zinnen achteraan** in hun lijst. Van een vraag die
   Saar fout had wordt het *nummer* in de lijst bewaard, zodat hij bij een herkansing
   precies zo terugkomt. Iets ertussen schuiven verandert die oude vragen; iets erbij
   zetten niet.

Gaat er iets mis — een komma vergeten, het bestand niet geüpload — dan start de app niet
met een leeg scherm, maar met een uitleg die zegt wat er ontbreekt. `index.html` werkt
vanaf nu dus niet meer los: de twee bestanden horen bij elkaar.

### Een verhaaltjeszin toevoegen

De zinnen staan in `SJABLONEN`, per bewerking (`plus`, `min`, `keer`, `deel`). Wat tussen
accolades staat wordt ingevuld; al het andere blijft letterlijk staan:

| | |
| --- | --- |
| `{N}` `{N2}` | twee verschillende namen |
| `{Zij}` `{zij}` | "Ze"/"Hij" en "ze"/"hij" — hoort altijd bij `{N}` |
| `{haar}` | "haar"/"zijn", dus `{haar} {bak}` |
| `{mv}` | het voorwerp, meervoud |
| `{bak}` `{bakmv}` | de verpakking, enkelvoud en meervoud |
| `{lw}` `{elk}` | "de"/"het" en "elke"/"elk" bij die verpakking |
| `{a}` `{b}` | de twee getallen |

De getallen komen kant en klaar uit de rekenkern, dus een zin mag ze nooit omdraaien: bij
`deel` is `{a}` het totaal en `{b}` de deler. Let er ook op dat een zin met grote getallen
nog klopt — bij plus en min loopt `{a}` in groep 8 tot 1000.

## De onderwerpen

Het beginscherm is verdeeld in vier vakken. Alleen wat bij de groep past is zichtbaar.

| Vak | Onderwerpen |
| --- | --- |
| Rekenen | plus, min, keer, deel, tafels, deeltafels, deel met rest, verhaaltjes, alles door elkaar |
| Slim met getallen | ontbrekend getal, dubbel en half, splitsen, groter of kleiner, afronden, kommagetallen, onder nul, gemiddelde |
| Meten, geld en tijd | klokkijken, tijdsduur, geld, meten, kalender, oppervlakte |
| Deel van een geheel | breuken, procenten, verhoudingen |

Vijf soorten antwoorden: een getal intypen, een keuze uit knoppen (groter/kleiner, de
klok, welke dag), een bedrag met komma, twee vakjes naast elkaar (`17 : 5 = 3 rest 2`
en `1 uur 20 min`), of een rijtje vakjes onder elkaar (alle splitsingen van een getal).
Bij meerdere vakjes springt OK naar het volgende dat nog leeg is; pas als alles ingevuld
is wordt er nagekeken.

Een **goed** antwoord gaat na een korte pauze vanzelf door naar de volgende vraag. Bij een
**fout** antwoord gebeurt dat niet: het goede antwoord blijft staan en er komt een knop
**Volgende** bij, zodat er alle tijd is om het na te rekenen. Op de laatste vraag van een
reeks heet die knop *Klaar*.

## Splitsen

Splitsen wordt getoond als **splitsschema**: het totaal in een hokje bovenaan, de twee
delen eronder, met pootjes ertussen. Eén hokje staat open — bij groep 3 altijd een van de
twee delen, vanaf groep 4 soms ook het totaal.

Bij kleine totalen komt daar af en toe een andere vorm tussendoor: **alle splitsingen van
één getal**, van `0 + □` tot `□ + 0`. Dat is bewust in beide richtingen, zodat de hele
reeks geoefend wordt. Die vorm komt bij groep 3 in ongeveer een kwart van de vragen voor
en bij groep 4 in ongeveer een zevende; vanaf groep 5 niet meer, want daar zijn de
getallen er te groot voor. De regels worden gerekend, niet uit een lijstje gehaald — je
kunt de grenzen dus in `vragen.js` verzetten zonder ergens antwoorden bij te houden:

| Sleutel | Wat het doet |
| --- | --- |
| `van`, `tot` | tussen welke totalen de schema's liggen |
| `gaten` | welk hokje open mag staan: `"links"`, `"rechts"`, `"top"` |
| `alle` | tot welk totaal de vorm met alle splitsingen mag voorkomen (0 = nooit) |
| `alleKans` | hoe vaak die vorm aan de beurt is, als kans tussen 0 en 1 |

Eén vraag blijft één punt, ook als er elf regels ingevuld moeten worden. Bij een fout
antwoord kleuren de goede regels groen en krijgen de foute het juiste getal te zien.

Geld en kommagetallen worden intern in centen en tienden gerekend, nooit met kommagetallen
in de computer zelf. Daardoor kan `0,1 + 0,2` niet als fout gerekend worden.

## Klokkijken

Onder **Klokkijken** kies je twee dingen: de soort vraag (analoge klok aflezen, digitale
tijd opzoeken, of door elkaar) en hoe moeilijk de tijden zijn (hele en halve uren,
ook kwartieren, of stappen van vijf minuten). Beide keuzes worden onthouden en staan
samengevat op de knop op het beginscherm.

Je komt er op twee manieren: via de tegel op het beginscherm, en via de rij
**Klokkijken** in de instellingen. In dat tweede geval heet de knop onderin *Klaar* en
bewaart hij je keuze zonder een ronde te starten.

## Tafels kiezen

Onder **Tafels** tik je aan welke tafels je wilt oefenen — één, een paar (bijvoorbeeld 6,
7 en 8) of allemaal. De sommen komen er dan door elkaar uit. Gekozen tafels zijn geel,
niet-gekozen zijn leeg. De keuze wordt onthouden en staat op de knop op het beginscherm.

Ook hier geldt: kom je uit de instellingen, via de rij **Tafels**, dan heet de knop
onderin *Klaar* en bewaart hij je keuze zonder een ronde te starten.

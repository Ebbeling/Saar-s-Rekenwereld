/* Saar's Rekenwereld — alle vraaginhoud.
   Dit bestand bevat alleen gegevens: geen functies, geen berekeningen.
   Je mag het aanpassen zonder index.html aan te raken. Let op de komma's:
   alles achter de eerste regel is gewone JSON.
   Bewaar dit bestand als UTF-8, anders verdwijnen de emoji en tekens als ½ en ⌀. */
window.REKENVRAGEN = {

  "versie": 2,

  /* ----- STICKERS ----- */
  STICKERS: ["⭐","🌈","🦄","🐙","🍉","🐝","🚀","🌻","🐬","🍩","🎈","🦊","🍄","🐸","⚡","🧁","🐳","🌵","🎸","🦋"],

  /* ----- KLEUREN ----- */
  KLEUREN: ["#FF4D6D","#1FB877","#2A94E8","#8B5CF6","#FFB61E","#FF7A3D"],

  /* ----- LOF ----- */
  /* Wordt willekeurig gekozen bij een goed antwoord. Kort houden: er komt nog
     " +1 punt" achter. Nieuwe regels mogen overal in deze lijst. */
  LOF: ["Top!","Goed zo!","Knap!","Yes!","Precies!","Super!","Helemaal goed!",
        "Geweldig!","Wat knap!","Lekker bezig!","Fantastisch!","Slim gedaan!",
        "Dat klopt!","Klasse!","Perfect!","Goed gerekend!","Keurig!","Bravo!",
        "Jij kunt dit!","Heel goed!","Super gedaan!","Netjes!","Hebbes!","Prima!"],

  /* ----- TROOST ----- */
  /* Bij een fout antwoord. Hierachter komt het goede antwoord, dus eindig met
     een leesteken en blijf altijd vriendelijk. */
  TROOST: ["Bijna!","Net niet!","Bijna goed!","Goed geprobeerd!","Geeft niks!",
           "Deze was lastig!","Volgende keer lukt het!","Geen zorgen!","Blijf oefenen!",
           "Goed bezig, hoor!","Net ernaast!","Foutjes horen erbij!","Bijna had je hem!",
           "Kijk maar mee:"],

  /* ----- BEREIKEN ----- */
  BEREIKEN: [
    {id:"plus", naam:"Plus",  teken:"+", grens:100000, standaard:{van:1, tot:20}},
    {id:"min",  naam:"Min",   teken:"−", grens:100000, standaard:{van:1, tot:20}},
    {id:"keer", naam:"Keer",  teken:"×", grens:100,  standaard:{van:1, tot:10}},
    {id:"deel", naam:"Deel",  teken:":", grens:100,  standaard:{van:1, tot:10}}
  ],

  /* ----- GROEPEN ----- */
  GROEPEN: [
    {id:"plus",     naam:"Plus",          kleur:"var(--gras)"},
    {id:"min",      naam:"Min",           kleur:"var(--zee)"},
    {id:"keer",     naam:"Keer",          kleur:"var(--druif)"},
    {id:"deel",     naam:"Deel",          kleur:"var(--framboos)"},
    {id:"tafels",   naam:"Tafels",        kleur:"var(--zon)"},
    {id:"klok",     naam:"Klokkijken",    kleur:"var(--klok)"},
    {id:"getallen", naam:"Slim met getallen", kleur:"var(--zee)"},
    {id:"geld",     naam:"Geld",          kleur:"var(--zon)"},
    {id:"meten",    naam:"Meten en tijd", kleur:"var(--druif)"},
    {id:"verhaal",  naam:"Verhaaltjes",   kleur:"var(--framboos)"}
  ],

  /* ----- VAKKEN ----- */
  VAKKEN: [
    {id:"rekenen",  naam:"Rekenen",              groot:true},
    {id:"getallen", naam:"Slim met getallen"},
    {id:"meten",    naam:"Meten, geld en tijd"},
    {id:"delen",    naam:"Deel van een geheel"}
  ],

  /* ----- UURNAAM ----- */
  UURNAAM: ["twaalf","een","twee","drie","vier","vijf","zes","zeven","acht","negen","tien","elf","twaalf"],

  /* ----- NIVEAUS ----- */
  NIVEAUS: {
    1: {minuten:[0,30],            naam:"Hele en halve uren",  hint:"1:00 en 1:30"},
    2: {minuten:[0,15,30,45],      naam:"Ook kwartieren",      hint:"kwart over en kwart voor"},
    3: {minuten:[0,5,10,15,20,25,30,35,40,45,50,55], naam:"Elke 5 minuten", hint:"tien over half, vijf voor vier"}
  },

  /* ----- KLOKSOORTEN ----- */
  KLOKSOORTEN: [
    {id:"analoog",  naam:"Analoge klok aflezen", hint:"Je ziet een klok met wijzers en kiest de tijd"},
    {id:"digitaal", naam:"Digitale tijd zetten", hint:"Je ziet 3:30 en zoekt de klok die zo staat"},
    {id:"mix",      naam:"Door elkaar",          hint:"Allebei de soorten vragen gemengd"}
  ],

  /* ----- MAATEN ----- */
  MAATEN: [
    {van:"m",   naar:"cm",      f:100,  vanaf:4},
    {van:"l",   naar:"ml",      f:1000, vanaf:4},
    {van:"km",  naar:"m",       f:1000, vanaf:5},
    {van:"kg",  naar:"g",       f:1000, vanaf:5},
    {van:"cm",  naar:"mm",      f:10,   vanaf:5},
    {van:"uur", naar:"minuten", f:60,   vanaf:5},
    {van:"m",   naar:"mm",      f:1000, vanaf:6}
  ],

  /* ----- MAANDEN ----- */
  MAANDEN: [
    {naam:"januari", dagen:31}, {naam:"februari", dagen:28}, {naam:"maart", dagen:31},
    {naam:"april", dagen:30}, {naam:"mei", dagen:31}, {naam:"juni", dagen:30},
    {naam:"juli", dagen:31}, {naam:"augustus", dagen:31}, {naam:"september", dagen:30},
    {naam:"oktober", dagen:31}, {naam:"november", dagen:30}, {naam:"december", dagen:31}
  ],

  /* ----- DAGEN ----- */
  DAGEN: ["maandag","dinsdag","woensdag","donderdag","vrijdag","zaterdag","zondag"],

  /* ----- NOEMERWOORD ----- */
  NOEMERWOORD: {2:"de helft van", 3:"een derde van", 4:"een kwart van",
                     5:"een vijfde van", 8:"een achtste van", 10:"een tiende van"},

  /* ----- SPULLEN ----- */
  /* Alleen voor de verhoudingsvragen: "3 appels kosten € 6, wat kost er 1?".
     Dus alleen dingen met een prijs. Beide velden worden gebruikt: mv in de
     vraag, ev in de oplossing. */
  SPULLEN: [
    {ev:"appel", mv:"appels"}, {ev:"broodje", mv:"broodjes"}, {ev:"pen", mv:"pennen"},
    {ev:"sticker", mv:"stickers"}, {ev:"koekje", mv:"koekjes"}, {ev:"ballon", mv:"ballonnen"},
    {ev:"ijsje", mv:"ijsjes"}, {ev:"cupcake", mv:"cupcakes"}, {ev:"potlood", mv:"potloden"},
    {ev:"boek", mv:"boeken"}, {ev:"knikker", mv:"knikkers"}, {ev:"snoepje", mv:"snoepjes"},
    {ev:"bloem", mv:"bloemen"}, {ev:"cadeautje", mv:"cadeautjes"}, {ev:"sapje", mv:"sapjes"},
    {ev:"kaartje", mv:"kaartjes"}, {ev:"donut", mv:"donuts"},
    {ev:"notitieboekje", mv:"notitieboekjes"}, {ev:"beker", mv:"bekers"},
    {ev:"flesje", mv:"flesjes"}
  ],

  /* ----- NAMEN ----- */
  /* v:true is een meisjesnaam; daar hangen {zij}, {Zij} en {haar} aan. Zet nieuwe
     namen achteraan: de plek in deze lijst wordt als nummer bewaard bij vragen
     die Saar fout had. */
  NAMEN: [
    {n:"Saar", v:true}, {n:"Tess", v:true}, {n:"Fenna", v:true}, {n:"Noor", v:true},
    {n:"Mees", v:false}, {n:"Luuk", v:false}, {n:"Daan", v:false}, {n:"Bram", v:false},
    {n:"Lina", v:true}, {n:"Mila", v:true}, {n:"Liv", v:true}, {n:"Julia", v:true},
    {n:"Eva", v:true}, {n:"Sophie", v:true}, {n:"Lotte", v:true},
    {n:"Finn", v:false}, {n:"Sem", v:false}, {n:"Liam", v:false}, {n:"Sam", v:false},
    {n:"Mats", v:false}, {n:"Jesse", v:false}, {n:"Lucas", v:false}
  ],

  /* ----- DINGEN ----- */
  /* De voorwerpen van de verhaaltjessommen. Drie eisen aan een nieuwe regel:
     - lw is "de" of "het" bij bak, want de zinnen schrijven {lw} {bak};
     - de bak moet iets zijn waar de spullen echt in kunnen ("in de vaas
       zitten knikkers" is precies wat we niet willen);
     - zet hem achteraan: de plek in deze lijst wordt als nummer bewaard. */
  DINGEN: [
    {mv:"knikkers",     bak:"zakje",     bakmv:"zakjes",      lw:"het"},
    {mv:"stickers",     bak:"vel",       bakmv:"vellen",      lw:"het"},
    {mv:"koekjes",      bak:"trommel",   bakmv:"trommels",    lw:"de"},
    {mv:"kaarten",      bak:"doos",      bakmv:"dozen",       lw:"de"},
    {mv:"appels",       bak:"mand",      bakmv:"manden",      lw:"de"},
    {mv:"potloden",     bak:"etui",      bakmv:"etui's",      lw:"het"},
    {mv:"snoepjes",     bak:"zakje",     bakmv:"zakjes",      lw:"het"},
    {mv:"boeken",       bak:"kast",      bakmv:"kasten",      lw:"de"},
    {mv:"schelpen",     bak:"emmer",     bakmv:"emmers",      lw:"de"},
    {mv:"kralen",       bak:"potje",     bakmv:"potjes",      lw:"het"},
    {mv:"bloemen",      bak:"vaas",      bakmv:"vazen",       lw:"de"},
    {mv:"ballonnen",    bak:"zak",       bakmv:"zakken",      lw:"de"},
    {mv:"knuffels",     bak:"mand",      bakmv:"manden",      lw:"de"},
    {mv:"cupcakes",     bak:"doos",      bakmv:"dozen",       lw:"de"},
    {mv:"sterren",      bak:"boekje",    bakmv:"boekjes",     lw:"het"},
    {mv:"vlinders",     bak:"net",       bakmv:"netten",      lw:"het"},
    {mv:"kastanjes",    bak:"emmer",     bakmv:"emmers",      lw:"de"},
    {mv:"legoblokjes",  bak:"bak",       bakmv:"bakken",      lw:"de"},
    {mv:"haarspeldjes", bak:"doosje",    bakmv:"doosjes",     lw:"het"},
    {mv:"sleutels",     bak:"la",        bakmv:"laden",       lw:"de"},
    {mv:"pennen",       bak:"beker",     bakmv:"bekers",      lw:"de"},
    {mv:"eieren",       bak:"doos",      bakmv:"dozen",       lw:"de"},
    {mv:"sokken",       bak:"la",        bakmv:"laden",       lw:"de"},
    {mv:"munten",       bak:"spaarpot",  bakmv:"spaarpotten", lw:"de"},
    {mv:"schriften",    bak:"tas",       bakmv:"tassen",      lw:"de"},
    {mv:"kaarsjes",     bak:"doosje",    bakmv:"doosjes",     lw:"het"},
    {mv:"pepernoten",   bak:"zak",       bakmv:"zakken",      lw:"de"},
    {mv:"postzegels",   bak:"album",     bakmv:"albums",      lw:"het"},
    {mv:"toverballen",  bak:"pot",       bakmv:"potten",      lw:"de"},
    {mv:"zaadjes",      bak:"zakje",     bakmv:"zakjes",      lw:"het"}
  ],

  /* ----- GROEPGETALLEN ----- */
  GROEPGETALLEN: {
    "tot":  [0,0,0, 20, 100, 1000, 10000, 100000, 100000],
    "keer": [0,0,0, 10, 10, 10, 20, 50, 100],
    "klok": ["", "", "", "hele en halve uren", "met kwartieren", "per 5 minuten",
             "per 5 minuten", "per 5 minuten", "per 5 minuten"]
  },

  /* ----- SJABLONEN -----
     De zinnen van de verhaaltjessommen, per bewerking. Alleen deze plaatshouders
     worden ingevuld; al het andere tussen accolades blijft letterlijk staan:

       {N} {N2}    twee verschillende namen
       {Zij} {zij} "Ze"/"Hij" en "ze"/"hij" — hoort altijd bij {N}, nooit bij {N2}
       {haar}      bezittelijk: "haar"/"zijn", dus {haar} {bak}
       {mv}        het voorwerp, meervoud
       {bak} {bakmv} de verpakking, enkelvoud en meervoud
       {lw} {elk}  "de"/"het" en "elke"/"elk" bij die verpakking
       {a} {b}     de twee getallen

     De getallen komen kant en klaar uit de rekenkern; een zin mag ze nooit
     omdraaien. Bij deel is {a} het totaal en {b} de deler. Let erop dat een zin
     ook met grote getallen nog klopt: bij plus en min loopt {a} tot 1000, dus
     geen "eet er {b} op" en geen "in {haar} hand". */
  SJABLONEN: {
    plus: [
      "{N} heeft {a} {mv}. {Zij} krijgt er {b} bij. Hoeveel {mv} heeft {N} nu?",
      "In {lw} {bak} liggen {a} {mv}. {N2} legt er {b} bij. Hoeveel liggen er nu in {lw} {bak}?",
      "{N} telt {a} {mv} en {N2} telt er {b}. Hoeveel zijn dat er samen?",
      "Op het feest zijn {a} {mv} en {N} neemt er nog {b} mee. Hoeveel {mv} zijn er dan?",
      "{N} spaarde eerst {a} {mv} en daarna nog {b}. Hoeveel heeft {zij} er nu?",
      "{N} vindt {a} {mv} en even later nog {b}. Hoeveel {mv} heeft {zij} dan gevonden?",
      "{N} heeft {a} {mv} en {N2} heeft er {b}. Hoeveel {mv} hebben ze samen?",
      "{N} verdient {a} punten in het eerste spel en {b} punten in het tweede. Hoeveel punten zijn dat samen?",
      "{N} verzamelt {a} {mv} en krijgt er {b} cadeau. Hoeveel {mv} heeft {zij} dan?",
      "In {lw} {bak} zitten al {a} {mv}. Er komen er nog {b} bij. Hoeveel {mv} zitten er dan in?",
      "{N} legt {a} {mv} op tafel en {N2} legt er {b} naast. Hoeveel {mv} liggen er samen?",
      "{N} bewaart {a} {mv} en vindt er nog {b} in {lw} {bak}. Hoeveel {mv} heeft {zij} dan?",
      "Op school liggen {a} {mv} klaar en er komen er nog {b} bij. Hoeveel {mv} zijn dat?",
      "{N} telt {a} {mv} in {lw} {bak} en {b} {mv} ernaast. Hoeveel {mv} zijn dat bij elkaar?",
      "{N} spaart {a} {mv} in {haar} {bak} en legt er {b} bij. Hoeveel {mv} zitten er dan in?"
    ],
    min: [
      "{N} heeft {a} {mv} en geeft er {b} weg. Hoeveel houdt {zij} over?",
      "Er liggen {a} {mv} in {lw} {bak}. {N2} pakt er {b} uit. Hoeveel blijven er liggen?",
      "{N} had {a} {mv}, maar is er {b} kwijtgeraakt. Hoeveel {mv} heeft {zij} nog?",
      "Van de {a} {mv} deelt {N} er {b} uit. Hoeveel blijven er over?",
      "{N} telt {a} {mv} en verkoopt er {b} op de rommelmarkt. Hoeveel houdt {zij} er over?",
      "{N} heeft {a} {mv} verzameld en geeft er {b} aan {N2}. Hoeveel {mv} houdt {zij} over?",
      "In {lw} {bak} zaten {a} {mv}. {N} gebruikt er {b}. Hoeveel {mv} zitten er nog in?",
      "Er lagen {a} {mv} klaar. {N2} haalde er {b} op. Hoeveel {mv} liggen er nog?",
      "{N} begon met {a} {mv} en raakte er {b} kwijt. Hoeveel {mv} heeft {zij} nog?",
      "Van de {a} {mv} in {lw} {bak} haalt {N} er {b} weg. Hoeveel {mv} zitten er nog in?",
      "{N} heeft {a} {mv} en doet er {b} in {haar} {bak}. Hoeveel {mv} heeft {zij} nog los?",
      "Er waren {a} {mv}. {N} deelde er {b} uit. Hoeveel {mv} zijn er nog over?",
      "{N} telde {a} {mv} en {N2} nam er {b} mee. Hoeveel {mv} bleven er over?",
      "Op de markt lagen {a} {mv}. {N} verkocht er {b}. Hoeveel {mv} liggen er nog?",
      "{N} spaarde {a} {mv}, maar gaf er {b} weg. Hoeveel {mv} heeft {zij} nu nog?"
    ],
    keer: [
      "{N} heeft {a} {bakmv} met elk {b} {mv}. Hoeveel {mv} zijn dat samen?",
      "Er staan {a} {bakmv} op tafel. In {elk} {bak} zitten {b} {mv}. Hoeveel {mv} zijn er in totaal?",
      "{N} koopt {a} {bakmv} {mv}. In {elk} {bak} zitten er {b}. Hoeveel {mv} heeft {zij} dan?",
      "Elke dag legt {N} {b} {mv} in {lw} {bak}. Hoeveel liggen er na {a} dagen in?",
      "{N} maakt {a} rijtjes van {b} {mv}. Hoeveel {mv} zijn dat bij elkaar?",
      "{N} maakt {a} groepjes van {b} {mv}. Hoeveel {mv} zijn dat samen?",
      "{N} geeft {b} {mv} aan elk van de {a} kinderen. Hoeveel {mv} geeft {zij} weg?",
      "{N} vult {a} {bakmv} met elk {b} {mv}. Hoeveel {mv} heeft {zij} nodig?",
      "{N} spaart {b} {mv} per dag. Hoeveel {mv} heeft {zij} na {a} dagen?",
      "Op {a} tafels liggen telkens {b} {mv}. Hoeveel {mv} liggen er samen?",
      "{N} heeft {a} {bakmv} en doet in {elk} {bak} {b} {mv}. Hoeveel {mv} gebruikt {zij}?",
      "{N} en {N2} maken samen {a} rijtjes van {b} {mv}. Hoeveel {mv} zijn dat?",
      "Elke week krijgt {N} {b} {mv}. Hoeveel {mv} heeft {zij} na {a} weken?",
      "{N} pakt {a} keer {b} {mv}. Hoeveel {mv} heeft {zij} dan gepakt?",
      "Er zijn {a} kinderen en ieder krijgt {b} {mv}. Hoeveel {mv} zijn er nodig?"
    ],
    deel: [
      "{N} verdeelt {a} {mv} eerlijk over {b} {bakmv}. Hoeveel {mv} komen er in {elk} {bak}?",
      "Er zijn {a} {mv} voor {b} kinderen. Ieder krijgt er evenveel. Hoeveel krijgt elk kind?",
      "{N} legt {a} {mv} in rijtjes van {b}. Hoeveel rijtjes worden dat?",
      "In {b} {bakmv} zitten samen {a} {mv}, in {elk} {bak} evenveel. Hoeveel zitten er in één {bak}?",
      "{N} deelt {a} {mv} uit aan {b} vrienden. Hoeveel krijgt ieder?",
      "{N} verdeelt {a} {mv} eerlijk over {b} kinderen. Hoeveel krijgt ieder kind?",
      "{N} heeft {a} {mv} en maakt groepjes van {b}. Hoeveel groepjes kan {zij} maken?",
      "{N} vult {b} {bakmv} met samen {a} {mv}, in {elk} {bak} evenveel. Hoeveel is dat?",
      "{N} en {N2} verdelen {a} {mv} over {b} {bakmv}. Hoeveel komt er in {elk} {bak}?",
      "Er liggen {a} {mv} klaar voor {b} kinderen. Hoeveel {mv} krijgt ieder kind?",
      "{N} deelt {a} {mv} in {b} gelijke stapeltjes. Hoeveel {mv} liggen er op elk stapeltje?",
      "Uit {lw} {bak} komen {a} {mv}. Ze gaan in {b} gelijke groepjes. Hoeveel zitten er in een groepje?",
      "{N} zet {a} {mv} in rijen van {b}. Hoeveel rijen worden dat?",
      "{a} {mv} worden eerlijk verdeeld over {b} {bakmv}. Hoeveel {mv} zitten er dan in {elk} {bak}?",
      "{N} heeft {a} {mv} en wil er {b} in {elk} {bak} doen. Hoeveel {bakmv} heeft {zij} nodig?"
    ]
  }
,

  /* ----- ONDERWERPEN: elk onderwerp met zijn niveautrap -----
     maak = de naam van de generator in index.html
     zaad = welke velden bewaard worden om de vraag te herbouwen (doel: bron) */
  ONDERWERPEN: {
    plus: {naam:"Plus", teken:"+", vak:"rekenen", klasse:"plus", kleur:"var(--gras)",
           groep:"plus", vanaf:3, bereik:true, maak:"maakPlus",
           zaad:{"a":"a", "b":"b"}},

    min: {naam:"Min", teken:"−", vak:"rekenen", klasse:"min", kleur:"var(--zee)",
          groep:"min", vanaf:3, bereik:true, maak:"maakMin",
          zaad:{"a":"a", "b":"b"}},

    keer: {naam:"Keer", teken:"×", vak:"rekenen", klasse:"keer", kleur:"var(--druif)",
           groep:"keer", vanaf:4, bereik:true, maak:"maakKeer",
           zaad:{"a":"a", "b":"b"}},

    deel: {naam:"Deel", teken:":", vak:"rekenen", klasse:"deel", kleur:"var(--framboos)",
           groep:"deel", vanaf:4, bereik:true, maak:"maakDeel",
           zaad:{"b":"b", "q":"ant"}},

    tafels: {naam:"Tafels", teken:"🎯", vak:"rekenen", klasse:"tafels", kleur:"var(--zon)",
             groep:"tafels", vanaf:4, kiezer:"tafels", maak:"maakTafel",
             zaad:{"tafel":"tafel", "mult":"mult", "om":"om"}},

    klok: {naam:"Klokkijken", teken:"🕐", vak:"meten", klasse:"klok", kleur:"var(--klok)",
           groep:"klok", vanaf:3, kiezer:"klok",
           maak:"maakKlok",
           zaad:{"u":"u", "m":"m"}},

    /* ----- Slim met getallen ----- */
    ontbrekend: {naam:"Ontbrekend getal", teken:"?", vak:"getallen", klasse:"ontbrekend",
                 kleur:"var(--gras)", vanaf:3, maak:"maakOntbrekend",
                 niveau:{3:{tot:20, ops:["+","−"], factor:5},
                         4:{tot:100},
                         5:{tot:100, ops:["+","−","×"], factor:10},
                         6:{tot:1000, ops:["+","−","×",":"], factor:12},
                         7:{tot:10000}},
                 /* bij een deelsom is a afgeleid van b en q, dus q moet mee terug.
                    Bij +, − en × wordt q niet gelezen, dus hij mag er altijd in. */
                 zaad:{"a":"a", "b":"b", "op":"op", "gat":"gat", "q":"ant"}},

    dubbel: {naam:"Dubbel en half", teken:"⇄", vak:"getallen", klasse:"dubbel",
             kleur:"var(--zee)", vanaf:3, maak:"maakDubbel",
             niveau:{3:{tot:10}, 4:{tot:25}, 5:{tot:50}, 6:{tot:100}, 7:{tot:250}},
             zaad:{"n":"n", "half":"half"}},

    splitsen: {naam:"Splitsen", teken:"✂️", vak:"getallen", klasse:"splitsen",
               kleur:"var(--gras)", vanaf:3, maak:"maakSplitsen",
               niveau:{3:{van:5, tot:10}, 4:{van:10, tot:20}, 5:{van:20, tot:100},
                       6:{van:100, tot:1000}},
               zaad:{"heel":"heel", "deel":"deel"}},

    vergelijk: {naam:"Groter of kleiner", teken:"🐊", vak:"getallen", klasse:"vergelijk",
                kleur:"var(--zee)", vanaf:3, maak:"maakVergelijk",
                niveau:{3:{tot:20}, 4:{tot:100}, 5:{tot:1000},
                        6:{tot:1000, sommen:true}, 7:{tot:10000}},
                zaad:{"a":"a", "b2":"b2", "somKant":"somKant", "rechts":"rechts"}},

    afronden: {naam:"Afronden", teken:"≈", vak:"getallen", klasse:"afronden",
               kleur:"var(--zee)", vanaf:4, maak:"maakAfronden",
               niveau:{4:{naar:[10], maal:10, halven:false},
                       5:{naar:[10,100], maal:20, halven:true},
                       6:{naar:[10,100,1000], maal:25},
                       7:{maal:40}},
               zaad:{"getal":"getal", "naar":"naar"}},

    komma: {naam:"Kommagetallen", teken:"0,5", vak:"getallen", klasse:"komma",
            kleur:"var(--klok)", vanaf:5, maak:"maakKomma",
            niveau:{5:{dec:[1], ops:["+","−"], heel:10},
                    6:{dec:[1,2], ops:["+","−","×"], heel:20},
                    7:{ops:["+","−","×",":"], heel:50},
                    8:{heel:100}},
            zaad:{"a":"a", "b":"b", "op":"op", "decimalen":"decimalen"}},

    negatief: {naam:"Onder nul", teken:"−5°", vak:"getallen", klasse:"negatief",
               kleur:"var(--zee)", vanaf:7, maak:"maakNegatief",
               niveau:{7:{tot:10, stap:8}, 8:{tot:20, stap:15}},
               zaad:{"van":"van", "stap":"stap", "omhoog":"omhoog", "vraagNaar":"vraagNaar"}},

    gemiddelde: {naam:"Gemiddelde", teken:"📊", vak:"getallen", klasse:"gemiddelde",
                 kleur:"var(--gras)", vanaf:7, maak:"maakGemiddelde",
                 niveau:{7:{hoeveel:4, tot:12}, 8:{hoeveel:5, tot:30}},
                 zaad:{"lijst":"lijst", "hoeveel":"hoeveel", "gem":"gem"}},

    /* ----- Meten, geld en tijd ----- */
    geld: {naam:"Geld", teken:"€", vak:"meten", klasse:"geld", kleur:"var(--zon)",
           vanaf:3, maak:"maakGeld",
           niveau:{3:{helen:true, munten:[100,200,300,400,500], maxCent:1000, stap:100},
                   4:{helen:false, munten:[25,50,75,100,150,200,250,300,400,500], maxCent:2000, stap:25, terug:true},
                   5:{munten:null, maxCent:5000, stap:5},
                   6:{maxCent:10000, stap:5},
                   7:{maxCent:20000, stap:1, drie:true},
                   8:{maxCent:50000}},
           zaad:{"soort":"soort", "centen":"centen", "betaald":"betaald", "aantal":"aantal"}},

    meten: {naam:"Meten", teken:"📏", vak:"meten", klasse:"meten", kleur:"var(--druif)",
            vanaf:4, maak:"maakMeten",
            niveau:{4:{tot:9, omhoog:false}, 5:{tot:12, omhoog:true},
                    6:{tot:25}, 7:{tot:60}, 8:{tot:120}},
            zaad:{"m":"m", "n":"n", "omhoog":"omhoog"}},

    duur: {naam:"Tijdsduur", teken:"⏱", vak:"meten", klasse:"duur", kleur:"var(--klok)",
           vanaf:4, maak:"maakDuur",
           niveau:{3:{stap:15, max:45, duo:false},
                   4:{stap:5, max:55},
                   5:{stap:5, max:90},
                   6:{stap:5, max:180, duo:true},
                   7:{max:240},
                   8:{max:300}},
           zaad:{"u1":"u1", "m1":"m1", "duur":"duur"}},

    kalender: {naam:"Kalender", teken:"📅", vak:"meten", klasse:"kalender",
               kleur:"var(--framboos)", vanaf:4, maak:"maakKalender",
               niveau:{4:{soorten:["maand","weken"], weken:6, vooruit:6},
                       5:{soorten:["maand","weken","dag"], weken:10, vooruit:10},
                       6:{weken:15, vooruit:20},
                       7:{weken:25, vooruit:40}},
               zaad:{"soort":"soort", "mi":"mi", "weken":"weken", "di":"di", "stap":"stap"}},

    oppervlakte: {naam:"Oppervlakte", teken:"📐", vak:"meten", klasse:"oppervlakte",
                  kleur:"var(--gras)", vanaf:6, maak:"maakOppervlakte",
                  niveau:{6:{tot:12}, 7:{tot:20}, 8:{tot:40}},
                  zaad:{"a":"a", "b":"b", "vierkant":"vierkant", "omtrek":"omtrek"}},

    /* ----- Deel van een geheel ----- */
    breuk: {naam:"Breuken", teken:"½", vak:"delen", klasse:"breuk", kleur:"var(--druif)",
            vanaf:5, maak:"maakBreuk",
            niveau:{5:{noemers:[2,3,4], tot:44, teller:false},
                    6:{noemers:[2,3,4,5], tot:60, teller:true},
                    7:{noemers:[2,3,4,5,8], tot:100},
                    8:{noemers:[2,3,4,5,8,10], tot:200}},
            zaad:{"soort":"soort", "teller":"teller", "noemer":"noemer", "k":"k"}},

    procent: {naam:"Procenten", teken:"%", vak:"delen", klasse:"procent",
              kleur:"var(--framboos)", vanaf:6, maak:"maakProcent",
              niveau:{6:{percs:[25,50,75], tot:200, korting:false},
                      7:{percs:[10,20,25,50,75], tot:600, korting:true},
                      8:{percs:[5,10,15,20,25,30,40,50,60,75,80], tot:1200}},
              zaad:{"p":"p", "basis":"basis", "soort":"soort"}},

    verhouding: {naam:"Verhoudingen", teken:"⚖️", vak:"delen", klasse:"verhouding",
                 kleur:"var(--zon)", vanaf:6, maak:"maakVerhouding",
                 niveau:{6:{perStuk:8, stap:25}, 7:{perStuk:16, stap:5}, 8:{perStuk:40, stap:1}},
                 zaad:{"si":"si", "aantal":"aantal", "perStuk":"perStuk", "gevraagd":"gevraagd"}},

    /* ----- Rekenen: rest, deeltafels en verhaaltjes ----- */
    rest: {naam:"Deel met rest", teken:"➗", vak:"rekenen", klasse:"rest",
           kleur:"var(--framboos)", vanaf:5, maak:"maakRest",
           niveau:{5:{deler:6, uitkomst:9}, 6:{deler:10, uitkomst:12},
                   7:{deler:12, uitkomst:25}, 8:{deler:20, uitkomst:30}},
           zaad:{"b":"b", "q":"ant", "r":"ant2"}},

    deeltafels: {naam:"Deeltafels", teken:"🔄", vak:"rekenen", klasse:"deeltafels",
                 kleur:"var(--zee)", vanaf:4, maak:"maakDeeltafel",
                 zaad:{"tafel":"tafel", "q":"ant"}},

    verhaal: {naam:"Verhaaltjes", teken:"📖", vak:"rekenen", klasse:"verhaal",
              kleur:"var(--framboos)", vanaf:3, maak:"maakVerhaal",
              niveau:{3:{ops:["plus","min"], tot:20, factor:5},
                      4:{ops:["plus","min","keer"], tot:100, factor:6},
                      5:{ops:["plus","min","keer","deel"], tot:200, factor:10},
                      6:{tot:500, factor:12},
                      7:{tot:1000}},
              zaad:{"op":"verhaalOp", "a":"a", "b":"b", "q":"ant", "si":"si", "ni":"ni", "ni2":"ni2", "di":"di"}},

    /* geen eigen generator: mengt alles wat aanstaat */
    alles: {naam:"Alles door elkaar", teken:"🎲", vak:"rekenen", klasse:"alles",
            kleur:"var(--alles)", vanaf:3, meta:true, breed:true, orde:9,
            maak:"maakAlles"}
  }
};

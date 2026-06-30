# Reken- en Wiskunde Eisen per Groep in het Nederlandse Basisonderwijs

*Curriculum-onderbouwing voor de Monkey Grove `NL_PO`-pakket — precieze onder- en bovengrens per groep.*

---

## 0. Provenance & status (lees dit eerst)

Dit document is een **synthese** van de officiële Nederlandse kaders, bewerkt tot
een per-groep onder-/bovengrens die direct op de Monkey Grove-engine te
projecteren is. De bronstatus is bewust gedateerd, omdat het curriculum op dit
moment in een wettelijke overgang zit.

**Peildatum van dit document: juni 2026.**

| Kader | Status op peildatum | Gebruik in dit document |
|-------|---------------------|--------------------------|
| **Kerndoelen 2006** | Nog wettelijk geldig; blijven tijdens de **overgangsperiode** bruikbaar (geen harde einddatum op 1 aug 2026) | Achtergrond; niet leidend voor per-groep detail |
| **Kerndoelen rekenen-wiskunde (herziene versie 2025)** | Definitief concept; beoogde inwerkingtreding **1 augustus 2026** (schooljaar 2026-2027), maar **vrijwillig-eerst en gefaseerd**: volledige naleving uiterlijk **augustus 2031** | Toekomstvaste kapstok; scholen mogen er nu al mee werken, hoeven er niet op te wachten |
| **Referentieniveaus 1F / 1S (2010)** | Wettelijk geldig; **actualisatie start naar verwachting in 2026, ~1 jaar looptijd**, daarna pas in wet verankerd | **Leidend** voor onder-/bovengrens (1F = ondergrens-ijkpunt, 1S = bovengrens-ijkpunt) |
| **SLO Tussendoelen rekenen-wiskunde PO (2017)** | Niet-voorschrijvend hulpmiddel; nog steeds de meest gedetailleerde per-groep uitwerking die bestaat | **Leidend** voor de per-groep concretisering (groep 2 t/m 8 op weg naar 1S) |
| **SLO-leerlijnen bij de 2025-kerndoelen** | Nog niet gepubliceerd; verwacht **zomer 2026** | Nog niet verwerkt; herzie dit document zodra ze er zijn |

**Belangrijke nuances (vaak gemist in samenvattingen van het curriculum):**

1. De kerndoelen zijn **aanbodsdoelen** (wat een school moet *aanbieden*); de
   referentieniveaus zijn **beheersingsdoelen** (wat een leerling moet *kennen en
   kunnen*). Voor een game die meet of een kind iets *kan*, zijn de
   referentieniveaus het juiste anker, niet de kerndoelen.
2. De SLO-tussendoelen 2017 bevatten **geen 1F-tussendoelen per groep** — ze zijn
   bewust alleen richting 1S geschreven. De "ondergrens" hieronder is daarom voor
   een deel een **ontwerp-heuristiek** (afgeleid van de 1F-eindbeschrijving en van
   wat realistisch is voor de groep), geen letterlijk overgenomen officieel
   niveau. Waar de grens heuristisch is, staat dat erbij.
3. **Groep 1 heeft geen tussendoelen.** SLO formuleert bewust geen
   beheersingsdoelen voor groep 1 (kleuters ontwikkelen zich te sprongsgewijs); de
   eind-groep-2-doelen gelden voor beide kleuterjaren. Voor het jonge kind bestaat
   alleen informeel, voorbereidend materiaal. Speelbare, getoetste inhoud begint
   pas bij groep 2-3.

**Bronnen:** SLO *Tussendoelen rekenen-wiskunde voor het primair onderwijs*
(2017); SLO/OCW *Kerndoelen Nederlands en rekenen-wiskunde, herziene versie 2025*
(actualisatiekerndoelen.nl); *Referentiekader taal en rekenen* (2010); Kamerbrief
curriculumactualisatie (Tweede Kamer 31 293). Voor de allerlaatste status:
[actualisatiekerndoelen.nl/rekenenwiskunde](https://www.actualisatiekerndoelen.nl/rekenenwiskunde)
en [slo.nl](https://www.slo.nl).

---

## 1. Het onder-/bovengrens-model (precies gedefinieerd)

De termen "lower bound / upper bound" worden vaak losjes gebruikt. Voor een
adaptieve engine die problemen target op ~65% verwachte succeskans, moet de
betekenis scherp zijn. Hieronder de definitie die de rest van dit document
consequent gebruikt.

**Drie niveaus per leerdoel, niet twee.** Een enkel doel (bijv. "tafels tot 10")
leeft op een ladder. Monkey Grove heeft die ladder al als **18-skill ladder met
Elo-achtige ratings**; dit document levert de inhoudelijke ijkpunten ervoor.

- **Floor (ondergrens / `1F`-richting).** De minimale, functionele uitvoering:
  procedure correct toepassen in een vertrouwde, kale context, met scaffolds
  zichtbaar. Dit is het niveau waar de engine een kind **nooit onder** zet op
  basis van leeftijd. Komt overeen met "kan het, met steun".
  *In game-termen: scaffold zichtbaar, kleine getallen, één stap, geen afleiders.*

- **Target (kerngrens / verwacht eind-groepsniveau).** Wat een gemiddeld kind aan
  het **eind van die groep** zelfstandig en vlot kan, zonder permanente scaffold.
  Dit is het zwaartepunt van de oefening voor die groep. Komt overeen met het
  tussendoel-eindpunt voor die groep richting 1S.
  *In game-termen: scaffold faded, normale getalgrootte, redeneerstap aanwezig.*

- **Stretch (bovengrens / `1S`-en-hoger-richting).** Inzicht, flexibele
  strategie, schatten/checken, toepassen in nieuwe of "lastige" context, kritisch
  redeneren ("klopt dit?"). Dit is waar de engine een kind heen mag laten reiken
  als de warming-up of de ratings dat rechtvaardigen.
  *In game-termen: scaffold weg, grotere/gemene getallen, meerstaps, misconception-
  vallen actief, "leg uit waarom".*

**Cumulatief, niet vervangend.** Aan het eind van groep 5 beheerst een kind de
doelen van groep 2-4 *op het niveau van groep 5* (sneller, grotere getallen, meer
abstract). De engine moet eerdere skills dus als onderhoud (Echo Doors / spaced
review) blijven aanbieden, niet afsluiten.

**Floor schuift mee met leeftijd, Stretch is zacht.** Conform de repo: de
leeftijd-afgeleide groep is een *vloer* (eligible practice start daar); hogere
stages mogen meedoen zodat de leerling kan stretchen; alleen de ouder kan de
vloer expliciet verlagen.

---

## 2. Domeinen en hun afbeelding op Monkey Grove

SLO kent vier domeinen. Monkey Grove heeft vier werelden plus een
zakelijke-context laag. De afbeelding is grotendeels schoon, met één bewuste
waarschuwing.

| SLO-domein | Subdomeinen | Monkey Grove-wereld / verb |
|------------|-------------|-----------------------------|
| **Getallen** | Getalbegrip; Bewerkingen (+/−, ×/÷) | **Tide Pools** (+/−, missing addend, carry/borrow — *fetch the stone*); **Banana Garden** (× via *walked-out arrays*); **Sharing Stump** (÷, eerlijk delen, rest, missing factor — *deal coconuts*) |
| **Verhoudingen** | Verhoudingen, breuken, procenten, schaal | **Vine Heights** (breuken op getallenlijn, vergelijken, equivalentie, breuk-van-een-getal — *stand on the point*); % en schaal in de **business**-laag |
| **Meten & Meetkunde** | Meten (lengte, opp., inhoud, gewicht, tijd, geld); Meetkunde (ruimte, vormen, symmetrie) | Deels **business**-context (geld, meten, gewicht in bakkerij/pizzeria); meetkunde grotendeels nog **curriculumdekking, niet speelbaar** |
| **Verbanden** | Patronen, grafieken, data, coördinaten | Deels **business** (data/winst); grafieken/coördinaten nog **niet speelbaar** |

**Waarschuwing voor het `domain`-enum.** Het is verleidelijk om
"Meten & Meetkunde" als één kop te bucketen en daarbij symmetrie/perspectief vs.
data/grafieken inconsistent te splitsen. SLO behandelt **Meten** en **Meetkunde** als aparte
subdomeinen, en **Verbanden** (data, grafieken, coördinaten, patronen) als een
*vierde* domein los van meetkunde. Als jouw coverage-rapport per `domain` keyt,
gebruik dan vier waarden — `GETALLEN`, `VERHOUDINGEN`, `METEN_MEETKUNDE`,
`VERBANDEN` — en tag symmetrie/perspectief onder `METEN_MEETKUNDE`, niet onder
`VERBANDEN`. Patronen horen bij `VERBANDEN`.

**Eerlijkheid over dekking.** Monkey Grove dekt vandaag de **Getallen**- en
**Verhoudingen**-domeinen speelbaar (de vier werelden), plus een deel van
**Meten/Verbanden** via de zakelijke context. Zuivere **meetkunde** (spiegeling,
perspectief, constructies, coördinaten) en formele **grafieken** zijn per
peildatum *contextuele/geplande* doelen, geen 3D-quest. Het oudermenu hoort dat
onderscheid expliciet te tonen.

---

## 3. Leeftijd → groep → stage (placement)

Voor `NL_PO` is leeftijd een **ondergrens-schatter**, geen exact label. De
mapping hieronder is de standaard; de ouder kan hem overschrijven, en een bekende
verjaardag laat de vloer over tijd meeschuiven.

| Leeftijd (peildatum) | Groep | Interne stage | Speelbaar vandaag? |
|----------------------|-------|---------------|---------------------|
| 4–5 | Groep 1 | `grade_1` | Nee — informeel/observatie alleen |
| 5–6 | Groep 2 | `grade_2` | Beperkt — voorbereidend |
| 6–7 | Groep 3 | `grade_3` | Ja — Tide Pools, Sharing Stump (intro) |
| 7–8 | Groep 4 | `grade_4` | Ja — +/− tot 100, tafels 1-5/10 |
| 8–9 | Groep 5 | `grade_5` | Ja — tot 1.000, intro breuken/decimalen |
| 9–10 | Groep 6 | `grade_6` | Ja — kern: ×/÷ groot, breuken, Vine Heights |
| 10–11 | Groep 7 | `grade_7` | Ja — breuk-equivalentie, %, schaal, business |
| 11–12 | Groep 8 | `grade_8` | Ja — alle bewerkingen, % gevorderd, business |
| 12–13 | (overgang VO) | `grade_8` cap | Onderhoud op 1S |

> **Voorbeeld (jouw dochter, 11, groep 6).** Leeftijd 11 zou normaal naar
> `grade_7`/`grade_8` als vloer schatten. Omdat zij feitelijk in **groep 6** zit,
> is dit precies het geval waarvoor de **ouder-override** bestaat: zet de
> bevestigde stage op `grade_6`. De vloer wordt dan groep 6; de warming-up en
> ratings mogen haar richting groep 7-stretch laten reiken waar ze sterk is
> (bijv. tafels), zonder haar terug te duwen naar groep 4-sommen. Een verjaardag
> verhoogt die ouder-bevestigde vloer **niet** stilzwijgend.


---

## 4. Overzichtstabel: kerngrens (Target) per groep

Snelle referentie van het **eind-groepsniveau** (Target). Floor ligt één stap
lager (kleinere getallen, scaffold, één stap); Stretch één stap hoger (zie §5 per
groep).

| Groep | Getalbereik | Automatisering | Bewerkingen (Target) | Breuk / decimaal / % | Meten | Meetkunde & Verbanden |
|-------|-------------|----------------|----------------------|----------------------|-------|------------------------|
| 1–2 | tot 20 (subitizing tot 6) | splitsen tot 10 | +/− handelend tot ~12-20 | helft/kwart in context (kwalitatief) | vergelijken met natuurlijke maat; dag/nacht; geld tot €10 | ruimtelijke begrippen; patronen; pictogram |
| 3 | telrij/getallen tot 100 (bewerkingen tot 20) | +/− & splitsen tot 10; +/− tot 20 uit hoofd | +/− tot 20 formeel + strategie | helft in verdeling | natuurlijke maat + waarom vaste maat; hele uren; geld tot €20 | links/rechts; routes/plattegrond; beeld-/staafdiagram |
| 4 | tot 100 (tientalstructuur) | +/− tot 20; tafels 1-5 en 10 | +/− tot 100 (splitsen, compenseren); informeel ×/÷ | kwart; eenvoudige verhouding (recept) | m/cm, kg, liter; omtrek; opp. met rooster; halve/kwartier | vormen benoemen/sorteren; patroon voortzetten |
| 5 | tot 1.000 | onderhoud +/−; tafels 6-10 erbij → **alle tafels tot 10 uit het hoofd (eind groep 5)** | +/− tot 1.000 (kolom); schatten; informeel ×/÷ | decimalen in geld (2 dec.); intro breuk | mm/dm/km; herleiden; inhoud maatbeker | eenvoudige diagrammen kritisch lezen |
| 6 | tot ±100.000 | **onderhoud tafels tot 10** (retentie) | efficiënt +/−/×/÷; decimalen in geld | breuk lezen/noteren (teller/noemer); decimaal tot 2 dec.; 1/4=25% | volledige omrekening (m/km); kg met decimaal | symmetrie; perspectief; staaf-/lijndiagram |
| 7 | tot ±1 miljoen | onderhoud | efficiënt alle bewerkingen; schatten/checken | equivalentie breuk; % basis (25/50%); schaal 1:100 | dam + prefixen; opp.-/inhoudsformules; negatieve temp.; tijdsduur | puntspiegeling; grafiek tekenen/lezen; coördinaten (positief) |
| 8 | miljoenen/miljarden | volledig onderhoud | alle bewerkingen met decimalen & breuken (ongelijknamig +/−, ×/÷ breuk); % toename/afname/korting | volledige relatie breuk↔decimaal↔% (1:100=1%); schaalberekening | volledig metriek stelsel + combinaties; dichtheid | perspectief/standpunt; taartdiagram; coördinaten; data kritisch |

---

## 5. Gedetailleerde eisen per groep — Floor / Target / Stretch

Elke groep geeft per relevant (sub)domein drie regels:
**F** = Floor (ondergrens), **T** = Target (eind-groep), **S** = Stretch (1S+).
`[heuristiek]` markeert een ondergrens die is afgeleid, niet letterlijk uit de
2017-tussendoelen overgenomen. `▷` geeft de Monkey Grove-afbeelding.

### Groep 1–2 (4–7 jaar) — Voorbereidend en beginnend rekenen

**Focus:** spelenderwijs getalbegrip, vergelijken, ruimtelijk inzicht, patronen.
Geen formele sommen; handelend werken met voorwerpen. *Groep 1 is informeel en
niet getoetst; speelbare inhoud begint pas richting eind groep 2.*

**Getallen & getalbegrip**
- **F** `[heuristiek]` Telrij als versje tot 10; hoeveelheden tot 5 herkennen; meer/minder/evenveel.
- **T** Telrij tot 20 (vooruit; achteruit onder 10); rangtelwoorden tot 10; hoeveelheden tot 12 tellen/weergeven; vergelijken/ordenen tot 20; tot 6 overzien zonder tellen (subitizing); symbolen 0-10 lezen.
- **S** Kritisch redeneren over hoeveelheid in context ("is 5 veel of weinig?"); flexibel splitsen tot 10 uit het hoofd.

**Bewerkingen** ▷ *Tide Pools (intro, handelend)*
- **F** `[heuristiek]` Erbij/eraf met voorwerpen tot 6.
- **T** +/− tot 12-20 handelend oplossen; splitsen tot 10-12 handelend; splitsen tot 10 uit het hoofd.
- **S** Splitsen flexibel inzetten als strategie; verbaliseren waarom een splitsing klopt.

**Verhoudingen / Meten / Meetkunde (informeel)**
- **T** Helft/kwart in concrete verdeelsituaties; lang/kort, zwaar/licht, vol/leeg vergelijken; dag/nacht en duur ordenen; betalen met 1-euromunten tot €10; voor/achter/naast/links/rechts; cirkel/driehoek/vierkant benoemen; patroon voortzetten; pictogram/staafje aankruisen.

> **Engine-notitie.** Voor `grade_1`/`grade_2` zijn er geen getoetste ratings; toon
> deze stage als *observatie/voorbereidend* in het oudermenu, niet als skill-ladder
> met Elo. Een 4-jarige hoort geen faal-gevoelige som te krijgen.

### Groep 3 (6–8 jaar) — Beginnend formeel rekenen

**Focus:** getallen tot 100, formele +/−-taal, strategieën, klok/geld in context.

**Getallen** 
- **F** Telrij tot 100 als routine; getallen tot 20 globaal op getallenlijn.
- **T** Telrij tot 100 (vooruit/achteruit); vergelijken/ordenen tot 100; getallen 0-100 lezen/uitspreken; verkorte telling tot 20 via vijfstructuur; dichtbij/verder in de rij.
- **S** Betekenis van getallen geven met eigen voorbeelden; kritisch redeneren over telrij/hoeveelheden tot 20.

**Bewerkingen** ▷ *Tide Pools (formeel, scaffold), Sharing Stump (intro delen)*
- **F** Eenvoudige +/− tot 20 met steun (scaffold/getallenlijn zichtbaar).
- **T** Formele +/−-sommen tot 20 uit het hoofd met strategie (verwisselen, bijna-dubbel, via 5/10, omvormen, analogie); +/− en splitsen tot 10 uit het hoofd; inverse relatie + en −; eenvoudige × (herhaald optellen) en informeel ÷ (verdelen) tot 20.
- **S** Kritisch redeneren over een berekening tot 20 ("kan dit kloppen?"); strategie kiezen i.p.v. tellen.

**Verhoudingen / Meten / Meetkunde & Verbanden**
- **T** Helft van geheel/hoeveelheid; kwalitatieve verhouding verwoorden (meer siroop → zoeter); waarom een vaste maat eerlijk is; hele uren op de klok; munten/biljetten tot €20; route via plattegrond; beeld-/staafdiagram aflezen en invullen (turven); patroon voortzetten en inconsequentie opmerken.

### Groep 4 (7–9 jaar) — Uitbreiding en automatisering

**Focus:** getallen tot 100 met tientalstructuur, tafels, standaardmaten, kwart.

**Getallen**
- **F** Tellen met sprongen van 2/5/10 tot 100; even/oneven herkennen.
- **T** Schatten/tellen/weergeven tot 100 gestructureerd in tientallen; splitsen in tientallen/eenheden (positiewaarde); tientalstructuur doorzien.
- **S** Kritisch redeneren over getalstructuur (bijv. "precies 100 antwoorden tot 100?").

**Bewerkingen** ▷ *Tide Pools (tot 100), Banana Garden (× via arrays), Sharing Stump*
- **F** +/− tot 100 met kolom of steun; tafels 1-5 en 10 gedeeltelijk.
- **T** Formele +/− tot 100 met strategie (rijgen/splitsen, via tiental, compenseren, analogie, inverse); +/− tot 20 uit het hoofd onderhouden; **tafels 1 t/m 5 en 10 uit het hoofd**; betekenis × (aantal keer); formele × onder 100; informeel ÷; ×-strategie (verdubbelen/halveren, één meer/minder).
- **S** Schatten van +/− tot 100; kritisch redeneren over een uitkomst; tafelfeit via een ander tafelfeit afleiden.

**Verhoudingen / Meten / Meetkunde**
- **T** Kwart van geheel/hoeveelheid; eenvoudige verhouding met tabel (recept); meter/centimeter (1 m = 100 cm), liniaal; omtrek (touwtje); opp. met rooster; liter/ml met maatbeker; kg in hele kg; klok hele/halve/kwartier, rekenen met halve uren; kalender; geld tot €100 met wisselen; vormen sorteren op kenmerk; patroon ontwerpen.

### Groep 5 (8–10 jaar) — Grotere getallen, intro decimalen/breuken

**Focus:** getallen tot 1.000, kolomrekenen, decimalen in geld, omrekeningen.

**Getallen**
- **F** +/− tot 1.000 met steun; willekeurige delen van de telrij tot 1.000.
- **T** Schatten/tellen/weergeven tot 1.000 (honderdtallen/tientallen); positiewaarde tot 1.000; getallen tot 1.000 lezen/schrijven/uitspreken; afronden op honderdtallen; sprongen van 10/100.
- **S** Kritisch redeneren (bijv. "hoeveel getallen tot 1.000 met één 9?"); decimale structuur uitleggen.

**Bewerkingen** ▷ *Tide Pools (tot 1.000, kolom), Banana Garden, Sharing Stump*
- **F** Basis +/− en splitsen onderhouden; eenvoudige ×/÷ onder 20 handelend.
- **T** Formele +/− tot 1.000 (kolom/cijferen) met strategie (ketting, splits, kolom); schatten van +/− tot 1.000; eenvoudige geldsommen met twee decimalen; tafels 6 t/m 10 erbij leren → **alle tafels tot 10 uit het hoofd (eind groep 5)**; × per rij/groep, ÷ informeel.
- **S** Redeneren over het verschil bij schatten; kritisch over een uitkomst tot 1.000; strategie kiezen op basis van de getallen.

**Verhoudingen / Meten / Meetkunde & Verbanden**
- **T** Eenvoudige verhouding herkennen (recept/keten); mm/dm/km en herleiden (2 m 40 cm = 240 cm); omtrek rechthoek; opp. met rooster/grillige vorm; inhoud met maatbeker; onderhoud eerdere maten; eenvoudige diagrammen kritisch bekijken.

### Groep 6 (9–11 jaar) — Decimalen, breuken en grotere schaal  ⭐ *kerngroep voor je dochter*

**Focus:** getallen tot ±100.000, decimalen tot 2 plaatsen, breuken lezen/noteren,
efficiënte bewerkingen, intro %, volledige omrekeningen. **Dit is de groep waar
Vine Heights (breuken) het zwaartepunt wordt.**

**Getallen**
- **F** Getallen tot ±100.000 lezen/schrijven met procedure; basis decimaal/breuk herkennen; tafels tot 10 nog met steun.
- **T** Lezen/schrijven/uitspreken tot ±100.000 (met punt/spatie); sprongen 1/10/100/1.000/10.000; vergelijken/ordenen/plaatsen op lijn; afronden op honderd-/duizendtallen; positiewaarde + decimale structuur uitleggen; decimalen tot 2 plaatsen lezen/schrijven (0,4; 1,25), betekenis in geld/meten; splitsen met helen/tienden/honderdsten; breuken lezen/noteren (teller/noemer in context), stambreuk vs. samengestelde, breuk op getallenlijn plaatsen, benoemde breuken vergelijken.
- **S** Kritisch redeneren over decimale plaats ("is 1,25 meer of minder dan 1,3?"); breuk en decimaal aan elkaar koppelen in context; gelijkwaardige breuken bedenken.

**Bewerkingen** ▷ *alle vier werelden; Banana Garden + Sharing Stump op volle kracht*
- **F** +/−/×/÷ met grotere getallen volgens procedure (scaffold); **tafels tot 10 nog niet vlot** (achterstand t.o.v. de eind-groep-5-norm).
- **T** **Alle tafels tot 10 vlot onderhouden** (Banyan Gem Tree — retentie; de automatisering hoort eind groep 5 rond te zijn); efficiënt +/− tot ±100.000 (strategie + formeel); ×/÷ met inzicht (strategie, schatten, checken, rest interpreteren); decimalen in geld +/−; inverse relaties ×/÷.
- **S** Kritisch redeneren over procedure én rest ("klopt de rest van deze deling?"); flexibel tussen strategie en cijferen kiezen; misconception-vallen weerstaan (bijv. 0,4 < 0,12 is fout).

**Verhoudingen** ▷ *Vine Heights kern*
- **F** Breuk als deel van een geheel herkennen; 1/2 en 1/4 plaatsen.
- **T** Verhoudingsnotaties herkennen (breuk/%/schaal: 1/4 = 25% = 1 op 4); breuk als deel van geheel/hoeveelheid; verdeel/bereken met breuk (2/3 van 300 = 200); relatie verhouding-breuk.
- **S** Kritisch redeneren ("wie krijgt meer pizza: 2 stukken of 1/2?"); breuk-van-hoeveelheid in onbekende context toepassen.

**Meten / Meetkunde & Verbanden**
- **T** Volledige omrekeningen (m ↔ km); omtrek/oppervlakte berekenen; gewicht met decimalen, ton; tijdsduur in uren/minuten; symmetrie (lijn- en puntspiegeling checken); perspectief/standpunt; staaf-/lijndiagram lezen/tekenen en vergelijken.
- **S** Kritisch over data en patronen redeneren; betogen waarom twee figuren dezelfde opp. maar andere omtrek hebben.

> **Engine-notitie voor groep 6.** Twee dingen domineren hier: (1) **tafels tot 10
> op peil houden** — de automatisering hoort eind groep 5 rond te zijn, groep 6 is
> onderhoud/retentie en de Gem Tree is daarvoor precies het juiste instrument; en (2)
> **breukbegrip via de getallenlijn** — Vine Heights. De grootste misconception om
> te taggen is de "langere decimaal = groter"-fout (0,4 vs 0,12) en
> "grotere noemer = grotere breuk" (1/8 vs 1/4). Laat de visuele uitleg juist
> dáár terugkomen.

### Groep 7 (10–12 jaar) — Verfijning, procenten, schaal

**Focus:** tot ±1 miljoen, vlot rekenen met decimalen tot 2 plaatsen (precisie/
afronden), equivalentie breuken, basis %, schaal, opp./inhoud-formules, negatieve
temperaturen, grafieken.

**Getallen**
- **F** Procedures voor grote getallen; decimalen tot 2 plaatsen vlot.
- **T** Tot ±1 miljoen (ton/miljoen benoemen); contextafhankelijk afronden; vlot rekenen met decimalen tot 2 plaatsen, nauwkeurigheid/betekenis van decimale plaatsen (2,16 nauwkeuriger dan 2,1) — duizendsten/3 plaatsen pas in groep 8; breuk-verschijningsvormen (deel, meting, deling, getal, verhouding); breuk → decimaal (1/5 = 0,2); vergelijken/ordenen/vereenvoudigen (9/12 = 3/4; 17/3 = 5 2/3).
- **S** Gelijkwaardige breuken zelf bedenken; redeneren over nauwkeurigheid en betekenis van decimale plaatsen.

**Bewerkingen** ▷ *onderhoud + business-context*
- **F** Alle bewerkingen volgens procedure; schatten met steun.
- **T** Efficiënt alle bewerkingen met inzicht; schatten/checken; redeneren over procedure (komma-uitlijning, eigenschappen van bewerkingen).
- **S** Ambiguïteit en volgorde aanvoelen; checken of een machinale uitkomst plausibel is.

**Verhoudingen** ▷ *business: korting, prijs*
- **F** Eenvoudige % herkennen (25%, 50%); schaal aflezen.
- **T** Gelijkwaardige breuken ↔ % (20% = 2:5 = 4:10); %-problemen (25% korting op €80 = €60); schaalnotatie (3 cm op tekening, schaal 1:100 → echte lengte).
- **S** Kritisch redeneren over % en verhouding ("13/25 vs 11/20: wie scoort vaker?").

**Meten / Meetkunde & Verbanden**
- **T** Decameter + prefixen, omrekenen (km → mm); opp. driehoek/rechthoek/L-vorm; inhoud m³/dm³/cm³ (1 m³ = 1000 dm³ = 1000 L); gewicht met decimaal en ton; negatieve temp. interpreteren (−2 vs −4 °C); tijdsduur en data; puntspiegeling; lijngrafiek uit tabel tekenen; coördinaten (positief); taartdiagram maken.
- **S** Redeneren "zelfde opp., andere omtrek"; data uit verschillende representaties vergelijken en kritisch interpreteren.

### Groep 8 (11–13 jaar) — Integratie en voorbereiding VO

**Focus:** volledige beheersing tot miljoenen/miljarden, alle bewerkingen met
breuken en decimalen, gevorderde % (korting, toename, >100%), schaalberekeningen,
volledig metriek stelsel, diepe redenering, data-analyse. Klaar voor vmbo/havo/vwo
op **1S-niveau**.

**Getallen**
- **F** Lezen/schrijven van grote getallen en decimalen volgens procedure.
- **T** Benamingen miljoen/miljard; splitsen met miljoenen; decimalen lezen/schrijven/vergelijken/afronden (op hele/tienden/honderdsten), splitsen tot duizendsten; alle breuk-verschijningsvormen; breuk ↔ decimaal omzetten (incl. afronden); vergelijken via gelijknamig maken; vereenvoudigen; equivalentie.
- **S** Kritisch redeneren over getallen tussen 0 en 1, grootte en verschillende betekenissen.

**Bewerkingen** ▷ *volledig; business als toepassingslaag*
- **F** Standaardprocedure correct voor alle bewerkingen incl. breuk/decimaal/%.
- **T** Volledig onderhoud basisfeiten; efficiënt +/− decimalen (schatten/checken); ×/÷ hele getallen met inzicht (eigenschappen: + en × verwisselbaar, − en ÷ niet), rest interpreteren; ×/÷ door 10/100; volgorderegels en haakjes; breuken +/− ongelijknamig (gelijknamig maken + vereenvoudigen); breuk × of ÷ met geheel of breuk; rekenmachine verstandig inzetten.
- **S** Redeneren over ambiguïteit (4 + 5 × 6); "er is geen kleinste breuk"; checken of rest en uitkomst kloppen; afwegen hoofdrekenen vs. machine.

**Verhoudingen** ▷ *business: winst, korting, belasting*
- **F** % en schaal in standaardcontext.
- **T** Verhouding als breuk/%/decimaal (6/24 = 1:4 = 25%); % >100% (rente, belasting); schaalberekening (8 cm op 1:50.000 → km); 1%-regel, toename/afname, korting, oorspronkelijke prijs terugrekenen.
- **S** Kritisch redeneren ("klopt dit brandstofverbruik?"; "13/25 vs 11/20?").

**Meten / Meetkunde & Verbanden**
- **T** Volledig metriek stelsel + combinaties; opp./inhoud-formules; afgeleide grootheden (inwoners/km², dichtheid); perspectief/standpunt/kijkhoek/spiegeling; coördinaten; taartdiagram; representaties vergelijken.
- **S** Redeneren over schaal-effecten (lineair ×2 → opp. ×4); data kritisch interpreteren en over patronen/relaties redeneren.

---

## 6. Skill-ladder ↔ curriculum (18 skills)

De repo noemt een **18-skill ladder met per-skill Elo-rating**, problemen getarget
op ~65% succes, en scaffolds die faden. Hieronder een voorgestelde mapping van
curriculumdoelen op skill-slots, met de groep waar elke skill zijn **Target**
bereikt. Pas de namen aan op je feitelijke `mathengine.js`/`curriculum`-enum; de
*volgorde en grenzen* zijn het inhoudelijke punt.

| # | Skill | Wereld | Floor-groep | Target-groep | Stretch |
|---|-------|--------|-------------|--------------|---------|
| 1 | Tellen & getalbegrip tot 20 | Tide Pools | 1 | 2 | redeneren over hoeveelheid |
| 2 | Splitsen tot 10 | Tide Pools | 2 | 3 | splitsen als strategie |
| 3 | +/− tot 20 uit hoofd | Tide Pools | 3 | 3 | strategie i.p.v. tellen |
| 4 | +/− tot 100 | Tide Pools | 3 | 4 | schatten + compenseren |
| 5 | +/− tot 1.000 (kolom) | Tide Pools | 4 | 5 | schatten + redeneren |
| 6 | +/− tot 100.000 + decimalen geld | Tide Pools | 5 | 6 | inzicht in komma/nullen |
| 7 | Tafels 1-5 en 10 | Banana Garden | 3 | 4 | tafelfeit afleiden |
| 8 | Tafels 6-10 (alle tot 10) | Banana Garden | 4 | 5 | × als array begrijpen |
| 9 | × meercijferig | Banana Garden | 5 | 7 | strategie kiezen |
| 10 | Delen + rest | Sharing Stump | 4 | 6 | rest interpreteren |
| 11 | Missing factor / inverse ×÷ | Sharing Stump | 5 | 6 | inverse als check |
| 12 | × / ÷ decimalen (×÷ 10/100) | Sharing Stump | 6 | 8 | redeneren over komma |
| 13 | Breuk herkennen/plaatsen op lijn | Vine Heights | 5 | 6 | benoemde breuk vergelijken |
| 14 | Breuk vergelijken / equivalentie | Vine Heights | 6 | 7 | gelijkwaardige breuk bedenken |
| 15 | Breuk van een hoeveelheid | Vine Heights | 6 | 7 | onbekende context |
| 16 | Breuk +/− (ongelijknamig), ×/÷ | Vine Heights | 7 | 8 | "geen kleinste breuk" |
| 17 | Procenten (25/50%, korting, >100%) | business | 7 | 8 | 1%-regel, terugrekenen |
| 18 | Schaal & verhouding | business | 7 | 8 | schaal-effect op opp. |

**Twee misconception-clusters om expliciet te taggen** (grootste hefboom voor
"snappen i.p.v. trucje"):

1. **Decimaal-lengte = grootte** (0,4 < 0,12 lijkt waar). Visuele uitleg:
   plaatswaarde-strip of getallenlijn. Relevant vanaf skill 6/12.
2. **Grotere noemer = grotere breuk** (1/8 > 1/4 lijkt waar). Visuele uitleg:
   Vine Heights-getallenlijn of taart. Relevant vanaf skill 13/14.

Een derde, kleiner: **rest "valt weg"** bij deling (13 ÷ 4 = 3, rest vergeten) —
tag in skill 10.

---

## 7. Huidige speelbare dekking vs. curriculumdekking

Niet elk `NL_PO`-doel is een 3D-quest. Houd dit onderscheid zichtbaar in het
oudermenu (coverage by domain & objective), zodat duidelijk is wat *geoefend*
wordt en wat *gepland/contextueel* is.

**Speelbaar vandaag:**
- **Groep 3-5:** +/−, ontbrekende termen, tafels, delen/verdelen — Tide Pools,
  Banana Garden, Sharing Stump.
- **Groep 6:** grotere ×, deling, resten, inverse relaties, breuken — arrays,
  baskets, number-line/fraction mechanics (Vine Heights).
- **Groep 7-8:** onderhoud bewerkingen, breuk vergelijken/equivalentie,
  breuk-van-hoeveelheid, inverse ×, en zakelijke context (geld, meten, %, winst,
  data) in bakkerij/pizzeria.

**Nog niet speelbaar (curriculumdekking / gepland):**
- Zuivere **meetkunde**: spiegeling, perspectief, standpunt, constructies (groep 6-8).
- Formele **grafieken & coördinaten**: lijn-/staaf-/taartdiagram tekenen,
  coördinaten plaatsen (groep 6-8).
- **Meten** als zelfstandig domein buiten de business-context: omtrek/oppervlakte/
  inhoud-formules, negatieve temperatuur, tijdsduurberekening (groep 6-8).

Dit zijn de logische kandidaten voor volgende werelden/quests als je de
Getallen+Verhoudingen-kern wilt uitbreiden naar de volle SLO-breedte.

---

## 8. Conclusie & aanbevelingen

De **referentieniveaus** (1F-vloer, 1S-streef) en de **SLO-tussendoelen 2017**
geven samen een helder, cumulatief kader. Voor Monkey Grove vertaalt dat naar:
een **leeftijd-afgeleide vloer** die nooit te laag zakt, een **Target** per groep
als zwaartepunt van de oefening, en een **zachte Stretch** waar de adaptieve
engine een kind laat reiken.

**Concreet voor de bouw:**
1. Anker per-groep inhoud op de **2017-tussendoelen** (meest gedetailleerd), niet
   op de kerndoelen — die zijn aanbodsdoelen, geen beheersingsdoelen.
2. Behandel de **ondergrens** als 1F-richting + heuristiek, en zeg dat eerlijk in
   het oudermenu; doe niet alsof er officiële 1F-tussendoelen per groep bestaan.
3. Gebruik **vier domeinwaarden** (`GETALLEN`, `VERHOUDINGEN`, `METEN_MEETKUNDE`,
   `VERBANDEN`) en tag symmetrie/perspectief onder meten/meetkunde, patronen onder
   verbanden.
4. Plaats **tafel-automatisering eind groep 5** en gebruik **groep 6** voor
   tafel-onderhoud/retentie (Gem Tree) plus breukbegrip op de getallenlijn (Vine
   Heights), met de twee misconception-clusters uit §6 actief.
5. **Herzie dit document zodra de SLO-leerlijnen bij de 2025-kerndoelen
   verschijnen (zomer 2026)** en zodra de referentieniveau-actualisatie (start
   2026) is afgerond — die kan de 1F/1S-grenzen verschuiven.

Ouders en leerkrachten volgen voortgang via methode-/Cito-/IEP-toetsen en
strategie-observatie; in Monkey Grove via accuracy, attempts en mastery per skill
plus de coverage-weergave.

---

**Bronnen & verder lezen**

*Officiële kaders (leidend voor inhoud en status):*
- SLO (2017). *Tussendoelen rekenen-wiskunde voor het primair onderwijs* (groep 2
  t/m 8, op weg naar streefniveau 1S). Primaire bron voor de per-groep
  concretisering en de vier domeinen (Getallen, Verhoudingen, Meten & Meetkunde,
  Verbanden). PDF: <https://www.slo.nl/publish/pages/3176/tussendoelen-rekenen-wiskunde-po-2017_1.pdf> ·
  landing: <https://www.slo.nl/@4587/tussendoelen-rekenen/>
- *Referentiekader taal en rekenen* (2010), referentieniveaus 1F (fundamenteel
  niveau) en 1S (streefniveau). Wettelijk verankerd per 1 augustus 2010
  (Stb. 2010, 194): <https://zoek.officielebekendmakingen.nl/stb-2010-194.html> ·
  kaderdocument: <https://handleiding.toets.nl/upload/files/Referentiekader%20Taal%20en%20Rekenen(1).pdf>
- SLO/OCW (2025). *Definitieve-conceptkerndoelen Nederlands en rekenen en wiskunde,
  herziene versie 2025.* Definitief concept; beoogde inwerkingtreding 1 augustus
  2026, vrijwillig-eerst en gefaseerd (volledige naleving uiterlijk augustus 2031):
  <https://www.actualisatiekerndoelen.nl/rekenenwiskunde>

*Status & wetgevingstraject (geraadpleegd voor de provenance-tabel in §0):*
- Rijksoverheid (21-11-2025). *Belangrijke mijlpaal nieuwe kerndoelen* — nieuwe
  kerndoelen "naar verwachting 1 augustus 2026 van kracht"; scholen tot augustus
  2031 om hun aanbod aan te passen:
  <https://www.rijksoverheid.nl/onderwerpen/basisvaardigheden>
- Wetgevingskalender (Besluit kerndoelen, WGK027201): advies Raad van State
  23-04-2026, bekrachtiging ~05-06-2026, stap "bekendmaking":
  <https://wetgevingskalender.overheid.nl/>
- SLO — herziening referentieniveaus: start 2026, looptijd ca. één jaar, daarna
  verankering in wet; besluitvorming over toekomstig Referentiekader voorjaar 2026;
  concept-leerlijnen voorjaar 2026, definitieve leerlijnen zomer 2026:
  <https://www.slo.nl/thema/meer/taal-rekenen/>
- Rijksoverheid — *Referentieniveaus taal en rekenen* (definitie aanbodsdoelen vs.
  beheersingsdoelen): <https://www.rijksoverheid.nl/onderwerpen/basisvaardigheden/referentieniveaus-taal-en-rekenen>
- Tweede Kamer, dossier 31 293 — curriculumactualisatie (status kerndoelen &
  referentieniveaus).

*Per-groep concretisering & ouderoverzichten (geraadpleegd voor §4/§5):*
- Onderwijskennis.nl — leerlijnen getallen/bewerkingen per groep:
  <https://www.onderwijskennis.nl/>
- Wijzer over de basisschool — per-groep rekenoverzichten (o.a. tafels eind groep 5;
  cijferend rekenen tot 1.000 in groep 5; breuken/decimalen/procenten-opbouw):
  <https://wijzeroverdebasisschool.nl/rekenen>
- CED-groep — leerlijnen rekenen-wiskunde (gedetailleerde uitwerkingen per groep).

*Dit document is een synthese op basis van officiële bronnen, bewerkt voor het
Monkey Grove `NL_PO`-pakket. Voor exacte formuleringen per subdomein: raadpleeg de
originele SLO-publicaties. De inhoudelijke claims zijn in juni 2026 geverifieerd
tegen bovenstaande bronnen. Peildatum: juni 2026.*
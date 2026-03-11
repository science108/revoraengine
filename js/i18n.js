(function(){

const TRANSLATIONS = {

/* ═══════════════════ POLSKI (domyślny) ═══════════════════ */
pl: {
  /* nav */
  'nav.breakthrough': 'Przełom',
  'nav.tech':         'Technologia',
  'nav.products':     'Produkty',
  'nav.market':       'Rynek',
  'nav.contact':      'Kontakt',
  'nav.cta':          'Dołącz do grona partnerów →',

  /* gateway */
  'gw.h1':      'SILNIKI SPALINOWE MAJĄ 120 LAT.',
  'gw.h2':      'KAŻDY Z FUNDAMENTALNĄ WADĄ.',
  'gw.sub1':    'Branża nie szuka nowego rozwiązania.<br>Szuka lepszej wersji starego błędu.',
  'gw.sub2':    'Nie pytamy jak ulepszyć stary silnik.<br>Pytamy jak zbudować <em>optymalny silnik cieplny od podstaw</em> —<br>zaprojektowany od zasad termodynamiki.',
  'gw.cta':     'POZNAJ ODPOWIEDŹ',
  'gw.patent':  'Patent PL · DE · KR · IN',
  'gw.prot':    'Ochrona do 2045',

  /* hero */
  'hero.h1.1':     'CLEAN',
  'hero.h1.2':     'MODULAR',
  'hero.h1.3':     'COMBUSTION',
  'hero.h1.4':     'PLATFORM.',
  'hero.era':      'For a new era of mobility.',
  'hero.rcpmKey':  'Opatentowana technologia <em>RCPM</em> — pierwszy silnik bez ruchu posuwisto&#8209;zwrotnego, bez wad Wankla, bez ograniczeń klasycznej konstrukcji.',
  'hero.fuelLabel':'Gotowy na',
  'hero.fuel.h2':  '💧 Wodór',
  'hero.fuel.ef':  '🌿 e-Paliwa',
  'hero.fuel.bio': '🌱 Biopaliwa',
  'hero.fuel.gas': '⚗️ Gaz / LPG / CNG',
  'hero.fuel.ben': '⛽ Benzyna / Diesel',
  'hero.fuel.air': '🌀 Sprężone powietrze',
  'hero.cta1':     'Poznaj Technologię ↓',
  'hero.cta2':     'Zapytaj o współpracę →',
  'hero.q1':       'Co jeśli <em>siły bezwładności</em>, które od 120 lat blokują silniki, można po prostu — wyzerować?',
  'hero.q2':       'Co jeśli ciepło wybuchu zamiast uciekać przez ściany — <em>napędza następny cykl</em>?',
  'hero.q3':       'Co jeśli silnik jutra waży <em>8 kg</em>, kręci się na <em>19 100 RPM</em> i spala cokolwiek chcesz?',

  /* vision */
  'vision.label': '// Wizja · Misja',
  'vision.title': 'MUSIMY ZROBIĆ<br>WSZYSTKO, BY<br><span class="vision-title-green">ZACHOWAĆ TEN</span><br><span class="vision-title-green">PIĘKNY ZIELONY</span><br>ŚWIAT.',
  'vision.body1': 'Każdy rok bez zmiany to kolejne <strong>36 miliardów ton CO₂</strong> w atmosferze. Każdy wyprodukowany samochód to decyzja — czy idziemy dalej tą samą drogą, czy wybieramy nową architekturę.',
  'vision.body2': 'RCPM nie jest kolejną modernizacją. To zmiana fundamentu — technologia, która pozwala <strong>każdemu rodzajowi pojazdu</strong> emitować mniej, spalać czyściej i działać wydajniej. <strong style="color:#00E87A;">Dziś. Bez czekania.</strong>',
  'vision.co2desc':   'potencjał redukcji przy globalnym wdrożeniu RCPM',
  'vision.retrodesc': 'istniejących silników możliwych do retrofittingu przez AKS',
  'vision.newdesc':   'nowych pojazdów — każdy może jeździć na RCPM',

  /* blind alley */
  'ba.label': '// Kontekst rynkowy',
  'ba.title': '100 MILIONÓW<br><span>SAMOCHODÓW ROCZNIE.</span><br><span class="ba-title-red">ŚLEPA ULICZKA.</span>',
  'ba.body1': 'Rocznie przemysł światowy produkuje ok. <strong>100 milionów samochodów</strong>. Ale staje przed zasadniczymi zwrotami w rozwoju, bo jedzie na pełnym gazie w ślepą uliczkę.',
  'ba.body2': 'Znane silniki spalają ok. <strong>połowy paliwa bezużytecznie</strong>, a rozwojowo tkwią w ślepym zaułku. Przy stagnacji gospodarczej konsumenci wolą oszczędzać.',
  'ba.body3': 'Przezwyciężyć to może nowy, globalnie atrakcyjny produkt.',

  /* problem silnikow */
  'ps.label': '// Dlaczego stary silnik przegrał z fizyką',
  'ps.h2':    '120 LAT TEJ SAMEJ<br><span style="color:var(--red);">FUNDAMENTALNEJ WADY.</span>',
  'ps.sub':   'Każdy silnik tłokowy — od Forda T do Ferrari — działa na tej samej zasadzie. I ma te same nieusuwalne ograniczenia fizyczne.',
  'ps.p1.title':   'SIŁY BEZWŁADNOŚCI<br><span>ROSNĄ Z KWADRATEM</span>',
  'ps.p1.desc':    'Tłok musi co chwilę <strong>zatrzymać się i zawrócić</strong> — góra, dół, góra, dół. Przy 6 000 rpm tłok zmienia kierunek <strong>200 razy na sekundę</strong>. Siła bezwładności rośnie z <em>v²</em> — każde podwojenie prędkości to czterokrotnie większe obciążenie materiału.',
  'ps.p1.stat1': 'RPM hard limit',
  'ps.p1.stat2': 'siły przy 2× obrotach',
  'ps.p1.stat3': 'max sprawność',
  'ps.p1.insight': 'Silnik tłokowy jest <strong>fizycznym więźniem swojej geometrii</strong>. Żadna inżynieria nie usunie sił bezwładności ruchu posuwisto-zwrotnego.',
  'ps.p2.title':   'POŁOWA ENERGII<br><span>UCIEKA PRZEZ RURĘ</span>',
  'ps.p2.desc':    'W klasycznym silniku paliwo spala się <strong>jednorazowo i gwałtownie</strong>. Gorące spaliny uciekają przez wydech zanim zdążą oddać energię. Układ chłodzenia odprowadza kolejne 30% ciepła. Do kół dociera zaledwie <strong>30–38% energii paliwa</strong>.',
  'ps.p2.stat1': 'energia tracona',
  'ps.p2.stat2': 'ucieka przez wydech',
  'ps.p2.stat3': 'RCPM sprawność',
  'ps.p2.insight': '12-suwowy cykl RCPM pozwala <strong>wielokrotnie ekspandować</strong> te same spaliny — wyciągając energię do końca.',
  'ps.verdict': 'Te dwa problemy nie są do rozwiązania metodami ewolucyjnymi.<br><strong>Wymagają rewolucji architektury.</strong>',

  /* siemens halske */
  'sh.eyebrow': '',
  'sh.h1':    'SIEMENS HALSKE OBRAŁ <em>WŁAŚCIWY KIERUNEK.</em><br>MY OBRALIŚMY <em>WŁAŚCIWY CEL.</em>',
  'sh.sub1':  '1918 rok. Siemens &amp; Halske budują silnik z obracającym się blokiem cylindrów. Kierunek słuszny — rotacja zamiast tłoka. Ale cel błędny: gonią za mocą. Więcej cylindrów, większy blok, wyższe ciśnienia spalania.',
  'sh.sub2':  '<strong>Budowali słonia.</strong> Ogromny, silny — ale powolny i żarłoczny. Im większa masa wirująca, tym silniejsze siły bezwładności i siła Coriolisa rozrywające komponenty od środka. Im większe siły — tym większe tarcie wewnętrzne. Im większe tarcie — tym więcej oleju. <strong>SH.IIIa pił więcej smaru niż paliwa.</strong> Moc szła na walkę z własną konstrukcją, nie na napęd.',
  'sh.sub3':  '<strong>My budujemy kolibra.</strong> Małe masy, duże obroty. Koliber waży kilka gramów i uderza skrzydłami 80 razy na sekundę — nie siłą, lecz precyzją i rytmem. RCPM waży 8 kg i kręci 19&nbsp;100 RPM. Mikrowtryski paliwa w dokładnie właściwych fazach obrotu podtrzymują rotację jak impulsy elektryczne podtrzymują bicie serca.',
  'sh.sub4':  'Ale nie zatrzymaliśmy się na miniaturyzacji. Wyszliśmy od głębszego pytania: <strong>jaka jest złota przemiana termodynamiczna optymalnego silnika cieplnego?</strong> Z odpowiedzi na to pytanie — z zasad termodynamiki, nie z prób i błędów — wynikła architektura RCPM. Siłę Coriolisa zaadresowaliśmy bezpośrednio na poziomie konstrukcji. Jest przedmiotem naszych zgłoszeń patentowych.',
  'sh.canvasLeft':  '// Cel: moc · duże masy wirujące · siła Coriolisa · tarcie · smar &gt; paliwo',
  'sh.canvasRight': '// Cel: optymalny silnik cieplny · małe masy · duże obroty · Coriolis zaadresowany patentowo',
  'sh.b1.front.title': 'MASA I TARCIE',
  'sh.b1.back.title':  'MAŁA MASA = DUŻE RPM',
  'sh.b2.front.title': 'SIŁA CORIOLISA',
  'sh.b2.back.title':  'CORIOLIS ZAADRESOWANY',
  'sh.b3.front.title': 'ZŁY CEL',
  'sh.b3.back.title':  'ZŁOTA PRZEMIANA CIEPLNA',
  'sh.timeline.label': '// Ewolucja technologii produkcji — od niemożliwego do oczywistego',
  'sh.tl.1918': 'SH.IIIa<br>Zły cel',
  'sh.tl.1954': 'Wankel<br>Ślepa uliczka',
  'sh.tl.2025': 'RCPM<br>Teraz możliwy',
  'sh.verdict':    'Siemens &amp; Halske obrali <strong>właściwy kierunek — rotację.</strong> Obrali jednak <strong>zły cel — maksymalną moc przez rozmiar.</strong><br>Im więcej chcieli mocy, tym większy słoń, tym większa masa wirująca, tym więcej tarcia, tym więcej smaru. Spirala bez wyjścia.<br><br>My odwracamy logikę. Zaczynamy od termodynamiki — od pytania o <strong>optymalny silnik cieplny.</strong> Odpowiedź prowadzi w miniaturyzację. Mniejsza masa wirująca, zaadresowana siła Coriolisa, złota przemiana cieplna.<br><br><em>To co w 1918 roku rozpadało się z nadmiaru — dziś działa właśnie dlatego, że jest małe, zwinne i termodynamicznie właściwe.</em>',
  'sh.stampLabel': 'LAT<br>ZŁEJ SKALI',

  /* przelom */
  'pb.label':   '// Odpowiedź na oba problemy naraz',
  'pb.h2':      'OTO CO <em>ZMIENILIŚMY</em><br>I DLACZEGO TO MA ZNACZENIE',
  'pb.before1.title': 'RUCH GÓRA-DÓŁ',
  'pb.before1.sub':   'Silnik tłokowy / posuwisto-zwrotny',
  'pb.f1a.label': 'Ograniczenie prędkości',
  'pb.f1a.val':   'Mur ~6 500 RPM — siły bezwładności rosną z kwadratem prędkości. Nie ma przejścia.',
  'pb.f1b.label': 'Wibracje i zużycie',
  'pb.f1b.val':   'Każde zatrzymanie tłoka i zmiana kierunku to uderzenie. 2 000 razy na minutę.',
  'pb.f1c.label': 'Miniaturyzacja niemożliwa',
  'pb.f1c.val':   'Przy małych rozmiarach siły względne rosną — silnik się niszczy zanim osiągnie moc.',
  'pb.after1.title': 'RUCH PROMIENIOWY',
  'pb.after1.sub':   'Rotating Cylindrical Piston Machine',
  'pb.g1a.label': 'Siły się wzajemnie znoszą',
  'pb.g1a.val':   'Ruch obrotowy całego układu neutralizuje siły bezwładności tłoków. Fizyka pracuje dla nas.',
  'pb.g1b.label': 'Cel: &gt;19 100 RPM',
  'pb.g1b.val':   '2× prędkość silnika F1. Mały, lekki, 8 kg — i mocniejszy niż wszystko w tej klasie.',
  'pb.g1c.label': 'Miniaturyzacja = przewaga',
  'pb.g1c.val':   'Im mniejszy tłok — tym mniejsze bezwzględne siły. Miniaturyzacja jest strategią, nie kompromisem.',
  'pb.before2.title': 'GRZEJ I CHŁODŹ NARAZ',
  'pb.before2.sub':   'Konwencjonalna komora spalania',
  'pb.f2a.label': 'Ciepło = strata',
  'pb.f2a.val':   'Silnik chłodzi się wodą i olejem — bo ciepło jest wrogiem. Jednocześnie samo spalanie go potrzebuje.',
  'pb.f2b.label': 'Sprawność max. ~40%',
  'pb.f2b.val':   'Teoria Carnota mówi o górnej granicy. Nikt jej nie przekraczał — bo nikt nie buforował ciepła między cyklami.',
  'pb.after2.title': 'BUFOROWANIE CIEPŁA',
  'pb.after2.sub':   'Aktywna Komora Spalania (Active Combustion System)',
  'pb.g2a.label': 'Ciepło z jednego wybuchu napędza następny',
  'pb.g2a.val':   'Warstwy wolframu i aluminium w AKS buforują energię między cyklami. Żadne ciepło nie ucieka bezużytecznie.',
  'pb.g2b.label': 'CO₂ –46 g/km · –2 l/100km',
  'pb.g2b.val':   'AKS przekracza granicę Carnota przez zarządzanie czasem transferu ciepła — przełom stulecia.',
  'pb.verdict':    '<strong>RCPM + AKS razem:</strong> pierwszy silnik który eliminuje oba fundamentalne problemy jednocześnie. Nie nowa wersja starego podejścia — <strong>zupełnie inna architektura.</strong> Mały. Szybki. Gorący w środku, zimny na zewnątrz. Gotowy na każde paliwo.',
  'pb.verdictTag': 'GAME CHANGER',

  /* ps3 prototyp */
  'proto.label':     '// Prototyp PS3 — Potwierdzenie',
  'proto.pill':      'ZAŁOŻENIA KONSTRUKCYJNE POTWIERDZONE',
  'proto.statement': 'Przełomowe, pełne uruchomienie prototypu <em>PS3</em> potwierdziło założenia konstrukcyjne.<br>Droga do <strong>wysokosprawnych i wysokoobrotowych</strong>, zwartych napędów<br>o prostej technologii została <em>otwarta</em>.',
  'proto.chip1': 'masa prototypu<br>PS3',
  'proto.chip2': 'RPM osiągnięte<br>w testach',
  'proto.chip3': 'RPM cel<br>docelowy',
  'proto.chip4': 'prędkość<br>silnika F1',

  /* porsche vs rcpm */
  'pvr.label':  '// Kontekst rynkowy',
  'pvr.h2':     'NAWET PORSCHE SZUKA WYJŚCIA',
  'pvr.sub':    'Patent złożony w 2024 roku przez Porsche AG potwierdza: przemysł szuka alternatywy dla klasycznego tłoka. Tylko że szuka — <em style="color:rgba(255,255,255,0.75);">nadal w tym samym pudełku.</em>',
  'pvr.diagLeft':     'DIAGNOZA: Udoskonalony klasyk — nie przełom',
  'pvr.diagRight':    'DIAGNOZA: Nowa architektura — out of the box',
  'pvr.investorLabel':'Wniosek dla inwestora',
  'pvr.investorText': 'Jeśli Porsche — lider motoryzacji — szuka wyjścia z impasu tłokowego, to <strong style="color:#fff;">rynek jest gotowy.</strong> My mamy odpowiedź, której oni nie mają.',

  /* trend rynkowy */
  'tr.label':  '// Sygnał rynkowy · 2023–2025',
  'tr.h2':     'PRZEMYSŁ GŁOSUJE NOGAMI',
  'tr.sub':    'Mazda, Ram, Hyundai, MAHLE, Li Auto — wszyscy niezależnie dochodzą do tego samego wniosku: <em style="color:rgba(255,255,255,0.75);">silnik jako generator to przyszłość mobilności.</em> RCPM jest gotowy na ten rynek.',
  'tr.investorLabel': 'Sygnał dla inwestora',
  'tr.investorText':  'Rynek EREV (silnik jako generator) rośnie lawinowo. ICE range extender to <strong style="color:#fff;">73% rynku w 2024</strong>. Nikt z nich nie ma RCPM — kompaktowego, lekkiego (8 kg), wysokoobrotowego (19 100 RPM) generatora na każde paliwo. <strong style="color:var(--gold);">Tę lukę wypełnia PowerBee.</strong>',

  /* wszyscy wygrywaja */
  'ww.label':    '// Odpowiedź',
  'ww.subtitle': 'ZMIENIA ZASADY GRY.',
  'ww.desc1':    'Opatentowana technologia RCPM — pierwszy silnik bez ruchu posuwisto-zwrotnego, bez wad Wankla, bez ograniczeń klasycznej konstrukcji.',
  'ww.desc2':    'Jedna platforma. Trzy rynki. Sześć produktów. Patent do 2045.',
  'ww.mob.intro': 'For a new era of mobility —',
  'ww.mob.ev':    'Elektryki.',
  'ww.mob.hyb':   'Hybrydy.',
  'ww.mob.ice':   'Spalinowe.',
  'ww.mob.win':   'Wszyscy wygrywają.',
  'ww.mob.nobat': 'Bez czekania na lepsze baterie.',
  'ww.seg.ev.badge':  'ELEKTRYKI',
  'ww.seg.ev.prod':   'PSGrex — Range Extender',
  'ww.seg.ev.desc':   '+200 km zasięgu bez rozbudowy baterii. &lt;10 kg, &lt;€1 750. Odpowiedź na problem, którego BMW i3 nie rozwiązało.',
  'ww.seg.hyb.badge': 'HYBRYDY',
  'ww.seg.hyb.prod':  'PSE / PSG100 — Elektrownia pokładowa',
  'ww.seg.hyb.desc':  'Hybryd szeregowy nowej generacji. CO₂ &lt;65 g/km. Norma UE 2030 spełniona z zapasem.',
  'ww.seg.ice.badge': 'SPALINOWE',
  'ww.seg.ice.prod':  'AKS / AKS-P — Drop-in modification',
  'ww.seg.ice.desc':  'Bez wymiany silnika. -2 l/100 km, -40 g/km CO₂. Retrofitting 1,3 mld istniejących pojazdów.',

  /* energia */
  'en.label': '// Dlaczego paliwo, nie tylko bateria',
  'en.title': 'PALIWO NIESIE<br><span>30–130×</span><br>WIĘCEJ ENERGII.',
  'en.body1': 'Baterie Li-Ion to ~250 Wh/kg. Benzyna to ~12 000 Wh/kg. Wodór to ~33 000 Wh/kg. Ta różnica nie zniknie przez następne dekady.',
  'en.body2': 'RCPM otwiera drogę do spalania tych paliw z &gt;60% sprawnością — czysto, modularnie, bez ograniczeń starej architektury.',

  /* problem (stary) */
  'prob.label': '// 01 · Problem',
  'prob.title': '120 LAT<br><span>ŚLEPEGO ZAUŁKA</span>',
  'prob.sub':   'Od ponad 120 lat silniki spalają połowę paliwa bezużytecznie. Branża optymalizuje — ale nie zmienia fundamentów.',

  /* technologia */
  'tech.title': 'OPATENTOWANA<br><span>ARCHITEKTURA</span>',
  'tech.sub':   'Nie kolejna modernizacja. Nowy fundament. Zweryfikowany przez Journal of Thermal Science i ICCHMT 2018.',
  'evo.gen.title': 'KAŻDA GENERACJA<br><span>MIAŁA SWÓJ SUFIT</span>',

  /* ewolucja */
  'evo.title': 'JEDEN WYNALAZEK<br><span class="gold">SZEŚĆ ZASTOSOWAŃ</span>',
  'evo.sub':   'Jedna platforma technologiczna — sześć produktów, sześć rynków, sześć strumieni przychodów.',

  /* rynek */
  'rynek.title': 'ROŚNIE NAJSZYBCIEJ —<br><span>WE WSZYSTKICH</span><br>SEGMENTACH JEDNOCZEŚNIE.',
  'rynek.sub':   'Trzy segmenty. Trzy produkty. Jeden fundament technologiczny.',

  /* kontakt */
  'kontakt.title':       'ZACZNIJMY<br><span>ROZMOWĘ</span>',
  'kontakt.lead':        'Jeśli interesujesz się inwestycją, partnerstwem OEM lub chcesz poznać technologię — napisz lub zadzwoń. Odpowiadamy w ciągu 24 godzin.',
  'kontakt.emailLabel':  'EMAIL',
  'kontakt.phoneLabel':  'TELEFON',
  'kontakt.companyLabel':'SPÓŁKA',
  'kontakt.patentLabel': 'PATENT',

  /* contact form */
  'contact.name':    'Imię i nazwisko',
  'contact.company': 'Firma / Organizacja',
  'contact.topic':   'Temat rozmowy...',
  'contact.opt1':    'Inwestycja',
  'contact.opt2':    'Partnerstwo OEM',
  'contact.opt3':    'Licencja technologiczna',
  'contact.opt4':    'Media / Prasa',
  'contact.opt5':    'Inne',
  'contact.msg':     'Wiadomość (opcjonalnie)...',
  'contact.send':    'Wyślij Zapytanie →',

  /* footer */
  'footer.copy':   '© 2025 PowerBee P.S.A. · Wszelkie prawa zastrzeżone',
  'footer.patent': 'Patent PL · DE · KR · IN<br>Wynalazca: Zbigniew Sadlak / IBS Monachium<br>Ochrona do 22.02.2036',

  '__title': 'Revora Engine™ — Modular Combustion Platform',
  '__lang_attr': 'pl',
},

/* ═══════════════════ ENGLISH ═══════════════════ */
en: {
  /* nav */
  'nav.breakthrough': 'Breakthrough',
  'nav.tech':         'Technology',
  'nav.products':     'Products',
  'nav.market':       'Market',
  'nav.contact':      'Contact',
  'nav.cta':          'Become a Partner →',

  /* gateway */
  'gw.h1':    'COMBUSTION ENGINES ARE 120 YEARS OLD.',
  'gw.h2':    'EVERY ONE WITH A FUNDAMENTAL FLAW.',
  'gw.sub1':  'The industry isn\'t looking for a new solution.<br>It\'s looking for a better version of the same mistake.',
  'gw.sub2':  'We don\'t ask how to improve the old engine.<br>We ask how to build <em>the optimal heat engine from first principles</em> —<br>designed from the laws of thermodynamics.',
  'gw.cta':   'DISCOVER THE ANSWER',
  'gw.patent':'Patent PL · DE · KR · IN',
  'gw.prot':  'Protection until 2045',

  /* hero */
  'hero.h1.1':     'CLEAN',
  'hero.h1.2':     'MODULAR',
  'hero.h1.3':     'COMBUSTION',
  'hero.h1.4':     'PLATFORM.',
  'hero.era':      'For a new era of mobility.',
  'hero.rcpmKey':  'Patented <em>RCPM</em> technology — the first engine with no reciprocating motion, none of the Wankel\'s flaws, and none of the classic architecture\'s limitations.',
  'hero.fuelLabel':'Ready for',
  'hero.fuel.h2':  '💧 Hydrogen',
  'hero.fuel.ef':  '🌿 e-Fuels',
  'hero.fuel.bio': '🌱 Biofuels',
  'hero.fuel.gas': '⚗️ Gas / LPG / CNG',
  'hero.fuel.ben': '⛽ Petrol / Diesel',
  'hero.fuel.air': '🌀 Compressed Air',
  'hero.cta1':     'Explore the Technology ↓',
  'hero.cta2':     'Inquire About Partnership →',
  'hero.q1':       'What if the <em>inertial forces</em> that have limited engines for 120 years could simply be — zeroed out?',
  'hero.q2':       'What if combustion heat instead of escaping through walls — <em>fuels the next cycle</em>?',
  'hero.q3':       'What if tomorrow\'s engine weighs <em>8 kg</em>, spins at <em>19,100 RPM</em> and burns whatever you want?',

  /* vision */
  'vision.label': '// Vision · Mission',
  'vision.title': 'WE MUST DO<br>EVERYTHING TO<br><span class="vision-title-green">PRESERVE THIS</span><br><span class="vision-title-green">BEAUTIFUL GREEN</span><br>WORLD.',
  'vision.body1': 'Every year without change means another <strong>36 billion tonnes of CO₂</strong> in the atmosphere. Every car manufactured is a decision — do we keep going the same way, or do we choose a new architecture?',
  'vision.body2': 'RCPM is not another upgrade. It\'s a change of foundation — technology that allows <strong>every type of vehicle</strong> to emit less, burn cleaner and operate more efficiently. <strong style="color:#00E87A;">Today. Without waiting.</strong>',
  'vision.co2desc':   'reduction potential with global RCPM deployment',
  'vision.retrodesc': 'existing engines eligible for AKS retrofitting',
  'vision.newdesc':   'new vehicles per year — each can run on RCPM',

  /* blind alley */
  'ba.label': '// Market Context',
  'ba.title': '100 MILLION<br><span>CARS PER YEAR.</span><br><span class="ba-title-red">A DEAD END.</span>',
  'ba.body1': 'The global industry produces around <strong>100 million cars</strong> per year. But it faces fundamental turning points, racing at full speed into a dead end.',
  'ba.body2': 'Conventional engines burn roughly <strong>half their fuel uselessly</strong> and have hit a development ceiling. In a stagnant economy, consumers prefer to save.',
  'ba.body3': 'Only a new, globally compelling product can break through this.',

  /* problem silnikow */
  'ps.label': '// Why the old engine lost to physics',
  'ps.h2':    '120 YEARS OF THE SAME<br><span style="color:var(--red);">FUNDAMENTAL FLAW.</span>',
  'ps.sub':   'Every piston engine — from the Model T to the Ferrari — works on the same principle. And has the same unremovable physical limitations.',
  'ps.p1.title':   'INERTIAL FORCES<br><span>GROW WITH THE SQUARE</span>',
  'ps.p1.desc':    'The piston must <strong>stop and reverse</strong> constantly — up, down, up, down. At 6,000 rpm the piston changes direction <strong>200 times per second</strong>. Inertial force grows with <em>v²</em> — doubling the speed quadruples the material load.',
  'ps.p1.stat1': 'RPM hard limit',
  'ps.p1.stat2': 'force at 2× speed',
  'ps.p1.stat3': 'max efficiency',
  'ps.p1.insight': 'The piston engine is a <strong>physical prisoner of its own geometry</strong>. No engineering can remove the inertial forces of reciprocating motion.',
  'ps.p2.title':   'HALF THE ENERGY<br><span>ESCAPES THROUGH THE PIPE</span>',
  'ps.p2.desc':    'In a conventional engine, fuel burns <strong>once and violently</strong>. Hot exhaust gases escape before they can transfer their energy. The cooling system dissipates another 30%. Only <strong>30–38% of fuel energy</strong> reaches the wheels.',
  'ps.p2.stat1': 'energy wasted',
  'ps.p2.stat2': 'lost through exhaust',
  'ps.p2.stat3': 'RCPM efficiency',
  'ps.p2.insight': 'The RCPM\'s 12-stroke cycle allows the <strong>same gases to expand multiple times</strong> — extracting energy to the last drop.',
  'ps.verdict': 'These two problems cannot be solved by evolutionary methods.<br><strong>They require an architectural revolution.</strong>',

  /* siemens halske */
  'sh.eyebrow': '',
  'sh.h1':    'SIEMENS HALSKE CHOSE THE <em>RIGHT DIRECTION.</em><br>WE CHOSE THE <em>RIGHT GOAL.</em>',
  'sh.sub1':  '1918. Siemens &amp; Halske build an engine with a rotating cylinder block. The direction was right — rotation instead of a piston. But the goal was wrong: they chase power. More cylinders, larger block, higher combustion pressures.',
  'sh.sub2':  '<strong>They built an elephant.</strong> Huge, powerful — but slow and ravenous. The larger the rotating mass, the stronger the inertial forces and Coriolis forces tearing the components apart from the inside. More forces — more internal friction. More friction — more oil. <strong>The SH.IIIa drank more lubricant than fuel.</strong> Power went into fighting its own construction, not propulsion.',
  'sh.sub3':  '<strong>We build a hummingbird.</strong> Small masses, high speed. A hummingbird weighs a few grams and beats its wings 80 times per second — not through force, but through precision and rhythm. RCPM weighs 8 kg and spins at 19,100 RPM. Micro-injections of fuel at precisely the right rotational phases sustain the rotation like electrical impulses sustain a heartbeat.',
  'sh.sub4':  'But we didn\'t stop at miniaturization. We started with a deeper question: <strong>what is the optimal thermodynamic transformation of the ideal heat engine?</strong> From that answer — from the laws of thermodynamics, not from trial and error — the RCPM architecture emerged. We addressed the Coriolis force directly at the design level. It is the subject of our patent filings.',
  'sh.canvasLeft':  '// Goal: power · large rotating masses · Coriolis force · friction · lubricant &gt; fuel',
  'sh.canvasRight': '// Goal: optimal heat engine · small masses · high RPM · Coriolis addressed by patent',
  'sh.b1.front.title': 'MASS AND FRICTION',
  'sh.b1.back.title':  'SMALL MASS = HIGH RPM',
  'sh.b2.front.title': 'CORIOLIS FORCE',
  'sh.b2.back.title':  'CORIOLIS ADDRESSED',
  'sh.b3.front.title': 'WRONG GOAL',
  'sh.b3.back.title':  'OPTIMAL HEAT CYCLE',
  'sh.timeline.label': '// Manufacturing technology evolution — from impossible to obvious',
  'sh.tl.1918': 'SH.IIIa<br>Wrong goal',
  'sh.tl.1954': 'Wankel<br>Dead end',
  'sh.tl.2025': 'RCPM<br>Now possible',
  'sh.verdict':    'Siemens &amp; Halske chose the <strong>right direction — rotation.</strong> But they chose the <strong>wrong goal — maximum power through size.</strong><br>The more power they wanted, the bigger the elephant, the larger the rotating mass, the more friction, the more lubricant. A spiral with no exit.<br><br>We reverse the logic. We start with thermodynamics — with the question of the <strong>optimal heat engine.</strong> The answer leads to miniaturization. Smaller rotating mass, addressed Coriolis force, optimal heat cycle.<br><br><em>What in 1918 fell apart from excess — today works precisely because it is small, agile and thermodynamically correct.</em>',
  'sh.stampLabel': 'YEARS<br>OF WRONG SCALE',

  /* przelom */
  'pb.label':   '// The answer to both problems at once',
  'pb.h2':      'HERE IS WHAT <em>WE CHANGED</em><br>AND WHY IT MATTERS',
  'pb.before1.title': 'UP-DOWN MOTION',
  'pb.before1.sub':   'Piston / reciprocating engine',
  'pb.f1a.label': 'Speed limitation',
  'pb.f1a.val':   'Wall at ~6,500 RPM — inertial forces grow with the square of velocity. No way through.',
  'pb.f1b.label': 'Vibration and wear',
  'pb.f1b.val':   'Every piston stop and direction change is an impact. 2,000 times per minute.',
  'pb.f1c.label': 'Miniaturization impossible',
  'pb.f1c.val':   'At small sizes, relative forces increase — the engine destroys itself before reaching power.',
  'pb.after1.title': 'RADIAL MOTION',
  'pb.after1.sub':   'Rotating Cylindrical Piston Machine',
  'pb.g1a.label': 'Forces cancel each other out',
  'pb.g1a.val':   'Rotation of the entire assembly neutralizes piston inertial forces. Physics works for us.',
  'pb.g1b.label': 'Target: &gt;19,100 RPM',
  'pb.g1b.val':   '2× the speed of an F1 engine. Small, light, 8 kg — and more powerful than anything in this class.',
  'pb.g1c.label': 'Miniaturization = advantage',
  'pb.g1c.val':   'The smaller the piston — the smaller the absolute forces. Miniaturization is a strategy, not a compromise.',
  'pb.before2.title': 'HEAT AND COOL SIMULTANEOUSLY',
  'pb.before2.sub':   'Conventional combustion chamber',
  'pb.f2a.label': 'Heat = loss',
  'pb.f2a.val':   'The engine cools itself with water and oil — because heat is the enemy. Yet combustion itself needs it.',
  'pb.f2b.label': 'Max efficiency ~40%',
  'pb.f2b.val':   'Carnot theory gives the upper limit. Nobody has exceeded it — because nobody buffered heat between cycles.',
  'pb.after2.title': 'HEAT BUFFERING',
  'pb.after2.sub':   'Active Combustion System (AKS)',
  'pb.g2a.label': 'Heat from one explosion fuels the next',
  'pb.g2a.val':   'Layers of tungsten and aluminium in the AKS buffer energy between cycles. No heat escapes uselessly.',
  'pb.g2b.label': 'CO₂ –46 g/km · –2 l/100km',
  'pb.g2b.val':   'AKS exceeds the Carnot limit by managing heat transfer timing — a breakthrough of the century.',
  'pb.verdict':    '<strong>RCPM + AKS together:</strong> the first engine that eliminates both fundamental problems simultaneously. Not a new version of an old approach — <strong>a completely different architecture.</strong> Small. Fast. Hot inside, cold outside. Ready for any fuel.',
  'pb.verdictTag': 'GAME CHANGER',

  /* ps3 prototyp */
  'proto.label':     '// PS3 Prototype — Confirmation',
  'proto.pill':      'DESIGN ASSUMPTIONS CONFIRMED',
  'proto.statement': 'The breakthrough full run of the <em>PS3</em> prototype confirmed the design assumptions.<br>The path to <strong>high-efficiency, high-RPM</strong> compact powertrains<br>of simple technology has been <em>opened</em>.',
  'proto.chip1': 'PS3 prototype<br>mass',
  'proto.chip2': 'RPM achieved<br>in testing',
  'proto.chip3': 'RPM target<br>goal',
  'proto.chip4': '2× speed<br>of F1 engine',

  /* porsche vs rcpm */
  'pvr.label':  '// Market Context',
  'pvr.h2':     'EVEN PORSCHE IS LOOKING FOR A WAY OUT',
  'pvr.sub':    'A patent filed in 2024 by Porsche AG confirms: the industry is looking for an alternative to the classic piston. Only it\'s looking — <em style="color:rgba(255,255,255,0.75);">still inside the same box.</em>',
  'pvr.diagLeft':     'DIAGNOSIS: Refined classic — not a breakthrough',
  'pvr.diagRight':    'DIAGNOSIS: New architecture — out of the box',
  'pvr.investorLabel':'Investor takeaway',
  'pvr.investorText': 'If Porsche — a leader in automotive — is looking for a way out of the piston deadlock, then <strong style="color:#fff;">the market is ready.</strong> We have the answer they don\'t.',

  /* trend rynkowy */
  'tr.label':  '// Market Signal · 2023–2025',
  'tr.h2':     'THE INDUSTRY IS VOTING WITH ITS FEET',
  'tr.sub':    'Mazda, Ram, Hyundai, MAHLE, Li Auto — all independently reaching the same conclusion: <em style="color:rgba(255,255,255,0.75);">engine-as-generator is the future of mobility.</em> RCPM is ready for this market.',
  'tr.investorLabel': 'Investor signal',
  'tr.investorText':  'The EREV market (engine as generator) is growing exponentially. ICE range extenders account for <strong style="color:#fff;">73% of the 2024 market</strong>. None of them have RCPM — a compact, lightweight (8 kg), high-RPM (19,100 RPM) generator for any fuel. <strong style="color:var(--gold);">PowerBee fills that gap.</strong>',

  /* wszyscy wygrywaja */
  'ww.label':    '// The Answer',
  'ww.subtitle': 'CHANGES THE RULES.',
  'ww.desc1':    'Patented RCPM technology — the first engine with no reciprocating motion, none of the Wankel\'s flaws, none of the classic architecture\'s limitations.',
  'ww.desc2':    'One platform. Three markets. Six products. Patent until 2045.',
  'ww.mob.intro': 'For a new era of mobility —',
  'ww.mob.ev':    'Electric.',
  'ww.mob.hyb':   'Hybrid.',
  'ww.mob.ice':   'Combustion.',
  'ww.mob.win':   'Everyone wins.',
  'ww.mob.nobat': 'Without waiting for better batteries.',
  'ww.seg.ev.badge':  'ELECTRIC',
  'ww.seg.ev.prod':   'PSGrex — Range Extender',
  'ww.seg.ev.desc':   '+200 km of range without a larger battery. &lt;10 kg, &lt;€1,750. The answer to the problem BMW i3 never solved.',
  'ww.seg.hyb.badge': 'HYBRID',
  'ww.seg.hyb.prod':  'PSE / PSG100 — On-board power unit',
  'ww.seg.hyb.desc':  'Next-generation series hybrid. CO₂ &lt;65 g/km. EU 2030 standard met with headroom.',
  'ww.seg.ice.badge': 'COMBUSTION',
  'ww.seg.ice.prod':  'AKS / AKS-P — Drop-in modification',
  'ww.seg.ice.desc':  'No engine replacement needed. -2 l/100 km, -40 g/km CO₂. Retrofitting 1.3 billion existing vehicles.',

  /* energia */
  'en.label': '// Why fuel, not just batteries',
  'en.title': 'FUEL CARRIES<br><span>30–130×</span><br>MORE ENERGY.',
  'en.body1': 'Li-Ion batteries: ~250 Wh/kg. Petrol: ~12,000 Wh/kg. Hydrogen: ~33,000 Wh/kg. This gap will not disappear for decades.',
  'en.body2': 'RCPM opens the path to burning these fuels at &gt;60% efficiency — cleanly, modularly, without the constraints of old architecture.',

  /* problem (stary) */
  'prob.label': '// 01 · Problem',
  'prob.title': '120 YEARS<br><span>OF DEAD ENDS</span>',
  'prob.sub':   'For over 120 years, engines have wasted half their fuel. The industry optimizes — but never changes the fundamentals.',

  /* technologia */
  'tech.title': 'PATENTED<br><span>ARCHITECTURE</span>',
  'tech.sub':   'Not another upgrade. A new foundation. Verified by the Journal of Thermal Science and ICCHMT 2018.',
  'evo.gen.title': 'EVERY GENERATION<br><span>HAD ITS CEILING</span>',

  /* ewolucja */
  'evo.title': 'ONE INVENTION<br><span class="gold">SIX APPLICATIONS</span>',
  'evo.sub':   'One technology platform — six products, six markets, six revenue streams.',

  /* rynek */
  'rynek.title': 'GROWING FASTEST —<br><span>IN ALL</span><br>SEGMENTS SIMULTANEOUSLY.',
  'rynek.sub':   'Three segments. Three products. One technology foundation.',

  /* kontakt */
  'kontakt.title':       'LET\'S START<br><span>A CONVERSATION</span>',
  'kontakt.lead':        'If you\'re interested in investment, OEM partnership, or want to explore the technology — write or call. We respond within 24 hours.',
  'kontakt.emailLabel':  'EMAIL',
  'kontakt.phoneLabel':  'PHONE',
  'kontakt.companyLabel':'COMPANY',
  'kontakt.patentLabel': 'PATENT',

  /* contact form */
  'contact.name':    'Full name',
  'contact.company': 'Company / Organization',
  'contact.topic':   'Subject...',
  'contact.opt1':    'Investment',
  'contact.opt2':    'OEM Partnership',
  'contact.opt3':    'Technology License',
  'contact.opt4':    'Media / Press',
  'contact.opt5':    'Other',
  'contact.msg':     'Message (optional)...',
  'contact.send':    'Send Inquiry →',

  /* footer */
  'footer.copy':   '© 2025 PowerBee P.S.A. · All rights reserved',
  'footer.patent': 'Patent PL · DE · KR · IN<br>Inventor: Zbigniew Sadlak / IBS Munich<br>Protection until 22.02.2036',

  '__title': 'Revora Engine™ — Modular Combustion Platform',
  '__lang_attr': 'en',
},

/* ═══════════════════ ESPAÑOL ═══════════════════ */
es: {
  /* nav */
  'nav.breakthrough': 'Avance',
  'nav.tech':         'Tecnología',
  'nav.products':     'Productos',
  'nav.market':       'Mercado',
  'nav.contact':      'Contacto',
  'nav.cta':          'Únete como socio →',

  /* gateway */
  'gw.h1':    'LOS MOTORES DE COMBUSTIÓN TIENEN 120 AÑOS.',
  'gw.h2':    'CADA UNO CON UN DEFECTO FUNDAMENTAL.',
  'gw.sub1':  'La industria no busca una solución nueva.<br>Busca una mejor versión del mismo error.',
  'gw.sub2':  'No preguntamos cómo mejorar el motor antiguo.<br>Preguntamos cómo construir <em>el motor térmico óptimo desde cero</em> —<br>diseñado desde los principios de la termodinámica.',
  'gw.cta':   'DESCUBRE LA RESPUESTA',
  'gw.patent':'Patente PL · DE · KR · IN',
  'gw.prot':  'Protección hasta 2045',

  /* hero */
  'hero.h1.1':     'LIMPIO',
  'hero.h1.2':     'MODULAR',
  'hero.h1.3':     'COMBUSTIÓN',
  'hero.h1.4':     'PLATAFORMA.',
  'hero.era':      'Para una nueva era de la movilidad.',
  'hero.rcpmKey':  'Tecnología <em>RCPM</em> patentada — el primer motor sin movimiento alternativo, sin los defectos del Wankel, sin las limitaciones de la arquitectura clásica.',
  'hero.fuelLabel':'Compatible con',
  'hero.fuel.h2':  '💧 Hidrógeno',
  'hero.fuel.ef':  '🌿 e-Combustibles',
  'hero.fuel.bio': '🌱 Biocombustibles',
  'hero.fuel.gas': '⚗️ Gas / GLP / GNC',
  'hero.fuel.ben': '⛽ Gasolina / Diésel',
  'hero.fuel.air': '🌀 Aire comprimido',
  'hero.cta1':     'Conoce la Tecnología ↓',
  'hero.cta2':     'Consultar sobre alianza →',
  'hero.q1':       '¿Y si las <em>fuerzas de inercia</em> que han limitado los motores 120 años simplemente pudieran — anularse?',
  'hero.q2':       '¿Y si el calor de la combustión en lugar de escapar — <em>impulsa el siguiente ciclo</em>?',
  'hero.q3':       '¿Y si el motor del mañana pesa <em>8 kg</em>, gira a <em>19.100 RPM</em> y quema lo que quieras?',

  /* vision */
  'vision.label': '// Visión · Misión',
  'vision.title': 'DEBEMOS HACER<br>TODO LO POSIBLE<br><span class="vision-title-green">PARA PRESERVAR</span><br><span class="vision-title-green">ESTE HERMOSO</span><br>MUNDO VERDE.',
  'vision.body1': 'Cada año sin cambio son otros <strong>36 mil millones de toneladas de CO₂</strong> en la atmósfera. Cada coche fabricado es una decisión — ¿seguimos por el mismo camino o elegimos una nueva arquitectura?',
  'vision.body2': 'RCPM no es otra actualización. Es un cambio de fundamento — tecnología que permite a <strong>todo tipo de vehículo</strong> emitir menos, quemar más limpio y funcionar de forma más eficiente. <strong style="color:#00E87A;">Hoy. Sin esperar.</strong>',
  'vision.co2desc':   'potencial de reducción con despliegue global de RCPM',
  'vision.retrodesc': 'motores existentes elegibles para retrofit con AKS',
  'vision.newdesc':   'vehículos nuevos al año — cada uno puede usar RCPM',

  /* blind alley */
  'ba.label': '// Contexto de mercado',
  'ba.title': '100 MILLONES<br><span>DE COCHES AL AÑO.</span><br><span class="ba-title-red">UN CALLEJÓN SIN SALIDA.</span>',
  'ba.body1': 'La industria mundial produce alrededor de <strong>100 millones de coches</strong> al año. Pero se enfrenta a giros fundamentales en el desarrollo, acelerando a fondo hacia un callejón sin salida.',
  'ba.body2': 'Los motores convencionales queman alrededor de <strong>la mitad del combustible inútilmente</strong> y han alcanzado un techo de desarrollo. En una economía estancada, los consumidores prefieren ahorrar.',
  'ba.body3': 'Solo un producto nuevo y globalmente atractivo puede superar esto.',

  /* problem silnikow */
  'ps.label': '// Por qué el motor antiguo perdió ante la física',
  'ps.h2':    '120 AÑOS DEL MISMO<br><span style="color:var(--red);">DEFECTO FUNDAMENTAL.</span>',
  'ps.sub':   'Cada motor de pistón — del Ford T a la Ferrari — funciona con el mismo principio. Y tiene las mismas limitaciones físicas inamovibles.',
  'ps.p1.title':   'FUERZAS DE INERCIA<br><span>CRECEN CON EL CUADRADO</span>',
  'ps.p1.desc':    'El pistón debe <strong>detenerse y revertirse</strong> constantemente — arriba, abajo, arriba, abajo. A 6.000 rpm el pistón cambia de dirección <strong>200 veces por segundo</strong>. La fuerza de inercia crece con <em>v²</em> — duplicar la velocidad cuadruplica la carga del material.',
  'ps.p1.stat1': 'límite de RPM',
  'ps.p1.stat2': 'fuerza a 2× velocidad',
  'ps.p1.stat3': 'eficiencia máxima',
  'ps.p1.insight': 'El motor de pistón es un <strong>prisionero físico de su propia geometría</strong>. Ninguna ingeniería puede eliminar las fuerzas de inercia del movimiento alternativo.',
  'ps.p2.title':   'LA MITAD DE LA ENERGÍA<br><span>SE ESCAPA POR EL TUBO</span>',
  'ps.p2.desc':    'En un motor convencional el combustible arde <strong>una vez y violentamente</strong>. Los gases de escape calientes huyen antes de poder transferir su energía. El sistema de refrigeración disipa otro 30%. Solo llega <strong>el 30–38% de la energía del combustible</strong> a las ruedas.',
  'ps.p2.stat1': 'energía desperdiciada',
  'ps.p2.stat2': 'perdida por el escape',
  'ps.p2.stat3': 'eficiencia RCPM',
  'ps.p2.insight': 'El ciclo de 12 tiempos del RCPM permite <strong>expandir los mismos gases múltiples veces</strong> — extrayendo energía hasta el final.',
  'ps.verdict': 'Estos dos problemas no se pueden resolver con métodos evolutivos.<br><strong>Requieren una revolución arquitectónica.</strong>',

  /* siemens halske */
  'sh.eyebrow': '',
  'sh.h1':    'SIEMENS HALSKE ELIGIÓ LA <em>DIRECCIÓN CORRECTA.</em><br>NOSOTROS ELEGIMOS EL <em>OBJETIVO CORRECTO.</em>',
  'sh.sub1':  '1918. Siemens &amp; Halske construyen un motor con bloque de cilindros giratorio. La dirección era correcta — rotación en lugar de pistón. Pero el objetivo era erróneo: buscan potencia. Más cilindros, bloque más grande, mayores presiones de combustión.',
  'sh.sub2':  '<strong>Construyeron un elefante.</strong> Enorme, poderoso — pero lento y voraz. A mayor masa giratoria, mayores fuerzas de inercia y fuerzas de Coriolis desgarrando los componentes desde adentro. Más fuerzas — más fricción interna. Más fricción — más aceite. <strong>El SH.IIIa consumía más lubricante que combustible.</strong> La potencia iba a luchar contra su propia construcción, no a la propulsión.',
  'sh.sub3':  '<strong>Nosotros construimos un colibrí.</strong> Masas pequeñas, alta velocidad. Un colibrí pesa unos pocos gramos y bate las alas 80 veces por segundo — no con fuerza, sino con precisión y ritmo. El RCPM pesa 8 kg y gira a 19.100 RPM. Las microinyecciones de combustible en las fases de rotación exactamente correctas mantienen la rotación como los impulsos eléctricos mantienen los latidos del corazón.',
  'sh.sub4':  'Pero no nos detuvimos en la miniaturización. Partimos de una pregunta más profunda: <strong>¿cuál es la transformación termodinámica óptima del motor térmico ideal?</strong> De la respuesta a esa pregunta — de las leyes de la termodinámica, no del ensayo y error — surgió la arquitectura RCPM. Abordamos la fuerza de Coriolis directamente a nivel de diseño. Es objeto de nuestras solicitudes de patente.',
  'sh.canvasLeft':  '// Objetivo: potencia · grandes masas giratorias · fuerza de Coriolis · fricción · lubricante &gt; combustible',
  'sh.canvasRight': '// Objetivo: motor térmico óptimo · masas pequeñas · altas RPM · Coriolis abordado por patente',
  'sh.b1.front.title': 'MASA Y FRICCIÓN',
  'sh.b1.back.title':  'MASA PEQUEÑA = RPM ALTAS',
  'sh.b2.front.title': 'FUERZA DE CORIOLIS',
  'sh.b2.back.title':  'CORIOLIS RESUELTO',
  'sh.b3.front.title': 'OBJETIVO ERRÓNEO',
  'sh.b3.back.title':  'CICLO TÉRMICO ÓPTIMO',
  'sh.timeline.label': '// Evolución de tecnología de fabricación — de lo imposible a lo obvio',
  'sh.tl.1918': 'SH.IIIa<br>Objetivo erróneo',
  'sh.tl.1954': 'Wankel<br>Callejón sin salida',
  'sh.tl.2025': 'RCPM<br>Ahora posible',
  'sh.verdict':    'Siemens &amp; Halske eligieron la <strong>dirección correcta — la rotación.</strong> Pero eligieron el <strong>objetivo equivocado — potencia máxima por tamaño.</strong><br>Cuanta más potencia querían, mayor el elefante, mayor la masa giratoria, más fricción, más lubricante. Una espiral sin salida.<br><br>Nosotros invertimos la lógica. Comenzamos con la termodinámica — con la pregunta del <strong>motor térmico óptimo.</strong> La respuesta lleva a la miniaturización. Menor masa giratoria, fuerza de Coriolis abordada, ciclo térmico óptimo.<br><br><em>Lo que en 1918 se desintegraba por exceso — hoy funciona precisamente porque es pequeño, ágil y termodinámicamente correcto.</em>',
  'sh.stampLabel': 'AÑOS<br>DE ESCALA EQUIVOCADA',

  /* przelom */
  'pb.label':   '// La respuesta a ambos problemas a la vez',
  'pb.h2':      'ESTO ES LO QUE <em>CAMBIAMOS</em><br>Y POR QUÉ IMPORTA',
  'pb.before1.title': 'MOVIMIENTO ARRIBA-ABAJO',
  'pb.before1.sub':   'Motor de pistón / alternativo',
  'pb.f1a.label': 'Limitación de velocidad',
  'pb.f1a.val':   'Muro a ~6.500 RPM — las fuerzas de inercia crecen con el cuadrado de la velocidad. No hay paso.',
  'pb.f1b.label': 'Vibraciones y desgaste',
  'pb.f1b.val':   'Cada parada del pistón y cambio de dirección es un impacto. 2.000 veces por minuto.',
  'pb.f1c.label': 'Miniaturización imposible',
  'pb.f1c.val':   'A tamaños pequeños, las fuerzas relativas aumentan — el motor se destruye antes de alcanzar potencia.',
  'pb.after1.title': 'MOVIMIENTO RADIAL',
  'pb.after1.sub':   'Rotating Cylindrical Piston Machine',
  'pb.g1a.label': 'Las fuerzas se anulan',
  'pb.g1a.val':   'La rotación del conjunto completo neutraliza las fuerzas de inercia de los pistones. La física trabaja para nosotros.',
  'pb.g1b.label': 'Objetivo: &gt;19.100 RPM',
  'pb.g1b.val':   '2× la velocidad de un motor F1. Pequeño, ligero, 8 kg — y más potente que cualquier cosa en su clase.',
  'pb.g1c.label': 'Miniaturización = ventaja',
  'pb.g1c.val':   'Cuanto más pequeño el pistón — menores las fuerzas absolutas. La miniaturización es una estrategia, no un compromiso.',
  'pb.before2.title': 'CALENTAR Y ENFRIAR A LA VEZ',
  'pb.before2.sub':   'Cámara de combustión convencional',
  'pb.f2a.label': 'El calor = pérdida',
  'pb.f2a.val':   'El motor se enfría con agua y aceite — porque el calor es el enemigo. Pero la propia combustión lo necesita.',
  'pb.f2b.label': 'Eficiencia máx. ~40%',
  'pb.f2b.val':   'La teoría de Carnot da el límite superior. Nadie lo ha superado — porque nadie almacenaba calor entre ciclos.',
  'pb.after2.title': 'AMORTIGUACIÓN DE CALOR',
  'pb.after2.sub':   'Sistema de Combustión Activo (AKS)',
  'pb.g2a.label': 'El calor de una explosión impulsa la siguiente',
  'pb.g2a.val':   'Capas de tungsteno y aluminio en el AKS almacenan energía entre ciclos. Ningún calor escapa inútilmente.',
  'pb.g2b.label': 'CO₂ –46 g/km · –2 l/100km',
  'pb.g2b.val':   'AKS supera el límite de Carnot gestionando el tiempo de transferencia de calor — un avance del siglo.',
  'pb.verdict':    '<strong>RCPM + AKS juntos:</strong> el primer motor que elimina ambos problemas fundamentales simultáneamente. No una nueva versión del enfoque antiguo — <strong>una arquitectura completamente diferente.</strong> Pequeño. Rápido. Caliente por dentro, frío por fuera. Listo para cualquier combustible.',
  'pb.verdictTag': 'CAMBIO DE JUEGO',

  /* ps3 prototyp */
  'proto.label':     '// Prototipo PS3 — Confirmación',
  'proto.pill':      'SUPUESTOS DE DISEÑO CONFIRMADOS',
  'proto.statement': 'La puesta en marcha completa del prototipo <em>PS3</em> confirmó los supuestos de diseño.<br>El camino hacia <strong>propulsores compactos de alta eficiencia y altas RPM</strong><br>de tecnología sencilla ha sido <em>abierto</em>.',
  'proto.chip1': 'masa del prototipo<br>PS3',
  'proto.chip2': 'RPM alcanzadas<br>en pruebas',
  'proto.chip3': 'RPM objetivo<br>final',
  'proto.chip4': '2× velocidad<br>motor F1',

  /* porsche vs rcpm */
  'pvr.label':  '// Contexto de mercado',
  'pvr.h2':     'INCLUSO PORSCHE BUSCA UNA SALIDA',
  'pvr.sub':    'Una patente presentada en 2024 por Porsche AG confirma: la industria busca una alternativa al pistón clásico. Solo que busca — <em style="color:rgba(255,255,255,0.75);">todavía dentro de la misma caja.</em>',
  'pvr.diagLeft':     'DIAGNÓSTICO: Clásico refinado — no un avance',
  'pvr.diagRight':    'DIAGNÓSTICO: Nueva arquitectura — fuera de la caja',
  'pvr.investorLabel':'Conclusión para el inversor',
  'pvr.investorText': 'Si Porsche — líder automovilístico — busca una salida al estancamiento del pistón, entonces <strong style="color:#fff;">el mercado está listo.</strong> Tenemos la respuesta que ellos no tienen.',

  /* trend rynkowy */
  'tr.label':  '// Señal de mercado · 2023–2025',
  'tr.h2':     'LA INDUSTRIA VOTA CON LOS PIES',
  'tr.sub':    'Mazda, Ram, Hyundai, MAHLE, Li Auto — todos llegan independientemente a la misma conclusión: <em style="color:rgba(255,255,255,0.75);">el motor como generador es el futuro de la movilidad.</em> RCPM está listo para este mercado.',
  'tr.investorLabel': 'Señal para el inversor',
  'tr.investorText':  'El mercado EREV (motor como generador) crece de forma exponencial. Los extenders de rango ICE representan el <strong style="color:#fff;">73% del mercado en 2024</strong>. Ninguno de ellos tiene RCPM — un generador compacto, ligero (8 kg), de altas RPM (19.100 RPM) para cualquier combustible. <strong style="color:var(--gold);">PowerBee llena ese hueco.</strong>',

  /* wszyscy wygrywaja */
  'ww.label':    '// La Respuesta',
  'ww.subtitle': 'CAMBIA LAS REGLAS.',
  'ww.desc1':    'Tecnología RCPM patentada — el primer motor sin movimiento alternativo, sin los defectos del Wankel, sin las limitaciones de la arquitectura clásica.',
  'ww.desc2':    'Una plataforma. Tres mercados. Seis productos. Patente hasta 2045.',
  'ww.mob.intro': 'Para una nueva era de la movilidad —',
  'ww.mob.ev':    'Eléctrico.',
  'ww.mob.hyb':   'Híbrido.',
  'ww.mob.ice':   'Combustión.',
  'ww.mob.win':   'Todos ganan.',
  'ww.mob.nobat': 'Sin esperar mejores baterías.',
  'ww.seg.ev.badge':  'ELÉCTRICO',
  'ww.seg.ev.prod':   'PSGrex — Extensor de rango',
  'ww.seg.ev.desc':   '+200 km de autonomía sin ampliar la batería. &lt;10 kg, &lt;€1.750. La respuesta al problema que el BMW i3 nunca resolvió.',
  'ww.seg.hyb.badge': 'HÍBRIDO',
  'ww.seg.hyb.prod':  'PSE / PSG100 — Generador de a bordo',
  'ww.seg.hyb.desc':  'Híbrido serie de nueva generación. CO₂ &lt;65 g/km. Norma UE 2030 cumplida con margen.',
  'ww.seg.ice.badge': 'COMBUSTIÓN',
  'ww.seg.ice.prod':  'AKS / AKS-P — Modificación plug-in',
  'ww.seg.ice.desc':  'Sin cambiar el motor. -2 l/100 km, -40 g/km CO₂. Retrofit de 1.300 millones de vehículos existentes.',

  /* energia */
  'en.label': '// Por qué el combustible, no solo las baterías',
  'en.title': 'EL COMBUSTIBLE LLEVA<br><span>30–130×</span><br>MÁS ENERGÍA.',
  'en.body1': 'Baterías Li-Ion: ~250 Wh/kg. Gasolina: ~12.000 Wh/kg. Hidrógeno: ~33.000 Wh/kg. Esta diferencia no desaparecerá en décadas.',
  'en.body2': 'RCPM abre el camino a quemar estos combustibles con &gt;60% de eficiencia — limpiamente, modularmente, sin las limitaciones de la arquitectura antigua.',

  /* problem (stary) */
  'prob.label': '// 01 · Problema',
  'prob.title': '120 AÑOS<br><span>DE CALLEJONES SIN SALIDA</span>',
  'prob.sub':   'Durante más de 120 años, los motores han quemado la mitad del combustible inútilmente. La industria optimiza — pero nunca cambia los fundamentos.',

  /* tecnologia */
  'tech.title': 'ARQUITECTURA<br><span>PATENTADA</span>',
  'tech.sub':   'No otra actualización. Un nuevo fundamento. Verificado por el Journal of Thermal Science e ICCHMT 2018.',
  'evo.gen.title': 'CADA GENERACIÓN<br><span>TUVO SU TECHO</span>',

  /* evolucion */
  'evo.title': 'UN INVENTO<br><span class="gold">SEIS APLICACIONES</span>',
  'evo.sub':   'Una plataforma tecnológica — seis productos, seis mercados, seis flujos de ingresos.',

  /* mercado */
  'rynek.title': 'CRECE MÁS RÁPIDO —<br><span>EN TODOS</span><br>LOS SEGMENTOS SIMULTÁNEAMENTE.',
  'rynek.sub':   'Tres segmentos. Tres productos. Un fundamento tecnológico.',

  /* contacto */
  'kontakt.title':       'EMPECEMOS<br><span>UNA CONVERSACIÓN</span>',
  'kontakt.lead':        'Si está interesado en inversión, asociación OEM o quiere explorar la tecnología — escriba o llame. Respondemos en 24 horas.',
  'kontakt.emailLabel':  'EMAIL',
  'kontakt.phoneLabel':  'TELÉFONO',
  'kontakt.companyLabel':'EMPRESA',
  'kontakt.patentLabel': 'PATENTE',

  /* contact form */
  'contact.name':    'Nombre completo',
  'contact.company': 'Empresa / Organización',
  'contact.topic':   'Asunto...',
  'contact.opt1':    'Inversión',
  'contact.opt2':    'Asociación OEM',
  'contact.opt3':    'Licencia tecnológica',
  'contact.opt4':    'Medios / Prensa',
  'contact.opt5':    'Otro',
  'contact.msg':     'Mensaje (opcional)...',
  'contact.send':    'Enviar consulta →',

  /* footer */
  'footer.copy':   '© 2025 PowerBee P.S.A. · Todos los derechos reservados',
  'footer.patent': 'Patente PL · DE · KR · IN<br>Inventor: Zbigniew Sadlak / IBS Múnich<br>Protección hasta 22.02.2036',

  '__title': 'Revora Engine™ — Plataforma de Combustión Modular',
  '__lang_attr': 'es',
},

/* ═══════════════════ DEUTSCH ═══════════════════ */
de: {
  /* nav */
  'nav.breakthrough': 'Durchbruch',
  'nav.tech':         'Technologie',
  'nav.products':     'Produkte',
  'nav.market':       'Markt',
  'nav.contact':      'Kontakt',
  'nav.cta':          'Partner werden →',

  /* gateway */
  'gw.h1':    'VERBRENNUNGSMOTOREN SIND 120 JAHRE ALT.',
  'gw.h2':    'JEDER MIT EINEM GRUNDLEGENDEN FEHLER.',
  'gw.sub1':  'Die Branche sucht keine neue Lösung.<br>Sie sucht eine bessere Version desselben Fehlers.',
  'gw.sub2':  'Wir fragen nicht, wie man den alten Motor verbessert.<br>Wir fragen, wie man <em>den optimalen Wärmemotor von Grund auf baut</em> —<br>entworfen nach den Gesetzen der Thermodynamik.',
  'gw.cta':   'ENTDECKEN SIE DIE ANTWORT',
  'gw.patent':'Patent PL · DE · KR · IN',
  'gw.prot':  'Schutz bis 2045',

  /* hero */
  'hero.h1.1':     'SAUBERE',
  'hero.h1.2':     'MODULARE',
  'hero.h1.3':     'VERBRENNUNGS-',
  'hero.h1.4':     'PLATTFORM.',
  'hero.era':      'Für eine neue Ära der Mobilität.',
  'hero.rcpmKey':  'Patentierte <em>RCPM</em>-Technologie — der erste Motor ohne Hubbewegung, ohne die Schwächen des Wankels, ohne die Einschränkungen der klassischen Architektur.',
  'hero.fuelLabel':'Bereit für',
  'hero.fuel.h2':  '💧 Wasserstoff',
  'hero.fuel.ef':  '🌿 e-Kraftstoffe',
  'hero.fuel.bio': '🌱 Biokraftstoffe',
  'hero.fuel.gas': '⚗️ Gas / LPG / CNG',
  'hero.fuel.ben': '⛽ Benzin / Diesel',
  'hero.fuel.air': '🌀 Druckluft',
  'hero.cta1':     'Technologie entdecken ↓',
  'hero.cta2':     'Partnerschaft anfragen →',
  'hero.q1':       'Was, wenn die <em>Trägheitskräfte</em>, die Motoren seit 120 Jahren begrenzen, einfach — auf null gesetzt werden könnten?',
  'hero.q2':       'Was, wenn Verbrennungswärme statt zu entweichen — <em>den nächsten Zyklus antreibt</em>?',
  'hero.q3':       'Was, wenn der Motor von morgen <em>8 kg</em> wiegt, mit <em>19.100 U/min</em> dreht und alles verbrennt, was Sie wollen?',

  /* vision */
  'vision.label': '// Vision · Mission',
  'vision.title': 'WIR MÜSSEN ALLES<br>TUN, UM DIESE<br><span class="vision-title-green">SCHÖNE GRÜNE</span><br><span class="vision-title-green">WELT ZU</span><br>BEWAHREN.',
  'vision.body1': 'Jedes Jahr ohne Veränderung bedeutet weitere <strong>36 Milliarden Tonnen CO₂</strong> in der Atmosphäre. Jedes produzierte Auto ist eine Entscheidung — gehen wir denselben Weg weiter, oder wählen wir eine neue Architektur?',
  'vision.body2': 'RCPM ist kein weiteres Upgrade. Es ist ein Fundamentwechsel — Technologie, die es <strong>jedem Fahrzeugtyp</strong> ermöglicht, weniger zu emittieren, sauberer zu verbrennen und effizienter zu arbeiten. <strong style="color:#00E87A;">Heute. Ohne zu warten.</strong>',
  'vision.co2desc':   'Reduktionspotenzial bei globalem RCPM-Einsatz',
  'vision.retrodesc': 'bestehende Motoren für AKS-Nachrüstung geeignet',
  'vision.newdesc':   'neue Fahrzeuge pro Jahr — jedes kann mit RCPM fahren',

  /* blind alley */
  'ba.label': '// Marktkontext',
  'ba.title': '100 MILLIONEN<br><span>AUTOS PRO JAHR.</span><br><span class="ba-title-red">EINE SACKGASSE.</span>',
  'ba.body1': 'Die Weltindustrie produziert rund <strong>100 Millionen Autos</strong> pro Jahr. Doch sie steht vor grundlegenden Wendepunkten — mit Vollgas in die Sackgasse.',
  'ba.body2': 'Bekannte Motoren verbrennen etwa <strong>die Hälfte des Kraftstoffs nutzlos</strong> und stecken in einer Entwicklungssackgasse. Bei wirtschaftlicher Stagnation sparen die Verbraucher lieber.',
  'ba.body3': 'Nur ein neues, global attraktives Produkt kann das durchbrechen.',

  /* problem silnikow */
  'ps.label': '// Warum der alte Motor gegen die Physik verlor',
  'ps.h2':    '120 JAHRE DERSELBE<br><span style="color:var(--red);">GRUNDLEGENDE FEHLER.</span>',
  'ps.sub':   'Jeder Kolbenmotor — vom Ford T bis zum Ferrari — funktioniert nach demselben Prinzip. Und hat dieselben unbeseitigbaren physikalischen Grenzen.',
  'ps.p1.title':   'TRÄGHEITSKRÄFTE<br><span>WACHSEN MIT DEM QUADRAT</span>',
  'ps.p1.desc':    'Der Kolben muss ständig <strong>anhalten und umkehren</strong> — hoch, runter, hoch, runter. Bei 6.000 U/min ändert der Kolben <strong>200 Mal pro Sekunde</strong> die Richtung. Die Trägheitskraft wächst mit <em>v²</em> — doppelte Geschwindigkeit bedeutet vierfache Materialbelastung.',
  'ps.p1.stat1': 'U/min Grenze',
  'ps.p1.stat2': 'Kraft bei 2× Drehzahl',
  'ps.p1.stat3': 'max. Wirkungsgrad',
  'ps.p1.insight': 'Der Kolbenmotor ist ein <strong>physischer Gefangener seiner eigenen Geometrie</strong>. Keine Ingenieurskunst kann die Trägheitskräfte der Hubbewegung beseitigen.',
  'ps.p2.title':   'DIE HÄLFTE DER ENERGIE<br><span>ENTWEICHT DURCH DAS ROHR</span>',
  'ps.p2.desc':    'Im konventionellen Motor verbrennt Kraftstoff <strong>einmalig und heftig</strong>. Heiße Abgase entweichen, bevor sie ihre Energie übertragen können. Das Kühlsystem leitet weitere 30% ab. Nur <strong>30–38% der Kraftstoffenergie</strong> erreichen die Räder.',
  'ps.p2.stat1': 'Energie verschwendet',
  'ps.p2.stat2': 'durch Auspuff verloren',
  'ps.p2.stat3': 'RCPM Wirkungsgrad',
  'ps.p2.insight': 'Der 12-Takt-Zyklus des RCPM ermöglicht es, <strong>dieselben Gase mehrfach zu expandieren</strong> — Energie bis zum letzten Tropfen herauszuholen.',
  'ps.verdict': 'Diese beiden Probleme lassen sich nicht mit evolutionären Methoden lösen.<br><strong>Sie erfordern eine architektonische Revolution.</strong>',

  /* siemens halske */
  'sh.eyebrow': '',
  'sh.h1':    'SIEMENS HALSKE WÄHLTE DIE <em>RICHTIGE RICHTUNG.</em><br>WIR WÄHLTEN DAS <em>RICHTIGE ZIEL.</em>',
  'sh.sub1':  '1918. Siemens &amp; Halske bauen einen Motor mit rotierendem Zylinderblock. Die Richtung war richtig — Rotation statt Kolben. Aber das Ziel war falsch: Sie jagten Leistung. Mehr Zylinder, größerer Block, höhere Verbrennungsdrücke.',
  'sh.sub2':  '<strong>Sie bauten einen Elefanten.</strong> Riesig, kraftvoll — aber langsam und gefräßig. Je größer die rotierende Masse, desto stärker die Trägheitskräfte und Corioliskräfte, die die Komponenten von innen zerreißen. Mehr Kräfte — mehr innere Reibung. Mehr Reibung — mehr Öl. <strong>Der SH.IIIa trank mehr Schmiermittel als Kraftstoff.</strong> Die Leistung ging in den Kampf gegen die eigene Konstruktion, nicht in den Antrieb.',
  'sh.sub3':  '<strong>Wir bauen einen Kolibri.</strong> Kleine Massen, hohe Drehzahlen. Ein Kolibri wiegt wenige Gramm und schlägt 80 Mal pro Sekunde mit den Flügeln — nicht mit Kraft, sondern mit Präzision und Rhythmus. RCPM wiegt 8 kg und dreht mit 19.100 U/min. Mikroeinspritzungen von Kraftstoff in genau den richtigen Rotationsphasen halten die Rotation aufrecht wie elektrische Impulse den Herzschlag.',
  'sh.sub4':  'Aber wir blieben nicht bei der Miniaturisierung stehen. Wir gingen von einer tieferen Frage aus: <strong>Was ist die optimale thermodynamische Umwandlung des idealen Wärmemotors?</strong> Aus der Antwort auf diese Frage — aus den Gesetzen der Thermodynamik, nicht aus Versuch und Irrtum — entstand die RCPM-Architektur. Wir adressierten die Corioliskraft direkt auf Konstruktionsebene. Sie ist Gegenstand unserer Patentanmeldungen.',
  'sh.canvasLeft':  '// Ziel: Leistung · große rotierende Massen · Corioliskraft · Reibung · Schmiermittel &gt; Kraftstoff',
  'sh.canvasRight': '// Ziel: optimaler Wärmemotor · kleine Massen · hohe U/min · Coriolis patentiert adressiert',
  'sh.b1.front.title': 'MASSE UND REIBUNG',
  'sh.b1.back.title':  'KLEINE MASSE = HOHE U/MIN',
  'sh.b2.front.title': 'CORIOLISKRAFT',
  'sh.b2.back.title':  'CORIOLIS ADRESSIERT',
  'sh.b3.front.title': 'FALSCHES ZIEL',
  'sh.b3.back.title':  'OPTIMALER WÄRMEZYKLUS',
  'sh.timeline.label': '// Evolution der Fertigungstechnologie — vom Unmöglichen zum Selbstverständlichen',
  'sh.tl.1918': 'SH.IIIa<br>Falsches Ziel',
  'sh.tl.1954': 'Wankel<br>Sackgasse',
  'sh.tl.2025': 'RCPM<br>Jetzt möglich',
  'sh.verdict':    'Siemens &amp; Halske wählten die <strong>richtige Richtung — Rotation.</strong> Aber sie wählten das <strong>falsche Ziel — maximale Leistung durch Größe.</strong><br>Je mehr Leistung sie wollten, desto größer der Elefant, desto größer die rotierende Masse, desto mehr Reibung, desto mehr Schmiermittel. Eine Spirale ohne Ausgang.<br><br>Wir kehren die Logik um. Wir beginnen mit der Thermodynamik — mit der Frage nach dem <strong>optimalen Wärmemotor.</strong> Die Antwort führt zur Miniaturisierung. Kleinere rotierende Masse, adressierte Corioliskraft, optimaler Wärmezyklus.<br><br><em>Was 1918 am Übermaß zerbrach — funktioniert heute genau deshalb, weil es klein, wendig und thermodynamisch korrekt ist.</em>',
  'sh.stampLabel': 'JAHRE<br>FALSCHER MASSSTAB',

  /* przelom */
  'pb.label':   '// Die Antwort auf beide Probleme gleichzeitig',
  'pb.h2':      'DAS HABEN WIR <em>GEÄNDERT</em><br>UND WARUM ES ZÄHLT',
  'pb.before1.title': 'AUF-AB-BEWEGUNG',
  'pb.before1.sub':   'Kolben- / Hubkolbenmotor',
  'pb.f1a.label': 'Geschwindigkeitsbegrenzung',
  'pb.f1a.val':   'Mauer bei ~6.500 U/min — Trägheitskräfte wachsen mit dem Quadrat der Geschwindigkeit. Kein Durchkommen.',
  'pb.f1b.label': 'Vibrationen und Verschleiß',
  'pb.f1b.val':   'Jedes Anhalten und Richtungswechsel des Kolbens ist ein Schlag. 2.000 Mal pro Minute.',
  'pb.f1c.label': 'Miniaturisierung unmöglich',
  'pb.f1c.val':   'Bei kleinen Abmessungen steigen die relativen Kräfte — der Motor zerstört sich, bevor er Leistung erreicht.',
  'pb.after1.title': 'RADIALBEWEGUNG',
  'pb.after1.sub':   'Rotating Cylindrical Piston Machine',
  'pb.g1a.label': 'Kräfte heben sich gegenseitig auf',
  'pb.g1a.val':   'Die Rotation der gesamten Baugruppe neutralisiert die Kolben-Trägheitskräfte. Physik arbeitet für uns.',
  'pb.g1b.label': 'Ziel: &gt;19.100 U/min',
  'pb.g1b.val':   '2× die Drehzahl eines F1-Motors. Klein, leicht, 8 kg — und stärker als alles in dieser Klasse.',
  'pb.g1c.label': 'Miniaturisierung = Vorteil',
  'pb.g1c.val':   'Je kleiner der Kolben — desto geringer die absoluten Kräfte. Miniaturisierung ist Strategie, kein Kompromiss.',
  'pb.before2.title': 'GLEICHZEITIG HEIZEN UND KÜHLEN',
  'pb.before2.sub':   'Konventionelle Brennkammer',
  'pb.f2a.label': 'Wärme = Verlust',
  'pb.f2a.val':   'Der Motor kühlt sich mit Wasser und Öl — weil Wärme der Feind ist. Doch die Verbrennung selbst braucht sie.',
  'pb.f2b.label': 'Max. Wirkungsgrad ~40%',
  'pb.f2b.val':   'Die Carnot-Theorie gibt die Obergrenze. Niemand hat sie überschritten — weil niemand Wärme zwischen Zyklen pufferte.',
  'pb.after2.title': 'WÄRMEPUFFERUNG',
  'pb.after2.sub':   'Aktives Verbrennungssystem (AKS)',
  'pb.g2a.label': 'Wärme einer Explosion treibt die nächste an',
  'pb.g2a.val':   'Wolfram- und Aluminiumschichten im AKS puffern Energie zwischen Zyklen. Keine Wärme entweicht nutzlos.',
  'pb.g2b.label': 'CO₂ –46 g/km · –2 l/100km',
  'pb.g2b.val':   'AKS überschreitet die Carnot-Grenze durch Steuerung des Wärmeübertragungszeitpunkts — ein Jahrhundertdurchbruch.',
  'pb.verdict':    '<strong>RCPM + AKS zusammen:</strong> der erste Motor, der beide grundlegenden Probleme gleichzeitig beseitigt. Keine neue Version eines alten Ansatzes — <strong>eine völlig andere Architektur.</strong> Klein. Schnell. Heiß innen, kalt außen. Bereit für jeden Kraftstoff.',
  'pb.verdictTag': 'GAMECHANGER',

  /* ps3 prototyp */
  'proto.label':     '// PS3-Prototyp — Bestätigung',
  'proto.pill':      'KONSTRUKTIONSANNAHMEN BESTÄTIGT',
  'proto.statement': 'Der bahnbrechende Volllauf des <em>PS3</em>-Prototyps bestätigte die Konstruktionsannahmen.<br>Der Weg zu <strong>hocheffizienten Hochdrehzahl</strong>-Kompaktantrieben<br>mit einfacher Technologie wurde <em>eröffnet</em>.',
  'proto.chip1': 'Prototyp-Masse<br>PS3',
  'proto.chip2': 'U/min erreicht<br>im Test',
  'proto.chip3': 'U/min Ziel<br>angestrebt',
  'proto.chip4': '2× Drehzahl<br>eines F1-Motors',

  /* porsche vs rcpm */
  'pvr.label':  '// Marktkontext',
  'pvr.h2':     'SELBST PORSCHE SUCHT EINEN AUSWEG',
  'pvr.sub':    'Ein 2024 von Porsche AG eingereichtes Patent bestätigt: Die Branche sucht eine Alternative zum klassischen Kolben. Nur sucht sie — <em style="color:rgba(255,255,255,0.75);">immer noch in derselben Schublade.</em>',
  'pvr.diagLeft':     'DIAGNOSE: Verfeinerter Klassiker — kein Durchbruch',
  'pvr.diagRight':    'DIAGNOSE: Neue Architektur — out of the box',
  'pvr.investorLabel':'Erkenntnis für Investoren',
  'pvr.investorText': 'Wenn Porsche — Branchenführer — einen Ausweg aus der Kolben-Sackgasse sucht, dann ist <strong style="color:#fff;">der Markt bereit.</strong> Wir haben die Antwort, die sie nicht haben.',

  /* trend rynkowy */
  'tr.label':  '// Marktsignal · 2023–2025',
  'tr.h2':     'DIE BRANCHE STIMMT MIT DEN FÜSSEN AB',
  'tr.sub':    'Mazda, Ram, Hyundai, MAHLE, Li Auto — alle kommen unabhängig zum selben Schluss: <em style="color:rgba(255,255,255,0.75);">Motor als Generator ist die Zukunft der Mobilität.</em> RCPM ist bereit für diesen Markt.',
  'tr.investorLabel': 'Investorensignal',
  'tr.investorText':  'Der EREV-Markt (Motor als Generator) wächst exponentiell. ICE-Range-Extender machen <strong style="color:#fff;">73% des Marktes 2024</strong> aus. Keiner von ihnen hat RCPM — einen kompakten, leichten (8 kg), hochdrehenden (19.100 U/min) Generator für jeden Kraftstoff. <strong style="color:var(--gold);">PowerBee füllt diese Lücke.</strong>',

  /* wszyscy wygrywaja */
  'ww.label':    '// Die Antwort',
  'ww.subtitle': 'ÄNDERT DIE SPIELREGELN.',
  'ww.desc1':    'Patentierte RCPM-Technologie — der erste Motor ohne Hubbewegung, ohne die Schwächen des Wankels, ohne die Einschränkungen der klassischen Architektur.',
  'ww.desc2':    'Eine Plattform. Drei Märkte. Sechs Produkte. Patent bis 2045.',
  'ww.mob.intro': 'Für eine neue Ära der Mobilität —',
  'ww.mob.ev':    'Elektrisch.',
  'ww.mob.hyb':   'Hybrid.',
  'ww.mob.ice':   'Verbrennung.',
  'ww.mob.win':   'Alle gewinnen.',
  'ww.mob.nobat': 'Ohne auf bessere Batterien zu warten.',
  'ww.seg.ev.badge':  'ELEKTRISCH',
  'ww.seg.ev.prod':   'PSGrex — Range Extender',
  'ww.seg.ev.desc':   '+200 km Reichweite ohne größere Batterie. &lt;10 kg, &lt;€1.750. Die Antwort auf das Problem, das der BMW i3 nie gelöst hat.',
  'ww.seg.hyb.badge': 'HYBRID',
  'ww.seg.hyb.prod':  'PSE / PSG100 — Bordkraftwerk',
  'ww.seg.hyb.desc':  'Serienhybrid der nächsten Generation. CO₂ &lt;65 g/km. EU-Norm 2030 mit Spielraum erfüllt.',
  'ww.seg.ice.badge': 'VERBRENNUNG',
  'ww.seg.ice.prod':  'AKS / AKS-P — Drop-in-Modifikation',
  'ww.seg.ice.desc':  'Kein Motorwechsel nötig. -2 l/100 km, -40 g/km CO₂. Nachrüstung für 1,3 Mrd. bestehende Fahrzeuge.',

  /* energia */
  'en.label': '// Warum Kraftstoff, nicht nur Batterien',
  'en.title': 'KRAFTSTOFF TRÄGT<br><span>30–130×</span><br>MEHR ENERGIE.',
  'en.body1': 'Li-Ion-Batterien: ~250 Wh/kg. Benzin: ~12.000 Wh/kg. Wasserstoff: ~33.000 Wh/kg. Diese Lücke wird für Jahrzehnte nicht verschwinden.',
  'en.body2': 'RCPM eröffnet den Weg, diese Kraftstoffe mit &gt;60% Wirkungsgrad zu verbrennen — sauber, modular, ohne die Einschränkungen alter Architektur.',

  /* problem (stary) */
  'prob.label': '// 01 · Problem',
  'prob.title': '120 JAHRE<br><span>SACKGASSE</span>',
  'prob.sub':   'Seit über 120 Jahren verschwenden Motoren die Hälfte ihres Kraftstoffs. Die Branche optimiert — aber ändert nie die Grundlagen.',

  /* technologia */
  'tech.title': 'PATENTIERTE<br><span>ARCHITEKTUR</span>',
  'tech.sub':   'Kein weiteres Upgrade. Ein neues Fundament. Verifiziert durch das Journal of Thermal Science und ICCHMT 2018.',
  'evo.gen.title': 'JEDE GENERATION<br><span>HATTE IHRE GRENZE</span>',

  /* ewolucja */
  'evo.title': 'EINE ERFINDUNG<br><span class="gold">SECHS ANWENDUNGEN</span>',
  'evo.sub':   'Eine Technologieplattform — sechs Produkte, sechs Märkte, sechs Einnahmequellen.',

  /* rynek */
  'rynek.title': 'WÄCHST AM SCHNELLSTEN —<br><span>IN ALLEN</span><br>SEGMENTEN GLEICHZEITIG.',
  'rynek.sub':   'Drei Segmente. Drei Produkte. Ein technologisches Fundament.',

  /* kontakt */
  'kontakt.title':       'BEGINNEN WIR<br><span>EIN GESPRÄCH</span>',
  'kontakt.lead':        'Wenn Sie sich für eine Investition, OEM-Partnerschaft oder die Technologie interessieren — schreiben oder rufen Sie an. Wir antworten innerhalb von 24 Stunden.',
  'kontakt.emailLabel':  'E-MAIL',
  'kontakt.phoneLabel':  'TELEFON',
  'kontakt.companyLabel':'UNTERNEHMEN',
  'kontakt.patentLabel': 'PATENT',

  /* contact form */
  'contact.name':    'Vollständiger Name',
  'contact.company': 'Unternehmen / Organisation',
  'contact.topic':   'Betreff...',
  'contact.opt1':    'Investition',
  'contact.opt2':    'OEM-Partnerschaft',
  'contact.opt3':    'Technologielizenz',
  'contact.opt4':    'Medien / Presse',
  'contact.opt5':    'Sonstiges',
  'contact.msg':     'Nachricht (optional)...',
  'contact.send':    'Anfrage senden →',

  /* footer */
  'footer.copy':   '© 2025 PowerBee P.S.A. · Alle Rechte vorbehalten',
  'footer.patent': 'Patent PL · DE · KR · IN<br>Erfinder: Zbigniew Sadlak / IBS München<br>Schutz bis 22.02.2036',

  '__title': 'Revora Engine™ — Modulare Verbrennungsplattform',
  '__lang_attr': 'de',
},
};

/* ── Current language ── */
let currentLang = localStorage.getItem('revora_lang') || 'pl';

/* ── Apply translations ── */
function applyLang(lang) {
  const dict = TRANSLATIONS[lang];
  if (!dict) return;
  currentLang = lang;
  window.__currentLang = lang;
  localStorage.setItem('revora_lang', lang);

  /* Update html lang attr */
  document.documentElement.lang = dict['__lang_attr'] || lang;

  /* Update page title */
  if (dict['__title']) document.title = dict['__title'];

  /* ── innerHTML elements ── */
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      el.innerHTML = dict[key];
    }
  });

  /* ── placeholder elements ── */
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key] !== undefined) {
      el.placeholder = dict[key];
    }
  });

  /* ── select options with data-i18n ── */
  document.querySelectorAll('select option[data-i18n]').forEach(opt => {
    const key = opt.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      opt.textContent = dict[key];
    }
  });

  /* ── Update active lang button ── */
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('lang-active', btn.dataset.lang === lang);
  });

  /* ── Animate: brief flash on change ── */
  document.body.style.transition = 'opacity 0.15s ease';
  document.body.style.opacity = '0.92';
  setTimeout(() => { document.body.style.opacity = '1'; }, 150);
}

/* ── Public API ── */
window.setLang = function(lang) { applyLang(lang); };

/* ── Init on load ── */
document.addEventListener('DOMContentLoaded', function() {
  applyLang(currentLang);
});

/* Also apply immediately if DOM already ready */
if (document.readyState !== 'loading') {
  applyLang(currentLang);
}

})();
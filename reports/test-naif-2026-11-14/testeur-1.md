# Test naïf du 2026-11-14, testeur 1 : feestdagenwijzer.nl
**Persona :** Néerlandais(e) de 45 ans, salarié(e), à l'aise avec son téléphone, aucune connaissance particulière du sujet, ne lit pas les longs paragraphes. Il/elle a tapé sa question dans Google (« feestdagen 2027 ») et a cliqué sur le résultat « Feestdagen 2027: datums, brugdagen en wie er vrij is » parce qu'il/elle veut vraiment savoir quels jours il/elle aura de libre en 2027.

## 1. Concept

**Après 5 secondes** (01-accueil-1) : « Feestdagen 2027 in Nederland », puis « 5 vrije dagen door de week » en très gros. Elle comprend tout de suite : c'est la liste des jours fériés 2027, et on lui dit combien tombent en semaine. Ça colle avec le résultat Google. Le logo « vrij » aux couleurs du drapeau rassure : c'est néerlandais et ça parle de jours de congé.

**Après 2 minutes** : elle voit que le site fait plus que la liste. Il dit pour chaque jour férié si on est « Meestal vrij », si c'est « Meestal werken » (Goede Vrijdag) ou si ça « Hangt van uw cao af » (Bevrijdingsdag). Il calcule aussi les « brugdagen » et le meilleur moyen de placer ses congés (« 5 verlofdagen = 13 dagen vrij »). Il donne les jours ouvrés (256) et les vacances scolaires par région. Le concept est clair : **savoir quand on est libre et comment poser ses congés pour avoir le plus de jours d'affilée**.

**Pour qui ?** Les salariés en priorité, puis les fonctionnaires et les parents d'élèves (les trois profils reviennent partout).
**Bénéfice concret :** en 30 secondes elle sait que Noël 2027 tombe un week-end (« Kerst valt in 2027 helemaal in het weekend en levert dus niets op »), que le 5 mai dépend de sa cao et qu'avec 5 jours de congé bien placés elle peut avoir 13 jours libres. C'est utile, et c'est mieux que la simple liste qu'elle trouverait ailleurs.

## 2. « Tout le monde peut-il comprendre ? »

**Verdict : oui pour l'essentiel. Ça décroche à quatre endroits.**
- **La réponse sur les jours les plus évidents.** Pour Nieuwjaarsdag et les deux Kerstdagen, la colonne « Vrij bij een bedrijf? » affiche « Geen toelichting van de Rijksoverheid ». Elle s'attend à un « oui » : c'est Noël ! Cette réponse administrative la déstabilise, d'autant que l'encadré jaune du haut les compte justement « Als vrij gerekend ».
- **Le vocabulaire de calcul.** « Rendement per verlofdag 2,6 », « 4 → 9 », « Beste blok », « Echte brugdagen » : compréhensible si on réfléchit, mais pas immédiat.
- **Les mini-calculateurs.** Le chiffre saisi ne correspond pas à ce qui est utilisé : on tape 3 jours, il en utilise 2 ; on tape 4 jours, il en utilise 3. Le « Beste blok » ne correspond pas non plus au texte juste au-dessus.
- **Des erreurs visibles sur 2028.** Le site dit que le vendredi 28 avril 2028 « is ook 5 mei ». N'importe qui voit que c'est faux, et ça casse la confiance.

## 3. Parcours écran par écran

| Écran | Ce qu'elle comprend / ce qui coince |
|---|---|
| 01-accueil-1 | **Compris.** Titre clair, gros chiffre « 5 vrije dagen door de week ». Les listes « Jaar 2027 » et « Uw situatie: Werknemer bij een bedrijf » se comprennent. « Meer opties » : elle ne sait pas ce qu'il y a derrière et ne l'ouvre pas. **Coince un peu :** « Van de 11 officiële feestdagen vallen er 2 altijd op zondag; 2 vallen in 2027 in het weekend ». Elle fait le calcul 11 − 2 − 2 = 7, pas 5. Il faut lire l'encadré jaune pour comprendre que Goede Vrijdag et le 5 mai ne sont pas comptés. |
| 01-accueil-suite1 | **Compris :** l'encadré jaune « Als vrij gerekend: … Of u echt vrij bent, staat in uw cao of contract. » et les 4 chiffres (5 / 2 / 2 / 256). **Coince :** « — wijzig een getal om uw eigen resultaat te zien ». Quel nombre ? Il n'y a que deux listes déroulantes, aucun nombre à modifier. Le tableau est **coupé à droite** : « Alle officiële feestdagen 2027 met weekdag e… » est tronqué et une 4e colonne est cachée derrière une ombre. Elle ne pense pas à faire glisser le tableau. |
| 01-accueil-suite2 | **Compris :** liste des 11 jours avec date et jour de la semaine, très lisible. C'est ce qu'elle cherchait. **Raté :** la colonne de droite (le « vrij ? ») ne se voit pas. |
| 01-accueil-suite3 | **Coince :** un nouveau bloc « Regio voor de schoolvakantie / Regio Midden » sans explication. Ensuite un compte à rebours « Nog tot Eerste Kerstdag 40 dagen 8 uur 46 min » et « Volgende officiële feestdag: Eerste Kerstdag, vrijdag 25 december **2026** ». Elle est sur une page 2027 et voit soudain 2026. On comprend en y réfléchissant (c'est le prochain jour férié), mais ça mélange deux années. « Vrij voor werknemers? **Geen toelichting van de Rijksoverheid** » pour Noël : réponse inattendue et peu rassurante. |
| 01-accueil-suite4 | **Compris :** « Vandaag: zaterdag 14 november 2026 » et le rappel 5 / 2 / 256 / « Hemelvaart do 6 mei ». « Rekenhulpen voor uw vrije dagen » : des cartes claires (« Brugdagen 2027 — 2 echte brugdagen; 5 verlofdagen = 13 dagen vrij » donne envie de cliquer). |
| 01-accueil-suite5 | **Coince légèrement :** la carte « Schoolvakanties 2026-2027 — Zomer 2027 vanaf 10 juli 2027 (Noord) ». Juste au-dessus, elle avait « Regio Midden ». Puis un long paragraphe (elle ne le lit pas), replié par « Hele alinea lezen » : bien. |
| 01-accueil-suite6 | Texte long, qu'elle survole. « Dat maakt 2027 een mager jaar » : la formule lui parle. |
| 01-accueil-suite7 / suite8 / suite9 | **Compris :** fiche par jour férié (« Vrij bij een bedrijf? Meestal vrij / Meestal werken / Hangt van uw cao af »). **Coince :** encore « Geen toelichting van de Rijksoverheid » pour Nieuwjaarsdag et les Kerstdagen. Le paragraphe de suite9 l'explique (« Bij Nieuwjaarsdag en de Kerstdagen geeft de Rijksoverheid geen aparte toelichting »), mais trop tard et trop loin. Pour Eerste Paasdag, « Vrij bij een bedrijf? **Zondag** » n'est pas une réponse à la question. |
| 01-accueil-suite10 | **Compris :** « Hoeveel vrije dagen haalt u uit 2027? Verlofdagen 5 » → « 13 dagen ». **Coince :** « Rendement per verlofdag 2,6 » (jargon de placement financier). « Beste blok za 27 maart – zo 4 april » : elle comprend que c'est autour de Pâques, mais ne voit pas d'où viennent les 13 jours (le 2e bloc n'est pas affiché ici). |
| 01-accueil-suite11 | **Coince :** « Zonder Goede Vrijdag en 5 mei als vrije dag; zet ze aan in de planner als uw cao ze geeft ». Où ça ? Il n'y a pas d'interrupteur ici. Le lien « Naar de brugdagenplanner → » est bien visible. Le plan du site en liens orange est pratique. |
| 01-accueil-suite12 / suite13 | Accordéons « Alles over de feestdagen van 2027 » et « Veelgestelde vragen » : les questions sont exactement les siennes (« Krijg ik een extra vrije dag als Kerst in het weekend valt? », « Moet ik werken op Goede Vrijdag 26 maart 2027? »). Très bien. |
| 01-accueil-suite14 / suite15 | Sources officielles (Rijksoverheid) : rassurant. « Opgesteld door Radif Partners, onafhankelijke uitgever » et « Bijgewerkt op 13 november 2026 » : elle voit que c'est indépendant et à jour. |
| 02-menu-1 | **Compris :** trois rubriques (Feestdagen, Brugdagen, Schoolvakanties). **Coince :** « Feestdagen » et « Schoolvakanties » sont ouvertes, « Brugdagen » est fermée. C'est justement ce qui l'intéresse le plus, et elle doit tapoter pour voir ce qu'il y a dedans. « Kerst 2027 » n'apparaît pas dans la liste, alors que c'est le sujet phare de l'accueil. « Termijn op een feestdag » : ça ne lui dit rien. |
| 03-…ben-ik-vrij-1 | **Très clair :** « Vrij op een feestdag: wat geldt voor u? » et la réponse en une phrase : « de wet regelt het niet ». Grosse réponse « Meestal vrij » pour Tweede Pinksterdag. **Coince :** pourquoi Tweede Pinksterdag est-il présélectionné ? Ce n'est pas le prochain jour férié. |
| 03-…-suite1 | **Coince fortement :** « **Voorbeeld met gangbare bedragen** — wijzig een getal ». Des montants (bedragen) ? Il n'y a ni argent ni nombre sur cette page. Elle se demande si elle s'est trompée d'outil. Les 3 profils (Werknemer / Ambtenaar / Scholier) sont en revanche très clairs. |
| 03-…-suite2 | Tableau récapitulatif : lisible, mais coupé à droite (« Rijksoverheic »). |
| 03-…-suite3 / suite4 | « Overzicht per situatie » : très bien fait, c'est la vraie valeur de la page. Les fonctionnaires sont « Vrij » à Koningsdag : clair. |
| 03-…-suite5 | « Waar u het zeker weet: Zoek uw cao op, of vraag uw werkgever » : conseil concret, apprécié. |
| 03-…-suite6 / suite7 | Deuxième outil « Ben ik vrij? » avec Koningsdag : « Meestal vrij ». La ligne « Werknemer » n'est pas répétée en dessous (seulement Ambtenaar et Scholier). Ça va, mais c'est différent du premier outil. FAQ « Moet mijn werkgever extra betalen als ik op een feestdag werk? » : bonne question. |
| 03-…-suite8 / suite9 | « Verder rekenen » et sources : clair. |
| 04-bevrijdingsdag-1 / suite1 | **Très clair :** « Bevrijdingsdag 2027: woensdag 5 mei vrij of niet? » → « Hangt van uw cao af ». C'est honnête. Encore « Voorbeeld met gangbare bedragen » sans aucun montant. « Ambtenaar: Hangt van uw cao af » : un fonctionnaire a-t-il une cao ? Elle doute. |
| 04-…-suite2 / suite3 | Tableau (coupé à droite) puis histoire du 5 mai en 2 lignes : bien dosé. |
| 04-…-suite4 | « 5 mei van 2026 tot 2030 » : simple et utile (vendredi en 2028 !). |
| 04-…-suite5 / suite6 | **Coince :** l'outil « Verlof in mei 2027 », avec 3 verlofdagen saisis, affiche « 8 dagen », puis « Verlofdagen gebruikt 2 » et « Beste blok za 24 april – di 27 april ». Le titre parle de mai, mais le meilleur bloc tombe en avril. Elle a mis 3 jours et il en utilise 2. Le meilleur bloc fait 4 jours, alors d'où viennent les 8 ? Elle ne comprend plus. |
| 04-…-suite7 → suite9 | FAQ et liens : clair. |
| 05-brugdagen-2027-1 | **Très clair :** « Brugdagen 2027: meer vrij met minder verlof ». La phrase d'intro donne directement les deux dates (26 avril et 7 mai). « 13 dagen vrij » en gros. |
| 05-…-suite1 | **Compris :** les barres « za 27 maart – zo 4 april 4 → 9 » et « za 24 april – di 27 april 1 → 4 ». On devine « 4 jours de congé → 9 jours libres », mais l'écriture « 4 → 9 » n'est pas expliquée. « Uw verlofplan 2027: deze dagen aanvragen » : excellent titre, très concret. **Coince :** le tableau est coupé à droite, la dernière colonne affiche « Tw / Pa… », « Ko… ». **Doute :** il y a 2 « echte brugdagen » (26 avril et 7 mai), mais le plan à 5 jours ne prend pas le 7 mai. Pourquoi ? |
| 05-…-suite2 / suite3 | « Alle bruggen van 2027, de beste eerst » : utile. Tableau très étroit, dates cassées sur 4 lignes (« za 27 / maart / – zo / 4 / april »). C'est pénible à lire. |
| 05-…-suite4 / suite5 | Plan « tien verlofdagen: 26 dagen vrij » en fiches lisibles : mieux que le tableau. |
| 05-…-suite6 / suite7 | Outil « Is 5 mei 2027 vrij in uw situatie? » : clair. Paragraphe sur la meivakantie « geldt in Noord, Midden en Zuid tegelijk » : info pratique pour les parents. |
| 05-…-suite8 → suite10 | FAQ, liens, sources : clair. |
| 06-brugdagen-2028-1 / suite1 | Clair : « Kerst: 3 verlofdagen voor 10 dagen vrij ». Tableau à nouveau coupé à droite (« Vri / dag… »). |
| 06-…-suite2 / suite3 | **Coince fortement :** « 28 april 2028, na Koningsdag … **De eerste vrijdag is ook Bevrijdingsdag** ». C'est faux : le 28 avril n'est pas le 5 mai. Elle s'arrête et se méfie de tout le reste. |
| 06-…-suite4 / suite5 | **Coince fortement :** « Koningsdag op donderdag 27 april 2028 en **5 mei de dag erna** » : faux (le 5 mai 2028 tombe une semaine plus tard). Puis l'outil « Bent u vrij op 5 mei? » s'ouvre sur **Jaar 2027 / woensdag 5 mei 2027**, alors qu'elle est sur la page 2028. |
| 06-…-suite6 → suite9 | FAQ « Is vrijdag 5 mei 2028 vrij? » (bonne question, qui contredit le texte au-dessus), liens, sources. |
| 07-feestdagen-2028-1 → suite3 | **Compris :** « 6 vrije dagen door de week, een meer dan in 2027 ». Liste claire, Pâques tardif expliqué en 4 lignes. |
| 07-…-suite4 / suite5 | Liste en fiches. « voor 2028 staat ze er nog niet, maar elke datum volgt uit vaste regels » : honnête et rassurant. |
| 07-…-suite6 | **Coince :** même erreur qu'en 2028 : « Koningsdag op donderdag maakt van de vrijdag een brug; **omdat die vrijdag ook 5 mei is** ». Le tableau juste au-dessus dit pourtant 27 avril (jeudi) et 5 mai (vendredi). |
| 07-…-suite7 → suite10 | Outil « Uw verlof in 2028 » cohérent (3 jours → 10 jours, bloc de Noël). FAQ « Is 2028 een schrikkeljaar? » : sympathique. |
| 08-feestdagen-2029-1 → suite5 | Clair : « 3 brugdagen; maandag 24 december is de beste ». Liste juste et lisible. « geen gedoe over wel of niet vrij op Bevrijdingsdag » : ton agréable. |
| 08-…-suite6 / suite7 | **Coince :** le texte vient de décrire Noël 2029 « met vier verlofdagen van zaterdag 22 december tot en met Nieuwjaarsdag 2030 ». Juste en dessous, l'outil, avec « 4 dagen », affiche « 13 dagen », « Verlofdagen gebruikt **3** », « Beste blok **do 10 mei – zo 13 mei** ». Elle avait saisi 4 jours. Pourquoi 3, et pourquoi pas Noël ? Incohérence entre le texte et l'outil. |
| 08-…-suite8 → suite10 | FAQ et liens : clair. |
| 09-goede-vrijdag-1 / suite1 | **Très clair :** « Goede Vrijdag 2027: vrij of niet? » → « Meestal werken ». Réponse franche, c'est exactement ce qu'elle voulait savoir. Encore « Voorbeeld met gangbare bedragen » sans montant. |
| 09-…-suite2 / suite3 | Tableau (coupé) et explication par situation : clair. |
| 09-…-suite4 / suite5 | « Wat Goede Vrijdag u kost of oplevert » : 256 ou 255 jours ouvrés, outil « Werkdagen per week » (pratique pour un temps partiel). « Kortste maand 19 / Langste maand 23 » : elle ne sait pas de quels mois il s'agit. |
| 09-…-suite6 → suite8 | Délais (« verloopt pas op dinsdag 30 maart 2027 ») : elle ne s'y attendait pas, mais l'explication est claire. Sources, auteur. |

## 4. Chaque fonction

| Fonction | Trouvée ? | Comprise ? | Utile ? | Évidence /5 |
|---|---|---|---|---|
| Liste des jours fériés de l'année avec jour de la semaine | Oui, tout de suite | Oui | Très | 5 |
| Compteur « X vrije dagen door de week » | Oui (gros chiffre) | Oui, mais il faut l'encadré jaune pour comprendre pourquoi 5 et pas 7 | Oui | 4 |
| Choix « Uw situatie » (werknemer / ambtenaar / scholier) | Oui | Oui | Très | 4 |
| « Ben ik vrij? » par jour férié | Oui (page dédiée + mini-outils) | Oui pour « Meestal vrij / werken / Hangt van uw cao af » ; non pour « Geen toelichting van de Rijksoverheid » et « Zondag » | Très | 3 |
| Brugdagenplanner (verlofplan) | Oui (cartes, liens « Naar de brugdagenplanner → ») | Le résultat « 13 dagen vrij » et la liste « deze dagen aanvragen » : oui. « 4 → 9 », « Rendement per verlofdag » : à moitié | Très (c'est la fonction phare) | 3 |
| Mini-outils « Verlof in mei / Hoeveel vrij haalt u uit 2029 » | Oui | Non : jours saisis ≠ jours utilisés, « Beste blok » hors sujet | Moyen | 2 |
| Compte à rebours jusqu'au prochain jour férié | Oui | Oui, mais mélange 2026 et 2027 | Gadget sympathique | 3 |
| Vacances scolaires par région | Vue (liste « Regio Midden », cartes) | Partiellement (« Regio Midden » ici, « (Noord) » sur la carte) | Utile pour les parents | 3 |
| Jours ouvrés par an / par semaine | Oui | Oui | Moyen (utile au temps partiel) | 4 |
| Délai qui tombe un jour férié (termijnen) | Par hasard | Oui une fois lu | Niche | 3 |
| Link kopiëren / Afdrukken / Zo wordt gerekend | Oui | Oui | Pratique | 4 |
| FAQ en accordéon | Oui | Oui, les questions sont les siennes | Oui | 5 |
| Menu ☰ | Oui | Oui ; « Brugdagen » fermé alors que c'est la rubrique la plus utile | Oui | 4 |

## 5. Enchaînement et navigation

- **Bon :** le fil d'Ariane (« Start / Brugdagen, werkdagen en vrij zijn / … ») est présent partout. Chaque page se termine par « Verder rekenen » avec 3 à 5 cartes bien titrées, ce qui la fait naturellement passer de « feestdagen » à « brugdagen » puis à « vrij of niet ». La structure des pages est toujours la même (titre-question, réponse en une phrase, outil, gros résultat, détail, FAQ, sources), donc elle s'y retrouve vite.
- **Moins bon :**
  - Les **tableaux sont coupés à droite sur toutes les pages**. La dernière colonne est cachée et rien n'invite à faire glisser le tableau.
  - Les pages sont **très longues**, parfois 10 à 15 écrans. Plusieurs outils se suivent (outil principal, puis un deuxième et un troisième plus bas), et elle ne sait plus lequel est « le vrai ».
  - **Incohérences d'une page à l'autre :** 2028 contre 2027 dans l'outil du 5 mai, « Regio Midden » contre « (Noord) », et l'écart entre jours saisis et jours utilisés.
  - Le bouton « EN » est visible. Elle n'en a pas besoin, mais ça ne gêne pas.

## 6. Difficultés classées

1. **06-brugdagen-2028-suite3 / suite5 et 07-feestdagen-2028-suite6 : erreurs de date visibles.** « De eerste vrijdag is ook Bevrijdingsdag », « 5 mei de dag erna », « omdat die vrijdag ook 5 mei is ». Le 28 avril 2028 n'est pas le 5 mai (le site lui-même affiche le 5 mai 2028 un vendredi, une semaine plus tard). Elle en conclut : « s'ils se trompent là-dessus, je ne peux pas me fier au reste ».
   **Recommandation :** corriger les deux pages. Texte de remplacement (brugdagen 2028) : « In 2028 zijn er 2 echte brugdagen, allebei op vrijdag: 28 april 2028, na Koningsdag op donderdag 27 april, en 26 mei 2028, na Hemelvaart. Een week later valt Bevrijdingsdag op vrijdag 5 mei 2028: wie die dag vrij heeft, heeft zonder verlof een lang weekend. » Pour la page feestdagen 2028 : « Koningsdag op donderdag 27 april maakt van vrijdag 28 april een brug. Bevrijdingsdag valt een week later op vrijdag 5 mei: wie die dag vrij heeft, heeft opnieuw een lang weekend. Hemelvaart op 25 mei 2028 geeft de tweede brug. »

2. **Toutes les pages (01-suite3, suite7–suite9, 03-suite2, 04-suite2, 09-suite2) : « Geen toelichting van de Rijksoverheid » pour Nieuwjaarsdag et Kerst.** Elle demande « suis-je libre à Noël ? » et on lui répond par une formule administrative, alors que le résultat du haut compte ces jours comme libres. C'est la réponse la moins claire du site, sur les jours les plus évidents.
   **Recommandation :** afficher une réponse sur le même modèle que les autres. Texte de remplacement : « Meestal vrij » avec la précision « (de Rijksoverheid geeft geen aparte toelichting; zie uw cao) » en petit, ou au minimum « Meestal vrij volgens cao ». Pour Eerste Paasdag et Eerste Pinksterdag, remplacer « Zondag » par « Valt op zondag ».

3. **Mini-outils 04-suite5/6 et 08-suite6/7 : nombre de jours saisi ≠ utilisé, et « Beste blok » hors sujet.** On saisit 3 jours, il en utilise 2. On saisit 4 jours, il en utilise 3, et le bloc proposé (10–13 mai) n'est pas celui que le texte vient de vanter (Noël). Elle croit que l'outil est cassé.
   **Recommandation :** quand tous les jours ne sont pas utilisés, l'écrire : « 1 verlofdag over: die levert geen extra vrije dag op ». Faire coïncider le « Beste blok » avec le texte qui précède (Noël 2029), ou renommer en « Blok met het meeste rendement ». Dans l'outil « Verlof in mei 2027 », ne pas proposer un bloc d'avril, ou renommer l'outil « Verlof rond Koningsdag en Hemelvaart 2027 ».

4. **06-brugdagen-2028-suite5 : l'outil « Bent u vrij op 5 mei? » s'ouvre sur 2027** (« woensdag 5 mei 2027 ») sur une page 2028. **Recommandation :** préremplir « Jaar 2028 » : « vrijdag 5 mei 2028 ».

5. **03-suite1, 04-suite1, 09-suite1 (et l'accueil) : « Voorbeeld met gangbare bedragen — wijzig een getal om uw eigen resultaat te zien » sur des écrans sans montant ni nombre.** Elle cherche un champ qui n'existe pas et doute d'être au bon endroit.
   **Recommandation :** texte de remplacement : « Voorbeeld voor een werknemer bij een bedrijf — kies hierboven uw situatie of een andere feestdag ». Sur l'accueil : « Voorbeeld voor 2027 — kies hierboven een ander jaar of uw situatie ».

6. **Tous les tableaux (01-suite1, 03-suite1, 05-suite1/2, 06-suite1/2…) : tableaux coupés à droite**, avec une colonne cachée derrière une ombre (« Rijksoverheic », « Ko… », « Vri / dag… »). Les dates sont cassées sur 4 lignes dans le tableau des bruggen.
   **Recommandation :** sur mobile, afficher les tableaux en fiches (comme le fait déjà le bloc « Verlof nemen: … Verlofdagen … Vrije dagen »), ou au minimum ajouter « ← veeg voor meer kolommen → ». Réduire le tableau des bruggen à 3 colonnes (« Verlof nemen / Verlofdagen / Vrij op een rij »).

7. **01-accueil-1 : « Van de 11 … 2 altijd op zondag; 2 … in het weekend » → « 5 vrije dagen ».** Le calcul ne tombe pas juste sans lire l'encadré.
   **Recommandation :** texte de remplacement : « Van de 11 officiële feestdagen vallen er 2 altijd op zondag en 2 in 2027 in het weekend (Kerst). Goede Vrijdag en 5 mei tellen niet mee, want daarop werken de meeste mensen. Blijven over: 5 vrije dagen door de week. »

8. **Jargon des calculateurs (01-suite10, 05-suite1) : « Rendement per verlofdag 2,6 » et « 4 → 9 ».**
   **Recommandation :** remplacer par « Elke verlofdag levert gemiddeld 2,6 vrije dagen op » et « 4 verlofdagen → 9 dagen vrij ». Dans le menu, ouvrir « Brugdagen » par défaut et ajouter une entrée « Kerst 2027 ».

## 7. À garder

- Le **titre-question + réponse en une phrase** en haut de chaque page (« Goede Vrijdag 2027: vrij of niet? » → « Meestal werken »). C'est exactement ce qu'elle cherchait.
- Le **gros résultat** (« 5 vrije dagen door de week », « 13 dagen vrij », « Hangt van uw cao af ») lisible en une seconde.
- L'**honnêteté** : « Er is geen wet die een feestdag tot vrije dag maakt. Uw cao of arbeidsovereenkomst beslist », avec le conseil « Zoek uw cao op, of vraag uw werkgever ».
- Le choix **Werknemer / Ambtenaar / Scholier, student of ouder**, simple et parlant.
- « **Uw verlofplan 2027: deze dagen aanvragen** » : une liste de jours à demander, directement actionnable.
- Les fiches « Verlof nemen / Verlofdagen / Vrij op een rij / Vrije dagen », bien plus lisibles que les tableaux.
- « Hele alinea lezen ▾ » pour replier les longs textes, et la FAQ en accordéon avec de vraies questions.
- Les sources Rijksoverheid listées, « Bijgewerkt op 13 november 2026 » et l'éditeur indépendant affiché : rassurant.
- « 5 mei van 2026 tot 2030 » : petit tableau très utile.
- Le ton (« Dat maakt 2027 een mager jaar », « geen gedoe ») : humain sans être bavard.

## 8. Notes

Clarté : 7/10
Facilité : 7/10
Utilité : 8/10

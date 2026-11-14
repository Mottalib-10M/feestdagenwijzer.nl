# Test naïf du 2026-11-14 (tour3), testeur 1 : feestdagenwijzer.nl
**Persona :** Néerlandais(e) de 45 ans, salarié(e), à l'aise avec son téléphone, aucune connaissance particulière du sujet, ne lit pas les longs paragraphes. Il/elle a tapé sa question dans Google (« feestdagen 2027 ») et a cliqué sur le résultat « Feestdagen 2027: datums, brugdagen en wie er vrij is » parce qu'il/elle veut vraiment savoir quand tombent les jours fériés de 2027 et s'il/elle sera libre.

## 1. Concept

**Après 5 secondes** (01-accueil-1) : « C'est la page des jours fériés 2027 aux Pays-Bas. » Le titre « Feestdagen 2027 in Nederland » colle exactement au résultat Google, donc elle est rassurée d'être au bon endroit. Mais la première phrase répond à une question qu'elle ne s'est pas posée : « De feestdagen 2027 leveren 5 vrije dagen door de week op: Kerst valt in 2027 helemaal in het weekend en levert dus niets op. » Puis viennent un formulaire (« Jaar », « Uw situatie », « Meer opties ») et un gros « 5 vrije dagen door de week ». Elle venait chercher des **dates**, elle reçoit d'abord un **compte**. Elle comprend vite le message (« 2027 est une année maigre »), mais doit faire défiler deux écrans et demi avant de voir « 1 januari 2027 ».

**Après 2 minutes** : « C'est un site néerlandais sérieux qui me donne, année par année, les jours fériés, s'ils tombent en semaine, si on est libre ou non selon ma situation, les ponts (brugdagen) et comment poser mes congés pour avoir le plus de jours d'affilée. » Le concept est clair et complet. Pour qui : salariés, fonctionnaires, parents (vacances scolaires). Bénéfice concret : savoir quels jours poser (« Uw verlofplan 2027: deze dagen aanvragen »), voir que 5 jours de congé donnent « 13 dagen vrij ».

## 2. « Tout le monde peut-il comprendre ? »

**Oui, pour l'essentiel**, mais ça décroche à quatre endroits :
- le vocabulaire maison du statut « Vrij? » : « Meestal vrij », « Telt hier als vrij (uw cao beslist) », « Hangt van uw cao af », « Meestal werken ». Quatre nuances, dont une (« Telt hier als vrij ») qu'on ne comprend pas sans lire une note ;
- le bloc compte à rebours de l'accueil, qui parle de **2026** au milieu d'une page **2027** ;
- les pages brugdagen, où les mêmes blocs de congés reviennent deux ou trois fois, en longues fiches à faire défiler ;
- « Meer opties … Goede Vrijdag vrij (cao): Nee · 5 mei vrij (cao): Nee » : à première lecture, elle comprend « le site me dit que je ne suis pas libre », pas « le calcul suppose que vous travaillez ».

## 3. Parcours écran par écran

| Écran | Compris | Coince |
|---|---|---|
| 01-accueil-1 | Titre, année 2027, « Werknemer bij een bedrijf », gros résultat « 5 vrije dagen door de week ». Le logo « vrij » aux couleurs du drapeau est sympathique. | Phrase d'intro qui commence par Kerst, alors qu'elle cherche la liste. « Meer opties … Nee » : ambigu. Aucune date visible sur le premier écran. |
| 01-accueil-suite1 | Le résumé : 11 fériés, 2 toujours un dimanche, Kerst le week-end, Goede Vrijdag et Bevrijdingsdag non comptés. Les chiffres 5 / 2 / 2 / 256 sont lisibles. | Paragraphe dense de 9 lignes avant les chiffres. Le cadre jaune répète la liste et définit « cao » : utile mais long. « “Telt hier als vrij”: over Nieuwjaarsdag geeft de Rijksoverheid geen aparte uitleg » : elle se demande pourquoi le Nouvel An serait douteux, alors que tout le monde est libre. |
| 01-accueil-suite2 | « Direct naar alle 11 datums van 2027 ↓ », puis la liste date par date avec weekdag, feestdag, Vrij?, Schoolvakantie : exactement ce qu'elle cherchait. Très lisible. | Arrive seulement au 3e écran. Le lien « Direct naar… » arrive après qu'elle a déjà fait défiler jusque-là. |
| 01-accueil-suite3, suite4 | Suite de la liste. 25 et 26 december « Valt op zaterdag/zondag: geen extra vrije dag » : clair. | Rien de bloquant. Une fiche de 4 lignes par jour, donc 11 jours = beaucoup de défilement. |
| 01-accueil-suite5 | Compte à rebours « 40 dagen 5 uur 33 min » et « eerstvolgende feestdag: Eerste Kerstdag vrijdag 25 december 2026 » : amusant. Choix « Regio Midden » et lien « Weet u uw regio niet? ». | On parle de 2026 dans une page 2027. Elle doit lire « Dit blok telt vanaf vandaag, los van het jaar van de pagina » (écran suivant) pour comprendre. |
| 01-accueil-suite6 | Récap 5 / 2 / 256 / Hemelvaart do 6 mei, puis les cartes « Rekenhulpen voor uw vrije dagen ». | Dans la liste « Daarna », « Kerstvakantie (Regio Midden) za 19 december 2026 » arrive APRÈS Goede Vrijdag 2027 : l'ordre chronologique est cassé. |
| 01-accueil-suite7 | Cartes claires (Brugdagen 2027, Werkdagen, Ben ik vrij…, Kalender, Schoolvakanties). | « Schoolvakanties 2026-2027 — Zomer 2027 vanaf 10 juli 2027 (Noord) » alors qu'elle vient de choisir « Regio Midden » juste au-dessus. Ensuite un long paragraphe qui récite les 11 dates en phrase : elle ne le lit pas. |
| 01-accueil-suite8, suite9 | « Hele alinea lezen » replie le texte : bien. Explication « meestal vrij / hangt van uw cao af / telt hier als vrij » enfin donnée. | L'explication des mots arrive au 9e écran, loin de la liste où elle en avait besoin. |
| 01-accueil-suite10, suite11 | Le mini-calculateur « Hoeveel vrije dagen haalt u uit 2027? » : 5 verlofdagen → « 13 dagen », avec deux blocs datés. Très parlant. « Goede Vrijdag en 5 mei vrij in uw cao? Reken het zo uit → » : bonne idée. | Elle connaît la règle « vrijdag na Hemelvaart = brugdag » et ne la voit pas dans le plan, alors que « Brugdagen dit jaar 2 » est affiché juste en dessous. L'explication n'est que sur la page Brugdagen. |
| 01-accueil-suite12 | Plan du site par thème, puis accordéons « Alles over de feestdagen van 2027 ». | « Mei 2027: Koningsdag, Bevrijdingsdag en Hemelvaart in tien dagen » : Koningsdag est en avril. « Pasen en Pinksteren 2027: altijd op maandag vrij » contredit le « Meestal vrij » de la liste. |
| 02-menu-1 | Menu en trois rubriques, années 2027-2029, chaque fête, vacances scolaires. Propre. | La rubrique « Brugdagen » est repliée et elle ne devine pas que « Ben ik vrij op een feestdag? », « Werkdagen » et « Kalender » sont cachés dessous. Le fil d'Ariane dit pourtant « Brugdagen, werkdagen en vrij zijn ». |
| 03-ben-ik-vrij-1, suite1 | Titre parfait : « Vrij op een feestdag: wat geldt voor u? ». Phrase d'accroche nette : « de wet regelt het niet ». Résultat « Meestal vrij » avec les trois situations côte à côte : excellent. | Le cadre « Voorbeeld voor… pas hierboven een keuze aan » : compris. Rien de bloquant. |
| 03-…-suite2, suite3 | Tableau par fête : Werknemer / Ambtenaar / Scholier. Clair. | Nieuwjaarsdag et les Kerstdagen n'y sont pas (« voor de dagen met een eigen toelichting ») : elle cherche Kerst et ne le trouve pas. |
| 03-…-suite4 à suite6 | « Waar u het zeker weet » : conseil concret (cherchez votre cao, demandez à l'employeur). FAQ courte. Calculateur de jours ouvrés. | Le calculateur « Hoeveel werkdagen houdt u over » est un peu hors sujet sur cette page, sans gêner. |
| 04-bevrijdingsdag-1, suite1 | « woensdag 5 mei vrij of niet? » → « Hangt van uw cao af » + « vraag het na bij uw werkgever » : réponse honnête et directe. | « Ambtenaar: Hangt van uw cao af » : elle croyait que les fonctionnaires avaient congé « tous les cinq ans ». Elle ne le voit pas dans les écrans capturés. |
| 04-…-suite2, suite3 | Histoire en 2 lignes, puis tableau 5 mei 2026-2030 avec jour de la semaine : pratique. | Rien de bloquant. |
| 04-…-suite4 à suite6 | Explication « twee losse bruggen » et calculateur 2 verlofdagen → « 8 dagen » (Koningsdag + Hemelvaart) : très clair. FAQ et liens « Verder rekenen ». | Ici 2 jours par défaut ; sur l'accueil 5, sur Brugdagen 2028 3. Les exemples changent d'une page à l'autre. |
| 05-brugdagen-2027-1, suite1 | La phrase d'accroche donne tout de suite la réponse : « maandag 26 april 2027 en vrijdag 7 mei 2027 ». Résultat 13 dagen vrij avec barres visuelles. « Brugdag vr 7 mei zit niet in dit plan … Met 6 verlofdagen komt vr 7 mei erin » : ça répond enfin à sa question de l'accueil. | « 24 en 31 december: Werkdagen » dans Meer opties : elle s'interroge sans que ce soit expliqué. |
| 05-…-suite2 à suite4 | « Uw verlofplan 2027: deze dagen aanvragen » : la phrase qu'elle attendait. Colonne « In de schoolvakantie (regio Midden) » : utile pour les parents. | Le plan, puis « Alle verlofblokken … gerangschikt » reprend les mêmes blocs (ma 26 april, di 30 maart…) : impression de déjà-vu, très long. |
| 05-…-suite5, suite6 | « Een brugdag is een werkdag die tussen een vrije feestdag en het weekend ligt » : bonne définition. Plan de 10 jours de congé → 26 dagen vrij. | Troisième liste des mêmes blocs sur la même page. La définition de « brugdag » arrive après trois tableaux. |
| 06-brugdagen-2028-1 à suite6 | Même logique, accroche claire (« beste brug … vrijdag 28 april 2028 », « Kerst: 3 verlofdagen → 10 dagen vrij »). | Même répétition (plan, puis classement, puis plan de 9 jours). Défaut à 3 jours ici. |
| 07-feestdagen-2028-1 à suite6 | « 6 vrije weekdagen, een meer dan in 2027 » : comparaison utile. Liste lisible. Note honnête : « voor 2028 staat ze er nog niet » sur le site de la Rijksoverheid. | En 2027, « Telt hier als vrij » visait Nieuwjaarsdag ; en 2028, les Kerstdagen. L'étiquette change de jour selon l'année, ce qui la trouble. |
| 08-feestdagen-2029-1 à suite6 | « 7 vrije dagen », « beste brugdag maandag 24 december 2029 : 1 verlofdag → 5 dagen vrij » : bonne info. Paragraphe « twee bruggen achter elkaar » à Noël : concret. | L'intro mentionne « Bevrijdingsdag valt op zaterdag » alors que ce jour n'est de toute façon pas compté : détail inutile en tête de page. |
| 09-goede-vrijdag-2027-1 à suite6 | « Meestal werken » : réponse franche, avec les trois situations. Bon complément sur les délais (« verloopt pas op dinsdag 30 maart 2027 »). Sources officielles listées. | « moet u waarschijnlijk gewoon werken » : formulation un peu brutale, sans gravité. |

## 4. Chaque fonction

| Fonction | Trouvée ? | Comprise ? | Utile ? | Évidence /5 |
|---|---|---|---|---|
| Liste des 11 jours fériés avec jour de semaine | Oui, au 3e écran de l'accueil | Oui | Très | 4 |
| Statut « Vrij? » par situation (Uw situatie) | Oui | Partiellement (« Telt hier als vrij ») | Très | 3 |
| Compteur « 5 vrije dagen door de week » | Oui, en tête | Oui après lecture | Moyen (elle voulait les dates) | 4 |
| Compte à rebours jusqu'au prochain férié | Oui | Confus (2026 dans une page 2027) | Gadget sympa | 3 |
| Regio voor de schoolvakantie + « Zoek uw gemeente op » | Oui | Oui | Pour les parents | 4 |
| Mini-planner « Hoeveel vrije dagen haalt u uit 2027? » | Oui | Oui | Très | 4 |
| Brugdagenplanner (page Brugdagen) | Oui | Oui, verlofplan très clair | Très | 4 |
| « Ben ik vrij op een feestdag? » | Oui, via les cartes ; caché dans le menu | Oui | Très | 4 |
| Werkdagen-calculator | Oui | Oui | Moyen | 4 |
| Meer opties (Goede Vrijdag / 5 mei / 24-31 dec) | Oui | « Nee » ambigu | Utile | 2 |
| Link kopiëren / Afdrukken / Zo wordt gerekend | Oui | Oui | Rassurant | 4 |
| FAQ « Veelgestelde vragen » | Oui | Oui | Utile | 5 |
| Menu ☰ | Oui | En partie (rubrique repliée) | Oui | 3 |
| Bouton EN | Oui | Oui | Pas pour elle | 5 |

## 5. Enchaînement et navigation

- Le fil d'Ariane, les cartes « Verder rekenen » et le plan « Alle pagina's per onderwerp » permettent de passer d'une fête à l'autre sans revenir au menu : bon maillage.
- L'ordre de l'accueil est inversé par rapport à la question Google : calculateur puis compte → dates → compte à rebours → cartes → texte → planner. Elle aurait voulu les dates juste sous le titre.
- Chaque page répète le même cadre jaune « Als vrij gerekend… » et le même pied « Opgesteld door Radif Partners · Methode · nagekeken op 13 november 2026 ». C'est rassurant la première fois, puis ça devient du bruit.
- Les pages Brugdagen sont très longues sur téléphone : trois listes de blocs presque identiques.
- Le menu replie « Brugdagen » alors que c'est là que se trouvent « Ben ik vrij » et « Werkdagen ».
- Les valeurs pré-remplies changent selon la page (5, 2, 3 verlofdagen) : elle compare les résultats et se demande pourquoi.

## 6. Difficultés classées

1. **Accueil, 01-accueil-1 à suite2 : les dates arrivent trop tard.** Elle a cherché « feestdagen 2027 » et doit faire défiler trois écrans (phrase sur Kerst, formulaire, compteur, paragraphe, cadre jaune) avant de lire « 1 januari 2027 ». *Recommandation :* sous le titre, une liste compacte d'une ligne par jour (« vr 1 jan · Nieuwjaarsdag · vrij »), puis le formulaire et le compteur. Remplacer l'intro par : « Alle 11 feestdagen van 2027 op een rij, met de weekdag en of u vrij bent. In 2027 vallen beide Kerstdagen in het weekend. »
2. **Toutes les listes : l'étiquette « Telt hier als vrij (uw cao beslist) » n'est pas comprise.** Elle la juge moins sûre que « Meestal vrij » alors qu'il s'agit du Nouvel An et de Noël. En plus, l'étiquette passe d'un jour à l'autre selon l'année (Nieuwjaarsdag en 2027, Kerst en 2028). *Recommandation :* dire « Bijna altijd vrij » (ou « Meestal vrij ») pour ces jours et renvoyer la nuance sur la source dans « Zo wordt gerekend ».
3. **Accueil, 01-accueil-suite5 et suite6 : le compte à rebours mélange 2026 et 2027.** On y lit « Eerste Kerstdag 2026 », « Kerstvakantie … za 19 december 2026 » placé après « Goede Vrijdag vr 26 maart 2027 », et l'explication « los van het jaar van de pagina » n'arrive qu'à la fin. *Recommandation :* titrer le bloc « Vanaf vandaag (14 november 2026) » en gras, avant le chiffre, et remettre la ligne Kerstvakantie dans l'ordre chronologique.
4. **Accueil, 01-accueil-suite10 et suite11 : le plan à 5 jours n'utilise pas le pont de l'Ascension.** C'est le pont que tout Néerlandais connaît, et l'écran affiche en même temps « Brugdagen dit jaar 2 ». L'explication n'existe que sur la page Brugdagen. *Recommandation :* reprendre sur l'accueil la phrase de la page Brugdagen : « Brugdag vr 7 mei zit niet in dit plan: met 5 verlofdagen levert de verdeling hierboven meer vrije dagen op. Met 6 verlofdagen komt vr 7 mei erin. »
5. **« Meer opties » (accueil, Brugdagen, Feestdagen 2028/2029) : « Goede Vrijdag vrij (cao): Nee » se lit comme un verdict.** *Recommandation :* « Nu gerekend alsof u werkt op Goede Vrijdag, 5 mei, 24 en 31 december. Bent u die dagen vrij? Tik hier. »
6. **Pages Brugdagen 2027/2028 (05-…-suite2 à suite6, 06-…-suite2 à suite6) : trois listes des mêmes blocs.** Il y a le verlofplan, puis « Alle verlofblokken … gerangschikt », puis le plan de 9 ou 10 jours. Sur téléphone, c'est un mur de fiches. *Recommandation :* garder le verlofplan ouvert et replier les deux autres listes en accordéon (« Alle verlofblokken bekijken (7) »).
7. **Menu (02-menu-1) : la rubrique « Brugdagen » cache « Ben ik vrij op een feestdag? », « Werkdagen » et « Kalender ».** *Recommandation :* renommer la rubrique « Brugdagen, werkdagen en vrij zijn » (comme le fil d'Ariane) ou mettre « Ben ik vrij op een feestdag? » en premier lien visible.
8. **Petites incohérences de texte.** « Schoolvakanties 2026-2027 — Zomer 2027 vanaf 10 juli 2027 (Noord) » s'affiche alors que Regio Midden est choisi. « Mei 2027: Koningsdag… » alors que Koningsdag est le 27 avril. « Pasen en Pinksteren 2027: altijd op maandag vrij » contredit « Meestal vrij ». Sur Bevrijdingsdag, rien sur le « eens in de vijf jaar vrij » qu'elle a en tête (dans les écrans vus). *Recommandation :* « Zomer 2027 vanaf … (uw regio) » ; « Eind april en mei 2027: Koningsdag, Bevrijdingsdag en Hemelvaart in tien dagen » ; « Pasen en Pinksteren 2027: de maandag is meestal vrij » ; une ligne FAQ « Ben ik in een lustrumjaar wel vrij op 5 mei? ».

## 7. À garder

- Le titre et la promesse alignés sur le résultat Google, le logo « vrij » aux couleurs du drapeau.
- Les gros résultats d'une ligne : « Meestal vrij », « Hangt van uw cao af », « Meestal werken », « 13 dagen vrij ».
- Les trois situations côte à côte (Werknemer / Ambtenaar / Scholier, student of ouder).
- « Uw verlofplan 2027: deze dagen aanvragen » : concret et directement utilisable.
- La phrase « Brugdag vr 7 mei zit niet in dit plan … Met 6 verlofdagen komt vr 7 mei erin » : elle désamorce le doute.
- La colonne « In de schoolvakantie (regio Midden) » pour les parents.
- Les textes longs repliés (« Hele alinea lezen »), les FAQ en accordéon, les sources officielles listées, « nagekeken op 13 november 2026 ».
- L'honnêteté : « de wet regelt het niet », « voor 2028 staat ze er nog niet ».
- Le complément sur les délais de paiement (Algemene termijnenwet), inattendu et utile.

## 8. Notes

Clarté : 7/10
Facilité : 7/10
Utilité : 9/10

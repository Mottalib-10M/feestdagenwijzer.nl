/** Configuration centrale du site (générée par new-site.py). */
export const SITE_URL = "https://feestdagenwijzer.nl";
export const SITE_NAMES: Record<string, string> = {"nl": "Feestdagenwijzer", "en": "Feestdagenwijzer"};
// Partie du nom affichée en couleur dans l'en-tête (RECETTE §10.3), « » pour aucune.
export const BRAND_ACCENT = "wijzer";
export const LANG_TAGS: Record<string, string> = {"nl": "nl-NL", "en": "en-GB"};
export const OG_LOCALES: Record<string, string> = {"nl": "nl_NL", "en": "en_GB"};
export const LOCALE_TAG = 'nl-NL';
export const CURRENCY = 'EUR';
export const YEAR = 2026;
/** Année de création du site — signal d'ancienneté (RECETTE §8.0). */
export const SITE_FOUNDED = '2026';
export const LAST_UPDATED = '2026-11-13';
export const AUTHOR_NAME = 'Radif Partners';
export const AUTHOR_ROLE: Record<string, string> = {"nl": "Onafhankelijke uitgever van rekenhulpen voor feestdagen, brugdagen, werkdagen en schoolvakanties in Nederland, op basis van de data van de Rijksoverheid", "en": "Independent publisher of calculators for Dutch public holidays, bridge days, working days and school holidays, built on the data published by the Dutch central government"};
export const AUTHOR_DESC: Record<string, string> = {"nl": "Radif Partners bouwt rekenhulpen op publieke regels. Op deze site: de officiële feestdagen van Nederland zoals de Rijksoverheid ze publiceert, de brugdagen die eruit volgen, de werkdagen per maand en de schoolvakanties per regio, met per feestdag wat de Rijksoverheid zegt over vrij zijn. Alles rekent in uw browser; niets wordt verzonden. Radif Partners is geen overheid, geen vakbond en geen werkgeversorganisatie en beslist niets over uw verlof.", "en": "Radif Partners builds calculators on public rules. On this site: the official public holidays of the Netherlands as published by the central government, the bridge days that follow from them, working days per month and school holidays per region, with what the government says about having each holiday off. Everything runs in your browser; nothing is sent. Radif Partners is not a government body, a union or an employers' organisation and decides nothing about your leave."};
/** Sujets sur lesquels l'editeur est competent (schema.org knowsAbout). Ce sont les
 *  themes reellement traites par le site, pas une liste de mots-cles : un sujet
 *  declare ici sans page qui le couvre est une declaration fausse. */
export const KNOWS_ABOUT: Record<string, string[]> = {"nl": ["Officiële feestdagen in Nederland 2027-2030", "Brugdagen en verlofplanning rond feestdagen", "Vrij op een feestdag volgens cao en arbeidsovereenkomst", "Werkdagen per maand en per jaar", "Schoolvakanties per regio Noord, Midden en Zuid"], "en": ["Official public holidays in the Netherlands 2027-2030", "Bridge days and leave planning around holidays", "Days off on public holidays under Dutch collective agreements", "Working days per month and per year", "Dutch school holidays by region North, Central and South"]};
export const CONTACT_EMAIL = "contact@feestdagenwijzer.nl";
export const THEME_COLOR = '#C2410C';
export const LOGO_SYMBOL = 'vrij';
export const BING_VERIFY_CODE = '';
export const GOOGLE_VERIFY_CODE = '';
/** Régime : 'none' pour tous les sites (RECETTE §15.6, décision de l'éditeur du 2026-10-06) :
 *  aucun bandeau ; Clarity chargé en mode sans cookie (consentv2 denied) ; GA4 avec cookies si GA4_ID.
 *  'opt-in' / 'notice' ne servent plus qu'aux sites anciens qui les portent encore. */
export const CONSENT_MODE: 'opt-in' | 'notice' | 'none' = 'none';
/** Propriété Google Analytics 4 (décision de l'éditeur du 2026-10-17, RECETTE §15.6) : GA4 normal,
 *  avec cookies _ga / _ga_<ID> (390 jours), sans bandeau, publicité refusée. Créée par
 *  `seo-platform/scripts/create-ga4.ts accounts/372759688` (RECETTE §15.3, étape 15), puis
 *  pages légales régénérées : `python3 scripts/gen-legal-pages.py .`. Vide = pas de GA4. */
export const GA4_ID = 'G-CXE5VMEW97';
/** Projet Microsoft Clarity (compte amradif), chargé sans cookie. Vide = aucune mesure. */
export const CLARITY_ID = 'zdgb9sgfv6';
export const INDEXNOW_KEY = '50c8dd2b15f2eabbcaacd2dd55059f27';

/* ------------------------------------------------------------------------- *
 * IDENTITÉ LÉGALE — À COMPLÉTER AVANT LA MISE EN LIGNE
 * Ces champs alimentent la mention légale du pays, la politique de confidentialité,
 * la page contact et le schema Organization. Un champ vide s'affiche en jaune
 * sur le site. Contrôle : `npm run check:legal`.
 * ------------------------------------------------------------------------- */
export interface LegalHosting { name: string; address: string; phone: string; url: string }
export interface LegalIdentity {
  entityName: string; legalForm: string; street: string; postalCode: string; city: string;
  country: string; phone: string; registerLabel: string; registerNumber: string;
  vatLabel: string; vatNumber: string; jurisdiction: string;
  supervisoryAuthority: string; supervisoryAuthorityUrl: string; hosting: LegalHosting;
}
export const LEGAL: LegalIdentity = {
  entityName: 'Radif Partners',  // éditeur de tous les sites du portefeuille (RECETTE §8)
  legalForm: '',  // vide : comme les autres sites du portefeuille
  street: '49 rue du Ressort',
  postalCode: '63000',
  city: 'Clermont-Ferrand',
  country: "France",
  phone: '',
  registerLabel: "SIREN",
  registerNumber: '',
  vatLabel: "TVA / BTW",
  vatNumber: '',
  jurisdiction: "France",
  supervisoryAuthority: "Commission nationale de l'informatique et des libertés (CNIL)",
  supervisoryAuthorityUrl: "https://www.cnil.fr",
  hosting: { name: 'GitHub, Inc. (GitHub Pages)', address: '88 Colin P Kelly Jr Street, San Francisco, CA 94107, United States', phone: '', url: 'https://pages.github.com' },
};
export const LEGAL_REQUIRED: Array<keyof LegalIdentity> = ['entityName', 'street', 'postalCode', 'city']; // legalForm vide à dessein, comme les autres sites du portefeuille

/** Profils publics de l'auteur (schema.org sameAs). Laisser vide si aucun. */
export const AUTHOR_SAME_AS: string[] = [];

/** Rythme de revue éditoriale annoncé sur le site, en mois. */
export const REVIEW_CYCLE_MONTHS = 12;

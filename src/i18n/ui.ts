import type { Locale } from './routes';
const nl = {
  updatedOn: 'Bijgewerkt op', editorialPolicy: 'Redactiebeleid', contactLabel: 'Contact', reviewedBy: 'Opgesteld door',
  skipToContent: 'Naar de inhoud', mainNav: 'Hoofdnavigatie', breadcrumbLabel: 'Kruimelpad', breadcrumbHome: 'Start', menuOpen: 'Menu openen',
  faqTitle: 'Veelgestelde vragen', relatedCalculators: 'Verder rekenen', sourcesTitle: 'Officiële bronnen van deze pagina', writtenBy: 'Opgesteld door',
  asOf: 'Stand', lastUpdated: 'Feestdagen en schoolvakanties nagekeken op', footerValidated: 'Bronnen: Rijksoverheid (officiële feestdagen, schoolvakanties per regio, vragen over vrij zijn), Algemene termijnenwet (wetten.overheid.nl). Gegevens van de Rijksoverheid vallen onder CC0 1.0.',
  footerBrowser: 'Alles rekent in uw browser · niets wat u invult wordt verzonden of bewaard · geen account',
  footerDisclaimer: 'Onafhankelijke site van Radif Partners, niet verbonden aan de Rijksoverheid, een ministerie, een vakbond, een werkgever of een school. Of u op een feestdag vrij bent, staat in uw cao of arbeidsovereenkomst; de wet regelt dat niet. Deze site vervangt geen bericht van uw werkgever, uw school of de overheid.',
  footerPopular: 'Rekenhulpen',
  notFound: 'Op dit adres staat geen pagina. De startpagina geeft de feestdagen van 2027, de brugdagen en de schoolvakanties per regio.',
  readMore: 'Lees verder',
  moreOptions: 'Meer opties', copyLink: 'Link kopiëren', copied: 'Link gekopieerd', print: 'Afdrukken', howComputed: 'Zo wordt gerekend', openFull: 'Naar de volledige rekenhulp',
  countdownTo: 'Nog tot', days: 'dagen', hours: 'uur', minutes: 'min', seconds: 'sec', tzNote: 'Rekent met de klok van uw toestel, tijdzone', passed: 'Deze datum ligt achter ons.',
};
const en: typeof nl = {
  updatedOn: 'Updated on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Prepared by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'Common questions', relatedCalculators: 'Keep going', sourcesTitle: 'Official sources for this page', writtenBy: 'Prepared by',
  asOf: 'As of', lastUpdated: 'public holidays and school holidays checked on', footerValidated: 'Sources: Dutch central government (official public holidays, school holidays by region, questions on days off), General Time Limits Act (wetten.overheid.nl). Government data is published under CC0 1.0.',
  footerBrowser: 'Everything runs in your browser · nothing you type is sent or stored · no account',
  footerDisclaimer: 'Independent site published by Radif Partners, not affiliated with the Dutch government, any ministry, union, employer or school. Whether you have a public holiday off is set by your collective agreement (cao) or employment contract, not by law. This site does not replace notices from your employer, your school or the government.',
  footerPopular: 'Tools',
  notFound: 'Nothing lives at this address. The home page has the 2027 public holidays, bridge days and school holidays by region.',
  readMore: 'Read more',
  moreOptions: 'More options', copyLink: 'Copy share link', copied: 'Link copied', print: 'Print', howComputed: 'How this is calculated', openFull: 'Open the full tool',
  countdownTo: 'Time left until', days: 'days', hours: 'hrs', minutes: 'min', seconds: 'sec', tzNote: 'Uses your device clock, time zone', passed: 'This date has passed.',
};
const ALL = { nl, en };
export function t(lang: Locale) { return ALL[lang] ?? nl; }

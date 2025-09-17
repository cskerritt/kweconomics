import { getAllStates, getCityBySlug } from '@/data/locations';

/**
 * Normalize common city slug variants to match our dataset
 * - st-louis -> saint-louis
 * - st-paul -> saint-paul
 * - st-cloud -> saint-cloud
 * - ft- -> fort-
 */
export function normalizeCitySlug(slug: string): string {
  const s = slug.toLowerCase();
  if (s === 'st-louis') return 'saint-louis';
  if (s === 'st-paul') return 'saint-paul';
  if (s === 'st-cloud') return 'saint-cloud';
  if (s === 'new-york-city') return 'new-york';
  if (s === 'washington-dc') return 'washington';
  // Leave st-petersburg, st-joseph, st-charles, st-peters, st-george as-is since dataset uses "st-*"
  if (s.startsWith('ft-')) return s.replace(/^ft-/, 'fort-');
  return s;
}

export interface CityMatch {
  stateSlug: string;
  stateAbbr: string;
  citySlug: string;
  population?: number;
}

/**
 * Build an index of city slug -> array of matching states (with population for tie-breaking)
 */
function buildCityIndex(): Record<string, CityMatch[]> {
  const index: Record<string, CityMatch[]> = {};
  const states = getAllStates();
  for (const state of states) {
    for (const city of state.cities) {
      const key = city.slug;
      if (!index[key]) index[key] = [];
      index[key].push({
        stateSlug: state.slug,
        stateAbbr: state.abbreviation,
        citySlug: city.slug,
        population: city.population,
      });
    }
  }
  return index;
}

let _cityIndex: Record<string, CityMatch[]> | null = null;
function getCityIndex(): Record<string, CityMatch[]> {
  if (!_cityIndex) {
    _cityIndex = buildCityIndex();
  }
  return _cityIndex;
}

/**
 * Find the most likely state for a given city slug.
 * - If exactly one match exists, return it.
 * - If multiple, pick the one with the largest population.
 */
export function findBestStateForCitySlug(citySlug: string): CityMatch | undefined {
  const normalized = normalizeCitySlug(citySlug);
  const index = getCityIndex();
  const matches = index[normalized];
  if (!matches || matches.length === 0) {
    // Try state hints for cities we don't have in the dataset yet
    const hintedState = CITY_STATE_HINTS[normalized];
    if (hintedState) {
      return {
        stateSlug: hintedState,
        stateAbbr: hintedState.toUpperCase().slice(0, 2),
        citySlug: normalized,
        population: undefined,
      };
    }
    return undefined;
  }
  if (matches.length === 1) return matches[0];
  // Choose the state where this city has the highest population
  return matches.slice().sort((a, b) => (b.population || 0) - (a.population || 0))[0];
}

/**
 * Check if a city exists in a given state (after normalization).
 */
export function cityExistsInState(stateSlug: string, citySlug: string): boolean {
  const normalized = normalizeCitySlug(citySlug);
  return !!getCityBySlug(stateSlug, normalized);
}

// Explicit hints for smaller cities not yet in dataset
const CITY_STATE_HINTS: Record<string, string> = {
  // Montana
  'whitefish': 'montana',
  'columbia-falls': 'montana',
  'red-lodge': 'montana',
  'glendive': 'montana',
  'miles-city': 'montana',
  'anaconda': 'montana',
  
  // Vermont
  'essex-junction': 'vermont',
  'white-river-junction': 'vermont',
  'st-albans': 'vermont',
  'st-johnsbury': 'vermont',
  'shelburne': 'vermont',
  'vergennes': 'vermont',
  'middlebury': 'vermont',
  'winooski': 'vermont',

  // West Virginia
  'charles-town': 'west-virginia',
  'shepherdstown': 'west-virginia',
  'buckhannon': 'west-virginia',
  
  // Delaware
  'dagsboro': 'delaware',
};

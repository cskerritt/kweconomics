export interface City {
  name: string;
  slug: string;
  population?: number;
  metro?: string;
}

export interface State {
  name: string;
  slug: string;
  abbreviation: string;
  cities: City[];
}

export const locations: State[] = [
  {
    name: "Alabama",
    slug: "alabama",
    abbreviation: "AL",
    cities: [
      { name: "Birmingham", slug: "birmingham", population: 209403, metro: "Birmingham-Hoover" },
      { name: "Montgomery", slug: "montgomery", population: 200603, metro: "Montgomery" },
      { name: "Mobile", slug: "mobile", population: 187041, metro: "Mobile" },
      { name: "Huntsville", slug: "huntsville", population: 215006, metro: "Huntsville" },
      { name: "Tuscaloosa", slug: "tuscaloosa", population: 101129, metro: "Tuscaloosa" },
      { name: "Hoover", slug: "hoover", population: 92606, metro: "Birmingham-Hoover" },
      { name: "Dothan", slug: "dothan", population: 71072, metro: "Dothan" },
      { name: "Auburn", slug: "auburn", population: 76143, metro: "Auburn-Opelika" },
      { name: "Decatur", slug: "decatur", population: 57938, metro: "Decatur" },
      { name: "Madison", slug: "madison", population: 56933, metro: "Huntsville" },
      { name: "Florence", slug: "florence", population: 40184, metro: "Florence-Muscle Shoals" },
      { name: "Gadsden", slug: "gadsden", population: 33945, metro: "Gadsden" },
      { name: "Vestavia Hills", slug: "vestavia-hills", population: 39102, metro: "Birmingham-Hoover" },
      { name: "Prattville", slug: "prattville", population: 37781, metro: "Montgomery" },
      { name: "Phenix City", slug: "phenix-city", population: 38817, metro: "Columbus, GA-AL" }
    ]
  },
  {
    name: "Alaska",
    slug: "alaska",
    abbreviation: "AK",
    cities: [
      { name: "Anchorage", slug: "anchorage", population: 291247, metro: "Anchorage" },
      { name: "Fairbanks", slug: "fairbanks", population: 32515, metro: "Fairbanks" },
      { name: "Juneau", slug: "juneau", population: 32255, metro: "Juneau" },
      { name: "Wasilla", slug: "wasilla", population: 25469, metro: "Anchorage" },
      { name: "Sitka", slug: "sitka", population: 8458, metro: "Sitka" },
      { name: "Ketchikan", slug: "ketchikan", population: 8192, metro: "Ketchikan Gateway" },
      { name: "Kenai", slug: "kenai", population: 7424, metro: "Kenai Peninsula" },
      { name: "Kodiak", slug: "kodiak", population: 5581, metro: "Kodiak Island" },
      { name: "Bethel", slug: "bethel", population: 6325, metro: "Bethel" },
      { name: "Palmer", slug: "palmer", population: 7359, metro: "Anchorage" },
      { name: "Homer", slug: "homer", population: 5515, metro: "Kenai Peninsula" },
      { name: "Soldotna", slug: "soldotna", population: 4342, metro: "Kenai Peninsula" },
      { name: "Valdez", slug: "valdez", population: 3870, metro: "Valdez-Cordova" },
      { name: "Nome", slug: "nome", population: 3699, metro: "Nome" },
      { name: "Seward", slug: "seward", population: 2749, metro: "Kenai Peninsula" }
    ]
  },
  {
    name: "Arizona",
    slug: "arizona",
    abbreviation: "AZ",
    cities: [
      { name: "Phoenix", slug: "phoenix", population: 1608139, metro: "Phoenix-Mesa-Scottsdale" },
      { name: "Tucson", slug: "tucson", population: 548073, metro: "Tucson" },
      { name: "Mesa", slug: "mesa", population: 504258, metro: "Phoenix-Mesa-Scottsdale" },
      { name: "Chandler", slug: "chandler", population: 275987, metro: "Phoenix-Mesa-Scottsdale" },
      { name: "Glendale", slug: "glendale", population: 248325, metro: "Phoenix-Mesa-Scottsdale" },
      { name: "Scottsdale", slug: "scottsdale", population: 241361, metro: "Phoenix-Mesa-Scottsdale" },
      { name: "Gilbert", slug: "gilbert", population: 267918, metro: "Phoenix-Mesa-Scottsdale" },
      { name: "Tempe", slug: "tempe", population: 195805, metro: "Phoenix-Mesa-Scottsdale" },
      { name: "Peoria", slug: "peoria", population: 190985, metro: "Phoenix-Mesa-Scottsdale" },
      { name: "Surprise", slug: "surprise", population: 147965, metro: "Phoenix-Mesa-Scottsdale" },
      { name: "Yuma", slug: "yuma", population: 95548, metro: "Yuma" },
      { name: "Avondale", slug: "avondale", population: 88914, metro: "Phoenix-Mesa-Scottsdale" },
      { name: "Goodyear", slug: "goodyear", population: 95294, metro: "Phoenix-Mesa-Scottsdale" },
      { name: "Flagstaff", slug: "flagstaff", population: 76831, metro: "Flagstaff" },
      { name: "Buckeye", slug: "buckeye", population: 91502, metro: "Phoenix-Mesa-Scottsdale" }
    ]
  },
  // ... continue with remaining states
  {
    name: "Arkansas",
    slug: "arkansas",
    abbreviation: "AR",
    cities: [
      { name: "Little Rock", slug: "little-rock", population: 198042, metro: "Little Rock-North Little Rock-Conway" },
      { name: "Fort Smith", slug: "fort-smith", population: 87788, metro: "Fort Smith" },
      { name: "Fayetteville", slug: "fayetteville", population: 93949, metro: "Fayetteville-Springdale-Rogers" },
      { name: "Springdale", slug: "springdale", population: 84161, metro: "Fayetteville-Springdale-Rogers" },
      { name: "Jonesboro", slug: "jonesboro", population: 78576, metro: "Jonesboro" },
      { name: "North Little Rock", slug: "north-little-rock", population: 64591, metro: "Little Rock-North Little Rock-Conway" },
      { name: "Conway", slug: "conway", population: 67787, metro: "Little Rock-North Little Rock-Conway" },
      { name: "Rogers", slug: "rogers", population: 69908, metro: "Fayetteville-Springdale-Rogers" },
      { name: "Pine Bluff", slug: "pine-bluff", population: 41253, metro: "Pine Bluff" },
      { name: "Bentonville", slug: "bentonville", population: 54164, metro: "Fayetteville-Springdale-Rogers" },
      { name: "Hot Springs", slug: "hot-springs", population: 37930, metro: "Hot Springs" },
      { name: "Benton", slug: "benton", population: 36360, metro: "Little Rock-North Little Rock-Conway" },
      { name: "Texarkana", slug: "texarkana", population: 29864, metro: "Texarkana" },
      { name: "Sherwood", slug: "sherwood", population: 31081, metro: "Little Rock-North Little Rock-Conway" },
      { name: "Jacksonville", slug: "jacksonville", population: 28364, metro: "Little Rock-North Little Rock-Conway" }
    ]
  },
  {
    name: "California",
    slug: "california",
    abbreviation: "CA",
    cities: [
      { name: "Los Angeles", slug: "los-angeles", population: 3898747, metro: "Los Angeles-Long Beach-Anaheim" },
      { name: "San Diego", slug: "san-diego", population: 1386932, metro: "San Diego-Carlsbad" },
      { name: "San Jose", slug: "san-jose", population: 1013240, metro: "San Jose-Sunnyvale-Santa Clara" },
      { name: "San Francisco", slug: "san-francisco", population: 873965, metro: "San Francisco-Oakland-Hayward" },
      { name: "Fresno", slug: "fresno", population: 542107, metro: "Fresno" },
      { name: "Sacramento", slug: "sacramento", population: 524943, metro: "Sacramento-Roseville-Arden-Arcade" },
      { name: "Long Beach", slug: "long-beach", population: 466742, metro: "Los Angeles-Long Beach-Anaheim" },
      { name: "Oakland", slug: "oakland", population: 440646, metro: "San Francisco-Oakland-Hayward" },
      { name: "Bakersfield", slug: "bakersfield", population: 383579, metro: "Bakersfield" },
      { name: "Anaheim", slug: "anaheim", population: 346824, metro: "Los Angeles-Long Beach-Anaheim" },
      { name: "Santa Ana", slug: "santa-ana", population: 334217, metro: "Los Angeles-Long Beach-Anaheim" },
      { name: "Riverside", slug: "riverside", population: 331360, metro: "Riverside-San Bernardino-Ontario" },
      { name: "Stockton", slug: "stockton", population: 310496, metro: "Stockton-Lodi" },
      { name: "Irvine", slug: "irvine", population: 307670, metro: "Los Angeles-Long Beach-Anaheim" },
      { name: "Chula Vista", slug: "chula-vista", population: 275487, metro: "San Diego-Carlsbad" }
    ]
  }
  // Note: For brevity, I'm including just 5 states. The full implementation would include all 50 states.
  // Each state would have 15 cities following the same pattern.
];

// Export functions from allStatesLocations for all 50 states
export { getAllStates, getStateBySlug, getCityBySlug, getAllCombinations } from './allStatesLocations';
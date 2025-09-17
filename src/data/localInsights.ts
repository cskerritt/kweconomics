type Insights = {
  summary: string;
  courtsServed: string[];
  commonIndustries: string[];
  faqs: { q: string; a: string }[];
};

const stateCourts: Record<string, string[]> = {
  'california': ['California Superior Courts', 'U.S. District Court (C.D. Cal., N.D. Cal.)'],
  'texas': ['Texas District Courts', 'U.S. District Court (N.D./S.D./W.D./E.D. Tex.)'],
  'new-york': ['New York Supreme Court (trial level)', 'U.S. District Court (S.D.N.Y., E.D.N.Y.)'],
  'illinois': ['Circuit Court of Cook County', 'U.S. District Court (N.D. Ill.)'],
  'florida': ['Florida Circuit Courts', 'U.S. District Court (S.D./M.D./N.D. Fla.)'],
  'washington': ['Washington Superior Courts', 'U.S. District Court (W.D./E.D. Wash.)'],
  'colorado': ['Colorado District Courts', 'U.S. District Court (D. Colo.)'],
  'arizona': ['Arizona Superior Courts', 'U.S. District Court (D. Ariz.)'],
  'massachusetts': ['Massachusetts Superior Court', 'U.S. District Court (D. Mass.)'],
  'pennsylvania': ['Pennsylvania Courts of Common Pleas', 'U.S. District Court (E.D./M.D./W.D. Pa.)'],
  'georgia': ['Georgia Superior Courts', 'U.S. District Court (N.D./M.D./S.D. Ga.)'],
  'north-carolina': ['North Carolina Superior Courts', 'U.S. District Court (E.D./M.D./W.D. N.C.)'],
  'tennessee': ['Tennessee Circuit Courts', 'U.S. District Court (E.D./M.D./W.D. Tenn.)'],
  'virginia': ['Virginia Circuit Courts', 'U.S. District Court (E.D./W.D. Va.)'],
  'ohio': ['Ohio Courts of Common Pleas', 'U.S. District Court (N.D./S.D. Ohio)'],
  'new-jersey': ['New Jersey Superior Court', 'U.S. District Court (D.N.J.)'],
  'oregon': ['Oregon Circuit Courts', 'U.S. District Court (D. Or.)'],
  'nevada': ['Nevada District Courts', 'U.S. District Court (D. Nev.)'],
  'minnesota': ['Minnesota District Courts', 'U.S. District Court (D. Minn.)'],
  'michigan': ['Michigan Circuit Courts', 'U.S. District Court (E.D./W.D. Mich.)'],
  'indiana': ['Indiana Superior/Circuit Courts', 'U.S. District Court (N.D./S.D. Ind.)'],
  'missouri': ['Missouri Circuit Courts', 'U.S. District Court (E.D./W.D. Mo.)'],
  'wisconsin': ['Wisconsin Circuit Courts', 'U.S. District Court (E.D./W.D. Wis.)'],
  'maryland': ['Maryland Circuit Courts', 'U.S. District Court (D. Md.)'],
  'connecticut': ['Connecticut Superior Court', 'U.S. District Court (D. Conn.)'],
  'south-carolina': ['South Carolina Circuit Courts', 'U.S. District Court (D.S.C.)'],
  'alabama': ['Alabama Circuit Courts', 'U.S. District Court (N.D./M.D./S.D. Ala.)'],
  'kentucky': ['Kentucky Circuit Courts', 'U.S. District Court (E.D./W.D. Ky.)'],
  'louisiana': ['Louisiana District Courts', 'U.S. District Court (E.D./M.D./W.D. La.)'],
  'oklahoma': ['Oklahoma District Courts', 'U.S. District Court (N.D./E.D./W.D. Okla.)'],
  'kansas': ['Kansas District Courts', 'U.S. District Court (D. Kan.)'],
  'arkansas': ['Arkansas Circuit Courts', 'U.S. District Court (E.D./W.D. Ark.)'],
  'new-mexico': ['New Mexico District Courts', 'U.S. District Court (D.N.M.)'],
  'nebraska': ['Nebraska District Courts', 'U.S. District Court (D. Neb.)'],
  'iowa': ['Iowa District Courts', 'U.S. District Court (N.D./S.D. Iowa)'],
  'rhode-island': ['Rhode Island Superior Court', 'U.S. District Court (D.R.I.)'],
  'maine': ['Maine Superior Court', 'U.S. District Court (D. Me.)'],
  'new-hampshire': ['New Hampshire Superior Court', 'U.S. District Court (D.N.H.)'],
  'vermont': ['Vermont Superior Court', 'U.S. District Court (D. Vt.)'],
  'west-virginia': ['West Virginia Circuit Courts', 'U.S. District Court (N.D./S.D. W. Va.)'],
  'delaware': ['Delaware Superior Court', 'U.S. District Court (D. Del.)'],
  'north-dakota': ['North Dakota District Courts', 'U.S. District Court (D.N.D.)'],
  'south-dakota': ['South Dakota Circuit Courts', 'U.S. District Court (D.S.D.)'],
  'montana': ['Montana District Courts', 'U.S. District Court (D. Mont.)'],
  'wyoming': ['Wyoming District Courts', 'U.S. District Court (D. Wyo.)'],
  'alaska': ['Alaska Superior Courts', 'U.S. District Court (D. Alaska)'],
  'hawaii': ['Hawaii Circuit Courts', 'U.S. District Court (D. Haw.)'],
};

const stateIndustries: Record<string, string[]> = {
  'california': ['Technology', 'Healthcare', 'Entertainment', 'Logistics'],
  'texas': ['Energy', 'Manufacturing', 'Healthcare', 'Defense'],
  'new-york': ['Finance', 'Healthcare', 'Media', 'Professional Services'],
  'illinois': ['Manufacturing', 'Healthcare', 'Transportation', 'Finance'],
  'florida': ['Tourism', 'Healthcare', 'Construction', 'Logistics'],
  'washington': ['Technology', 'Aerospace', 'Maritime', 'Healthcare'],
  'colorado': ['Aerospace', 'Technology', 'Outdoor Recreation', 'Healthcare'],
  'arizona': ['Semiconductors', 'Aerospace', 'Healthcare', 'Logistics'],
  'massachusetts': ['Biotech', 'Higher Education', 'Healthcare', 'Financial Services'],
  'pennsylvania': ['Healthcare', 'Manufacturing', 'Logistics', 'Energy'],
  'georgia': ['Logistics', 'Healthcare', 'Manufacturing', 'Film'],
  'north-carolina': ['Biotech', 'Manufacturing', 'Banking', 'Healthcare'],
  'tennessee': ['Automotive', 'Healthcare', 'Logistics', 'Manufacturing'],
  'virginia': ['Defense', 'Technology', 'Logistics', 'Healthcare'],
  'ohio': ['Manufacturing', 'Healthcare', 'Logistics', 'Finance'],
  'new-jersey': ['Pharma', 'Finance', 'Healthcare', 'Logistics'],
  'oregon': ['Semiconductors', 'Forestry/Timber', 'Healthcare', 'Logistics'],
  'nevada': ['Hospitality', 'Logistics', 'Mining', 'Technology'],
  'minnesota': ['Medical Devices', 'Retail', 'Manufacturing', 'Healthcare'],
  'michigan': ['Automotive', 'Advanced Manufacturing', 'Healthcare', 'Finance'],
  'indiana': ['Automotive', 'Pharma', 'Manufacturing', 'Logistics'],
  'missouri': ['Aerospace', 'Finance', 'Manufacturing', 'Healthcare'],
  'wisconsin': ['Manufacturing', 'Healthcare', 'Paper/Packaging', 'Food Processing'],
  'maryland': ['Biotech', 'Defense', 'Healthcare', 'Cybersecurity'],
  'connecticut': ['Insurance/Finance', 'Aerospace', 'Healthcare', 'Manufacturing'],
  'south-carolina': ['Automotive', 'Aerospace', 'Logistics', 'Tourism'],
  'alabama': ['Automotive', 'Aerospace/Defense', 'Healthcare', 'Manufacturing'],
  'kentucky': ['Automotive', 'Logistics', 'Bourbon/Agri-processing', 'Healthcare'],
  'louisiana': ['Energy/Petrochemicals', 'Port/Logistics', 'Healthcare', 'Manufacturing'],
  'oklahoma': ['Energy', 'Aerospace', 'Manufacturing', 'Logistics'],
  'kansas': ['Aviation', 'Logistics', 'Manufacturing', 'Agri-business'],
  'arkansas': ['Retail/Distribution', 'Manufacturing', 'Healthcare', 'Timber'],
  'new-mexico': ['Energy', 'Aerospace', 'Tourism', 'Healthcare'],
  'nebraska': ['Agri-business', 'Logistics', 'Manufacturing', 'Healthcare'],
  'iowa': ['Agri-business', 'Insurance/Finance', 'Manufacturing', 'Healthcare'],
  'rhode-island': ['Healthcare', 'Higher Education', 'Maritime', 'Manufacturing'],
  'maine': ['Tourism', 'Healthcare', 'Marine/Logistics', 'Forestry/Paper'],
  'new-hampshire': ['Manufacturing', 'Healthcare', 'Tech/Defense', 'Logistics'],
  'vermont': ['Higher Education', 'Tourism', 'Healthcare', 'Food/CPG'],
  'west-virginia': ['Energy', 'Healthcare', 'Manufacturing', 'Logistics'],
  'delaware': ['Chemicals/Pharma', 'Finance', 'Healthcare', 'Logistics'],
  'north-dakota': ['Energy', 'Agri-business', 'Manufacturing', 'Logistics'],
  'south-dakota': ['Financial Services', 'Manufacturing', 'Agri-business', 'Healthcare'],
  'montana': ['Energy/Mining', 'Tourism/Outdoor', 'Agri-business', 'Healthcare'],
  'wyoming': ['Energy/Mining', 'Tourism', 'Agri-business', 'Logistics'],
  'alaska': ['Energy', 'Fisheries/Maritime', 'Tourism', 'Healthcare'],
  'hawaii': ['Tourism', 'Defense', 'Healthcare', 'Logistics/Maritime'],
};

function variant(texts: string[], seed: string): string {
  const idx = Math.abs(seed.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % texts.length;
  return texts[idx];
}

export function getCityInsights(stateSlug: string, citySlug: string, cityName: string, stateName: string): Insights {
  const courts = stateCourts[stateSlug] || ['State trial courts', 'U.S. District Court (as applicable)'];
  const industries = stateIndustries[stateSlug] || ['Healthcare', 'Manufacturing', 'Professional Services'];

  const summaryVariants = [
    `${cityName}, ${stateName} matters frequently involve sector dynamics in ${industries[0]} and ${industries[1]}. Our analyses reflect local labor markets, price trends, and venue-specific practices.`,
    `In ${cityName}, ${stateName}, we bring localized methods to quantify losses and value businesses, aligned to ${industries[0]} and ${industries[2]} footprints and court expectations.`,
    `Serving ${cityName}, ${stateName}, we tailor models to the region’s ${industries.join(', ')} economy and to the evidentiary standards of local courts.`,
  ];

  const summary = variant(summaryVariants, citySlug);

  const faqs: { q: string; a: string }[] = [
    {
      q: `How do venue practices in ${stateName} affect economic damages?`,
      a: `Local venue norms (e.g., ${courts[0]}) guide admissibility, discounting conventions, and documentation thresholds. We align reports to venue expectations while keeping methods consistent with peer-reviewed literature.`,
    },
    {
      q: `Do you incorporate regional wage and price data for ${cityName}?`,
      a: `Yes. We use BLS/OES wages, CPI/PCE price indices, and regional growth assumptions calibrated to ${cityName} and broader ${stateName} metro trends.`,
    },
    {
      q: `What case types are most common in ${cityName}?`,
      a: `We frequently see personal injury and employment matters, plus business disputes in ${industries.slice(0,2).join(' and ')}. We adjust inputs to the local industry mix.`,
    },
  ];

  return { summary, courtsServed: courts, commonIndustries: industries, faqs };
}

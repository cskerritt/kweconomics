export type CityKey = { stateSlug: string; citySlug: string };

// Initial quality gate: mark a subset of high-priority cities as content-ready.
// All others default to not-ready (noindex + excluded from sitemap service-location URLs).
const readyCitySet = new Set<string>([
  // Core metros (already live)
  'california:los-angeles', 'california:san-francisco', 'california:san-diego', 'california:san-jose',
  'new-york:new-york', 'new-york:brooklyn', 'new-york:manhattan', 'new-york:queens',
  'illinois:chicago', 'texas:houston', 'texas:dallas', 'texas:austin', 'texas:san-antonio',
  'florida:miami', 'florida:orlando', 'florida:tampa', 'florida:jacksonville',
  'arizona:phoenix', 'arizona:tucson', 'washington:seattle', 'massachusetts:boston',
  'pennsylvania:philadelphia', 'district-of-columbia:washington', 'georgia:atlanta',
  'colorado:denver', 'minnesota:minneapolis', 'nevada:las-vegas', 'oregon:portland',
  'north-carolina:charlotte', 'tennessee:nashville', 'virginia:virginia-beach',

  // Next batch (top regional metros and suburbs)
  // California
  'california:oakland', 'california:sacramento', 'california:fresno', 'california:santa-ana',
  'california:irvine', 'california:long-beach', 'california:anaheim', 'california:pasadena',
  'california:berkeley', 'california:san-mateo', 'california:walnut-creek',
  // Texas
  'texas:fort-worth', 'texas:el-paso', 'texas:arlington', 'texas:plano', 'texas:irving',
  'texas:frisco', 'texas:mckinney', 'texas:sugar-land', 'texas:the-woodlands', 'texas:corpus-christi',
  // Florida
  'florida:fort-lauderdale', 'florida:west-palm-beach', 'florida:st-petersburg', 'florida:hialeah',
  'florida:cape-coral', 'florida:fort-myers', 'florida:sarasota',
  // New York State
  'new-york:bronx', 'new-york:staten-island', 'new-york:buffalo', 'new-york:rochester',
  'new-york:syracuse', 'new-york:albany', 'new-york:white-plains',
  // Illinois
  'illinois:aurora', 'illinois:naperville', 'illinois:rockford', 'illinois:joliet', 'illinois:springfield', 'illinois:peoria',
  // Washington
  'washington:bellevue', 'washington:kirkland', 'washington:redmond', 'washington:tacoma', 'washington:spokane',
  // Massachusetts
  'massachusetts:worcester', 'massachusetts:springfield', 'massachusetts:cambridge',
  // Pennsylvania
  'pennsylvania:pittsburgh', 'pennsylvania:allentown', 'pennsylvania:harrisburg',
  // Georgia
  'georgia:savannah', 'georgia:augusta',
  // Colorado
  'colorado:colorado-springs', 'colorado:boulder', 'colorado:fort-collins',
  // Minnesota
  'minnesota:saint-paul', 'minnesota:rochester',
  // Nevada
  'nevada:reno', 'nevada:henderson',
  // Oregon
  'oregon:eugene', 'oregon:salem',
  // North Carolina
  'north-carolina:raleigh', 'north-carolina:durham', 'north-carolina:greensboro',
  // Tennessee
  'tennessee:memphis', 'tennessee:knoxville', 'tennessee:chattanooga',
  // Virginia
  'virginia:richmond', 'virginia:norfolk', 'virginia:arlington', 'virginia:alexandria',
  // New Jersey
  'new-jersey:newark', 'new-jersey:jersey-city', 'new-jersey:paterson', 'new-jersey:elizabeth',

  // Batch N+1 (25–50 cities): CA-heavy metros + key WA/VA/OR/CO/AZ/FL suburbs
  // California – Bay Area / Peninsula / East Bay / LA-OC Coasts
  'california:alameda', 'california:union-city-ca', 'california:newark-ca', 'california:vallejo',
  'california:fairfield', 'california:napa', 'california:petaluma', 'california:novato',
  'california:san-rafael', 'california:antioch', 'california:pittsburg', 'california:brentwood',
  'california:cupertino', 'california:campbell', 'california:saratoga', 'california:los-gatos',
  'california:morgan-hill', 'california:gilroy', 'california:menlo-park', 'california:belmont',
  'california:san-carlos', 'california:burlingame', 'california:redondo-beach', 'california:manhattan-beach',
  'california:west-covina', 'california:el-monte', 'california:alhambra', 'california:monterey-park',
  'california:tustin', 'california:westminster', 'california:lake-forest', 'california:laguna-niguel',
  'california:mission-viejo', 'california:san-clemente', 'california:yorba-linda', 'california:placentia',
  'california:brea', 'california:fountain-valley',

  // Washington – Seattle metro suburbs
  'washington:shoreline', 'washington:lynnwood', 'washington:bothell', 'washington:sammamish', 'washington:issaquah',

  // Virginia – NOVA
  'virginia:fairfax', 'virginia:falls-church', 'virginia:vienna', 'virginia:springfield-va', 'virginia:centreville', 'virginia:chantilly',

  // Oregon – Willamette Valley / Portland suburbs
  'oregon:oregon-city', 'oregon:keizer', 'oregon:woodburn',

  // Colorado – Denver metro
  'colorado:highlands-ranch', 'colorado:englewood',

  // Arizona – Phoenix metro
  'arizona:fountain-hills', 'arizona:san-tan-valley',

  // Florida – SE Florida suburbs
  'florida:boca-raton', 'florida:delray-beach', 'florida:palm-beach-gardens'
]);

// Next batch: Midwest & East Metros (approx. 40 cities)
[
  // Wisconsin
  'wisconsin:milwaukee', 'wisconsin:madison', 'wisconsin:green-bay',
  // Missouri
  'missouri:kansas-city', 'missouri:saint-louis', 'missouri:springfield', 'missouri:columbia',
  // Indiana
  'indiana:indianapolis', 'indiana:fort-wayne', 'indiana:evansville', 'indiana:south-bend', 'indiana:carmel',
  // Ohio
  'ohio:columbus', 'ohio:cleveland', 'ohio:cincinnati', 'ohio:toledo', 'ohio:dayton', 'ohio:akron',
  // Maryland
  'maryland:baltimore', 'maryland:columbia', 'maryland:silver-spring', 'maryland:germantown', 'maryland:rockville', 'maryland:frederick',
  // Connecticut
  'connecticut:bridgeport', 'connecticut:hartford', 'connecticut:new-haven', 'connecticut:stamford', 'connecticut:waterbury', 'connecticut:norwalk',
  // Virginia
  'virginia:chesapeake', 'virginia:newport-news', 'virginia:hampton', 'virginia:portsmouth', 'virginia:suffolk', 'virginia:roanoke', 'virginia:lynchburg', 'virginia:harrisonburg',
  // New Jersey suburbs
  'new-jersey:bayonne', 'new-jersey:union-city'
].forEach(k => (readyCitySet as Set<string>).add(k));

// Next batch: WA Secondaries + Hawaii (~14 cities)
[
  // Washington add-ons
  'washington:kent', 'washington:everett', 'washington:renton', 'washington:spokane-valley', 'washington:federal-way', 'washington:bellingham',

  // Hawaii
  'hawaii:honolulu', 'hawaii:east-honolulu', 'hawaii:pearl-city', 'hawaii:hilo', 'hawaii:kailua', 'hawaii:waipahu', 'hawaii:kaneohe', 'hawaii:mililani',
].forEach(k => (readyCitySet as Set<string>).add(k));

// Next batch: Northeast Fill-ins (VA/NH/VT/ME/DE) (~36 cities)
[
  // Virginia add-ons
  'virginia:charlottesville', 'virginia:fredericksburg', 'virginia:leesburg', 'virginia:manassas',

  // New Hampshire localities
  'new-hampshire:londonderry', 'new-hampshire:newport', 'new-hampshire:lebanon', 'new-hampshire:claremont',
  'new-hampshire:laconia', 'new-hampshire:portsmouth', 'new-hampshire:berlin', 'new-hampshire:milford',

  // Vermont localities
  'vermont:essex-junction', 'vermont:white-river-junction', 'vermont:st-albans', 'vermont:st-johnsbury',
  'vermont:shelburne', 'vermont:vergennes', 'vermont:middlebury', 'vermont:winooski', 'vermont:manchester', 'vermont:newport',

  // Maine smaller cities
  'maine:brunswick', 'maine:presque-isle', 'maine:waterville', 'maine:scarborough', 'maine:gorham', 'maine:topsham',

  // Delaware small towns
  'delaware:dagsboro', 'delaware:bethany-beach', 'delaware:new-castle', 'delaware:camden', 'delaware:elsmere', 'delaware:harrington', 'delaware:clayton', 'delaware:delmar',
].forEach(k => (readyCitySet as Set<string>).add(k));

// Next batch: Minnesota Secondaries + Alaska (21 cities)
[
  // Minnesota secondaries
  'minnesota:bloomington', 'minnesota:brooklyn-park', 'minnesota:plymouth', 'minnesota:saint-cloud', 'minnesota:eagan',
  'minnesota:woodbury', 'minnesota:maple-grove', 'minnesota:coon-rapids', 'minnesota:eden-prairie', 'minnesota:minnetonka',
  'minnesota:mankato', 'minnesota:burnsville', 'minnesota:blaine',

  // Alaska statewide
  'alaska:anchorage', 'alaska:fairbanks', 'alaska:juneau', 'alaska:wasilla', 'alaska:sitka', 'alaska:ketchikan', 'alaska:kenai', 'alaska:kodiak',
].forEach(k => (readyCitySet as Set<string>).add(k));

// Next batch: Missouri + Massachusetts Secondaries (24 cities)
[
  // Missouri
  'missouri:independence', 'missouri:lees-summit', 'missouri:ofallon', 'missouri:st-joseph', 'missouri:st-charles',
  'missouri:st-peters', 'missouri:blue-springs', 'missouri:florissant', 'missouri:clayton', 'missouri:chesterfield',
  'missouri:ballwin', 'missouri:kirkwood', 'missouri:arnold', 'missouri:maryland-heights', 'missouri:university-city',

  // Massachusetts
  'massachusetts:brockton', 'massachusetts:new-bedford', 'massachusetts:fall-river', 'massachusetts:lawrence', 'massachusetts:waltham',
  'massachusetts:weymouth', 'massachusetts:haverhill', 'massachusetts:taunton', 'massachusetts:medford',
].forEach(k => (readyCitySet as Set<string>).add(k));

// Next batch: Indiana + Tennessee Secondaries (22 cities)
[
  // Indiana
  'indiana:fishers', 'indiana:hammond', 'indiana:gary', 'indiana:muncie', 'indiana:lafayette',
  'indiana:terre-haute', 'indiana:noblesville', 'indiana:greenwood', 'indiana:kokomo', 'indiana:anderson', 'indiana:mishawaka',

  // Tennessee
  'tennessee:clarksville', 'tennessee:murfreesboro', 'tennessee:franklin', 'tennessee:johnson-city', 'tennessee:bartlett',
  'tennessee:hendersonville', 'tennessee:kingsport', 'tennessee:collierville', 'tennessee:smyrna', 'tennessee:brentwood', 'tennessee:gallatin',
].forEach(k => (readyCitySet as Set<string>).add(k));

// Next batch: Georgia + North Carolina Secondaries (~15 cities)
[
  // Georgia
  'georgia:alpharetta', 'georgia:marietta', 'georgia:smyrna', 'georgia:dunwoody', 'georgia:peachtree-corners',
  'georgia:warner-robins', 'georgia:albany', 'georgia:valdosta', 'georgia:brunswick',

  // North Carolina
  'north-carolina:concord', 'north-carolina:gastonia', 'north-carolina:greenville', 'north-carolina:rocky-mount', 'north-carolina:hickory', 'north-carolina:apex',
].forEach(k => (readyCitySet as Set<string>).add(k));

// Next batch: Ohio Secondaries (~16 cities)
[
  'ohio:parma', 'ohio:canton', 'ohio:youngstown', 'ohio:lorain', 'ohio:hamilton', 'ohio:springfield',
  'ohio:lakewood', 'ohio:elyria', 'ohio:kettering', 'ohio:dublin', 'ohio:mentor', 'ohio:newark',
  'ohio:westerville', 'ohio:hilliard', 'ohio:reynoldsburg', 'ohio:strongsville',
].forEach(k => (readyCitySet as Set<string>).add(k));

// Next batch: Mid-Atlantic Secondaries (NY/MD/PA) (~14 cities)
[
  // New York (remaining upstate)
  'new-york:jamestown', 'new-york:watertown',

  // Maryland secondaries
  'maryland:gaithersburg', 'maryland:bowie', 'maryland:hagerstown', 'maryland:annapolis', 'maryland:college-park',
  'maryland:salisbury', 'maryland:laurel', 'maryland:bethesda', 'maryland:towson', 'maryland:ellicott-city',

  // Pennsylvania leftovers
  'pennsylvania:altoona', 'pennsylvania:levittown',
].forEach(k => (readyCitySet as Set<string>).add(k));

// Next batch: West/Mountain Metros (~45 cities)
[
  // Utah
  'utah:draper', 'utah:bountiful', 'utah:logan', 'utah:murray', 'utah:sandy',
  'utah:orem', 'utah:west-jordan', 'utah:south-jordan', 'utah:layton', 'utah:provo',

  // Idaho
  'idaho:boise', 'idaho:meridian', 'idaho:nampa', 'idaho:idaho-falls', 'idaho:pocatello',
  'idaho:twin-falls', 'idaho:caldwell', 'idaho:coeur-dalene', 'idaho:post-falls', 'idaho:lewiston', 'idaho:rexburg', 'idaho:eagle',

  // Nevada
  'nevada:sparks', 'nevada:carson-city', 'nevada:paradise', 'nevada:spring-valley', 'nevada:enterprise', 'nevada:sunrise-manor', 'nevada:mesquite', 'nevada:boulder-city',

  // Arizona
  'arizona:peoria', 'arizona:surprise', 'arizona:avondale', 'arizona:goodyear', 'arizona:queen-creek', 'arizona:apache-junction', 'arizona:marana',

  // Colorado
  'colorado:lakewood', 'colorado:thornton', 'colorado:arvada', 'colorado:westminster', 'colorado:pueblo', 'colorado:centennial', 'colorado:greeley', 'colorado:parker', 'colorado:castle-rock', 'colorado:grand-junction'
].forEach(k => (readyCitySet as Set<string>).add(k));

// Next batch: Sunbelt + Midwest Tier-1 (42 cities)
[
  // Arizona – Phoenix core suburbs
  'arizona:mesa', 'arizona:chandler', 'arizona:scottsdale', 'arizona:glendale', 'arizona:gilbert', 'arizona:tempe',

  // Texas – high-pop DFW/Austin/Houston satellites
  'texas:garland', 'texas:grand-prairie', 'texas:pasadena', 'texas:round-rock', 'texas:richardson',
  'texas:denton', 'texas:lewisville', 'texas:waco', 'texas:killeen', 'texas:mcallen',

  // Florida – Broward/Treasure Coast + state capitals
  'florida:pembroke-pines', 'florida:hollywood', 'florida:miramar', 'florida:coral-springs',
  'florida:pompano-beach', 'florida:port-st-lucie', 'florida:tallahassee', 'florida:gainesville',

  // Georgia – Atlanta Metro tier + regions
  'georgia:columbus', 'georgia:macon', 'georgia:athens', 'georgia:sandy-springs', 'georgia:roswell', 'georgia:johns-creek',

  // North Carolina – remaining top metros
  'north-carolina:winston-salem', 'north-carolina:fayetteville', 'north-carolina:wilmington',
  'north-carolina:asheville', 'north-carolina:cary', 'north-carolina:high-point',

  // Michigan – Detroit metro core + regionals
  'michigan:detroit', 'michigan:grand-rapids', 'michigan:ann-arbor', 'michigan:lansing', 'michigan:warren', 'michigan:sterling-heights',
].forEach(k => (readyCitySet as Set<string>).add(k));

// Next batch: Northeast Corridor + NJ Suburbs (~43 cities)
[
  // Massachusetts
  'massachusetts:lowell', 'massachusetts:quincy', 'massachusetts:lynn', 'massachusetts:newton',
  'massachusetts:framingham', 'massachusetts:chicopee', 'massachusetts:revere', 'massachusetts:malden',
  'massachusetts:somerville', 'massachusetts:chelsea', 'massachusetts:plymouth',

  // New York (NYC suburbs + upstate regionals)
  'new-york:yonkers', 'new-york:new-rochelle', 'new-york:mount-vernon', 'new-york:hempstead',
  'new-york:schenectady', 'new-york:utica', 'new-york:niagara-falls', 'new-york:poughkeepsie',
  'new-york:saratoga-springs', 'new-york:kingston', 'new-york:ithaca', 'new-york:elmira', 'new-york:troy', 'new-york:newburgh',

  // New Jersey (core suburbs)
  'new-jersey:edison', 'new-jersey:woodbridge', 'new-jersey:lakewood', 'new-jersey:toms-river',
  'new-jersey:clifton', 'new-jersey:hoboken', 'new-jersey:passaic', 'new-jersey:perth-amboy',
  'new-jersey:plainfield', 'new-jersey:new-brunswick', 'new-jersey:trenton', 'new-jersey:camden',

  // Pennsylvania (regional centers)
  'pennsylvania:erie', 'pennsylvania:reading', 'pennsylvania:scranton', 'pennsylvania:lancaster', 'pennsylvania:bethlehem', 'pennsylvania:york',
].forEach(k => (readyCitySet as Set<string>).add(k));

// Next batch: Southeast Metros (SC/AL/KY/LA) (~46 cities)
[
  // South Carolina
  'south-carolina:charleston', 'south-carolina:columbia', 'south-carolina:north-charleston', 'south-carolina:mount-pleasant',
  'south-carolina:rock-hill', 'south-carolina:greenville', 'south-carolina:summerville', 'south-carolina:spartanburg',
  'south-carolina:florence', 'south-carolina:anderson', 'south-carolina:hilton-head-island', 'south-carolina:aiken',
  'south-carolina:myrtle-beach', 'south-carolina:goose-creek', 'south-carolina:greer', 'south-carolina:mauldin',

  // Alabama
  'alabama:birmingham', 'alabama:montgomery', 'alabama:mobile', 'alabama:huntsville', 'alabama:tuscaloosa',
  'alabama:hoover', 'alabama:dothan', 'alabama:auburn', 'alabama:decatur', 'alabama:madison',

  // Kentucky
  'kentucky:louisville', 'kentucky:lexington', 'kentucky:bowling-green', 'kentucky:owensboro', 'kentucky:covington',
  'kentucky:richmond', 'kentucky:georgetown', 'kentucky:florence', 'kentucky:hopkinsville', 'kentucky:nicholasville',

  // Louisiana
  'louisiana:new-orleans', 'louisiana:baton-rouge', 'louisiana:shreveport', 'louisiana:metairie', 'louisiana:lafayette',
  'louisiana:lake-charles', 'louisiana:kenner', 'louisiana:bossier-city', 'louisiana:monroe', 'louisiana:alexandria',
].forEach(k => (readyCitySet as Set<string>).add(k));

// Next batch: Great Plains + Arkansas (OK/KS/AR) (41 cities)
[
  // Oklahoma
  'oklahoma:oklahoma-city', 'oklahoma:tulsa', 'oklahoma:norman', 'oklahoma:broken-arrow', 'oklahoma:lawton',
  'oklahoma:edmond', 'oklahoma:moore', 'oklahoma:midwest-city', 'oklahoma:enid', 'oklahoma:stillwater',
  'oklahoma:muskogee', 'oklahoma:bartlesville', 'oklahoma:shawnee', 'oklahoma:yukon', 'oklahoma:owasso',

  // Kansas
  'kansas:wichita', 'kansas:overland-park', 'kansas:kansas-city', 'kansas:olathe', 'kansas:topeka',
  'kansas:lawrence', 'kansas:shawnee', 'kansas:manhattan', 'kansas:lenexa', 'kansas:salina',
  'kansas:leawood', 'kansas:leavenworth', 'kansas:gardner', 'kansas:derby', 'kansas:hutchinson', 'kansas:hays',

  // Arkansas
  'arkansas:little-rock', 'arkansas:fayetteville', 'arkansas:fort-smith', 'arkansas:springdale', 'arkansas:jonesboro',
  'arkansas:north-little-rock', 'arkansas:conway', 'arkansas:rogers', 'arkansas:pine-bluff', 'arkansas:bentonville',
].forEach(k => (readyCitySet as Set<string>).add(k));

// Next batch: NM / NE / IA / RI (38 cities)
[
  // New Mexico
  'new-mexico:albuquerque', 'new-mexico:las-cruces', 'new-mexico:rio-rancho', 'new-mexico:santa-fe',
  'new-mexico:roswell', 'new-mexico:farmington', 'new-mexico:clovis', 'new-mexico:hobbs',
  'new-mexico:alamogordo', 'new-mexico:carlsbad',

  // Nebraska
  'nebraska:omaha', 'nebraska:lincoln', 'nebraska:bellevue', 'nebraska:grand-island', 'nebraska:kearney',
  'nebraska:fremont', 'nebraska:hastings', 'nebraska:north-platte', 'nebraska:norfolk', 'nebraska:columbus',

  // Iowa
  'iowa:des-moines', 'iowa:cedar-rapids', 'iowa:davenport', 'iowa:sioux-city', 'iowa:iowa-city',
  'iowa:waterloo', 'iowa:council-bluffs', 'iowa:ames', 'iowa:west-des-moines', 'iowa:dubuque',

  // Rhode Island
  'rhode-island:providence', 'rhode-island:cranston', 'rhode-island:warwick', 'rhode-island:pawtucket',
  'rhode-island:east-providence', 'rhode-island:woonsocket', 'rhode-island:newport', 'rhode-island:central-falls',
].forEach(k => (readyCitySet as Set<string>).add(k));

// Next batch: Northern New England + WV/DE (45 cities)
[
  // Maine
  'maine:portland', 'maine:lewiston', 'maine:bangor', 'maine:south-portland', 'maine:auburn',
  'maine:biddeford', 'maine:sanford', 'maine:saco', 'maine:westbrook', 'maine:augusta',

  // New Hampshire
  'new-hampshire:manchester', 'new-hampshire:nashua', 'new-hampshire:concord', 'new-hampshire:derry', 'new-hampshire:dover',
  'new-hampshire:rochester', 'new-hampshire:salem', 'new-hampshire:merrimack', 'new-hampshire:hudson', 'new-hampshire:keene',

  // Vermont
  'vermont:burlington', 'vermont:essex', 'vermont:south-burlington', 'vermont:colchester', 'vermont:rutland',
  'vermont:bennington', 'vermont:brattleboro', 'vermont:milton', 'vermont:montpelier', 'vermont:barre',

  // West Virginia
  'west-virginia:charleston', 'west-virginia:huntington', 'west-virginia:morgantown', 'west-virginia:parkersburg', 'west-virginia:wheeling',
  'west-virginia:martinsburg', 'west-virginia:fairmont', 'west-virginia:beckley', 'west-virginia:weirton', 'west-virginia:clarksburg',

  // Delaware
  'delaware:wilmington', 'delaware:dover', 'delaware:newark', 'delaware:middletown', 'delaware:smyrna',
].forEach(k => (readyCitySet as Set<string>).add(k));

// Next batch: Upper Plains (ND/SD/MT/WY) (~40 cities)
[
  // North Dakota
  'north-dakota:fargo', 'north-dakota:bismarck', 'north-dakota:grand-forks', 'north-dakota:minot', 'north-dakota:west-fargo',
  'north-dakota:williston', 'north-dakota:dickinson', 'north-dakota:mandan', 'north-dakota:jamestown', 'north-dakota:devils-lake',
  'north-dakota:wahpeton', 'north-dakota:rugby', 'north-dakota:beulah', 'north-dakota:bottineau', 'north-dakota:carrington',

  // South Dakota
  'south-dakota:sioux-falls', 'south-dakota:rapid-city', 'south-dakota:aberdeen', 'south-dakota:brookings', 'south-dakota:watertown',
  'south-dakota:mitchell', 'south-dakota:yankton', 'south-dakota:pierre',

  // Montana
  'montana:billings', 'montana:missoula', 'montana:great-falls', 'montana:bozeman', 'montana:butte',
  'montana:helena', 'montana:kalispell', 'montana:havre', 'montana:whitefish', 'montana:columbia-falls', 'montana:red-lodge', 'montana:glendive', 'montana:miles-city', 'montana:anaconda', 'montana:dillon',

  // Wyoming
  'wyoming:cheyenne', 'wyoming:casper', 'wyoming:laramie', 'wyoming:gillette', 'wyoming:rock-springs', 'wyoming:sheridan', 'wyoming:green-river', 'wyoming:evanston', 'wyoming:riverton', 'wyoming:powell', 'wyoming:worland', 'wyoming:rawlins', 'wyoming:cody', 'wyoming:douglas', 'wyoming:wheatland', 'wyoming:lander',
].forEach(k => (readyCitySet as Set<string>).add(k));

// Next batch: NJ Suburbs + CT Secondaries + PA Regionals (~35 cities)
[
  // New Jersey (additional suburbs)
  'new-jersey:cherry-hill', 'new-jersey:vineland', 'new-jersey:atlantic-city', 'new-jersey:piscataway',
  'new-jersey:sayreville', 'new-jersey:hackensack', 'new-jersey:kearny', 'new-jersey:brick',
  'new-jersey:irvington', 'new-jersey:princeton', 'new-jersey:morristown', 'new-jersey:livingston',
  'new-jersey:montclair', 'new-jersey:summit', 'new-jersey:ridgewood', 'new-jersey:westfield',

  // Connecticut (secondaries)
  'connecticut:danbury', 'connecticut:new-britain', 'connecticut:west-hartford', 'connecticut:greenwich',
  'connecticut:milford', 'connecticut:enfield', 'connecticut:torrington', 'connecticut:southington',
  'connecticut:wallingford', 'connecticut:shelton', 'connecticut:bristol', 'connecticut:ansonia',

  // Pennsylvania (regionals)
  'pennsylvania:wilkes-barre', 'pennsylvania:state-college', 'pennsylvania:norristown', 'pennsylvania:chester',
  'pennsylvania:west-chester', 'pennsylvania:new-castle', 'pennsylvania:easton',
].forEach(k => (readyCitySet as Set<string>).add(k));

// Next batch: Midwest IL/WI/MI Suburbs (~42 cities)
[
  // Illinois
  'illinois:elgin', 'illinois:waukegan', 'illinois:cicero', 'illinois:champaign', 'illinois:bloomington',
  'illinois:evanston', 'illinois:schaumburg', 'illinois:arlington-heights', 'illinois:palatine', 'illinois:skokie',
  'illinois:des-plaines', 'illinois:tinley-park', 'illinois:oak-lawn', 'illinois:berwyn',

  // Wisconsin
  'wisconsin:kenosha', 'wisconsin:racine', 'wisconsin:appleton', 'wisconsin:waukesha', 'wisconsin:eau-claire',
  'wisconsin:oshkosh', 'wisconsin:janesville', 'wisconsin:west-allis', 'wisconsin:la-crosse', 'wisconsin:wausau',
  'wisconsin:west-bend', 'wisconsin:fond-du-lac', 'wisconsin:new-berlin', 'wisconsin:wauwatosa',

  // Michigan
  'michigan:flint', 'michigan:dearborn', 'michigan:livonia', 'michigan:westland', 'michigan:troy',
  'michigan:farmington-hills', 'michigan:kalamazoo', 'michigan:southfield', 'michigan:pontiac', 'michigan:dearborn-heights',
  'michigan:novi', 'michigan:royal-oak', 'michigan:st-clair-shores', 'michigan:rochester-hills',
].forEach(k => (readyCitySet as Set<string>).add(k));

// Next batch: California Secondaries (LA/IE/Bay/Central) (~48 cities)
[
  // LA Basin + OC
  'california:glendale', 'california:pomona', 'california:fullerton', 'california:torrance', 'california:santa-clarita',
  'california:thousand-oaks', 'california:simi-valley', 'california:inglewood', 'california:hawthorne', 'california:culver-city', 'california:beverly-hills',
  'california:whittier', 'california:downey', 'california:lakewood-ca', 'california:norwalk-ca', 'california:huntington-beach', 'california:garden-grove', 'california:costa-mesa', 'california:newport-beach',

  // Inland Empire + North LA County
  'california:moreno-valley', 'california:rancho-cucamonga', 'california:palmdale', 'california:corona', 'california:temecula', 'california:murrieta', 'california:victorville',

  // Bay Area core satellites
  'california:hayward', 'california:san-leandro', 'california:milpitas', 'california:concord-ca', 'california:pleasanton', 'california:san-ramon', 'california:livermore', 'california:richmond-ca',
  'california:south-san-francisco', 'california:san-bruno', 'california:palo-alto', 'california:mountain-view', 'california:redwood-city',

  // Silicon Valley + Peninsula
  'california:sunnyvale', 'california:santa-clara', 'california:san-mateo',

  // North Bay + Central Coast + Central Valley
  'california:santa-rosa', 'california:santa-cruz', 'california:ventura', 'california:santa-barbara', 'california:santa-monica',
  'california:visalia', 'california:salinas', 'california:roseville', 'california:escondido', 'california:oceanside', 'california:orange', 'california:ontario'
].forEach(k => (readyCitySet as Set<string>).add(k));

// Next batch: Texas Regionals + Florida Secondaries (~43 cities)
[
  // Texas Regionals / RGV
  'texas:pearland', 'texas:college-station', 'texas:tyler', 'texas:beaumont', 'texas:abilene',
  'texas:odessa', 'texas:midland', 'texas:edinburg', 'texas:pharr', 'texas:harlingen',
  'texas:mission', 'texas:brownsville', 'texas:wichita-falls', 'texas:laredo', 'texas:amarillo', 'texas:mesquite',

  // Florida Secondaries (SE + Gulf + Central)
  'florida:naples', 'florida:lakeland', 'florida:kissimmee', 'florida:daytona-beach', 'florida:pensacola',
  'florida:st-augustine', 'florida:port-charlotte', 'florida:plantation', 'florida:davie', 'florida:sunrise',
  'florida:weston', 'florida:coral-gables', 'florida:doral', 'florida:deerfield-beach', 'florida:north-miami',
  'florida:aventura', 'florida:brandon', 'florida:melbourne', 'florida:winter-park', 'florida:homestead',
  'florida:bradenton', 'florida:ocala', 'florida:palm-coast', 'florida:fort-pierce', 'florida:boynton-beach', 'florida:jupiter', 'florida:palm-bay',
].forEach(k => (readyCitySet as Set<string>).add(k));

// Next batch: Pacific Northwest Secondaries (WA + OR) (~36 cities)
[
  // Washington
  'washington:olympia', 'washington:kirkland', 'washington:redmond', 'washington:kennewick', 'washington:richland',
  'washington:pasco', 'washington:puyallup', 'washington:lacey', 'washington:kenmore', 'washington:marysville',
  'washington:lakewood-wa', 'washington:auburn',

  // Oregon
  'oregon:gresham', 'oregon:hillsboro', 'oregon:beaverton', 'oregon:bend', 'oregon:medford', 'oregon:springfield',
  'oregon:corvallis', 'oregon:albany', 'oregon:tigard', 'oregon:ontario', 'oregon:grants-pass',
  'oregon:klamath-falls', 'oregon:lake-oswego', 'oregon:ashland', 'oregon:tualatin',
].forEach(k => (readyCitySet as Set<string>).add(k));

// Next batch: Southwest Regionals (AZ/NV/UT) (~27 cities)
[
  // Arizona regionals
  'arizona:flagstaff', 'arizona:yuma', 'arizona:buckeye', 'arizona:casa-grande', 'arizona:lake-havasu-city',
  'arizona:prescott', 'arizona:prescott-valley', 'arizona:kingman', 'arizona:bullhead-city', 'arizona:sierra-vista',

  // Nevada secondaries
  'nevada:north-las-vegas', 'nevada:fernley', 'nevada:elko', 'nevada:pahrump',

  // Utah add-ons
  'utah:salt-lake-city', 'utah:ogden', 'utah:st-george', 'utah:taylorsville', 'utah:lehi',
].forEach(k => (readyCitySet as Set<string>).add(k));

// Next batch: California Core Metros (Central Valley)
[
  'california:bakersfield', 'california:stockton', 'california:modesto', 'california:clovis',
].forEach(k => (readyCitySet as Set<string>).add(k));

// Final batch: Remaining Cities (auto-flip)
[
  'alabama:alabaster', 'alabama:enterprise', 'alabama:florence', 'alabama:gadsden', 'alabama:opelika', 'alabama:phenix-city', 'alabama:prattville', 'alabama:vestavia-hills',
  'california:burbank', 'california:chula-vista', 'california:daly-city', 'california:fontana', 'california:fremont', 'california:oxnard', 'california:riverside', 'california:san-bernardino',
  'colorado:aurora', 'colorado:broomfield', 'colorado:littleton', 'colorado:longmont', 'colorado:loveland',
  'delaware:georgetown', 'delaware:milford', 'delaware:seaford',
  'florida:clearwater', 'florida:miami-gardens', 'florida:wellington',
  'georgia:gainesville', 'georgia:peachtree-city', 'georgia:woodstock',
  'indiana:bloomington',
  'michigan:taylor', 'michigan:wyoming',
  'minnesota:duluth',
  'mississippi:biloxi', 'mississippi:greenville', 'mississippi:gulfport', 'mississippi:hattiesburg', 'mississippi:horn-lake', 'mississippi:jackson', 'mississippi:meridian', 'mississippi:olive-branch', 'mississippi:southaven', 'mississippi:tupelo',
  'new-jersey:hamilton',
  'new-york:binghamton',
  'tennessee:mount-juliet',
  'texas:lubbock',
  'utah:west-valley-city',
  'virginia:annandale', 'virginia:ashburn', 'virginia:burke', 'virginia:herndon', 'virginia:mclean', 'virginia:reston',
  'washington:vancouver', 'washington:yakima',
  'west-virginia:buckhannon', 'west-virginia:charles-town', 'west-virginia:elkins', 'west-virginia:keyser', 'west-virginia:lewisburg', 'west-virginia:shepherdstown', 'west-virginia:south-charleston', 'west-virginia:summersville',
  'wisconsin:brookfield', 'wisconsin:menomonee-falls', 'wisconsin:middleton', 'wisconsin:sheboygan', 'wisconsin:sun-prairie'
].forEach(k => (readyCitySet as Set<string>).add(k));

export function isContentReady(stateSlug?: string, citySlug?: string): boolean {
  if (!stateSlug) return true; // state-level pages: allow indexing
  if (!citySlug) return true;  // state overview pages
  const key = `${stateSlug}:${citySlug}`;
  return readyCitySet.has(key);
}

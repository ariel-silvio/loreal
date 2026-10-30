/* Team D dashboard: all figures and initiative details.
   Edit numbers here, not in index.html. Totals, shares, ranking scores and the €3m / €7m split
   are calculated from these values in js/app.js. Every number needs a source on the Sources slide
   or a "Team D proposal" label. */
const DATA = {
  portfolio: [
    {id:"genius",name:"Beauty Genius skin & scalp tracking",short:"Beauty Genius",h:"H1",eur:12,risk:.18,rew:.5,role:"Lead",m1:"AI-powered personalisation",gate:"Higher retention than today's users",sc:[8,7,6,9,9],problem:"Beauty Genius gives advice in the moment but forgets the customer. Care needs a history.",what:"Add photo-based tracking of skin and scalp to the existing assistant, with reminders and progress reports.",kpi:"Monthly active users who track 3+ times",type:"Product · incremental",owner:"Beauty Tech team"},
    {id:"salon",name:"Salon digital toolkit",short:"Salon toolkit",h:"H1",eur:8,risk:.22,rew:.38,m1:"Salons as hubs in the scenario",gate:"60% of onboarded salons use it weekly",sc:[7,6,5,8,8],problem:"Partner salons run on paper and WhatsApp; L'Oréal sees none of the client journey.",what:"Simple booking and client-record tools for L'Oréal Professionnel and Kérastase salons, the base PRO•GO will plug into.",kpi:"Partner salons onboarded",type:"Process · incremental",owner:"Professional Products"},
    {id:"reorder",name:"One-tap professional reorder",short:"One-tap reorder",h:"H1",eur:5,risk:.12,rew:.3,m1:"Subscription commerce",gate:"Salon commission paid, no channel conflict",sc:[6,7,6,9,9],problem:"Customers love the product used in the salon but don't know where to buy it again.",what:"A QR code or link from each salon visit to reorder online, with the salon credited for the sale.",kpi:"Reorders within 60 days of a visit",type:"Channel · incremental",owner:"Professional Products"},
    {id:"progo",name:"PRO•GO pilot, Dubai",short:"PRO•GO",h:"H2",eur:10,risk:.55,rew:.85,role:"Lead",m1:"All three drivers",gate:"Q4 2027: repeat bookings, positive margin per visit",sc:[10,9,8,6,7],problem:"Time-poor residents postpone salon visits; at-home platforms compete on price, not expertise.",what:"Partner salons send L'Oréal-certified professionals into 2 residential communities for 3 services. Manual first version: WhatsApp booking, simple profiles, products reordered through the professional. €3m funds the manual pilot; €7m is held until the Q4 2027 gate.",kpi:"Repeat bookings, margin per visit",type:"Business model · adjacent",owner:"PRO•GO venture unit, inside Professional Products"},
    {id:"subtest",name:"Salon subscription test",short:"Subscription test",h:"H2",eur:3,risk:.4,rew:.6,role:"Hedge",m1:"Subscription commerce",gate:"Retention above 60% before PRO•GO adds subscriptions in 2028",sc:[9,7,7,8,8],problem:"We assume customers will commit to a routine. We have never tested it.",what:"Offer salon clients a subscription to the products their stylist recommends, delivered every 30–60 days.",kpi:"90-day subscription retention",type:"Profit model · adjacent",owner:"PRO•GO venture unit",hedge:"It works even if at-home demand stays low, because it runs in salons."},
    {id:"b2b",name:"Branded residence & hotel partners",short:"Residence partners",h:"H2",eur:2,risk:.45,rew:.68,m1:"Service-led living",gate:"2 signed letters of intent in 2027",sc:[8,7,7,6,6],problem:"Dubai has 183 branded residence developments (first half of 2026) competing on lifestyle services.",what:"Sign 2 developers or hotel groups to offer PRO•GO as a resident or guest amenity.",kpi:"Signed partners, bookings per building",type:"Channel · adjacent",owner:"PRO•GO venture unit"},
    {id:"longevity",name:"Longevity care subscription",short:"Longevity care",h:"H3",eur:5,risk:.8,rew:.92,role:"Lead",m1:"Beauty meets health",gate:"Concept and partner validated by 2028",sc:[10,8,9,4,4],problem:"By 2035 customers want long-term skin and hair care, not single products.",what:"Explore a care plan combining L'Oréal dermatology products, partner supplements (for example Timeline) and professional treatments.",kpi:"Concept tests, partner terms",type:"Business model · transformational",owner:"Research & Innovation, with BOLD"},
    {id:"passport",name:"Beauty Passport data platform",short:"Beauty Passport",h:"H3",eur:3,risk:.7,rew:.78,m1:"AI-powered personalisation",gate:"Privacy and regulatory review passed",sc:[9,7,6,5,5],problem:"A customer's hair and skin history is lost between salons, apps and visits.",what:"Design a consent-based record of diagnoses, formulas and treatments that any certified professional can use.",kpi:"Opt-in rate in pilot",type:"Platform · transformational",owner:"Research & Innovation"},
    {id:"device",name:"Home scalp & skin scanner",short:"Home scanner",h:"H3",eur:2,risk:.88,rew:.72,m1:"Beauty meets health",gate:"Prototype by end 2028",sc:[7,7,6,3,3],problem:"Phone photos miss what changes under the surface.",what:"Prototype a home scanner, building on L'Oréal's beauty tech devices, that feeds the care plan.",kpi:"Prototype accuracy vs. salon diagnosis",type:"Product system · transformational",owner:"Research & Innovation"}
  ],
  path: [
    {year:2027,stage:"Pilot",eur:10,released:3,scope:"Dubai. 2 communities, 3 services, 3–5 partner salons. Booking by WhatsApp. 90-day test from Q2.",gate:"Q4 2027: repeat bookings, positive margin per visit"},
    {year:2028,stage:"Prove",eur:30,released:0,scope:"Build the app and Beauty Passport. Expand to the UAE and Riyadh. Launch product subscriptions.",gate:"90-day retention, new-to-salon customers"},
    {year:2029,stage:"Extend",eur:30,released:0,scope:"One European city. Add partner supplements to the subscription.",gate:"Profitable unit economics in two regions"},
    {year:2030,stage:"Scale-ready",eur:30,released:0,scope:"Platform and operations ready for wider rollout.",gate:"Board decides: scale or stop"}
  ],
  gantt: {
    lanes: [
      {h:"H1", label:"H1 · Core", bars:[
        {from:[2027,1], to:[2028,4], text:"Beauty Genius tracking, salon toolkit, one-tap reorder"},
        {from:[2029,1], to:[2030,4], text:"Run by the divisions", faded:true},
        {from:[2031,1], to:[2035,4], text:"Business as usual", faded:true}]},
      {h:"H2", label:"H2 · PRO•GO", bars:[
        {from:[2027,2], to:[2027,4], text:"Pilot, Dubai", money:"€10m (€3m now)"},
        {from:[2028,1], to:[2028,4], text:"Prove: app, UAE, Riyadh", money:"up to €30m"},
        {from:[2029,1], to:[2029,4], text:"Extend: Europe", money:"up to €30m"},
        {from:[2030,1], to:[2030,4], text:"Scale-ready", money:"up to €30m"},
        {from:[2031,1], to:[2035,4], text:"Scale: Gulf, Europe, India", money:"Division budget"}]},
      {h:"H3", label:"H3 · New", bars:[
        {from:[2027,1], to:[2028,4], text:"Longevity concept, Passport review, scanner prototype"},
        {from:[2029,1], to:[2030,4], text:"Longevity pilot inside PRO•GO"},
        {from:[2031,1], to:[2035,4], text:"Longevity subscription"}]}
    ],
    decisions: [
      {at:[2027,1.25], text:"Approve €50m"},
      {at:[2027,4.8], text:"Continue or stop"},
      {at:[2028,4.8], text:"Retention review"},
      {at:[2029,4.8], text:"Unit economics"},
      {at:[2030,4.8], text:"Scale or stop"},
      {at:[2033,2.5], text:"Mid-term review"}
    ]
  },
  reviews: [
    {when:"Q1 2027", dec:"Approve €50m", pass:"Budget approved, venture unit and Innovation Board in place", money:"€3m now"},
    {when:"Q4 2027", dec:"Continue or stop", pass:"Repeat bookings growing, positive margin per visit, 300 active subscribers, 40% book again within 90 days", money:"€7m, and the 2028 stage"},
    {when:"End 2028", dec:"Retention review", pass:"90-day subscription retention ≥ 60%, new-to-salon customers ≥ 30% of PRO•GO clients", money:"2029 stage, up to €30m"},
    {when:"End 2029", dec:"Unit economics", pass:"Profitable unit economics in two regions", money:"2030 stage, up to €30m"},
    {when:"End 2030", dec:"Scale or stop", pass:"Platform ready to scale, partner salon income +10% per salon", money:"Professional Products budget"}
  ],
  ns: [
    {label:"Growth",metric:"Active care subscribers",def:"Customers with an active product subscription linked to a certified professional.",unit:"",v:[300,25000,1000000]},
    {label:"Loyalty",metric:"Repeat-visit rate",def:"Share of PRO•GO customers who book a second treatment within 90 days.",unit:"%",v:[40,60,70]}
  ],
  peers: [
    {company:"L'Oréal",period:"2025",cur:"€",rev:44050,rd:1380,src:"2025 results; 2025 URD",us:true,where:"Beauty tech, AI diagnostics, biotech, green sciences"},
    {company:"Unilever",period:"2025",cur:"€",rev:50500,rd:836,src:"FY2025 results; R&D page (excl. Ice Cream)",where:"Microbiome, biotech, digital product design; new $270m innovation centre"},
    {company:"Estée Lauder",period:"Year to June 2025",cur:"$",rev:14326,rd:316,src:"Form 10-K FY2025",where:"New products, packaging, dermatology and university partnerships"},
    {company:"Beiersdorf",period:"2025",cur:"€",rev:9852,rd:365,src:"Annual Report 2025 (incl. tesa)",where:"Epigenetics, pigmentation, skin microbiome, AI skin analysis"}
  ],
  signals: [
    {fig:"+12.6%",text:"Growth of Professional Products, our salon division, in the first half of 2026.",src:"L'Oréal 2026 half-year results. Comparable growth, excluding currency and acquisitions (+11.6% after an accounting adjustment)."},
    {fig:"+10.9%",text:"Growth in 2025 in L'Oréal's region covering South Asia Pacific, the Middle East and Africa. Dubai is part of it.",src:"L'Oréal 2025 Universal Registration Document. Comparable growth; the region is reported as SAPMENA–SSA."},
    {fig:"64,744",text:"Homes in branded luxury residences in Dubai, first half of 2026.",src:"Morgan International Realty, as reported by Reuters, Oct 2026"}
  ]
};
const HZ = {
  H1: {name:"Core", why:"Upgrades to tools we already own. Low risk. Results within a year."},
  H2: {name:"Adjacent", why:"The PRO•GO pilot and two supporting tests. Results in two to three years."},
  H3: {name:"New", why:"Early options on longevity care. Small amounts. Three years or more."}
};
const CRIT = ["Fit with our 2035 scenario","Customer value","Revenue potential","Feasibility","Speed of results"];
const DEF = [3,2,2,1,1], NOFIT = [0,2,2,1,1];

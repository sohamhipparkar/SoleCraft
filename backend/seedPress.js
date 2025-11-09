const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/solecraft";
const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Press Release Schema
const pressReleaseSchema = new mongoose.Schema({
  releaseId: { type: String, required: true, unique: true },
  title: { type: String, required: true, trim: true },
  date: { type: Date, required: true },
  excerpt: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  location: { type: String, required: true, trim: true },
  image: { type: String, default: "" },
  tags: [{ type: String }],
  downloads: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const PressRelease = mongoose.model("PressRelease", pressReleaseSchema);

// Media Coverage Schema
const mediaCoverageSchema = new mongoose.Schema({
  coverageId: { type: String, required: true, unique: true },
  title: { type: String, required: true, trim: true },
  publication: { type: String, required: true, trim: true },
  date: { type: Date, required: true },
  excerpt: { type: String, required: true, trim: true },
  link: { type: String, required: true },
  image: { type: String, default: "" },
  quote: { type: String, default: "" },
  author: { type: String, default: "" },
  publicationLogo: { type: String, default: "" },
  views: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const MediaCoverage = mongoose.model("MediaCoverage", mediaCoverageSchema);

// Press Kit Schema
const pressKitSchema = new mongoose.Schema({
  kitId: { type: String, required: true, unique: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  fileSize: { type: String, required: true },
  fileCount: { type: String, required: true },
  downloadUrl: { type: String, required: true },
  thumbnails: [{ type: String }],
  downloads: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const PressKit = mongoose.model("PressKit", pressKitSchema);

// Media Asset Schema
const mediaAssetSchema = new mongoose.Schema({
  assetId: { type: String, required: true, unique: true },
  title: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  fileSize: { type: String, required: true },
  fileCount: { type: String, required: true },
  downloadUrl: { type: String, required: true },
  thumbnails: [{ type: String }],
  downloads: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const MediaAsset = mongoose.model("MediaAsset", mediaAssetSchema);

// Press Contact Schema
const pressContactSchema = new mongoose.Schema({
  contactId: { type: String, required: true, unique: true },
  name: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, required: true, trim: true },
  color: { type: String, default: "blue" },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const PressContact = mongoose.model("PressContact", pressContactSchema);

// Seed Data
const pressReleasesData = [
  {
    releaseId: "PR001",
    title: "SoleCraft Launches Revolutionary Shoe Care Platform in India",
    date: new Date("2024-11-01"),
    excerpt:
      "SoleCraft announces the launch of its innovative shoe care and cobbler discovery platform, connecting customers with verified local cobblers across major Indian cities.",
    content: `Mumbai, India - November 1, 2024 - SoleCraft, a groundbreaking shoe care platform, today announced its official launch in India, revolutionizing the way people maintain and repair their footwear.

The platform connects shoe owners with verified local cobblers through an easy-to-use web application, featuring real-time booking, location-based search, and quality-assured services.

"We recognized a significant gap in the market for professional shoe care services," said the SoleCraft team. "Our platform not only makes it easier for customers to find reliable cobblers but also helps traditional craftsmen reach a wider audience."

Key features include:
- Real-time cobbler location tracking
- Online appointment booking
- Service rating and review system
- Multiple service categories (Repair, Polish, Custom, Exchange, Restoration)
- Verified cobbler network

SoleCraft is initially launching in Pune with plans to expand to Mumbai, Bangalore, and Delhi in the coming months.

For more information, visit www.solecraft.com or contact our press team.`,
    location: "Mumbai, India",
    image: `${BASE_URL}/images/press1.jpg`,
    tags: ["Launch", "Technology", "Innovation", "Shoe Care"],
    downloads: 156,
    views: 1243,
    isActive: true,
  },
  {
    releaseId: "PR002",
    title: "SoleCraft Partners with 500+ Verified Cobblers Across Pune",
    date: new Date("2024-10-15"),
    excerpt:
      "Strategic partnership brings quality shoe care services to customers across Pune, with verified professionals offering comprehensive footwear solutions.",
    content: `Pune, India - October 15, 2024 - SoleCraft today announced that it has successfully onboarded over 500 verified cobblers across Pune, establishing the largest network of professional shoe care services in the city.

This milestone represents a significant achievement in SoleCraft's mission to preserve traditional craftsmanship while leveraging modern technology for better customer service.

"Our cobbler partners are the heart of our platform," stated the SoleCraft team. "Each cobbler goes through a rigorous verification process to ensure quality service delivery."

Partnership Benefits:
- Verified professional network
- Increased visibility for local craftsmen
- Digital payment integration
- Customer feedback system
- Business growth opportunities

The platform has already facilitated over 2,000 successful appointments, with an average customer rating of 4.6 stars.

Cobblers interested in joining the platform can apply through the SoleCraft website.`,
    location: "Pune, India",
    image: `${BASE_URL}/images/press2.jpg`,
    tags: ["Partnership", "Network", "Growth", "Cobblers"],
    downloads: 98,
    views: 876,
    isActive: true,
  },
  {
    releaseId: "PR003",
    title: "SoleCraft Introduces Premium Custom Shoe Design Services",
    date: new Date("2024-10-01"),
    excerpt:
      "New premium service tier allows customers to work with master craftsmen for bespoke shoe designs and high-end customization.",
    content: `Pune, India - October 1, 2024 - SoleCraft is excited to announce the launch of its Premium Custom Design service, connecting customers with master craftsmen specializing in bespoke footwear creation and high-end customization.

This new service tier caters to customers seeking unique, personalized footwear solutions beyond standard repair and maintenance.

Service Highlights:
- Custom shoe design from scratch
- Luxury brand restoration
- Hand-painted artwork
- Premium leather selection
- Heritage shoe restoration
- Vintage footwear repair

"We've identified a growing demand for personalized shoe services," explained the team. "Our premium tier connects customers with the most skilled craftsmen in the industry."

Pricing for premium services starts at ₹2,500, with consultations available through the platform's booking system.

Early response has been overwhelmingly positive, with over 200 premium appointments booked in the first week.`,
    location: "Pune, India",
    image: `${BASE_URL}/images/press3.jpg`,
    tags: ["Premium", "Custom", "Design", "Luxury"],
    downloads: 134,
    views: 1056,
    isActive: true,
  },
  {
    releaseId: "PR004",
    title: "SoleCraft Achieves 95% Customer Satisfaction Rate",
    date: new Date("2024-09-20"),
    excerpt:
      "Platform surpasses 5,000 completed appointments with industry-leading customer satisfaction scores and positive feedback.",
    content: `Pune, India - September 20, 2024 - SoleCraft announced today that it has achieved a 95% customer satisfaction rate across more than 5,000 completed appointments since launch.

The platform's success is attributed to its rigorous cobbler verification process, transparent pricing, and comprehensive customer protection policies.

Key Metrics:
- 5,000+ completed appointments
- 95% customer satisfaction rate
- Average rating: 4.7/5 stars
- 98% on-time service delivery
- 92% repeat customer rate

"These numbers reflect our commitment to quality and customer service," said the SoleCraft team. "We're proud to support traditional craftsmen while delivering modern convenience."

Customer testimonials highlight the platform's ease of use, reliable service, and quality workmanship as key differentiators.

SoleCraft continues to invest in technology improvements and customer service enhancements based on user feedback.`,
    location: "Pune, India",
    image: `${BASE_URL}/images/press4.jpg`,
    tags: ["Milestone", "Customer", "Satisfaction", "Success"],
    downloads: 89,
    views: 743,
    isActive: true,
  },
  {
    releaseId: "PR005",
    title: "SoleCraft Plans Expansion to Mumbai, Bangalore, and Delhi",
    date: new Date("2024-09-05"),
    excerpt:
      "Following successful Pune launch, SoleCraft announces ambitious expansion plans to cover India's major metropolitan areas.",
    content: `Pune, India - September 5, 2024 - SoleCraft today unveiled plans for a major expansion into Mumbai, Bangalore, and Delhi, targeting launch dates in Q1 2025.

The expansion will bring SoleCraft's innovative shoe care platform to an estimated 50 million additional potential customers across these metropolitan areas.

Expansion Timeline:
- Mumbai: January 2025
- Bangalore: February 2025
- Delhi NCR: March 2025

"Our success in Pune has validated our business model," stated the team. "We're excited to bring our services to more cities and support more traditional craftsmen."

The company is actively recruiting and verifying cobblers in these new markets, with plans to onboard 2,000+ professionals across all three cities.

Interested cobblers and investors can reach out through the SoleCraft website for partnership opportunities.`,
    location: "Pune, India",
    image: `${BASE_URL}/images/press5.jpg`,
    tags: ["Expansion", "Growth", "Mumbai", "Bangalore", "Delhi"],
    downloads: 167,
    views: 1432,
    isActive: true,
  },
  {
    releaseId: "PR006",
    title: "SoleCraft Launches Eco-Friendly Shoe Restoration Initiative",
    date: new Date("2024-08-25"),
    excerpt:
      "New sustainability program promotes shoe repair and restoration as an environmentally conscious alternative to buying new footwear.",
    content: `Pune, India - August 25, 2024 - In line with growing environmental concerns, SoleCraft has launched its Eco-Friendly Restoration Initiative, promoting shoe repair as a sustainable alternative to purchasing new footwear.

The initiative includes:
- Eco-conscious cobbler certification
- Sustainable material sourcing
- Waste reduction programs
- Customer education on shoe care
- Recycling partnerships

"The fashion industry is one of the largest polluters globally," explained the team. "By encouraging repair and restoration, we're helping reduce waste while preserving traditional crafts."

Studies show that repairing shoes instead of replacing them can reduce carbon footprint by up to 80% per pair.

SoleCraft is partnering with environmental organizations to track and promote the positive impact of shoe repair on sustainability.

The platform has already helped prevent an estimated 10,000 pairs of shoes from ending up in landfills.`,
    location: "Pune, India",
    image: `${BASE_URL}/images/press6.jpg`,
    tags: ["Sustainability", "Environment", "Eco-Friendly", "Initiative"],
    downloads: 112,
    views: 945,
    isActive: true,
  },
];

const mediaCoverageData = [
  {
    coverageId: "MC001",
    title:
      "SoleCraft: Bridging Traditional Craftsmanship with Modern Technology",
    publication: "The Times of India",
    date: new Date("2024-10-28"),
    excerpt:
      "A deep dive into how SoleCraft is revolutionizing India's shoe care industry by connecting traditional cobblers with tech-savvy customers.",
    link: "https://timesofindia.indiatimes.com/tech/solecraft-review",
    image: `${BASE_URL}/images/coverage1.jpg`,
    quote:
      "SoleCraft represents the perfect marriage of tradition and technology, offering a much-needed platform for skilled craftsmen.",
    author: "Rajesh Kumar, Tech Correspondent",
    publicationLogo: `${BASE_URL}/images/toi-logo.png`,
    views: 2341,
    isActive: true,
  },
  {
    coverageId: "MC002",
    title: "How SoleCraft is Preserving Traditional Cobbler Craft",
    publication: "Economic Times",
    date: new Date("2024-10-20"),
    excerpt:
      "An analysis of SoleCraft's impact on traditional cobbler businesses and the gig economy in India's service sector.",
    link: "https://economictimes.com/tech/startups/solecraft",
    image: `${BASE_URL}/images/coverage2.jpg`,
    quote:
      "By digitizing cobbler services, SoleCraft is helping preserve an age-old profession while making it economically viable for the modern age.",
    author: "Priya Sharma, Business Analyst",
    publicationLogo: `${BASE_URL}/images/et-logo.png`,
    views: 1876,
    isActive: true,
  },
  {
    coverageId: "MC003",
    title: "SoleCraft Wins 'Best Innovation in Service Industry' Award",
    publication: "Business Standard",
    date: new Date("2024-10-10"),
    excerpt:
      "SoleCraft recognized for its innovative approach to connecting traditional services with digital platforms.",
    link: "https://business-standard.com/tech/awards/solecraft",
    image: `${BASE_URL}/images/coverage3.jpg`,
    quote:
      "This award recognizes SoleCraft's unique contribution to preserving traditional skills while embracing modern technology.",
    author: "Award Committee",
    publicationLogo: `${BASE_URL}/images/bs-logo.png`,
    views: 1543,
    isActive: true,
  },
  {
    coverageId: "MC004",
    title: "The App Making Shoe Repair Cool Again",
    publication: "Vogue India",
    date: new Date("2024-09-30"),
    excerpt:
      "Vogue explores how SoleCraft is making shoe maintenance fashionable and accessible to urban millennials.",
    link: "https://vogue.in/fashion/solecraft-shoe-care-trend",
    image: `${BASE_URL}/images/coverage4.jpg`,
    quote:
      "SoleCraft is making shoe care trendy again, proving that sustainability and style can go hand in hand.",
    author: "Meera Kapoor, Fashion Editor",
    publicationLogo: `${BASE_URL}/images/vogue-logo.png`,
    views: 3210,
    isActive: true,
  },
  {
    coverageId: "MC005",
    title: "Tech Startup Gives Traditional Cobblers a Digital Boost",
    publication: "YourStory",
    date: new Date("2024-09-15"),
    excerpt:
      "How SoleCraft is empowering traditional cobblers with technology and helping them reach wider audiences.",
    link: "https://yourstory.com/startups/solecraft-cobbler-platform",
    image: `${BASE_URL}/images/coverage5.jpg`,
    quote:
      "SoleCraft proves that technology can be used to preserve and enhance traditional crafts rather than replace them.",
    author: "Ankit Verma, Startup Reporter",
    publicationLogo: `${BASE_URL}/images/yourstory-logo.png`,
    views: 2654,
    isActive: true,
  },
  {
    coverageId: "MC006",
    title: "SoleCraft: The Future of Sustainable Fashion",
    publication: "Elle India",
    date: new Date("2024-09-01"),
    excerpt:
      "Elle investigates how SoleCraft is promoting sustainable fashion through shoe repair and restoration.",
    link: "https://elle.in/fashion/solecraft-sustainable-fashion",
    image: `${BASE_URL}/images/coverage6.jpg`,
    quote:
      "In an era of fast fashion, SoleCraft offers a refreshing alternative that's both stylish and sustainable.",
    author: "Simran Ahuja, Sustainability Editor",
    publicationLogo: `${BASE_URL}/images/elle-logo.png`,
    views: 2987,
    isActive: true,
  },
];

const pressKitsData = [
  {
    kitId: "PK001",
    title: "SoleCraft Brand Press Kit 2024",
    description:
      "Complete brand assets including logos, color palettes, typography guidelines, brand story, and high-resolution images for media use.",
    fileSize: "45 MB",
    fileCount: "32 files",
    downloadUrl: `${BASE_URL}/downloads/solecraft-brand-kit.zip`,
    thumbnails: [
      `${BASE_URL}/images/kit-thumb1.jpg`,
      `${BASE_URL}/images/kit-thumb2.jpg`,
      `${BASE_URL}/images/kit-thumb3.jpg`,
    ],
    downloads: 234,
    isActive: true,
  },
  {
    kitId: "PK002",
    title: "Product Screenshots & UI Kit",
    description:
      "Comprehensive collection of product screenshots, user interface elements, and app flow demonstrations for editorial use.",
    fileSize: "67 MB",
    fileCount: "48 files",
    downloadUrl: `${BASE_URL}/downloads/solecraft-product-kit.zip`,
    thumbnails: [
      `${BASE_URL}/images/kit-thumb4.jpg`,
      `${BASE_URL}/images/kit-thumb5.jpg`,
      `${BASE_URL}/images/kit-thumb6.jpg`,
    ],
    downloads: 189,
    isActive: true,
  },
  {
    kitId: "PK003",
    title: "Leadership & Team Photos",
    description:
      "Professional headshots and team photos of SoleCraft leadership and key personnel for media features and press releases.",
    fileSize: "28 MB",
    fileCount: "15 files",
    downloadUrl: `${BASE_URL}/downloads/solecraft-team-kit.zip`,
    thumbnails: [
      `${BASE_URL}/images/kit-thumb7.jpg`,
      `${BASE_URL}/images/kit-thumb8.jpg`,
      `${BASE_URL}/images/kit-thumb9.jpg`,
    ],
    downloads: 156,
    isActive: true,
  },
  {
    kitId: "PK004",
    title: "Infographics & Data Visualizations",
    description:
      "Ready-to-use infographics showcasing platform statistics, user growth, market impact, and sustainability metrics.",
    fileSize: "34 MB",
    fileCount: "20 files",
    downloadUrl: `${BASE_URL}/downloads/solecraft-infographics-kit.zip`,
    thumbnails: [
      `${BASE_URL}/images/kit-thumb10.jpg`,
      `${BASE_URL}/images/kit-thumb11.jpg`,
      `${BASE_URL}/images/kit-thumb12.jpg`,
    ],
    downloads: 198,
    isActive: true,
  },
];

const mediaAssetsData = [
  {
    assetId: "MA001",
    title: "SoleCraft Logo Pack",
    type: "Logos & Branding",
    description:
      "Complete logo package including primary logo, variations, monochrome versions, and usage guidelines in multiple formats (PNG, SVG, AI).",
    fileSize: "12 MB",
    fileCount: "24 files",
    downloadUrl: `${BASE_URL}/downloads/solecraft-logos.zip`,
    thumbnails: [
      `${BASE_URL}/images/asset-thumb1.jpg`,
      `${BASE_URL}/images/asset-thumb2.jpg`,
    ],
    downloads: 445,
    isActive: true,
  },
  {
    assetId: "MA002",
    title: "Platform Screenshots Collection",
    type: "Product Images",
    description:
      "High-resolution screenshots of the SoleCraft platform showing key features, user interface, and customer experience.",
    fileSize: "89 MB",
    fileCount: "56 files",
    downloadUrl: `${BASE_URL}/downloads/solecraft-screenshots.zip`,
    thumbnails: [
      `${BASE_URL}/images/asset-thumb3.jpg`,
      `${BASE_URL}/images/asset-thumb4.jpg`,
    ],
    downloads: 378,
    isActive: true,
  },
  {
    assetId: "MA003",
    title: "Cobbler Stories - Photo Series",
    type: "Photography",
    description:
      "Authentic photography series featuring real cobblers on the platform, showcasing their craft and workspace.",
    fileSize: "156 MB",
    fileCount: "42 files",
    downloadUrl: `${BASE_URL}/downloads/solecraft-cobbler-photos.zip`,
    thumbnails: [
      `${BASE_URL}/images/asset-thumb5.jpg`,
      `${BASE_URL}/images/asset-thumb6.jpg`,
    ],
    downloads: 267,
    isActive: true,
  },
  {
    assetId: "MA004",
    title: "Video Assets Pack",
    type: "Video Content",
    description:
      "Platform demonstration videos, customer testimonials, and behind-the-scenes content suitable for broadcast and online use.",
    fileSize: "234 MB",
    fileCount: "8 files",
    downloadUrl: `${BASE_URL}/downloads/solecraft-videos.zip`,
    thumbnails: [
      `${BASE_URL}/images/asset-thumb7.jpg`,
      `${BASE_URL}/images/asset-thumb8.jpg`,
    ],
    downloads: 321,
    isActive: true,
  },
  {
    assetId: "MA005",
    title: "Statistics & Data Graphics",
    type: "Infographics",
    description:
      "Editable data visualizations and statistics graphics showing platform growth, impact metrics, and user demographics.",
    fileSize: "23 MB",
    fileCount: "18 files",
    downloadUrl: `${BASE_URL}/downloads/solecraft-data-graphics.zip`,
    thumbnails: [
      `${BASE_URL}/images/asset-thumb9.jpg`,
      `${BASE_URL}/images/asset-thumb10.jpg`,
    ],
    downloads: 289,
    isActive: true,
  },
];

const pressContactsData = [
  {
    contactId: "PC001",
    name: "Priya Sharma",
    title: "Media Relations Director",
    email: "priya.sharma@solecraft.com",
    phone: "+91 98765 00001",
    color: "blue",
    isActive: true,
  },
  {
    contactId: "PC002",
    name: "Rahul Mehta",
    title: "Corporate Communications Lead",
    email: "rahul.mehta@solecraft.com",
    phone: "+91 98765 00002",
    color: "purple",
    isActive: true,
  },
  {
    contactId: "PC003",
    name: "Anjali Desai",
    title: "Brand Partnership Manager",
    email: "anjali.desai@solecraft.com",
    phone: "+91 98765 00003",
    color: "amber",
    isActive: true,
  },
];

async function seedPressData() {
  try {
    console.log("🌱 Starting press data seeding...");

    // Clear existing data
    await PressRelease.deleteMany({});
    await MediaCoverage.deleteMany({});
    await PressKit.deleteMany({});
    await MediaAsset.deleteMany({});
    await PressContact.deleteMany({});
    console.log("🗑️  Cleared existing press data");

    // Insert press releases
    const releases = await PressRelease.insertMany(pressReleasesData);
    console.log(`✅ Seeded ${releases.length} press releases`);

    // Insert media coverage
    const coverage = await MediaCoverage.insertMany(mediaCoverageData);
    console.log(`✅ Seeded ${coverage.length} media coverage items`);

    // Insert press kits
    const kits = await PressKit.insertMany(pressKitsData);
    console.log(`✅ Seeded ${kits.length} press kits`);

    // Insert media assets
    const assets = await MediaAsset.insertMany(mediaAssetsData);
    console.log(`✅ Seeded ${assets.length} media assets`);

    // Insert press contacts
    const contacts = await PressContact.insertMany(pressContactsData);
    console.log(`✅ Seeded ${contacts.length} press contacts`);

    console.log("\n📦 Seeded press releases:");
    releases.forEach((release) => {
      console.log(`\n  📰 ${release.title}`);
      console.log(`     ID: ${release.releaseId}`);
      console.log(`     Date: ${release.date.toLocaleDateString()}`);
      console.log(`     Downloads: ${release.downloads}`);
      console.log(`     Views: ${release.views}`);
      console.log(`     Tags: ${release.tags.join(", ")}`);
    });

    console.log("\n📦 Seeded media coverage:");
    coverage.forEach((item) => {
      console.log(`\n  🌐 ${item.title}`);
      console.log(`     ID: ${item.coverageId}`);
      console.log(`     Publication: ${item.publication}`);
      console.log(`     Date: ${item.date.toLocaleDateString()}`);
      console.log(`     Views: ${item.views}`);
    });

    console.log("\n📦 Seeded press kits:");
    kits.forEach((kit) => {
      console.log(`\n  📁 ${kit.title}`);
      console.log(`     ID: ${kit.kitId}`);
      console.log(`     Size: ${kit.fileSize}`);
      console.log(`     Files: ${kit.fileCount}`);
      console.log(`     Downloads: ${kit.downloads}`);
    });

    console.log("\n📦 Seeded media assets:");
    assets.forEach((asset) => {
      console.log(`\n  🖼️  ${asset.title}`);
      console.log(`     ID: ${asset.assetId}`);
      console.log(`     Type: ${asset.type}`);
      console.log(`     Size: ${asset.fileSize}`);
      console.log(`     Downloads: ${asset.downloads}`);
    });

    console.log("\n📦 Seeded press contacts:");
    contacts.forEach((contact) => {
      console.log(`\n  👤 ${contact.name}`);
      console.log(`     Title: ${contact.title}`);
      console.log(`     Email: ${contact.email}`);
      console.log(`     Phone: ${contact.phone}`);
    });

    console.log("\n💡 Press data is now available at:");
    console.log(`   ${BASE_URL}/api/press/releases`);
    console.log(`   ${BASE_URL}/api/press/coverage`);
    console.log(`   ${BASE_URL}/api/press/kits`);
    console.log(`   ${BASE_URL}/api/press/assets`);
    console.log(`   ${BASE_URL}/api/press/contacts`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding press data:", error);
    process.exit(1);
  }
}

seedPressData();

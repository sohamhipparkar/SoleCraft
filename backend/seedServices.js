const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/solecraft";
const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

// Service Schema
const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  turnaround: {
    type: String,
    required: true,
  },
  popularCount: {
    type: String,
    default: "0 orders",
  },
  bgImage: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  features: [
    {
      type: String,
    },
  ],
  icon: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Service = mongoose.model("Service", serviceSchema);

const servicesData = [
  {
    title: "Cleaning & Polishing",
    description: "Professional deep cleaning and premium polish",
    price: "$25",
    turnaround: "2-3 days",
    popularCount: "156+ orders",
    bgImage: `${BASE_URL}/images/CleaningPolishing.webp`,
    rating: 4.8,
    features: [
      "Deep cleaning",
      "Premium polish",
      "Deodorizing",
      "Lace replacement",
    ],
    icon: "Sparkles",
    isActive: true,
  },
  {
    title: "Repair & Restoration",
    description: "Expert repair services for damaged shoes",
    price: "$45",
    turnaround: "5-7 days",
    popularCount: "89+ orders",
    bgImage: `${BASE_URL}/images/RepairRestoration.jpg`,
    rating: 4.9,
    features: [
      "Sole repair",
      "Stitching fix",
      "Color restoration",
      "Structural repair",
    ],
    icon: "Wrench",
    isActive: true,
  },
  {
    title: "Custom Design",
    description: "Personalized designs and customization",
    price: "$75",
    turnaround: "7-10 days",
    popularCount: "234+ orders",
    bgImage: `${BASE_URL}/images/Customization.jpg`,
    rating: 5.0,
    features: [
      "Custom painting",
      "Unique designs",
      "Logo addition",
      "Color changes",
    ],
    icon: "Settings",
    isActive: true,
  },
  {
    title: "Shoe Exchange",
    description: "Trade your shoes for something new",
    price: "$15",
    turnaround: "1-2 days",
    popularCount: "67+ orders",
    bgImage: `${BASE_URL}/images/Exchange.webp`,
    rating: 4.6,
    features: [
      "Fair evaluation",
      "Quick process",
      "Wide selection",
      "Quality guaranteed",
    ],
    icon: "RefreshCw",
    isActive: true,
  },
];

async function seedServices() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing services
    await Service.deleteMany({});
    console.log("🗑️  Cleared existing services");

    // Insert new services
    const result = await Service.insertMany(servicesData);
    console.log(`✅ Successfully seeded ${result.length} services`);

    console.log("\n📦 Seeded services:");
    result.forEach((service) => {
      console.log(`  - ${service.title}`);
      console.log(`    Price: ${service.price}`);
      console.log(`    Rating: ${service.rating}`);
      console.log(`    Image: ${service.bgImage}`);
    });

    console.log("\n💡 Services are now available at:");
    console.log(`   ${BASE_URL}/api/services`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding services:", error);
    process.exit(1);
  }
}

seedServices();

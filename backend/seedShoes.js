const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/solecraft";
const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

// Shoe Schema
const shoeSchema = new mongoose.Schema({
  name: String,
  brand: String,
  colorway: String,
  condition: String,
  retailPrice: Number,
  resellPrice: Number,
  image: String,
  size: String,
  rating: Number,
  sellerId: mongoose.Schema.Types.ObjectId,
  status: String,
  views: Number,
  createdAt: Date,
  updatedAt: Date,
});

const Shoe = mongoose.model("Shoe", shoeSchema);

const shoesData = [
  {
    name: "Air Jordan 1 Retro High OG",
    brand: "Nike",
    colorway: "Chicago",
    condition: "9.5/10",
    retailPrice: 170,
    resellPrice: 550,
    image: `${BASE_URL}/images/AirJordan1.jpeg`,
    size: "US 10",
    rating: 4.9,
    status: "available",
    views: 0,
  },
  {
    name: "Nike Dunk Low",
    brand: "Nike",
    colorway: "Panda",
    condition: "DS (Deadstock)",
    retailPrice: 110,
    resellPrice: 210,
    image: `${BASE_URL}/images/DunkLow.avif`,
    size: "US 9.5",
    rating: 4.7,
    status: "available",
    views: 0,
  },
  {
    name: "Yeezy Boost 350 V2",
    brand: "Adidas",
    colorway: "Zebra",
    condition: "8/10",
    retailPrice: 220,
    resellPrice: 320,
    image: `${BASE_URL}/images/YeezyBoost.webp`,
    size: "US 11",
    rating: 4.8,
    status: "available",
    views: 0,
  },
  {
    name: "New Balance 550",
    brand: "New Balance",
    colorway: "White Green",
    condition: "DS (Deadstock)",
    retailPrice: 120,
    resellPrice: 180,
    image: `${BASE_URL}/images/NewBalance550.jpg`,
    size: "US 10.5",
    rating: 4.6,
    status: "available",
    views: 0,
  },
  {
    name: "Travis Scott x Air Jordan 1 Low",
    brand: "Nike",
    colorway: "Reverse Mocha",
    condition: "DS (Deadstock)",
    retailPrice: 150,
    resellPrice: 950,
    image: `${BASE_URL}/images/Jordan1Retro.webp`,
    size: "US 10",
    rating: 5.0,
    status: "available",
    views: 0,
  },
  {
    name: "Nike Air Max 97",
    brand: "Nike",
    colorway: "Silver Bullet",
    condition: "8.5/10",
    retailPrice: 175,
    resellPrice: 250,
    image: `${BASE_URL}/images/AirMax.webp`,
    size: "US 9.5",
    rating: 4.5,
    status: "available",
    views: 0,
  },
  {
    name: "Puma RS-X",
    brand: "Puma",
    colorway: "Triple Black",
    condition: "DS (Deadstock)",
    retailPrice: 110,
    resellPrice: 130,
    image: `${BASE_URL}/images/RSX.avif`,
    size: "US 10",
    rating: 4.4,
    status: "available",
    views: 0,
  },
  {
    name: "Adidas Campus 00s",
    brand: "Adidas",
    colorway: "Core Black/White",
    condition: "DS (Deadstock)",
    retailPrice: 100,
    resellPrice: 150,
    image: `${BASE_URL}/images/Campus00s.jpg`,
    size: "US 10",
    rating: 4.7,
    status: "available",
    views: 0,
  },
  {
    name: "Salomon XT-6",
    brand: "Salomon",
    colorway: "Safari/Black/White",
    condition: "9/10",
    retailPrice: 190,
    resellPrice: 250,
    image: `${BASE_URL}/images/XT6.jpg`,
    size: "US 11",
    rating: 4.8,
    status: "available",
    views: 0,
  },
  {
    name: "MSCHF Big Red Boot",
    brand: "MSCHF",
    colorway: "Red",
    condition: "DS (Deadstock)",
    retailPrice: 350,
    resellPrice: 750,
    image: `${BASE_URL}/images/BigRedBoot.webp`,
    size: "US 10",
    rating: 4.3,
    status: "available",
    views: 0,
  },
  {
    name: "Nike Zoom Vomero 5",
    brand: "Nike",
    colorway: "Photon Dust",
    condition: "9/10",
    retailPrice: 160,
    resellPrice: 220,
    image: `${BASE_URL}/images/ZoomVomero5.avif`,
    size: "US 9.5",
    rating: 4.6,
    status: "available",
    views: 0,
  },
  {
    name: "Crocs Pollex Clog",
    brand: "Crocs",
    colorway: "Sasquatch",
    condition: "DS (Deadstock)",
    retailPrice: 85,
    resellPrice: 200,
    image: `${BASE_URL}/images/PollexClog.webp`,
    size: "US 11",
    rating: 4.5,
    status: "available",
    views: 0,
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing shoes
    await Shoe.deleteMany({});
    console.log("🗑️  Cleared existing shoes");

    // Insert new shoes
    const result = await Shoe.insertMany(shoesData);
    console.log(`✅ Successfully seeded ${result.length} shoes`);

    console.log("\n📦 Seeded shoes with image URLs:");
    result.forEach((shoe) => {
      console.log(`  - ${shoe.name}`);
      console.log(`    Image: ${shoe.image}`);
    });

    console.log("\n💡 Test image access at:");
    console.log(`   ${BASE_URL}/images/AirJordan1.jpeg`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();

const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/solecraft";

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  brand: String,
  category: String,
  price: Number,
  colors: [String],
  image: String,
  rating: Number,
  inStock: Boolean,
  stockQuantity: Number,
  description: String,
  sizes: [String],
  tags: [String],
  views: Number,
  sales: Number,
  discount: Number,
  featured: Boolean,
  createdAt: Date,
  updatedAt: Date,
});

const Product = mongoose.model("Product", productSchema);

// Seed Data
const products = [
  {
    name: "Air Drift Runner",
    brand: "Nike",
    category: "Running",
    price: 129.99,
    colors: ["bg-red-500", "bg-blue-500", "bg-black"],
    image: "/images/AirDriftRunner.png",
    rating: 4.8,
    inStock: true,
    stockQuantity: 50,
    description:
      "Experience unparalleled comfort and performance with the Air Drift Runner. Featuring Nike's advanced cushioning technology and breathable mesh upper.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    tags: ["running", "performance", "cushioned"],
    views: 1250,
    sales: 89,
    discount: 0,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Ultra Boost Elite",
    brand: "Adidas",
    category: "Running",
    price: 159.99,
    colors: ["bg-gray-800", "bg-green-500", "bg-white"],
    image: "/images/UltraboostElite.png",
    rating: 4.6,
    inStock: true,
    stockQuantity: 35,
    description:
      "The Ultra Boost Elite delivers energy return and comfort with Boost™ cushioning technology. Perfect for long-distance runs.",
    sizes: ["7", "8", "9", "10", "11", "12", "13"],
    tags: ["running", "boost", "energy-return"],
    views: 2100,
    sales: 145,
    discount: 10,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Classic Suede",
    brand: "Puma",
    category: "Casual",
    price: 89.99,
    colors: ["bg-purple-500", "bg-yellow-500", "bg-blue-800"],
    image: "/images/ClassicSuede.png",
    rating: 4.4,
    inStock: true,
    stockQuantity: 75,
    description:
      "Timeless style meets modern comfort. The Classic Suede features premium suede upper and iconic PUMA styling.",
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    tags: ["casual", "lifestyle", "suede"],
    views: 890,
    sales: 67,
    discount: 15,
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Cloud Walker",
    brand: "New Balance",
    category: "Walking",
    price: 119.99,
    colors: ["bg-teal-500", "bg-gray-500", "bg-orange-500"],
    image: "/images/CloudWalker.webp",
    rating: 4.7,
    inStock: true,
    stockQuantity: 60,
    description:
      "Walk on clouds with our Fresh Foam technology. Perfect for all-day comfort and support.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    tags: ["walking", "comfort", "foam"],
    views: 1500,
    sales: 112,
    discount: 0,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Neon Pulse",
    brand: "Vans",
    category: "Skateboarding",
    price: 89.99,
    colors: ["bg-yellow-400", "bg-pink-500", "bg-black"],
    image: "/images/NeonPulse.jpg",
    rating: 4.5,
    inStock: true,
    stockQuantity: 45,
    description:
      "Bold colors meet classic Vans styling. Durable canvas upper with signature waffle outsole for superior grip.",
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    tags: ["skateboarding", "street", "canvas"],
    views: 980,
    sales: 78,
    discount: 20,
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Tech Runner",
    brand: "Under Armour",
    category: "Running",
    price: 139.99,
    colors: ["bg-blue-700", "bg-gray-400", "bg-white"],
    image: "/images/TechRunner.jpg",
    rating: 4.6,
    inStock: true,
    stockQuantity: 40,
    description:
      "Advanced technology meets performance. Features UA HOVR™ cushioning and breathable engineered mesh.",
    sizes: ["7", "8", "9", "10", "11", "12", "13"],
    tags: ["running", "technology", "performance"],
    views: 1320,
    sales: 95,
    discount: 0,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Dynamic Wave",
    brand: "Nike",
    category: "Performance",
    price: 159.99,
    colors: ["bg-indigo-600", "bg-teal-400", "bg-gray-700"],
    image: "/images/DynamicWave.png",
    rating: 4.8,
    inStock: true,
    stockQuantity: 30,
    description:
      "Revolutionary design with dynamic fit technology. Nike React foam provides smooth, responsive cushioning.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    tags: ["performance", "dynamic", "react"],
    views: 2500,
    sales: 167,
    discount: 0,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Street Zoom",
    brand: "Reebok",
    category: "Street Style",
    price: 99.99,
    colors: ["bg-cyan-500", "bg-black", "bg-white"],
    image: "/images/StreetZoom.jpg",
    rating: 4.3,
    inStock: false,
    stockQuantity: 0,
    description:
      "Street-ready style with retro vibes. Features classic Reebok branding and comfortable EVA midsole.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    tags: ["street", "lifestyle", "retro"],
    views: 750,
    sales: 45,
    discount: 25,
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Cosmic Hype",
    brand: "Adidas",
    category: "Basketball",
    price: 129.99,
    colors: ["bg-pink-600", "bg-purple-500", "bg-black"],
    image: "/images/CosmicHype.jpg",
    rating: 4.7,
    inStock: true,
    stockQuantity: 55,
    description:
      "Dominate the court with Bounce cushioning and responsive support. Bold colorways for statement-makers.",
    sizes: ["8", "9", "10", "11", "12", "13", "14"],
    tags: ["basketball", "performance", "bounce"],
    views: 1850,
    sales: 134,
    discount: 0,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Future Gliders",
    brand: "Puma",
    category: "Lifestyle",
    price: 119.99,
    colors: ["bg-lime-500", "bg-gray-600", "bg-white"],
    image: "/images/FutureGliders.jpg",
    rating: 4.6,
    inStock: true,
    stockQuantity: 65,
    description:
      "Future-forward design with PUMA's signature comfort. Perfect blend of style and functionality.",
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    tags: ["lifestyle", "futuristic", "comfort"],
    views: 1100,
    sales: 87,
    discount: 10,
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Additional products for variety
  {
    name: "Trail Blazer Pro",
    brand: "Nike",
    category: "Trail Running",
    price: 144.99,
    colors: ["bg-green-700", "bg-orange-600", "bg-gray-800"],
    image: "/images/AirDriftRunner.png",
    rating: 4.7,
    inStock: true,
    stockQuantity: 42,
    description:
      "Conquer any terrain with aggressive traction and waterproof upper. Built for trail runners.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    tags: ["trail", "running", "outdoor"],
    views: 890,
    sales: 62,
    discount: 0,
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Urban Explorer",
    brand: "New Balance",
    category: "Walking",
    price: 109.99,
    colors: ["bg-navy-700", "bg-beige-400", "bg-gray-600"],
    image: "/images/CloudWalker.webp",
    rating: 4.5,
    inStock: true,
    stockQuantity: 70,
    description:
      "City streets are your playground. Cushioned comfort for urban adventures.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    tags: ["walking", "urban", "comfort"],
    views: 1200,
    sales: 98,
    discount: 15,
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Speed Demon",
    brand: "Adidas",
    category: "Running",
    price: 174.99,
    colors: ["bg-red-600", "bg-black", "bg-white"],
    image: "/images/UltraboostElite.png",
    rating: 4.9,
    inStock: true,
    stockQuantity: 25,
    description:
      "Elite racing shoe with carbon-infused plate. Designed for personal bests.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    tags: ["running", "racing", "carbon"],
    views: 3200,
    sales: 189,
    discount: 0,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Retro Classic",
    brand: "Reebok",
    category: "Casual",
    price: 79.99,
    colors: ["bg-white", "bg-red-500", "bg-blue-600"],
    image: "/images/StreetZoom.jpg",
    rating: 4.4,
    inStock: true,
    stockQuantity: 85,
    description:
      "Vintage styling meets modern comfort. A timeless addition to any wardrobe.",
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    tags: ["casual", "retro", "classic"],
    views: 950,
    sales: 73,
    discount: 20,
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Flex Motion",
    brand: "Under Armour",
    category: "Training",
    price: 124.99,
    colors: ["bg-gray-700", "bg-red-500", "bg-white"],
    image: "/images/TechRunner.jpg",
    rating: 4.6,
    inStock: true,
    stockQuantity: 48,
    description:
      "Multi-directional flexibility for gym workouts. Responsive cushioning for all movements.",
    sizes: ["7", "8", "9", "10", "11", "12", "13"],
    tags: ["training", "gym", "flexible"],
    views: 1450,
    sales: 106,
    discount: 0,
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Skate Pro Elite",
    brand: "Vans",
    category: "Skateboarding",
    price: 94.99,
    colors: ["bg-black", "bg-white", "bg-red-600"],
    image: "/images/NeonPulse.jpg",
    rating: 4.7,
    inStock: true,
    stockQuantity: 62,
    description:
      "Pro-level skateboarding shoe with reinforced ollie area. Enhanced boardfeel and durability.",
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    tags: ["skateboarding", "pro", "durable"],
    views: 1100,
    sales: 91,
    discount: 10,
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Seed function
async function seedShopData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    // Clear existing products
    await Product.deleteMany({});
    console.log("🗑️  Cleared existing products");

    // Insert new products
    const insertedProducts = await Product.insertMany(products);
    console.log(`✅ Inserted ${insertedProducts.length} products`);

    // Display summary
    console.log("\n📊 Summary:");
    console.log(`Total Products: ${insertedProducts.length}`);
    console.log(
      `Featured Products: ${insertedProducts.filter((p) => p.featured).length}`
    );
    console.log(
      `In Stock: ${insertedProducts.filter((p) => p.inStock).length}`
    );
    console.log(
      `Out of Stock: ${insertedProducts.filter((p) => !p.inStock).length}`
    );

    const brandCount = {};
    insertedProducts.forEach((p) => {
      brandCount[p.brand] = (brandCount[p.brand] || 0) + 1;
    });
    console.log("\n🏷️  Products by Brand:");
    Object.entries(brandCount).forEach(([brand, count]) => {
      console.log(`  ${brand}: ${count}`);
    });

    const categoryCount = {};
    insertedProducts.forEach((p) => {
      categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
    });
    console.log("\n📦 Products by Category:");
    Object.entries(categoryCount).forEach(([category, count]) => {
      console.log(`  ${category}: ${count}`);
    });

    console.log("\n✅ Shop seed data inserted successfully!");

    // Close connection
    await mongoose.connection.close();
    console.log("👋 Database connection closed");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding shop data:", error);
    process.exit(1);
  }
}

// Run seed function
seedShopData();

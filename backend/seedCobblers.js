const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/solecraft";

// Cobbler Schema
const cobblerSchema = new mongoose.Schema({
  cobblerId: { type: String, required: true, unique: true },
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, lowercase: true, trim: true },
  address: { type: String, required: true, trim: true },
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true },
  },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviews: { type: Number, default: 0 },
  hours: { type: String, required: true },
  services: [
    {
      type: String,
      enum: ["Repair", "Polish", "Custom", "Exchange", "Restoration"],
    },
  ],
  speciality: { type: String, default: "" },
  verified: { type: Boolean, default: false },
  availableSlots: [{ type: String }],
  images: [{ type: String }],
  totalBookings: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

cobblerSchema.index({ location: "2dsphere" });

const Cobbler = mongoose.model("Cobbler", cobblerSchema);

// Seed data with Pune locations
const cobblersSeedData = [
  {
    cobblerId: "COB001",
    name: "Master Shoe Repair",
    phone: "+91 9876543210",
    email: "master@shoerepair.com",
    address: "Shop 12, FC Road, Shivajinagar, Pune - 411005",
    location: { type: "Point", coordinates: [73.835, 18.5204] },
    rating: 4.8,
    reviews: 245,
    hours: "9:00 AM - 8:00 PM",
    services: ["Repair", "Polish", "Restoration"],
    speciality: "Leather Specialist",
    verified: true,
    availableSlots: ["10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "5:00 PM"],
    totalBookings: 1250,
    isActive: true,
  },
  {
    cobblerId: "COB002",
    name: "Quick Fix Cobbler",
    phone: "+91 9876543211",
    email: "quickfix@shoes.com",
    address: "Lane 3, Koregaon Park, Pune - 411001",
    location: { type: "Point", coordinates: [73.8957, 18.5362] },
    rating: 4.5,
    reviews: 182,
    hours: "10:00 AM - 7:00 PM",
    services: ["Repair", "Polish", "Custom"],
    speciality: "Quick Service",
    verified: true,
    availableSlots: ["10:30 AM", "12:00 PM", "2:30 PM", "4:00 PM"],
    totalBookings: 890,
    isActive: true,
  },
  {
    cobblerId: "COB003",
    name: "Elite Shoe Care",
    phone: "+91 9876543212",
    email: "elite@shoecare.com",
    address: "Shop 5, Bund Garden Road, Pune - 411001",
    location: { type: "Point", coordinates: [73.882, 18.5314] },
    rating: 4.9,
    reviews: 320,
    hours: "9:30 AM - 8:30 PM",
    services: ["Repair", "Polish", "Custom", "Restoration", "Exchange"],
    speciality: "Premium Service",
    verified: true,
    availableSlots: [
      "9:30 AM",
      "11:00 AM",
      "1:00 PM",
      "3:00 PM",
      "5:00 PM",
      "7:00 PM",
    ],
    totalBookings: 1680,
    isActive: true,
  },
  {
    cobblerId: "COB004",
    name: "Traditional Cobbler",
    phone: "+91 9876543213",
    email: "traditional@cobbler.com",
    address: "Near Swargate Bus Stand, Pune - 411042",
    location: { type: "Point", coordinates: [73.8553, 18.5018] },
    rating: 4.3,
    reviews: 156,
    hours: "8:00 AM - 9:00 PM",
    services: ["Repair", "Polish"],
    speciality: "Traditional Methods",
    verified: false,
    availableSlots: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM", "6:00 PM"],
    totalBookings: 645,
    isActive: true,
  },
  {
    cobblerId: "COB005",
    name: "Sole Savers",
    phone: "+91 9876543214",
    email: "sole@savers.com",
    address: "Shop 8, Deccan Gymkhana, Pune - 411004",
    location: { type: "Point", coordinates: [73.842, 18.5167] },
    rating: 4.6,
    reviews: 198,
    hours: "10:00 AM - 7:30 PM",
    services: ["Repair", "Polish", "Custom", "Restoration"],
    speciality: "Designer Shoes",
    verified: true,
    availableSlots: ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"],
    totalBookings: 980,
    isActive: true,
  },
  {
    cobblerId: "COB006",
    name: "Shoe Clinic",
    phone: "+91 9876543215",
    email: "clinic@shoes.com",
    address: "Near Phoenix Mall, Viman Nagar, Pune - 411014",
    location: { type: "Point", coordinates: [73.9178, 18.5679] },
    rating: 4.7,
    reviews: 275,
    hours: "11:00 AM - 9:00 PM",
    services: ["Repair", "Polish", "Custom", "Exchange"],
    speciality: "Modern Techniques",
    verified: true,
    availableSlots: ["11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM", "7:00 PM"],
    totalBookings: 1150,
    isActive: true,
  },
  {
    cobblerId: "COB007",
    name: "Heritage Shoe Works",
    phone: "+91 9876543216",
    email: "heritage@shoeworks.com",
    address: "Old Mumbai Road, Wakadewadi, Pune - 411003",
    location: { type: "Point", coordinates: [73.8667, 18.5314] },
    rating: 4.4,
    reviews: 142,
    hours: "9:00 AM - 6:00 PM",
    services: ["Repair", "Restoration"],
    speciality: "Vintage Restoration",
    verified: true,
    availableSlots: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"],
    totalBookings: 520,
    isActive: true,
  },
  {
    cobblerId: "COB008",
    name: "Express Shoe Fix",
    phone: "+91 9876543217",
    email: "express@shoefix.com",
    address: "Shop 15, JM Road, Pune - 411004",
    location: { type: "Point", coordinates: [73.8478, 18.5196] },
    rating: 4.2,
    reviews: 118,
    hours: "10:00 AM - 8:00 PM",
    services: ["Repair", "Polish"],
    speciality: "Same Day Service",
    verified: false,
    availableSlots: ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"],
    totalBookings: 450,
    isActive: true,
  },
  {
    cobblerId: "COB009",
    name: "Artisan Shoe Studio",
    phone: "+91 9876543218",
    email: "artisan@shoestudio.com",
    address: "Kalyani Nagar, Pune - 411006",
    location: { type: "Point", coordinates: [73.9073, 18.5489] },
    rating: 4.9,
    reviews: 302,
    hours: "10:00 AM - 8:00 PM",
    services: ["Repair", "Polish", "Custom", "Restoration"],
    speciality: "Custom Design",
    verified: true,
    availableSlots: ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"],
    totalBookings: 1420,
    isActive: true,
  },
  {
    cobblerId: "COB010",
    name: "Pro Shoe Care",
    phone: "+91 9876543219",
    email: "pro@shoecare.com",
    address: "Kothrud, Near Karve Statue, Pune - 411038",
    location: { type: "Point", coordinates: [73.8112, 18.5074] },
    rating: 4.5,
    reviews: 167,
    hours: "9:00 AM - 7:00 PM",
    services: ["Repair", "Polish", "Exchange"],
    speciality: "Sports Shoes",
    verified: true,
    availableSlots: ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"],
    totalBookings: 725,
    isActive: true,
  },
];

async function seedCobblers() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    // Clear existing cobblers
    await Cobbler.deleteMany({});
    console.log("🗑️  Cleared existing cobblers");

    // Insert seed data
    await Cobbler.insertMany(cobblersSeedData);
    console.log(`✅ Successfully seeded ${cobblersSeedData.length} cobblers`);

    // Verify data
    const count = await Cobbler.countDocuments();
    console.log(`📊 Total cobblers in database: ${count}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding cobblers:", error);
    process.exit(1);
  }
}

seedCobblers();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files from public/images directory
app.use("/images", express.static(path.join(__dirname, "public", "images")));

// MongoDB Connection
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/solecraft";
const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-this-in-production";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  address: {
    type: String,
    default: "",
    trim: true,
  },
  bio: {
    type: String,
    default: "",
    trim: true,
  },
  avatar: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

// ==================== NEW SCHEMAS ====================

// Shoe Schema
const shoeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  colorway: {
    type: String,
    required: true,
    trim: true,
  },
  condition: {
    type: String,
    required: true,
    enum: [
      "DS (Deadstock)",
      "9.5/10",
      "9/10",
      "8.5/10",
      "8/10",
      "7.5/10",
      "7/10",
    ],
  },
  retailPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  resellPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  status: {
    type: String,
    enum: ["available", "sold", "pending"],
    default: "available",
  },
  views: {
    type: Number,
    default: 0,
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

const Shoe = mongoose.model("Shoe", shoeSchema);

// Order Schema
const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  shoeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shoe",
    required: true,
  },
  buyerName: {
    type: String,
    required: true,
    trim: true,
  },
  buyerEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  buyerPhone: {
    type: String,
    required: true,
    trim: true,
  },
  shippingAddress: {
    type: String,
    required: true,
    trim: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["credit-card", "paypal", "apple-pay", "google-pay"],
  },
  itemPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  shippingCost: {
    type: Number,
    default: 15,
  },
  tax: {
    type: Number,
    required: true,
    min: 0,
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  trackingNumber: {
    type: String,
    default: null,
  },
  estimatedDelivery: {
    type: Date,
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

const Order = mongoose.model("Order", orderSchema);

// Wishlist/Favorites Schema
const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  shoeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shoe",
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

wishlistSchema.index({ userId: 1, shoeId: 1 }, { unique: true });

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

// Newsletter Subscription Schema
const subscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

// ==================== SERVICE SCHEMAS ====================

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

// Service Booking Schema
const serviceBookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  customerName: {
    type: String,
    required: true,
    trim: true,
  },
  customerEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  customerPhone: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  shoeDetails: {
    brand: String,
    model: String,
    size: String,
    color: String,
    condition: String,
  },
  specialInstructions: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "in-progress", "completed", "cancelled"],
    default: "pending",
  },
  scheduledDate: {
    type: Date,
  },
  completedDate: {
    type: Date,
  },
  estimatedCost: {
    type: Number,
    required: true,
  },
  finalCost: {
    type: Number,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "refunded"],
    default: "pending",
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  review: {
    type: String,
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

const ServiceBooking = mongoose.model("ServiceBooking", serviceBookingSchema);

// Service Review Schema
const serviceReviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceBooking",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
  },
  images: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ServiceReview = mongoose.model("ServiceReview", serviceReviewSchema);

// ==================== SHOP/PRODUCT ROUTES ====================

// Product Schema (for shop items - different from resell shoes)
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  colors: [
    {
      type: String,
    },
  ],
  image: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  stockQuantity: {
    type: Number,
    default: 0,
    min: 0,
  },
  description: {
    type: String,
    default: "",
  },
  sizes: [
    {
      type: String,
    },
  ],
  tags: [
    {
      type: String,
    },
  ],
  views: {
    type: Number,
    default: 0,
  },
  sales: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  featured: {
    type: Boolean,
    default: false,
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

const Product = mongoose.model("Product", productSchema);

// Cart Schema
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
      },
      size: {
        type: String,
      },
      color: {
        type: String,
      },
      price: {
        type: Number,
        required: true,
      },
      addedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

// Product Wishlist Schema (separate from resell wishlist)
const productWishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

productWishlistSchema.index({ userId: 1, productId: 1 }, { unique: true });

const ProductWishlist = mongoose.model(
  "ProductWishlist",
  productWishlistSchema
);

// Shop Order Schema
const shopOrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: String,
      brand: String,
      image: String,
      quantity: Number,
      size: String,
      color: String,
      price: Number,
    },
  ],
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  customerPhone: {
    type: String,
    required: true,
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["credit-card", "paypal", "apple-pay", "google-pay", "cod"],
  },
  subtotal: {
    type: Number,
    required: true,
  },
  shippingCost: {
    type: Number,
    default: 0,
  },
  tax: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: [
      "pending",
      "confirmed",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
      "refunded",
    ],
    default: "pending",
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed", "refunded"],
    default: "pending",
  },
  trackingNumber: {
    type: String,
  },
  estimatedDelivery: {
    type: Date,
  },
  deliveredAt: {
    type: Date,
  },
  notes: {
    type: String,
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

const ShopOrder = mongoose.model("ShopOrder", shopOrderSchema);

// ==================== ROUTES ====================

// Health Check Route
app.get("/", (req, res) => {
  res.json({
    message: "SoleCraft API Server Running",
    status: "Active",
    timestamp: new Date().toISOString(),
  });
});

// Register Route
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Validation checks
    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required fields (name, email, phone, password)",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // Phone validation (basic - at least 10 digits)
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid phone number (minimum 10 digits)",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      phone,
      password,
    });
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Return success response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: error.message,
    });
  }
});

// Login Route
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        lastLogin: user.lastLogin,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
      error: error.message,
    });
  }
});

// Get User Profile (Protected Route)
app.get("/api/auth/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        bio: user.bio,
        avatar: user.avatar,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
      },
    });
  } catch (error) {
    console.error("Profile Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching profile",
      error: error.message,
    });
  }
});

// Forgot Password - Send Reset Link (Simulation)
app.post("/api/auth/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide email address",
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if user exists or not for security
      return res.json({
        success: true,
        message:
          "If an account exists with this email, a password reset link has been sent",
      });
    }

    // Generate reset token (in production, save this to DB with expiry)
    const resetToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // In production, send email with reset link
    // For now, just return the token
    console.log(`Password reset token for ${email}: ${resetToken}`);

    res.json({
      success: true,
      message: "Password reset link has been sent to your email",
      // Remove this in production, only for testing
      resetToken: resetToken,
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error processing request",
      error: error.message,
    });
  }
});

// Reset Password
app.post("/api/auth/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide token and new password",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Find user and update password
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset Password Error:", error);

    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error resetting password",
      error: error.message,
    });
  }
});

// Update Profile (Protected Route)
app.put("/api/auth/profile", authenticateToken, async (req, res) => {
  try {
    const { name, phone, address, bio, avatar } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (phone) {
      // Validate phone number
      const phoneDigits = phone.replace(/\D/g, "");
      if (phoneDigits.length < 10) {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid phone number (minimum 10 digits)",
        });
      }
      user.phone = phone;
    }
    if (address !== undefined) user.address = address;
    if (bio !== undefined) user.bio = bio;
    if (avatar !== undefined) user.avatar = avatar;

    await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        bio: user.bio,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error updating profile",
      error: error.message,
    });
  }
});

// Verify Token Route
app.post("/api/auth/verify", authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: "Token is valid",
    user: req.user,
  });
});

// Logout Route (Client-side handles token removal, but useful for logging)
app.post("/api/auth/logout", authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: "Logged out successfully",
  });
});

// ==================== SHOE ROUTES ====================

// Get all shoes with filters
app.get("/api/shoes", async (req, res) => {
  try {
    const {
      search,
      brand,
      size,
      minPrice,
      maxPrice,
      sortBy,
      page = 1,
      limit = 12,
    } = req.query;

    let query = { status: "available" };

    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { colorway: { $regex: search, $options: "i" } },
      ];
    }

    // Brand filter
    if (brand && brand !== "all") {
      query.brand = brand;
    }

    // Size filter
    if (size) {
      query.size = size;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.resellPrice = {};
      if (minPrice) query.resellPrice.$gte = Number(minPrice);
      if (maxPrice) query.resellPrice.$lte = Number(maxPrice);
    }

    // Build sort option
    let sort = {};
    switch (sortBy) {
      case "price-low":
        sort.resellPrice = 1;
        break;
      case "price-high":
        sort.resellPrice = -1;
        break;
      case "rating":
        sort.rating = -1;
        break;
      default:
        sort.createdAt = -1;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const shoes = await Shoe.find(query)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit))
      .populate("sellerId", "name email");

    const total = await Shoe.countDocuments(query);

    res.json({
      success: true,
      shoes,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalItems: total,
        itemsPerPage: Number(limit),
      },
    });
  } catch (error) {
    console.error("Get Shoes Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching shoes",
      error: error.message,
    });
  }
});

// Get single shoe by ID
app.get("/api/shoes/:id", async (req, res) => {
  try {
    const shoe = await Shoe.findById(req.params.id).populate(
      "sellerId",
      "name email phone"
    );

    if (!shoe) {
      return res.status(404).json({
        success: false,
        message: "Shoe not found",
      });
    }

    // Increment views
    shoe.views += 1;
    await shoe.save();

    res.json({
      success: true,
      shoe,
    });
  } catch (error) {
    console.error("Get Shoe Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching shoe",
      error: error.message,
    });
  }
});

// Add new shoe listing (Protected)
app.post("/api/shoes", authenticateToken, async (req, res) => {
  try {
    const {
      name,
      brand,
      colorway,
      condition,
      retailPrice,
      resellPrice,
      image,
      size,
    } = req.body;

    // Validation
    if (
      !name ||
      !brand ||
      !colorway ||
      !condition ||
      !retailPrice ||
      !resellPrice ||
      !image ||
      !size
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const shoe = new Shoe({
      name,
      brand,
      colorway,
      condition,
      retailPrice: Number(retailPrice),
      resellPrice: Number(resellPrice),
      image,
      size,
      sellerId: req.user.userId,
    });

    await shoe.save();

    res.status(201).json({
      success: true,
      message: "Shoe listed successfully",
      shoe,
    });
  } catch (error) {
    console.error("Add Shoe Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error adding shoe",
      error: error.message,
    });
  }
});

// Update shoe listing (Protected)
app.put("/api/shoes/:id", authenticateToken, async (req, res) => {
  try {
    const shoe = await Shoe.findById(req.params.id);

    if (!shoe) {
      return res.status(404).json({
        success: false,
        message: "Shoe not found",
      });
    }

    // Check if user owns this listing
    if (shoe.sellerId.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to update this listing",
      });
    }

    const updates = req.body;
    Object.keys(updates).forEach((key) => {
      if (updates[key] !== undefined) {
        shoe[key] = updates[key];
      }
    });

    shoe.updatedAt = Date.now();
    await shoe.save();

    res.json({
      success: true,
      message: "Shoe updated successfully",
      shoe,
    });
  } catch (error) {
    console.error("Update Shoe Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error updating shoe",
      error: error.message,
    });
  }
});

// Delete shoe listing (Protected)
app.delete("/api/shoes/:id", authenticateToken, async (req, res) => {
  try {
    const shoe = await Shoe.findById(req.params.id);

    if (!shoe) {
      return res.status(404).json({
        success: false,
        message: "Shoe not found",
      });
    }

    // Check if user owns this listing
    if (shoe.sellerId.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this listing",
      });
    }

    await shoe.deleteOne();

    res.json({
      success: true,
      message: "Shoe deleted successfully",
    });
  } catch (error) {
    console.error("Delete Shoe Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error deleting shoe",
      error: error.message,
    });
  }
});

// ==================== ORDER ROUTES ====================

// Create new order (Protected)
app.post("/api/orders", authenticateToken, async (req, res) => {
  try {
    const {
      shoeId,
      buyerName,
      buyerEmail,
      buyerPhone,
      shippingAddress,
      paymentMethod,
    } = req.body;

    // Validation
    if (
      !shoeId ||
      !buyerName ||
      !buyerEmail ||
      !buyerPhone ||
      !shippingAddress ||
      !paymentMethod
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Check if shoe exists and is available
    const shoe = await Shoe.findById(shoeId);
    if (!shoe) {
      return res.status(404).json({
        success: false,
        message: "Shoe not found",
      });
    }

    if (shoe.status !== "available") {
      return res.status(400).json({
        success: false,
        message: "This shoe is no longer available",
      });
    }

    // Calculate costs
    const itemPrice = shoe.resellPrice;
    const shippingCost = 15;
    const tax = itemPrice * 0.08;
    const totalAmount = itemPrice + shippingCost + tax;

    // Generate order ID
    const orderId = `SC${Date.now().toString().slice(-6)}${Math.random()
      .toString(36)
      .substr(2, 2)
      .toUpperCase()}`;

    // Calculate estimated delivery (3-5 business days)
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

    // Create order
    const order = new Order({
      orderId,
      userId: req.user.userId,
      shoeId,
      buyerName,
      buyerEmail,
      buyerPhone,
      shippingAddress,
      paymentMethod,
      itemPrice,
      shippingCost,
      tax: Number(tax.toFixed(2)),
      totalAmount: Number(totalAmount.toFixed(2)),
      estimatedDelivery,
      status: "processing",
    });

    await order.save();

    // Update shoe status
    shoe.status = "sold";
    shoe.updatedAt = Date.now();
    await shoe.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: {
        orderId: order.orderId,
        shoeDetails: {
          name: shoe.name,
          brand: shoe.brand,
          colorway: shoe.colorway,
          size: shoe.size,
          image: shoe.image,
        },
        totalAmount: order.totalAmount,
        estimatedDelivery: order.estimatedDelivery,
        status: order.status,
      },
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error creating order",
      error: error.message,
    });
  }
});

// Get user orders (Protected)
app.get("/api/orders", authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId })
      .populate("shoeId")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Get Orders Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching orders",
      error: error.message,
    });
  }
});

// Get single order (Protected)
app.get("/api/orders/:orderId", authenticateToken, async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId })
      .populate("shoeId")
      .populate("userId", "name email");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check if user owns this order
    if (order.userId._id.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to view this order",
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Get Order Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching order",
      error: error.message,
    });
  }
});

// Update order status (Admin only - for now, any authenticated user)
app.put("/api/orders/:orderId/status", authenticateToken, async (req, res) => {
  try {
    const { status, trackingNumber } = req.body;

    const order = await Order.findOne({ orderId: req.params.orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (status) {
      order.status = status;
    }

    if (trackingNumber) {
      order.trackingNumber = trackingNumber;
    }

    order.updatedAt = Date.now();
    await order.save();

    res.json({
      success: true,
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    console.error("Update Order Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error updating order",
      error: error.message,
    });
  }
});

// ==================== WISHLIST/FAVORITES ROUTES ====================

// Get user favorites (Protected)
app.get("/api/wishlist", authenticateToken, async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ userId: req.user.userId })
      .populate("shoeId")
      .sort({ addedAt: -1 });

    const favorites = wishlist
      .filter((item) => item.shoeId !== null)
      .map((item) => item.shoeId);

    res.json({
      success: true,
      favorites,
    });
  } catch (error) {
    console.error("Get Wishlist Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching wishlist",
      error: error.message,
    });
  }
});

// Add to favorites (Protected)
app.post("/api/wishlist/:shoeId", authenticateToken, async (req, res) => {
  try {
    const { shoeId } = req.params;

    // Check if shoe exists
    const shoe = await Shoe.findById(shoeId);
    if (!shoe) {
      return res.status(404).json({
        success: false,
        message: "Shoe not found",
      });
    }

    // Check if already in wishlist
    const existing = await Wishlist.findOne({
      userId: req.user.userId,
      shoeId,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Shoe already in wishlist",
      });
    }

    const wishlistItem = new Wishlist({
      userId: req.user.userId,
      shoeId,
    });

    await wishlistItem.save();

    res.status(201).json({
      success: true,
      message: "Added to wishlist",
      wishlistItem,
    });
  } catch (error) {
    console.error("Add to Wishlist Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error adding to wishlist",
      error: error.message,
    });
  }
});

// Remove from favorites (Protected)
app.delete("/api/wishlist/:shoeId", authenticateToken, async (req, res) => {
  try {
    const { shoeId } = req.params;

    const result = await Wishlist.findOneAndDelete({
      userId: req.user.userId,
      shoeId,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Item not found in wishlist",
      });
    }

    res.json({
      success: true,
      message: "Removed from wishlist",
    });
  } catch (error) {
    console.error("Remove from Wishlist Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error removing from wishlist",
      error: error.message,
    });
  }
});

// ==================== SUBSCRIPTION ROUTES ====================

// Subscribe to newsletter
app.post("/api/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide email address",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // Check if already subscribed
    let subscription = await Subscription.findOne({ email });

    if (subscription) {
      if (subscription.isActive) {
        return res.status(400).json({
          success: false,
          message: "Email is already subscribed",
        });
      } else {
        // Reactivate subscription
        subscription.isActive = true;
        subscription.subscribedAt = Date.now();
        await subscription.save();

        return res.json({
          success: true,
          message: "Subscription reactivated successfully",
        });
      }
    }

    // Create new subscription
    subscription = new Subscription({ email });
    await subscription.save();

    res.status(201).json({
      success: true,
      message: "Successfully subscribed to newsletter",
    });
  } catch (error) {
    console.error("Subscribe Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error processing subscription",
      error: error.message,
    });
  }
});

// Unsubscribe from newsletter
app.post("/api/unsubscribe", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide email address",
      });
    }

    const subscription = await Subscription.findOne({ email });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Email not found in subscription list",
      });
    }

    subscription.isActive = false;
    await subscription.save();

    res.json({
      success: true,
      message: "Successfully unsubscribed from newsletter",
    });
  } catch (error) {
    console.error("Unsubscribe Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error processing unsubscription",
      error: error.message,
    });
  }
});

// ==================== SERVICE ROUTES ====================

// Get all services
app.get("/api/services", async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      services,
    });
  } catch (error) {
    console.error("Get Services Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching services",
      error: error.message,
    });
  }
});

// Get single service
app.get("/api/services/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Get reviews for this service
    const reviews = await ServiceReview.find({ serviceId: req.params.id })
      .populate("userId", "name avatar")
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      success: true,
      service,
      reviews,
    });
  } catch (error) {
    console.error("Get Service Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching service",
      error: error.message,
    });
  }
});

// Create new service (Admin only - for now, any authenticated user)
app.post("/api/services", authenticateToken, async (req, res) => {
  try {
    const { title, description, price, turnaround, bgImage, features, icon } =
      req.body;

    if (!title || !description || !price || !turnaround || !bgImage || !icon) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const service = new Service({
      title,
      description,
      price,
      turnaround,
      bgImage,
      features: features || [],
      icon,
    });

    await service.save();

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    console.error("Create Service Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error creating service",
      error: error.message,
    });
  }
});

// Book a service (Protected)
app.post("/api/services/:id/book", authenticateToken, async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      address,
      shoeDetails,
      specialInstructions,
      scheduledDate,
    } = req.body;

    // Validation
    if (!customerName || !customerEmail || !customerPhone || !address) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Check if service exists
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Generate booking ID
    const bookingId = `SB${Date.now().toString().slice(-6)}${Math.random()
      .toString(36)
      .substr(2, 2)
      .toUpperCase()}`;

    // Parse estimated cost from service price
    let estimatedCost = 0;
    const priceMatch = service.price.match(/\d+/);
    if (priceMatch) {
      estimatedCost = parseInt(priceMatch[0]);
    }

    // Create booking
    const booking = new ServiceBooking({
      bookingId,
      userId: req.user.userId,
      serviceId: req.params.id,
      customerName,
      customerEmail,
      customerPhone,
      address,
      shoeDetails: shoeDetails || {},
      specialInstructions: specialInstructions || "",
      scheduledDate: scheduledDate
        ? new Date(scheduledDate)
        : new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Default: 2 days from now
      estimatedCost,
      status: "confirmed",
    });

    await booking.save();

    // Update service popularity count
    const currentCount = parseInt(
      service.popularCount.match(/\d+/)?.[0] || "0"
    );
    service.popularCount = `${currentCount + 1}+ orders`;
    service.updatedAt = Date.now();
    await service.save();

    res.status(201).json({
      success: true,
      message: "Service booked successfully",
      booking: {
        bookingId: booking.bookingId,
        serviceTitle: service.title,
        scheduledDate: booking.scheduledDate,
        estimatedCost: booking.estimatedCost,
        status: booking.status,
      },
    });
  } catch (error) {
    console.error("Book Service Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error booking service",
      error: error.message,
    });
  }
});

// Get user's service bookings (Protected)
app.get("/api/service-bookings", authenticateToken, async (req, res) => {
  try {
    const bookings = await ServiceBooking.find({ userId: req.user.userId })
      .populate("serviceId")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("Get Bookings Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching bookings",
      error: error.message,
    });
  }
});

// Get single booking (Protected)
app.get(
  "/api/service-bookings/:bookingId",
  authenticateToken,
  async (req, res) => {
    try {
      const booking = await ServiceBooking.findOne({
        bookingId: req.params.bookingId,
      })
        .populate("serviceId")
        .populate("userId", "name email phone");

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Booking not found",
        });
      }

      // Check if user owns this booking
      if (booking.userId._id.toString() !== req.user.userId) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized to view this booking",
        });
      }

      res.json({
        success: true,
        booking,
      });
    } catch (error) {
      console.error("Get Booking Error:", error);
      res.status(500).json({
        success: false,
        message: "Server error fetching booking",
        error: error.message,
      });
    }
  }
);

// ==================== STATS & ANALYTICS ROUTES ====================

// Get marketplace stats
app.get("/api/stats", async (req, res) => {
  try {
    const totalListings = await Shoe.countDocuments({ status: "available" });
    const totalSold = await Shoe.countDocuments({ status: "sold" });
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalSubscribers = await Subscription.countDocuments({
      isActive: true,
    });

    // Calculate average rating
    const avgRatingResult = await Shoe.aggregate([
      { $match: { rating: { $gt: 0 } } },
      { $group: { _id: null, avgRating: { $avg: "$rating" } } },
    ]);
    const avgRating =
      avgRatingResult.length > 0 ? avgRatingResult[0].avgRating.toFixed(1) : 0;

    res.json({
      success: true,
      stats: {
        activeListings: totalListings,
        totalTransactions: totalSold + totalOrders,
        averageRating: parseFloat(avgRating),
        activeUsers: totalUsers,
        subscribers: totalSubscribers,
      },
    });
  } catch (error) {
    console.error("Get Stats Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching stats",
      error: error.message,
    });
  }
});

// Get trending shoes
app.get("/api/trending", async (req, res) => {
  try {
    const trending = await Shoe.find({ status: "available" })
      .sort({ views: -1, rating: -1 })
      .limit(10)
      .select("name brand colorway resellPrice retailPrice image rating views");

    const trendingWithChange = trending.map((shoe) => {
      const priceChange = (
        ((shoe.resellPrice - shoe.retailPrice) / shoe.retailPrice) *
        100
      ).toFixed(0);
      return {
        ...shoe.toObject(),
        priceChange: priceChange > 0 ? `+${priceChange}%` : `${priceChange}%`,
        trend: priceChange > 0 ? "up" : "down",
      };
    });

    res.json({
      success: true,
      trending: trendingWithChange,
    });
  } catch (error) {
    console.error("Get Trending Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching trending shoes",
      error: error.message,
    });
  }
});

// ==================== PRODUCT ROUTES ====================

// Get all products with filters
app.get("/api/products", async (req, res) => {
  try {
    const {
      search,
      brand,
      category,
      minPrice,
      maxPrice,
      inStock,
      sortBy,
      page = 1,
      limit = 12,
    } = req.query;

    let query = {};

    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    // Brand filter
    if (brand && brand !== "all") {
      query.brand = brand;
    }

    // Category filter
    if (category) {
      if (Array.isArray(category)) {
        query.category = { $in: category };
      } else {
        query.category = category;
      }
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Stock filter
    if (inStock === "true") {
      query.inStock = true;
    }

    // Build sort option
    let sort = {};
    switch (sortBy) {
      case "price-low":
        sort.price = 1;
        break;
      case "price-high":
        sort.price = -1;
        break;
      case "rating":
        sort.rating = -1;
        break;
      case "newest":
        sort.createdAt = -1;
        break;
      case "popular":
        sort.sales = -1;
        break;
      default:
        sort.featured = -1;
        sort.createdAt = -1;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const products = await Product.find(query)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      products,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalItems: total,
        itemsPerPage: Number(limit),
      },
    });
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching products",
      error: error.message,
    });
  }
});

// Get single product
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Increment views
    product.views += 1;
    await product.save();

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Get Product Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching product",
      error: error.message,
    });
  }
});

// Get product brands
app.get("/api/products/filters/brands", async (req, res) => {
  try {
    const brands = await Product.distinct("brand");
    res.json({
      success: true,
      brands: brands.sort(),
    });
  } catch (error) {
    console.error("Get Brands Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching brands",
      error: error.message,
    });
  }
});

// Get product categories
app.get("/api/products/filters/categories", async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json({
      success: true,
      categories: categories.sort(),
    });
  } catch (error) {
    console.error("Get Categories Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching categories",
      error: error.message,
    });
  }
});

// ==================== CART ROUTES ====================

// Get user cart (Protected)
app.get("/api/cart", authenticateToken, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.userId }).populate(
      "items.productId"
    );

    if (!cart) {
      cart = new Cart({
        userId: req.user.userId,
        items: [],
      });
      await cart.save();
    }

    // Filter out items with null productId (deleted products)
    cart.items = cart.items.filter((item) => item.productId !== null);
    await cart.save();

    // Calculate totals
    const subtotal = cart.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    res.json({
      success: true,
      cart: {
        items: cart.items,
        subtotal: subtotal.toFixed(2),
        itemCount: cart.items.reduce((count, item) => count + item.quantity, 0),
      },
    });
  } catch (error) {
    console.error("Get Cart Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching cart",
      error: error.message,
    });
  }
});

// Add item to cart (Protected)
app.post("/api/cart/add", authenticateToken, async (req, res) => {
  try {
    const { productId, quantity = 1, size, color } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    // Check if product exists and is in stock
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (!product.inStock) {
      return res.status(400).json({
        success: false,
        message: "Product is out of stock",
      });
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) {
      cart = new Cart({
        userId: req.user.userId,
        items: [],
      });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.size === size &&
        item.color === color
    );

    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += Number(quantity);
    } else {
      // Add new item
      cart.items.push({
        productId,
        quantity: Number(quantity),
        size: size || "",
        color: color || "",
        price: product.price,
      });
    }

    cart.updatedAt = Date.now();
    await cart.save();
    await cart.populate("items.productId");

    res.json({
      success: true,
      message: "Item added to cart",
      cart,
    });
  } catch (error) {
    console.error("Add to Cart Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error adding to cart",
      error: error.message,
    });
  }
});

// Update cart item quantity (Protected)
app.put("/api/cart/update/:itemId", authenticateToken, async (req, res) => {
  try {
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Valid quantity is required",
      });
    }

    const cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const item = cart.items.id(req.params.itemId);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    item.quantity = Number(quantity);
    cart.updatedAt = Date.now();
    await cart.save();
    await cart.populate("items.productId");

    res.json({
      success: true,
      message: "Cart updated",
      cart,
    });
  } catch (error) {
    console.error("Update Cart Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error updating cart",
      error: error.message,
    });
  }
});

// Remove item from cart (Protected)
app.delete("/api/cart/remove/:itemId", authenticateToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item._id.toString() !== req.params.itemId
    );
    cart.updatedAt = Date.now();
    await cart.save();
    await cart.populate("items.productId");

    res.json({
      success: true,
      message: "Item removed from cart",
      cart,
    });
  } catch (error) {
    console.error("Remove from Cart Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error removing from cart",
      error: error.message,
    });
  }
});

// Clear cart (Protected)
app.delete("/api/cart/clear", authenticateToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = [];
    cart.updatedAt = Date.now();
    await cart.save();

    res.json({
      success: true,
      message: "Cart cleared",
      cart,
    });
  } catch (error) {
    console.error("Clear Cart Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error clearing cart",
      error: error.message,
    });
  }
});

// ==================== PRODUCT WISHLIST ROUTES ====================

// Get user product wishlist (Protected)
app.get("/api/product-wishlist", authenticateToken, async (req, res) => {
  try {
    const wishlist = await ProductWishlist.find({ userId: req.user.userId })
      .populate("productId")
      .sort({ addedAt: -1 });

    const products = wishlist
      .filter((item) => item.productId !== null)
      .map((item) => item.productId);

    res.json({
      success: true,
      wishlist: products,
    });
  } catch (error) {
    console.error("Get Product Wishlist Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching wishlist",
      error: error.message,
    });
  }
});

// Add to product wishlist (Protected)
app.post(
  "/api/product-wishlist/:productId",
  authenticateToken,
  async (req, res) => {
    try {
      const { productId } = req.params;

      // Check if product exists
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      // Check if already in wishlist
      const existing = await ProductWishlist.findOne({
        userId: req.user.userId,
        productId,
      });

      if (existing) {
        return res.status(400).json({
          success: false,
          message: "Product already in wishlist",
        });
      }

      const wishlistItem = new ProductWishlist({
        userId: req.user.userId,
        productId,
      });

      await wishlistItem.save();

      res.status(201).json({
        success: true,
        message: "Added to wishlist",
        wishlistItem,
      });
    } catch (error) {
      console.error("Add to Product Wishlist Error:", error);
      res.status(500).json({
        success: false,
        message: "Server error adding to wishlist",
        error: error.message,
      });
    }
  }
);

// Remove from product wishlist (Protected)
app.delete(
  "/api/product-wishlist/:productId",
  authenticateToken,
  async (req, res) => {
    try {
      const { productId } = req.params;

      const result = await ProductWishlist.findOneAndDelete({
        userId: req.user.userId,
        productId,
      });

      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Item not found in wishlist",
        });
      }

      res.json({
        success: true,
        message: "Removed from wishlist",
      });
    } catch (error) {
      console.error("Remove from Product Wishlist Error:", error);
      res.status(500).json({
        success: false,
        message: "Server error removing from wishlist",
        error: error.message,
      });
    }
  }
);

// ==================== SHOP ORDER ROUTES ====================

// Create shop order (Protected)
app.post("/api/shop/checkout", authenticateToken, async (req, res) => {
  try {
    const {
      items,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      paymentMethod,
      notes,
    } = req.body;

    // Validation
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    if (
      !customerName ||
      !customerEmail ||
      !customerPhone ||
      !shippingAddress ||
      !paymentMethod
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product ${item.productId} not found`,
        });
      }

      if (!product.inStock) {
        return res.status(400).json({
          success: false,
          message: `${product.name} is out of stock`,
        });
      }

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        productId: product._id,
        name: product.name,
        brand: product.brand,
        image: product.image,
        quantity: item.quantity,
        size: item.size || "",
        color: item.color || "",
        price: product.price,
      });

      // Update product sales count
      product.sales += item.quantity;
      await product.save();
    }

    // Calculate shipping and tax
    const shippingCost = subtotal >= 100 ? 0 : 15;
    const tax = subtotal * 0.08;
    const totalAmount = subtotal + shippingCost + tax;

    // Generate order ID
    const orderId = `SO${Date.now().toString().slice(-6)}${Math.random()
      .toString(36)
      .substr(2, 2)
      .toUpperCase()}`;

    // Calculate estimated delivery (3-5 business days)
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

    // Create order
    const order = new ShopOrder({
      orderId,
      userId: req.user.userId,
      items: orderItems,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      paymentMethod,
      subtotal: Number(subtotal.toFixed(2)),
      shippingCost,
      tax: Number(tax.toFixed(2)),
      totalAmount: Number(totalAmount.toFixed(2)),
      estimatedDelivery,
      notes: notes || "",
      status: "confirmed",
      paymentStatus: paymentMethod === "cod" ? "pending" : "paid",
    });

    await order.save();

    // Clear user's cart
    await Cart.findOneAndUpdate(
      { userId: req.user.userId },
      { items: [], updatedAt: Date.now() }
    );

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: {
        orderId: order.orderId,
        items: order.items,
        totalAmount: order.totalAmount,
        estimatedDelivery: order.estimatedDelivery,
        status: order.status,
      },
    });
  } catch (error) {
    console.error("Checkout Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error processing checkout",
      error: error.message,
    });
  }
});

// Get user shop orders (Protected)
app.get("/api/shop/orders", authenticateToken, async (req, res) => {
  try {
    const orders = await ShopOrder.find({ userId: req.user.userId })
      .populate({
        path: "items.productId",
        select: "name brand image price",
      })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Get Shop Orders Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching orders",
      error: error.message,
    });
  }
});

// Get single shop order (Protected)
app.get("/api/shop/orders/:orderId", authenticateToken, async (req, res) => {
  try {
    const order = await ShopOrder.findOne({ orderId: req.params.orderId })
      .populate("userId", "name email phone")
      .populate({
        path: "items.productId",
        select: "name brand image price",
      });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check if user owns this order
    if (order.userId._id.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to view this order",
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Get Shop Order Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching order",
      error: error.message,
    });
  }
});

// ==================== SHOP STATS ROUTES ====================

// Get shop statistics
app.get("/api/shop/stats", async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const inStockProducts = await Product.countDocuments({ inStock: true });
    const totalOrders = await ShopOrder.countDocuments();
    const completedOrders = await ShopOrder.countDocuments({
      status: "delivered",
    });

    // Calculate average rating
    const avgRatingResult = await Product.aggregate([
      { $match: { rating: { $gt: 0 } } },
      { $group: { _id: null, avgRating: { $avg: "$rating" } } },
    ]);
    const avgRating =
      avgRatingResult.length > 0 ? avgRatingResult[0].avgRating.toFixed(1) : 0;

    res.json({
      success: true,
      stats: {
        totalProducts,
        inStockProducts,
        totalOrders,
        completedOrders,
        averageRating: parseFloat(avgRating),
      },
    });
  } catch (error) {
    console.error("Get Shop Stats Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching statistics",
      error: error.message,
    });
  }
});

// Get featured products
app.get("/api/products/featured", async (req, res) => {
  try {
    const featured = await Product.find({ featured: true, inStock: true })
      .sort({ sales: -1, rating: -1 })
      .limit(8);

    res.json({
      success: true,
      products: featured,
    });
  } catch (error) {
    console.error("Get Featured Products Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching featured products",
      error: error.message,
    });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message,
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Local: http://localhost:${PORT}`);
  console.log(`🖼️  Images: http://localhost:${PORT}/images/`);
});

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/images", express.static(path.join(__dirname, "public", "images")));

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

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

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

app.get("/", (req, res) => {
  res.json({
    message: "SoleCraft API Server Running",
    status: "Active",
    timestamp: new Date().toISOString(),
  });
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid phone number (minimum 10 digits)",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const user = new User({
      name,
      email,
      phone,
      password,
    });
    await user.save();

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

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

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    user.lastLogin = new Date();
    await user.save();

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

app.post("/api/auth/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide email address",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: true,
        message:
          "If an account exists with this email, a password reset link has been sent",
      });
    }

    const resetToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log(`Password reset token for ${email}: ${resetToken}`);

    res.json({
      success: true,
      message: "Password reset link has been sent to your email",
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

    const decoded = jwt.verify(token, JWT_SECRET);

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

    if (name) user.name = name;
    if (phone) {
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

app.post("/api/auth/verify", authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: "Token is valid",
    user: req.user,
  });
});

app.post("/api/auth/logout", authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: "Logged out successfully",
  });
});

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

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { colorway: { $regex: search, $options: "i" } },
      ];
    }

    if (brand && brand !== "all") {
      query.brand = brand;
    }

    if (size) {
      query.size = size;
    }

    if (minPrice || maxPrice) {
      query.resellPrice = {};
      if (minPrice) query.resellPrice.$gte = Number(minPrice);
      if (maxPrice) query.resellPrice.$lte = Number(maxPrice);
    }

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

app.put("/api/shoes/:id", authenticateToken, async (req, res) => {
  try {
    const shoe = await Shoe.findById(req.params.id);

    if (!shoe) {
      return res.status(404).json({
        success: false,
        message: "Shoe not found",
      });
    }

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

app.delete("/api/shoes/:id", authenticateToken, async (req, res) => {
  try {
    const shoe = await Shoe.findById(req.params.id);

    if (!shoe) {
      return res.status(404).json({
        success: false,
        message: "Shoe not found",
      });
    }

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

    const itemPrice = shoe.resellPrice;
    const shippingCost = 15;
    const tax = itemPrice * 0.08;
    const totalAmount = itemPrice + shippingCost + tax;

    const orderId = `SC${Date.now().toString().slice(-6)}${Math.random()
      .toString(36)
      .substr(2, 2)
      .toUpperCase()}`;

    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

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

app.post("/api/wishlist/:shoeId", authenticateToken, async (req, res) => {
  try {
    const { shoeId } = req.params;

    const shoe = await Shoe.findById(shoeId);
    if (!shoe) {
      return res.status(404).json({
        success: false,
        message: "Shoe not found",
      });
    }

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

app.post("/api/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide email address",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    let subscription = await Subscription.findOne({ email });

    if (subscription) {
      if (subscription.isActive) {
        return res.status(400).json({
          success: false,
          message: "Email is already subscribed",
        });
      } else {
        subscription.isActive = true;
        subscription.subscribedAt = Date.now();
        await subscription.save();

        return res.json({
          success: true,
          message: "Subscription reactivated successfully",
        });
      }
    }

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

app.get("/api/services/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

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

    if (!customerName || !customerEmail || !customerPhone || !address) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

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

    let estimatedCost = 0;
    const priceMatch = service.price.match(/\d+/);
    if (priceMatch) {
      estimatedCost = parseInt(priceMatch[0]);
    }

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
        : new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      estimatedCost,
      status: "confirmed",
    });

    await booking.save();

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

const cobblerSchema = new mongoose.Schema({
  cobblerId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  hours: {
    type: String,
    required: true,
  },
  services: [
    {
      type: String,
      enum: ["Repair", "Polish", "Custom", "Exchange", "Restoration"],
    },
  ],
  speciality: {
    type: String,
    default: "",
  },
  verified: {
    type: Boolean,
    default: false,
  },
  availableSlots: [
    {
      type: String,
    },
  ],
  images: [
    {
      type: String,
    },
  ],
  totalBookings: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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

cobblerSchema.index({ location: "2dsphere" });

const Cobbler = mongoose.model("Cobbler", cobblerSchema);

const cobblerAppointmentSchema = new mongoose.Schema({
  appointmentId: {
    type: String,
    required: true,
    unique: true,
  },
  cobblerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cobbler",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
  appointmentDate: {
    type: Date,
    required: true,
  },
  appointmentTime: {
    type: String,
    required: true,
  },
  serviceType: {
    type: String,
    required: true,
    enum: ["Repair", "Polish", "Custom", "Exchange", "Restoration"],
  },
  notes: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "in-progress", "completed", "cancelled"],
    default: "confirmed",
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

const CobblerAppointment = mongoose.model(
  "CobblerAppointment",
  cobblerAppointmentSchema
);

const cobblerReviewSchema = new mongoose.Schema({
  cobblerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cobbler",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CobblerAppointment",
  },
  customerName: {
    type: String,
    required: true,
    trim: true,
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

const CobblerReview = mongoose.model("CobblerReview", cobblerReviewSchema);

app.get("/api/products", async (req, res) => {
  try {
    const {
      search,
      brand,
      category,
      minPrice,
      maxPrice,
      sortBy = "featured",
      page = 1,
      limit = 12,
    } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    if (brand) {
      if (Array.isArray(brand)) {
        query.brand = { $in: brand };
      } else if (brand !== "all") {
        query.brand = brand;
      }
    }

    if (category) {
      if (Array.isArray(category)) {
        query.category = { $in: category };
      } else {
        query.category = category;
      }
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

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
      case "featured":
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

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

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

app.get("/api/shop/stats", async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const inStockProducts = await Product.countDocuments({ inStock: true });
    const totalOrders = await ShopOrder.countDocuments();

    const ratingAgg = await Product.aggregate([
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
        },
      },
    ]);

    const averageRating = ratingAgg[0]?.avgRating || 0;

    res.json({
      success: true,
      stats: {
        totalProducts,
        inStockProducts,
        totalOrders,
        averageRating: Number(averageRating), 
      },
    });
  } catch (error) {
    console.error("Get Shop Stats Error:", error);
    res.json({
      success: false,
      message: "Server error fetching statistics",
      error: error.message,
    });
  }
});

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

    const subtotal = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    res.json({
      success: true,
      cart: {
        items: cart.items,
        subtotal: subtotal.toFixed(2),
        itemCount,
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

app.post("/api/cart/add", authenticateToken, async (req, res) => {
  try {
    const { productId, quantity = 1, size, color } = req.body;

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

    let cart = await Cart.findOne({ userId: req.user.userId });

    if (!cart) {
      cart = new Cart({
        userId: req.user.userId,
        items: [],
      });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.size === size &&
        item.color === color
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        productId,
        quantity,
        size: size || "",
        color: color || "",
        price: product.price,
      });
    }

    cart.updatedAt = Date.now();
    await cart.save();
    await cart.populate("items.productId");

    const subtotal = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    res.json({
      success: true,
      message: "Item added to cart",
      cart: {
        items: cart.items,
        subtotal: subtotal.toFixed(2),
        itemCount,
      },
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

app.put("/api/cart/update/:itemId", authenticateToken, async (req, res) => {
  try {
    const { quantity } = req.body;

    const cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const item = cart.items.id(req.params.itemId);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    item.quantity = quantity;
    cart.updatedAt = Date.now();
    await cart.save();
    await cart.populate("items.productId");

    const subtotal = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    res.json({
      success: true,
      cart: { items: cart.items, subtotal: subtotal.toFixed(2), itemCount },
    });
  } catch (error) {
    console.error("Update Cart Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.delete("/api/cart/remove/:itemId", authenticateToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item._id.toString() !== req.params.itemId
    );
    cart.updatedAt = Date.now();
    await cart.save();
    await cart.populate("items.productId");

    const subtotal = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    res.json({
      success: true,
      cart: { items: cart.items, subtotal: subtotal.toFixed(2), itemCount },
    });
  } catch (error) {
    console.error("Remove from Cart Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

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

    if (
      !items ||
      !Array.isArray(items) ||
      items.length === 0 ||
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

    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.productId}`,
        });
      }

      if (!product.inStock) {
        return res.status(400).json({
          success: false,
          message: `Product is out of stock: ${product.name}`,
        });
      }

      if (product.stockQuantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}. Available: ${product.stockQuantity}`,
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

      product.stockQuantity -= item.quantity;
      product.sales += item.quantity;
      if (product.stockQuantity === 0) {
        product.inStock = false;
      }
      await product.save();
    }

    const shippingCost = subtotal > 100 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const totalAmount = subtotal + shippingCost + tax;

    const orderId = `SO${Date.now().toString().slice(-6)}${Math.random()
      .toString(36)
      .substr(2, 2)
      .toUpperCase()}`;

    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

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
      shippingCost: Number(shippingCost.toFixed(2)),
      tax: Number(tax.toFixed(2)),
      totalAmount: Number(totalAmount.toFixed(2)),
      estimatedDelivery,
      status: paymentMethod === "cod" ? "confirmed" : "pending",
      paymentStatus: paymentMethod === "cod" ? "pending" : "pending",
      notes: notes || "",
    });

    await order.save();

    await Cart.findOneAndUpdate(
      { userId: req.user.userId },
      { $set: { items: [], updatedAt: Date.now() } }
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
        paymentStatus: order.paymentStatus,
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

app.get("/api/shop/orders", authenticateToken, async (req, res) => {
  try {
    const orders = await ShopOrder.find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
      .populate("items.productId");

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

app.get("/api/shop/orders/:orderId", authenticateToken, async (req, res) => {
  try {
    const order = await ShopOrder.findOne({ orderId: req.params.orderId })
      .populate("items.productId")
      .populate("userId", "name email");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

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

app.put(
  "/api/shop/orders/:orderId/cancel",
  authenticateToken,
  async (req, res) => {
    try {
      const order = await ShopOrder.findOne({ orderId: req.params.orderId });

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      if (order.userId.toString() !== req.user.userId) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized to cancel this order",
        });
      }

      if (["shipped", "delivered"].includes(order.status)) {
        return res.status(400).json({
          success: false,
          message: "Cannot cancel order that has been shipped or delivered",
        });
      }

      if (order.status === "cancelled") {
        return res.status(400).json({
          success: false,
          message: "Order is already cancelled",
        });
      }

      for (const item of order.items) {
        const product = await Product.findById(item.productId);
        if (product) {
          product.stockQuantity += item.quantity;
          product.sales -= item.quantity;
          product.inStock = true;
          await product.save();
        }
      }

      order.status = "cancelled";
      order.paymentStatus = "refunded";
      order.updatedAt = Date.now();
      await order.save();

      res.json({
        success: true,
        message: "Order cancelled successfully",
        order,
      });
    } catch (error) {
      console.error("Cancel Shop Order Error:", error);
      res.status(500).json({
        success: false,
        message: "Server error cancelling order",
        error: error.message,
      });
    }
  }
);

app.get("/api/cobblers", async (req, res) => {
  try {
    const {
      lat,
      lng,
      maxDistance = 50000, 
      search,
      services,
      verified,
      sortBy = "distance",
      page = 1,
      limit = 50,
    } = req.query;

    let query = { isActive: true };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { address: { $regex: search, $options: "i" } },
        { speciality: { $regex: search, $options: "i" } },
      ];
    }

    if (services) {
      const serviceArray = Array.isArray(services) ? services : [services];
      query.services = { $all: serviceArray };
    }

    if (verified === "true") {
      query.verified = true;
    }

    let cobblers;
    if (lat && lng) {
      const coordinates = [parseFloat(lng), parseFloat(lat)];

      cobblers = await Cobbler.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: coordinates,
            },
            distanceField: "distance",
            maxDistance: parseInt(maxDistance),
            spherical: true,
            query: query,
          },
        },
        {
          $skip: (parseInt(page) - 1) * parseInt(limit),
        },
        {
          $limit: parseInt(limit),
        },
      ]);

      cobblers = cobblers.map((cobbler) => ({
        ...cobbler,
        distance:
          cobbler.distance < 1000
            ? `${Math.round(cobbler.distance)} m`
            : `${(cobbler.distance / 1000).toFixed(1)} km`,
      }));
    } else {
      const skip = (parseInt(page) - 1) * parseInt(limit);
      cobblers = await Cobbler.find(query)
        .skip(skip)
        .limit(parseInt(limit))
        .lean();
    }

    if (sortBy === "rating") {
      cobblers.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "reviews") {
      cobblers.sort((a, b) => b.reviews - a.reviews);
    }

    const total = await Cobbler.countDocuments(query);

    res.json({
      success: true,
      cobblers,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("Get Cobblers Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching cobblers",
      error: error.message,
    });
  }
});

app.get("/api/cobblers/:id", async (req, res) => {
  try {
    const cobbler = await Cobbler.findById(req.params.id);

    if (!cobbler) {
      return res.status(404).json({
        success: false,
        message: "Cobbler not found",
      });
    }

    res.json({
      success: true,
      cobbler,
    });
  } catch (error) {
    console.error("Get Cobbler Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching cobbler",
      error: error.message,
    });
  }
});

app.post("/api/cobblers/:id/book", authenticateToken, async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      appointmentDate,
      appointmentTime,
      serviceType,
      notes,
    } = req.body;

    if (
      !customerName ||
      !customerEmail ||
      !customerPhone ||
      !appointmentDate ||
      !appointmentTime ||
      !serviceType
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const cobbler = await Cobbler.findById(req.params.id);
    if (!cobbler) {
      return res.status(404).json({
        success: false,
        message: "Cobbler not found",
      });
    }

    if (!cobbler.isActive) {
      return res.status(400).json({
        success: false,
        message: "This cobbler is not currently accepting appointments",
      });
    }

    if (!cobbler.services.includes(serviceType)) {
      return res.status(400).json({
        success: false,
        message: "Selected service is not available",
      });
    }

    const appointmentId = `CA${Date.now().toString().slice(-6)}${Math.random()
      .toString(36)
      .substr(2, 2)
      .toUpperCase()}`;

    const appointment = new CobblerAppointment({
      appointmentId,
      cobblerId: req.params.id,
      userId: req.user.userId,
      customerName,
      customerEmail,
      customerPhone,
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      serviceType,
      notes: notes || "",
      status: "confirmed",
    });

    await appointment.save();

    cobbler.totalBookings += 1;
    await cobbler.save();

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment: {
        appointmentId: appointment.appointmentId,
        cobblerName: cobbler.name,
        appointmentDate: appointment.appointmentDate,
        appointmentTime: appointment.appointmentTime,
        serviceType: appointment.serviceType,
        status: appointment.status,
      },
    });
  } catch (error) {
    console.error("Book Appointment Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error booking appointment",
      error: error.message,
    });
  }
});

app.get("/api/cobbler-appointments", authenticateToken, async (req, res) => {
  try {
    const appointments = await CobblerAppointment.find({
      userId: req.user.userId,
    })
      .populate("cobblerId")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error("Get Appointments Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching appointments",
      error: error.message,
    });
  }
});

app.get(
  "/api/cobbler-appointments/:appointmentId",
  authenticateToken,
  async (req, res) => {
    try {
      const appointment = await CobblerAppointment.findOne({
        appointmentId: req.params.appointmentId,
      })
        .populate("cobblerId")
        .populate("userId", "name email phone");

      if (!appointment) {
        return res.status(404).json({
          success: false,
          message: "Appointment not found",
        });
      }

      if (appointment.userId._id.toString() !== req.user.userId) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized to view this appointment",
        });
      }

      res.json({
        success: true,
        appointment,
      });
    } catch (error) {
      console.error("Get Appointment Error:", error);
      res.status(500).json({
        success: false,
        message: "Server error fetching appointment",
        error: error.message,
      });
    }
  }
);

app.put(
  "/api/cobbler-appointments/:appointmentId/cancel",
  authenticateToken,
  async (req, res) => {
    try {
      const appointment = await CobblerAppointment.findOne({
        appointmentId: req.params.appointmentId,
      });

      if (!appointment) {
        return res.status(404).json({
          success: false,
          message: "Appointment not found",
        });
      }

      if (appointment.userId.toString() !== req.user.userId) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized to cancel this appointment",
        });
      }

      if (appointment.status === "cancelled") {
        return res.status(400).json({
          success: false,
          message: "Appointment is already cancelled",
        });
      }

      appointment.status = "cancelled";
      appointment.updatedAt = Date.now();
      await appointment.save();

      res.json({
        success: true,
        message: "Appointment cancelled successfully",
        appointment,
      });
    } catch (error) {
      console.error("Cancel Appointment Error:", error);
      res.status(500).json({
        success: false,
        message: "Server error cancelling appointment",
        error: error.message,
      });
    }
  }
);

app.get("/api/cobblers/stats", async (req, res) => {
  try {
    const totalCobblers = await Cobbler.countDocuments({ isActive: true });
    const verifiedCobblers = await Cobbler.countDocuments({
      isActive: true,
      verified: true,
    });
    const totalAppointments = await CobblerAppointment.countDocuments();
    const completedAppointments = await CobblerAppointment.countDocuments({
      status: "completed",
    });

    const avgRatingResult = await Cobbler.aggregate([
      { $match: { isActive: true, rating: { $gt: 0 } } },
      { $group: { _id: null, avgRating: { $avg: "$rating" } } },
    ]);
    const avgRating =
      avgRatingResult.length > 0 ? avgRatingResult[0].avgRating.toFixed(1) : 0;

    res.json({
      success: true,
      stats: {
        totalCobblers,
        verifiedCobblers,
        totalAppointments,
        completedAppointments,
        averageRating: parseFloat(avgRating),
      },
    });
  } catch (error) {
    console.error("Get Cobbler Stats Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching statistics",
      error: error.message,
    });
  }
});

const pressReleaseSchema = new mongoose.Schema({
  releaseId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  location: {
    type: String,
    default: "Mumbai, India",
  },
  image: {
    type: String,
  },
  tags: [
    {
      type: String,
    },
  ],
  views: {
    type: Number,
    default: 0,
  },
  downloads: {
    type: Number,
    default: 0,
  },
  isPublished: {
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

const PressRelease = mongoose.model("PressRelease", pressReleaseSchema);

const mediaCoverageSchema = new mongoose.Schema({
  coverageId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  publication: {
    type: String,
    required: true,
  },
  publicationLogo: {
    type: String,
  },
  excerpt: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
  },
  quote: {
    type: String,
  },
  author: {
    type: String,
  },
  type: {
    type: String,
    enum: ["article", "interview", "review", "feature"],
    default: "article",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MediaCoverage = mongoose.model("MediaCoverage", mediaCoverageSchema);

const pressKitSchema = new mongoose.Schema({
  kitId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  fileSize: {
    type: String,
    required: true,
  },
  fileCount: {
    type: String,
    required: true,
  },
  downloadUrl: {
    type: String,
    required: true,
  },
  thumbnails: [
    {
      type: String,
    },
  ],
  downloads: {
    type: Number,
    default: 0,
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

const PressKit = mongoose.model("PressKit", pressKitSchema);

const mediaAssetSchema = new mongoose.Schema({
  assetId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["Logo Pack", "Product Images", "Brand Assets", "Videos"],
  },
  description: {
    type: String,
    required: true,
  },
  fileSize: {
    type: String,
    required: true,
  },
  fileCount: {
    type: String,
    required: true,
  },
  downloadUrl: {
    type: String,
    required: true,
  },
  thumbnails: [
    {
      type: String,
    },
  ],
  downloads: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MediaAsset = mongoose.model("MediaAsset", mediaAssetSchema);

const pressContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "blue",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const PressContact = mongoose.model("PressContact", pressContactSchema);

const pressInquirySchema = new mongoose.Schema({
  inquiryId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  organization: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  inquiryType: {
    type: String,
    required: true,
    enum: ["interview", "information", "partnership", "review", "other"],
  },
  message: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "responded", "closed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  respondedAt: {
    type: Date,
  },
});

const PressInquiry = mongoose.model("PressInquiry", pressInquirySchema);

app.get("/api/press/releases", async (req, res) => {
  try {
    const { limit = 50, page = 1 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const releases = await PressRelease.find({ isPublished: true })
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await PressRelease.countDocuments({ isPublished: true });

    res.json({
      success: true,
      releases,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
      },
    });
  } catch (error) {
    console.error("Get Press Releases Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching press releases",
      error: error.message,
    });
  }
});

app.post("/api/press/releases/:releaseId/download", async (req, res) => {
  try {
    const release = await PressRelease.findOne({
      releaseId: req.params.releaseId,
    });

    if (!release) {
      return res.status(404).json({
        success: false,
        message: "Press release not found",
      });
    }

    release.downloads += 1;
    await release.save();

    res.json({
      success: true,
      message: "Download recorded",
    });
  } catch (error) {
    console.error("Download Press Release Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

app.get("/api/press/coverage", async (req, res) => {
  try {
    const { limit = 50, page = 1 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const coverage = await MediaCoverage.find()
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await MediaCoverage.countDocuments();

    res.json({
      success: true,
      coverage,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
      },
    });
  } catch (error) {
    console.error("Get Media Coverage Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching media coverage",
      error: error.message,
    });
  }
});

app.get("/api/press/kits", async (req, res) => {
  try {
    const kits = await PressKit.find({ isActive: true }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      kits,
    });
  } catch (error) {
    console.error("Get Press Kits Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching press kits",
      error: error.message,
    });
  }
});

app.post("/api/press/kits/:kitId/download", async (req, res) => {
  try {
    const kit = await PressKit.findOne({ kitId: req.params.kitId });

    if (!kit) {
      return res.status(404).json({
        success: false,
        message: "Press kit not found",
      });
    }

    kit.downloads += 1;
    await kit.save();

    res.json({
      success: true,
      downloadUrl: kit.downloadUrl,
    });
  } catch (error) {
    console.error("Download Press Kit Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

app.get("/api/press/assets", async (req, res) => {
  try {
    const assets = await MediaAsset.find({ isActive: true }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      assets,
    });
  } catch (error) {
    console.error("Get Media Assets Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching media assets",
      error: error.message,
    });
  }
});

app.post("/api/press/assets/:assetId/download", async (req, res) => {
  try {
    const asset = await MediaAsset.findOne({ assetId: req.params.assetId });

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: "Media asset not found",
      });
    }

    asset.downloads += 1;
    await asset.save();

    res.json({
      success: true,
      downloadUrl: asset.downloadUrl,
    });
  } catch (error) {
    console.error("Download Media Asset Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

app.get("/api/press/contacts", async (req, res) => {
  try {
    const contacts = await PressContact.find({ isActive: true });

    res.json({
      success: true,
      contacts,
    });
  } catch (error) {
    console.error("Get Press Contacts Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching press contacts",
      error: error.message,
    });
  }
});

app.post("/api/press/inquiries", async (req, res) => {
  try {
    const {
      name,
      email,
      organization,
      phoneNumber,
      inquiryType,
      message,
      deadline,
    } = req.body;

    if (!name || !email || !organization || !inquiryType || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    const inquiryId = `PI${Date.now().toString().slice(-6)}${Math.random()
      .toString(36)
      .substr(2, 2)
      .toUpperCase()}`;

    const inquiry = new PressInquiry({
      inquiryId,
      name,
      email,
      organization,
      phoneNumber: phoneNumber || "",
      inquiryType,
      message,
      deadline: deadline ? new Date(deadline) : null,
    });

    await inquiry.save();

    res.status(201).json({
      success: true,
      message: "Press inquiry submitted successfully",
      inquiry: {
        inquiryId: inquiry.inquiryId,
        status: inquiry.status,
      },
    });
  } catch (error) {
    console.error("Submit Press Inquiry Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error submitting inquiry",
      error: error.message,
    });
  }
});


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});


app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Local: http://localhost:${PORT}`);
  console.log(`🖼️  Images: http://localhost:${PORT}/images/`);
});

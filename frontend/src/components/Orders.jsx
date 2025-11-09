import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Search, 
  Filter, 
  ChevronDown,
  Calendar,
  MapPin,
  DollarSign,
  Eye,
  Download,
  RefreshCw,
  ShoppingBag,
  AlertCircle,
  Wrench,
  Palette,
  ArrowLeftRight,
  Layers
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';

// Configure axios
const API_BASE_URL = 'http://localhost:5000';
axios.defaults.baseURL = API_BASE_URL;

// Add token to requests if available
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

// Status badge component with color indicators
const StatusBadge = ({ status }) => {
  const getStatusConfig = useCallback((status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return {
          icon: Clock,
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/30',
          text: 'text-amber-400',
          dot: 'bg-amber-400'
        };
      case 'confirmed':
      case 'processing':
        return {
          icon: RefreshCw,
          bg: 'bg-blue-500/10',
          border: 'border-blue-500/30',
          text: 'text-blue-400',
          dot: 'bg-blue-400'
        };
      case 'in-progress':
        return {
          icon: Wrench,
          bg: 'bg-orange-500/10',
          border: 'border-orange-500/30',
          text: 'text-orange-400',
          dot: 'bg-orange-400'
        };
      case 'shipped':
        return {
          icon: Truck,
          bg: 'bg-purple-500/10',
          border: 'border-purple-500/30',
          text: 'text-purple-400',
          dot: 'bg-purple-400'
        };
      case 'delivered':
      case 'completed':
        return {
          icon: CheckCircle,
          bg: 'bg-green-500/10',
          border: 'border-green-500/30',
          text: 'text-green-400',
          dot: 'bg-green-400'
        };
      case 'cancelled':
        return {
          icon: XCircle,
          bg: 'bg-red-500/10',
          border: 'border-red-500/30',
          text: 'text-red-400',
          dot: 'bg-red-400'
        };
      default:
        return {
          icon: Package,
          bg: 'bg-gray-500/10',
          border: 'border-gray-500/30',
          text: 'text-gray-400',
          dot: 'bg-gray-400'
        };
    }
  }, []);

  const config = useMemo(() => getStatusConfig(status), [status, getStatusConfig]);
  const Icon = config.icon;
  const shouldPulse = ['pending', 'processing', 'confirmed', 'in-progress'].includes(status?.toLowerCase());

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${config.bg} border ${config.border}`}>
      <div className="relative flex items-center justify-center">
        <div className={`w-2 h-2 rounded-full ${config.dot}`} />
        {shouldPulse && (
          <span className={`absolute inline-flex h-full w-full rounded-full ${config.dot} opacity-75 animate-ping`} />
        )}
      </div>
      <Icon className={`w-4 h-4 ${config.text}`} />
      <span className={`text-sm font-medium ${config.text} capitalize`}>
        {status || 'Unknown'}
      </span>
    </div>
  );
};

// Order Type Badge
const OrderTypeBadge = ({ type }) => {
  const getTypeConfig = useCallback((type) => {
    switch (type) {
      case 'shop':
        return {
          icon: ShoppingBag,
          label: 'Shop',
          bg: 'bg-blue-500/10',
          border: 'border-blue-500/30',
          text: 'text-blue-400'
        };
      case 'resell':
        return {
          icon: ArrowLeftRight,
          label: 'Resell',
          bg: 'bg-purple-500/10',
          border: 'border-purple-500/30',
          text: 'text-purple-400'
        };
      case 'service':
        return {
          icon: Wrench,
          label: 'Service',
          bg: 'bg-orange-500/10',
          border: 'border-orange-500/30',
          text: 'text-orange-400'
        };
      case 'custom':
        return {
          icon: Palette,
          label: 'Custom',
          bg: 'bg-pink-500/10',
          border: 'border-pink-500/30',
          text: 'text-pink-400'
        };
      default:
        return {
          icon: Package,
          label: 'Order',
          bg: 'bg-gray-500/10',
          border: 'border-gray-500/30',
          text: 'text-gray-400'
        };
    }
  }, []);

  const config = useMemo(() => getTypeConfig(type), [type, getTypeConfig]);
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md ${config.bg} border ${config.border}`}>
      <Icon className={`w-3.5 h-3.5 ${config.text}`} />
      <span className={`text-xs font-medium ${config.text}`}>
        {config.label}
      </span>
    </div>
  );
};

// Order Card Component - Memoized
const OrderCard = ({ order, onViewDetails }) => {
  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }, []);

  const getOrderType = useCallback(() => {
    if (order.orderId?.startsWith('SO')) return 'shop';
    if (order.orderId?.startsWith('SC')) return 'resell';
    if (order.bookingId?.startsWith('SB')) return 'service';
    return 'order';
  }, [order.orderId, order.bookingId]);

  const orderType = useMemo(() => getOrderType(), [getOrderType]);
  const displayId = order.orderId || order.bookingId;
  const itemCount = order.items?.length || (order.serviceId ? 1 : 0);

  return (
    <motion.div
      variants={itemVariants}
      layout
      className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden hover:border-amber-500/50 transition-colors duration-200 shadow-xl"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h3 className="text-xl font-bold text-white">{displayId}</h3>
              <OrderTypeBadge type={orderType} />
              <StatusBadge status={order.status} />
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400 flex-wrap">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(order.createdAt)}
              </span>
              {itemCount > 0 && (
                <span className="flex items-center gap-1">
                  <Package className="w-4 h-4" />
                  {itemCount} item{itemCount !== 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>
          <div className="text-right ml-4">
            <p className="text-sm text-gray-400 mb-1">Total</p>
            <p className="text-2xl font-bold text-amber-400">
              ${(order.totalAmount || order.estimatedCost || 0).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Order Items Preview - Shop & Resell Orders */}
        {order.items && order.items.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {order.items.slice(0, 4).map((item, index) => (
                <div key={`${order._id}-item-${index}`} className="flex-shrink-0">
                  <img
                    src={`${API_BASE_URL}${item.image}`}
                    alt={item.name || 'Product'}
                    className="w-16 h-16 object-cover rounded-lg border-2 border-gray-700"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `${API_BASE_URL}/images/placeholder.jpg`;
                    }}
                  />
                </div>
              ))}
              {order.items.length > 4 && (
                <div className="flex-shrink-0 w-16 h-16 bg-gray-900 rounded-lg border-2 border-gray-700 flex items-center justify-center">
                  <span className="text-sm font-bold text-gray-400">
                    +{order.items.length - 4}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Service Details */}
        {order.serviceId && (
          <div className="mb-4 p-3 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500/10 p-2 rounded-lg border border-orange-500/20">
                <Wrench className="w-5 h-5 text-orange-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-400 mb-1">Service</p>
                <p className="text-white font-medium truncate">{order.serviceId?.title || 'Service Booking'}</p>
                {order.scheduledDate && (
                  <p className="text-xs text-gray-500 mt-1">
                    Scheduled: {formatDate(order.scheduledDate)}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Delivery/Address Info */}
        {(order.shippingAddress || order.address) && (
          <div className="mb-4 p-3 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 mb-1">
                  {orderType === 'service' ? 'Service Address' : 'Shipping Address'}
                </p>
                <p className="text-sm text-gray-300 line-clamp-2">
                  {order.shippingAddress || order.address}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => onViewDetails(order)}
            className="flex-1 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 rounded-xl font-bold transition-colors duration-200 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
          
          {['delivered', 'completed'].includes(order.status?.toLowerCase()) && (
            <button
              className="px-4 py-2.5 bg-gray-900 text-gray-300 hover:text-white border border-gray-700 hover:border-gray-600 rounded-xl font-bold transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Order Details Modal
const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getOrderType = () => {
    if (order.orderId?.startsWith('SO')) return 'shop';
    if (order.orderId?.startsWith('SC')) return 'resell';
    if (order.bookingId?.startsWith('SB')) return 'service';
    return 'order';
  };

  const orderType = getOrderType();
  const displayId = order.orderId || order.bookingId;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-gray-800 rounded-2xl border border-gray-700 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-white">Order Details</h2>
              <OrderTypeBadge type={orderType} />
            </div>
            <p className="text-gray-400">{displayId}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <XCircle className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status and Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
              <p className="text-sm text-gray-400 mb-2">Order Status</p>
              <StatusBadge status={order.status} />
            </div>
            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
              <p className="text-sm text-gray-400 mb-2">Order Date</p>
              <p className="text-white font-medium">{formatDate(order.createdAt)}</p>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Package className="w-5 h-5 text-amber-400" />
              Customer Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400 mb-1">Name</p>
                <p className="text-white font-medium">
                  {order.customerName || order.buyerName || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Email</p>
                <p className="text-white font-medium break-all">
                  {order.customerEmail || order.buyerEmail || 'N/A'}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-400 mb-1">Phone</p>
                <p className="text-white font-medium">
                  {order.customerPhone || order.buyerPhone || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Service-Specific Details */}
          {orderType === 'service' && order.shoeDetails && (
            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-400" />
                Shoe Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {order.shoeDetails.brand && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Brand</p>
                    <p className="text-white font-medium">{order.shoeDetails.brand}</p>
                  </div>
                )}
                {order.shoeDetails.model && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Model</p>
                    <p className="text-white font-medium">{order.shoeDetails.model}</p>
                  </div>
                )}
                {order.shoeDetails.size && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Size</p>
                    <p className="text-white font-medium">{order.shoeDetails.size}</p>
                  </div>
                )}
                {order.shoeDetails.condition && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Condition</p>
                    <p className="text-white font-medium">{order.shoeDetails.condition}</p>
                  </div>
                )}
              </div>
              {order.specialInstructions && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <p className="text-sm text-gray-400 mb-2">Special Instructions</p>
                  <p className="text-gray-300">{order.specialInstructions}</p>
                </div>
              )}
            </div>
          )}

          {/* Shipping/Service Address */}
          {(order.shippingAddress || order.address) && (
            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400" />
                {orderType === 'service' ? 'Service Address' : 'Shipping Address'}
              </h3>
              <p className="text-gray-300">{order.shippingAddress || order.address}</p>
            </div>
          )}

          {/* Order Items - For Shop & Resell */}
          {order.items && order.items.length > 0 && (
            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                Order Items
              </h3>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div
                    key={`${order._id}-detail-item-${index}`}
                    className="flex items-center gap-4 p-3 bg-gray-800 rounded-lg border border-gray-700"
                  >
                    <img
                      src={`${API_BASE_URL}${item.image}`}
                      alt={item.name || 'Product'}
                      className="w-20 h-20 object-cover rounded-lg border-2 border-amber-400/30"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `${API_BASE_URL}/images/placeholder.jpg`;
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white mb-1 truncate">
                        {item.name || 'Product'}
                      </h4>
                      <p className="text-sm text-gray-400 mb-2">
                        {item.brand || 'Brand'}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
                        {item.size && (
                          <span className="bg-gray-900 px-2 py-1 rounded border border-gray-700">
                            Size: {item.size}
                          </span>
                        )}
                        {item.color && (
                          <span className="bg-gray-900 px-2 py-1 rounded border border-gray-700">
                            Color: {item.color}
                          </span>
                        )}
                        <span className="bg-gray-900 px-2 py-1 rounded border border-gray-700">
                          Qty: {item.quantity || 1}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Price</p>
                      <p className="text-lg font-bold text-amber-400">
                        ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payment Summary */}
          <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-amber-400" />
              Payment Summary
            </h3>
            <div className="space-y-3">
              {order.subtotal && (
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
              )}
              {order.itemPrice && (
                <div className="flex justify-between text-gray-300">
                  <span>Item Price</span>
                  <span>${order.itemPrice.toFixed(2)}</span>
                </div>
              )}
              {order.shippingCost !== undefined && (
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span>${(order.shippingCost || 0).toFixed(2)}</span>
                </div>
              )}
              {order.tax !== undefined && (
                <div className="flex justify-between text-gray-300">
                  <span>Tax</span>
                  <span>${(order.tax || 0).toFixed(2)}</span>
                </div>
              )}
              <div className="pt-3 border-t border-gray-700 flex justify-between items-center">
                <span className="text-lg font-bold text-white">Total</span>
                <span className="text-2xl font-bold text-amber-400">
                  ${(order.totalAmount || order.estimatedCost || 0).toFixed(2)}
                </span>
              </div>
              {order.paymentMethod && (
                <div className="pt-3 border-t border-gray-700">
                  <p className="text-sm text-gray-400">Payment Method</p>
                  <p className="text-white font-medium capitalize">{order.paymentMethod.replace('-', ' ')}</p>
                </div>
              )}
              {order.paymentStatus && (
                <div>
                  <p className="text-sm text-gray-400">Payment Status</p>
                  <p className={`text-white font-medium capitalize ${
                    order.paymentStatus === 'paid' ? 'text-green-400' : 
                    order.paymentStatus === 'pending' ? 'text-amber-400' : 'text-red-400'
                  }`}>
                    {order.paymentStatus}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Delivery/Service Timeline */}
          {(order.estimatedDelivery || order.scheduledDate) && (
            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Truck className="w-5 h-5 text-amber-400" />
                {orderType === 'service' ? 'Service Schedule' : 'Delivery Information'}
              </h3>
              {order.estimatedDelivery && (
                <div className="mb-3">
                  <p className="text-sm text-gray-400 mb-1">Estimated Delivery</p>
                  <p className="text-white font-medium">
                    {new Date(order.estimatedDelivery).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              )}
              {order.scheduledDate && (
                <div className="mb-3">
                  <p className="text-sm text-gray-400 mb-1">Scheduled Date</p>
                  <p className="text-white font-medium">
                    {new Date(order.scheduledDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              )}
              {order.trackingNumber && (
                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <p className="text-sm text-gray-400 mb-1">Tracking Number</p>
                  <p className="text-blue-400 font-mono font-medium break-all">{order.trackingNumber}</p>
                </div>
              )}
            </div>
          )}

          {/* Notes */}
          {order.notes && (
            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-3">Notes</h3>
              <p className="text-gray-300">{order.notes}</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-gray-800 border-t border-gray-700 p-6 flex gap-3">
          <button
            className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 rounded-xl font-bold transition-colors duration-200 shadow-lg shadow-amber-500/20"
          >
            Download Invoice
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-900 text-gray-300 hover:text-white border border-gray-700 hover:border-gray-600 rounded-xl font-bold transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Orders() {
  const navigate = useNavigate();
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to view your orders');
      setLoading(false);
      return;
    }
    fetchAllOrders();
  }, []);

  const fetchAllOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to view your orders');
        setLoading(false);
        return;
      }
      
      const [shopResponse, resellResponse, serviceResponse] = await Promise.all([
        axios.get('/api/shop/orders').catch(() => ({ data: { success: false, orders: [] } })),
        axios.get('/api/orders').catch(() => ({ data: { success: false, orders: [] } })),
        axios.get('/api/service-bookings').catch(() => ({ data: { success: false, bookings: [] } }))
      ]);

      const combinedOrders = [
        ...(shopResponse.data.orders || []),
        ...(resellResponse.data.orders || []),
        ...(serviceResponse.data.bookings || [])
      ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setAllOrders(combinedOrders);
    } catch (err) {
      console.error('Error fetching orders:', err);
      if (err.response?.status === 401) {
        setError('Please log in to view your orders');
        localStorage.removeItem('token');
      } else {
        setError('Failed to load orders. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredOrders = useMemo(() => {
    if (allOrders.length === 0) return [];

    let filtered = [...allOrders];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(order => {
        const id = order.orderId || order.bookingId || '';
        const name = order.customerName || order.buyerName || '';
        const email = order.customerEmail || order.buyerEmail || '';
        
        return id.toLowerCase().includes(query) ||
               name.toLowerCase().includes(query) ||
               email.toLowerCase().includes(query);
      });
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(order => {
        if (typeFilter === 'shop') return order.orderId?.startsWith('SO');
        if (typeFilter === 'resell') return order.orderId?.startsWith('SC');
        if (typeFilter === 'service') return order.bookingId?.startsWith('SB');
        return true;
      });
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order =>
        order.status?.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    return filtered;
  }, [allOrders, searchQuery, statusFilter, typeFilter]);

  const handleViewDetails = useCallback((order) => {
    setSelectedOrder(order);
  }, []);

  const statusOptions = useMemo(() => [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'processing', label: 'Processing' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ], []);

  const typeOptions = useMemo(() => [
    { value: 'all', label: 'All Types', icon: Package },
    { value: 'shop', label: 'Shop', icon: ShoppingBag },
    { value: 'resell', label: 'Resell', icon: ArrowLeftRight },
    { value: 'service', label: 'Services', icon: Wrench }
  ], []);

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen font-sans">
      <Navbar />

      <div className="pt-24 md:pt-28">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
              My Orders
              <div className="h-1.5 w-44 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mt-2" />
            </h1>
            <p className="text-gray-400 mt-3">
              Track and manage all your orders in one place
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search by order ID, name, or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Type Filter */}
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                  {typeOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.value}
                        onClick={() => setTypeFilter(option.value)}
                        className={`px-4 py-2.5 rounded-xl font-medium transition-colors duration-200 whitespace-nowrap flex items-center gap-2 ${
                          typeFilter === option.value
                            ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900'
                            : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-700'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{option.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Status Filter Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="w-full md:w-auto px-6 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-300 hover:text-white hover:border-gray-600 transition-colors duration-200 flex items-center justify-between gap-3 min-w-[200px]"
                  >
                    <div className="flex items-center gap-2">
                      <Filter className="w-5 h-5" />
                      <span className="font-medium">
                        {statusOptions.find(opt => opt.value === statusFilter)?.label || 'Filter'}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {showFilters && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-full md:w-64 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-10 overflow-hidden"
                      >
                        {statusOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setStatusFilter(option.value);
                              setShowFilters(false);
                            }}
                            className={`w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors ${
                              statusFilter === option.value
                                ? 'bg-amber-500/10 text-amber-400 font-medium'
                                : 'text-gray-300'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Refresh Button */}
                <button
                  onClick={fetchAllOrders}
                  className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-300 hover:text-white hover:border-gray-600 transition-colors duration-200"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Orders List */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : error ? (
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 text-center">
              <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-red-400 mb-2">
                {error.includes('log in') ? 'Authentication Required' : 'Error Loading Orders'}
              </h3>
              <p className="text-gray-400 mb-4">{error}</p>
              <div className="flex gap-3 justify-center">
                {error.includes('log in') ? (
                  <button
                    onClick={() => navigate('/login')}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-gray-900 rounded-xl font-bold transition-colors duration-200"
                  >
                    Log In
                  </button>
                ) : (
                  <button
                    onClick={fetchAllOrders}
                    className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-colors duration-200"
                  >
                    Try Again
                  </button>
                )}
              </div>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-12 text-center">
              <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No Orders Found</h3>
              <p className="text-gray-400 mb-6">
                {searchQuery || statusFilter !== 'all' || typeFilter !== 'all'
                  ? "Try adjusting your search or filters"
                  : "You haven't placed any orders yet"}
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Link to="/shop">
                  <button className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 rounded-xl font-bold transition-colors duration-200 shadow-lg shadow-amber-500/20">
                    Visit Shop
                  </button>
                </Link>
                <Link to="/resell">
                  <button className="px-8 py-3 bg-gray-900 text-gray-300 hover:text-white border border-gray-700 hover:border-gray-600 rounded-xl font-bold transition-colors duration-200">
                    Browse Resell
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {filteredOrders.map((order) => (
                <OrderCard
                  key={order._id}
                  order={order}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </motion.div>
          )}

          {/* Results Count */}
          {!loading && !error && filteredOrders.length > 0 && (
            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Showing <span className="text-amber-400 font-bold">{filteredOrders.length}</span> of{' '}
                <span className="text-white font-bold">{allOrders.length}</span> orders
              </p>
            </div>
          )}
        </main>
      </div>

      <Footer />

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <OrderDetailsModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
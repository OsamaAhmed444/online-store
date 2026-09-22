import { Routes, Route } from 'react-router-dom'

import ProtectedRoute from './ProtectedRoute'
import GuestRoute from './GuestRoute'

import HomePage from '../pages/HomePage'
import ProductsPage from '../pages/ProductsPage'
import ProductDetailPage from '../pages/ProductDetailPage'
import CartPage from '../pages/CartPage'
import WishlistPage from '../pages/WishlistPage'
import CheckoutPage from '../pages/CheckoutPage'
import PaymentPage from '../pages/PaymentPage'
import OrderSuccessPage from '../pages/OrderSuccessPage'
import MyOrdersPage from '../pages/MyOrdersPage'
import OrderDetailPage from '../pages/OrderDetailPage'
import ProfilePage from '../pages/ProfilePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import VerifyOtpPage from '../pages/VerifyOtpPage'
import ForgotPasswordPage from '../pages/ForgotPasswordPage'
import ResetPasswordPage from '../pages/ResetPasswordPage'
import Team from '../pages/Team'

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<HomePage />} />
      <Route path="/Home" element={<HomePage />} />
      <Route path="/team" element={<Team />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />

      {/* Guest only */}
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/orders" element={<MyOrdersPage />} />
        <Route path="/orders/:id" element={<OrderDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes

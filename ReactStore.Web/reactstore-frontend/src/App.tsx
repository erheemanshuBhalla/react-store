import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductSearch from "./pages/ProductSearch";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCategories from "./pages/admin/AdminCategories";
import MyOrders from "./pages/MyOrders";
import AuthGuard from "./auth/AuthGuard";
import OrderDetailsPage from "./pages/OrderDetails";
import Checkout from "./pages/checkout";
import Navbar from "./components/Navbar";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCategoryForm from "./pages/admin/AdminCategoryForm";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProductForm from "./pages/admin/AdminProductForm";
import AdminRoute from "./pages/admin/AdminRoute";

export default function App() {
  return (
    
    <BrowserRouter>
    <Navbar />
    {/* 🔐 ADMIN ROUTES */}
    
      <Routes>
          <Route path="/admin" element={<AdminRoute />}>
        <Route element={<AdminLayout />}>

          <Route index element={<AdminDashboard />} />

          <Route path="products" element={<AdminProducts />} />
          <Route path="products/create" element={<AdminProductForm />} />
          <Route path="products/edit/:id" element={<AdminProductForm />} />

          <Route path="categories" element={<AdminCategories />} />
          <Route path="categories/create" element={<AdminCategoryForm />} />
          <Route path="categories/edit/:id" element={<AdminCategoryForm />} />

          <Route path="orders" element={<AdminOrders />} />
          

        </Route>
      </Route>
        <Route path="/" element={<ProductSearch />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/orders" element={
          <AuthGuard>
            <MyOrders />
          </AuthGuard>
        } />

     
        <Route path="/orders/:id" element={
  <AuthGuard>
    <OrderDetailsPage />
  </AuthGuard>
} />

<Route path="/checkout" element={
  <AuthGuard>
    <Checkout />
  </AuthGuard>
} />
<Route path="/cart" element={<CartPage />} />
<Route path="/checkout" element={<CheckoutPage />} />

      </Routes>
    </BrowserRouter>
  );
}

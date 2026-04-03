import { Route } from "react-router-dom";
import EcommerceLayout from "./EcommerceLayout";

import Home from './pages/home'
import AllProduct from './pages/allproduct'
import Product from './pages/product'
import Helpform from './components/helpform'
import Checkout from './components/checkout'
import CheckoutFinal from './components/checkoutfinal'
import LoginPage from './pages/Login'
import Signup from './pages/Signup'
import Terms from './pages/Termscondition'
import ReturnPolicy from './pages/returnpolicy'
import CompliancePolicy from './pages/compliancepolicy'
import PrivacyPolicy from './pages/privacypolicy'
import ShippingPolicy from './pages/shippingpolicy'
import ProfilePage from './pages/profilepage'
import CategoryProducts from './pages/categoryproduct'
import DisclaimerPolicy from './pages/sellerdisclamir'


export default function EcommerceRoutes() {
  return (
    <Route path="/" element={<EcommerceLayout />}>
  <Route index element={<Home />} />
  <Route path="login" element={<LoginPage />} />
  <Route path="signup" element={<Signup />} />
  <Route path="home" element={<Home />} />
  <Route path="allproduct" element={<AllProduct />} />
  <Route path="product" element={<Product />} />
  <Route path="product/:id" element={<Product />} />
  <Route path="helpform" element={<Helpform />} />
  <Route path="checkout" element={<Checkout />} />
  <Route path="checkoutfinal" element={<CheckoutFinal />} />

  <Route path="terms" element={<Terms />} />
  <Route path="returnpolicy" element={<ReturnPolicy />} />
  <Route path="compliancepolicy" element={<CompliancePolicy />} />
  <Route path="privacypolicy" element={<PrivacyPolicy />} />
  <Route path="shippingpolicy" element={<ShippingPolicy />} />
  <Route path="profile" element={<ProfilePage />} />
  <Route path="category/:id" element={<CategoryProducts />} />
  <Route path="sellerdisclaimer" element={<DisclaimerPolicy />} />
</Route>
  );
}

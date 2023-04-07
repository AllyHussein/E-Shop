import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Components/Utility/Footer";
import NavBarLogin from "./Components/Utility/NavbarLogin";
import AdminAddBrandPage from "./Pages/Admin/AdminAddBrandPage";
import AdminAddCategoryPage from "./Pages/Admin/AdminAddCategoryPage";
import AdminAddProductPage from "./Pages/Admin/AdminAddProductPage";
import AdminAddSubCategoryPage from "./Pages/Admin/AdminAddSubCategoryPage";
import AdminAllOrdersPage from "./Pages/Admin/AdminAllOrdersPage";
import AdminAllProductsPage from "./Pages/Admin/AdminAllProductsPage";
import AdminOrderDetailsPage from "./Pages/Admin/AdminOrderDetailsPage";
import LoginPage from "./Pages/Auth/LoginPage";
import Rigester from "./Pages/Auth/RegisterPage";
import AllBrandPage from "./Pages/Brand/AllBrandPage";
import CartPage from "./Pages/Cart/CartPage";
import AllCategoryPage from "./Pages/Category/AllCategoryPage";
import ChoosePayMethoudPage from "./Pages/Checkout/ChoosePayMethodPage";
import HomePage from "./Pages/Home/HomePage";
import ProductDetalisPage from "./Pages/Products/ProductDetailsPage";
import ShopProducsPage from "./Pages/Products/ShopProductsPage";
import UserAddAddressPage from "./Pages/User/UserAddAdressPage";
import UserAllAddressPage from "./Pages/User/UserAllAdressesPage";
import UserAllOrdersPage from "./Pages/User/UserAllOrdersPage";
import UserEditAddressPage from "./Pages/User/UserEditAddressPage";
import UserFavoriteProductPage from "./Pages/User/UserFavouriteProductsPage";
import UserProfilePage from "./Pages/User/UserProfilePage";


function App() {
  return (
    <div >
      <NavBarLogin />
      <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Rigester />} />
        <Route path="/allcategories" element={<AllCategoryPage />} />
        <Route path="/allbrands" element={<AllBrandPage />} />
        <Route path="/products" element={<ShopProducsPage />} />
        <Route path="/products/:id" element={<ProductDetalisPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order/paymethod" element={<ChoosePayMethoudPage />} />
        <Route path="/admin/allproducts" element={<AdminAllProductsPage />} />
        <Route path="/admin/allorders" element={<AdminAllOrdersPage />} />
        <Route path="/admin/orders/:id" element={<AdminOrderDetailsPage />} />
        <Route path="/admin/addbrand" element={<AdminAddBrandPage />} />
        <Route path="/admin/addcategory" element={<AdminAddCategoryPage />} />
        <Route path="/admin/addsubcategory" element={<AdminAddSubCategoryPage />} />
        <Route path="/admin/addproducts" element={<AdminAddProductPage />} />
        <Route path="/user/allorders" element={<UserAllOrdersPage />} />
        <Route path="/user/favourite" element={<UserFavoriteProductPage />} />
        <Route path="/user/addresses" element={<UserAllAddressPage />} />
        <Route path="/user/add-address" element={<UserAddAddressPage />} />
        <Route path="/user/edit-address" element={<UserEditAddressPage />} />
        <Route path="/user/profile" element={<UserProfilePage/>} />
      </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./component/user/common/Navbar.jsx";
import ScrollToTop from "./component/user/common/ScrollToTop.jsx";
import Search from "./component/user/search/Search.jsx";
import HomeUser from "./component/user/home/Home.jsx";
import Discussion from "./component/user/discussion/Discussion.jsx";
import Mylist from "./component/user/mylist/Mylist.jsx";
import Merch from "./component/user/merch/Merch.jsx";
import ProfileUser from "./component/user/profile/ProfilePage.jsx";
import Cart from "./component/user/merch/Cart.jsx";
import UserOrder from "./component/user/merch/UserOrder.jsx";
import ProductSection from "./component/user/merch/ProductSection.jsx";
import ProductDetails from "./component/user/merch/ProductDetails.jsx";
import MovieDetailsPage from "./component/user/movie/MovieDetailsPage.jsx";
import CompanySection from "./component/user/company/CompanySection.jsx";
import CompanyDetailsPage from "./component/user/company/CompanyDetailsPage.jsx";

import LayoutUser from "./component/Layout/LayoutUser.jsx";
import LayoutAdmin from "./component/Layout/LayoutAdmin.jsx";
import LayoutCompany from "./component/Layout/LayoutCompany.jsx";
import LayoutMerch from "./component/Layout/LayoutMerch.jsx";

import HomeAdmin from "./component/admin/home/Home.jsx";
import UserList from "./component/admin/user/UserList.jsx";
import CompanyList from "./component/admin/company/CompanyList.jsx";
import MerchandiserList from "./component/admin/merch/MerchandiserList.jsx";
import AddRole from "./component/admin/role/AddRole.jsx";
import ViewRole from "./component/admin/role/ViewRole.jsx";
import ProfileAdmin from "./component/admin/profile/ProfilePage.jsx";

import HomeCompany from "./component/company/home/Home.jsx";
import MediaForm from "./component/company/mediaform/MediaForm.jsx";
import CompanyMovieDetailsPage from "./component/company/movie/MovieDetailsPage.jsx";
import CompanyCollaborate from "./component/company/collaborate/CompanyCollaborate.jsx";
import CollabDetailsCompany from "./component/company/collaborate/CollabDetails.jsx";
import ProfileCompany from "./component/company/profile/ProfilePage.jsx";

import HomeMerch from "./component/merch/home/Home.jsx";
import ProfileMerch from "./component/merch/profile/ProfilePage.jsx";
import ProductForm from "./component/merch/addproductform/ProductForm.jsx";
import MerchandiserCollaborate from "./component/merch/collaborate/MerchandiserCollaborate.jsx";
import CollabDetailsMerch from "./component/merch/collaborate/CollabDetails.jsx";
import MerchProductDetailsPage from "./component/merch/product/ProductDetails.jsx";
import MerchOrder from "./component/merch/order/MerchOrder.jsx";

import Login from "./component/Login.jsx";
import Registration from "./component/Registration/Registration.jsx";
import CompanyRegistration from "./component/Registration/CompanyRegistration.jsx";
import MerchandiserRegistration from "./component/Registration/MerchandiserRegistration.jsx";
import UserRegistration from "./component/Registration/UserRegistration.jsx";

import "./App.css";

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleCancelItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleAddToCart = (product) => {
    alert("Item added to cart!");
    setCartItems([...cartItems, product]);
  };

  const handleConfirmOrder = () => {
    alert("Order confirmed!");
    setCartItems([]);
  };

  const [userType, setUserType] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_Id");
    const storedUserType = localStorage.getItem("userType");
    const storedUsername = localStorage.getItem("username");
    setUserType(storedUserType);
    setUsername(storedUsername);

    console.log(
      "userType:------------------",
      localStorage.getItem("userType")
    );
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="container">
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Login setUserType={setUserType} />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/registration/user" element={<UserRegistration />} />
          <Route
            path="/registration/company"
            element={<CompanyRegistration />}
          />
          <Route
            path="/registration/merchandiser"
            element={<MerchandiserRegistration />}
          />

          {/* Protected routes based on user type */}
          {userType === "user" && (
            <Route element={<LayoutUser />}>
              {/* User-specific routes */}
              <Route path="/:username/home" element={<HomeUser />} />
              <Route path="/:username/search" element={<Search />} />
              <Route path="/:username/discussion" element={<Discussion />} />
              <Route path="/:username/mylist" element={<Mylist />} />
              {/* <Route path="/:username/merch" element={<Merch products={products} />} /> */}
              <Route path="/:username/profile" element={<ProfileUser />} />
              <Route path="/:username/merch/cart" element={<Cart />} />
              <Route path="/:username/merch/order" element={<UserOrder />} />
              <Route path="/:username/merch" element={<ProductSection />} />
              <Route
                path="/:username/product/:productId"
                element={<ProductDetails />}
              />
              <Route
                path="/:username/media/:mediaID"
                element={<MovieDetailsPage />}
              />
              <Route path="/:username/company" element={<CompanySection />} />
              <Route
                path="/:username/company/:companyID"
                element={<CompanyDetailsPage />}
              />

              {/* /:movieId */}
            </Route>
          )}

          {userType === "admin" && (
            <Route element={<LayoutAdmin />}>
              <Route path="/:username/home" element={<HomeAdmin />} />
              <Route path="/:username/userlist" element={<UserList />} />
              <Route path="/:username/companylist" element={<CompanyList />} />
              <Route
                path="/:username/merchandiserlist"
                element={<MerchandiserList />}
              />
              <Route path="/:username/addrole" element={<AddRole />} />
              <Route path="/:username/viewrole" element={<ViewRole />} />
              <Route path="/:username/profile" element={<ProfileAdmin />} />
            </Route>
          )}

          {userType === "merchandiser" && (
            <Route element={<LayoutMerch />}>
              <Route path="/:username/home" element={<HomeMerch />} />
              <Route path="/:username/profile" element={<ProfileMerch />} />
              <Route path="/:username/productform" element={<ProductForm />} />
              <Route
                path="/merchandiser/:username/product/:productID"
                element={<MerchProductDetailsPage />}
              />
              <Route
                path="/:username/merchandiser/collaborate"
                element={<MerchandiserCollaborate />}
              />
              <Route
                path="/:username/merchandiser/collaborate/details/:com_id"
                element={<CollabDetailsMerch />}
              />
              <Route
                path="/:username/merchandiser/orders"
                element={<MerchOrder />}
              />
            </Route>
          )}

          {userType === "company" && (
            <Route element={<LayoutCompany />}>
              <Route path="/:username/home" element={<HomeCompany />} />
              <Route path="/:username/mediaform" element={<MediaForm />} />
              <Route path="/:username/profile" element={<ProfileCompany />} />
              <Route
                path="/company/:username/media/:mediaID"
                element={<CompanyMovieDetailsPage />}
              />
              <Route
                path="/:username/company/collaborate"
                element={<CompanyCollaborate />}
              />
              <Route
                path="/:username/company/collaborate/details/:mer_id"
                element={<CollabDetailsCompany />}
              />
            </Route>
          )}
          {/* Fallback route if userType is not set */}
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

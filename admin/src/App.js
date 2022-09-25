import "./style/dark.scss";
import ProtectedRoutes from "./ProtectedRoutes";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import NewUser from "./pages/newUser/NewUser";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const admin = JSON.parse(localStorage.getItem("user"))?.isAdmin;
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route
            element={admin ? <Navigate exact to="/" /> : <Login />}
            path="/login"
          />
          <Route element={<ProtectedRoutes />}>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="users">
                <Route index element={<UserList />} />
                <Route path=":userId" element={<User />} />
                <Route path="newUser" element={<NewUser />} />
              </Route>

              <Route path="products">
                <Route index element={<ProductList />} />
                <Route path=":productId" element={<Product />} />
                <Route path="newProduct" element={<NewProduct />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Cart } from "./pages/cart/cart";
import { Shop } from "./pages/shop/shop";
import { Login } from "./pages/login/login";
import { Buypage } from "./pages/buypage/buypage";
import { Wishlist } from "./pages/wishlist/wishlist";
import { Checkout } from "./pages/checkout/checkout";
import { ShopContextProvider } from "./context/shop-context";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("isDarkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode);
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <Navbar
            onSearch={setSearchTerm}
            toggleDarkMode={toggleDarkMode}
            isDarkMode={isDarkMode}
          />
          <Routes>
            <Route path="/" element={<Shop searchTerm={searchTerm} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/buypage/:productId" element={<Buypage />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Router>
        <ToastContainer
          position="top-left"
          autoClose={1300}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={isDarkMode ? "dark" : "light"}
        />
      </ShopContextProvider>
    </div>
  );
}

export default App;

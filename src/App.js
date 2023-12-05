import logo from "./logo.svg";
import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./Navbar";
import Cart from "./pages/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Add from "./pages/Add";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
          
      
        <Route path="cart" element={<Cart />} />
        <Route path="add" element={<Add />} />

      </Routes>
			<ToastContainer />

    </div>
  );
}

export default App;

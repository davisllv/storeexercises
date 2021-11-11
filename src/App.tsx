import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Cadastro from "./Pages/Cadastro";
import Listagem from "./Pages/Listagem";
import HomePage from "./Pages/Home";
import Carrinho from "./Pages/Carrinho";
import AppProvider from "./Context/appContext";

const App: React.FC = () => {
  return (
    <>
      <ToastContainer autoClose={3000} pauseOnHover={false} />
      <Router>
        <AppProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/listagem" element={<Listagem />} />
            <Route path="/carrinho" element={<Carrinho />} />
          </Routes>
        </AppProvider>
      </Router>
    </>
  );
};

export default App;

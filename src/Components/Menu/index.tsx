import React, { useContext } from "react";
import "../../styles.css";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../../Context/appContext";

const Menu: React.FC = () => {
  const { carList } = useContext(AppContext);
  const { pathname } = useLocation();

  return (
    <div className="content">
      <header id="header">
        <nav>
          <Link to="/" className="logo">
            beauty<span>Store</span>.
          </Link>
          <div className="menu"></div>
          <ul className="grid">
            <li>
              <Link to="/">
                <button className={pathname === "/" ? "ativo" : ""}>
                  HomePage
                </button>
              </Link>
            </li>
            <li>
              <Link to="/cadastro">
                <button
                  className={pathname.includes("/cadastro") ? "ativo" : ""}
                >
                  Cadastro
                </button>
              </Link>
            </li>
            <li>
              <Link to="/listagem">
                <button
                  className={pathname.includes("/listagem") ? "ativo" : ""}
                >
                  Listagem
                </button>
              </Link>
            </li>
            <li>
              <Link to="/carrinho">
                <button
                  className={pathname.includes("/carrinho") ? "ativo" : ""}
                >
                  Carrinho (
                  <span className="button-span">{carList.length}</span>)
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};
export default Menu;

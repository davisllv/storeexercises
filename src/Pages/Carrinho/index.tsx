import React, { useContext, useEffect, useState } from "react";
import { IITem } from "../Cadastro";
import { AppContext } from "../../Context/appContext";
import { toast } from "react-toastify";
import Menu from "../../Components/Menu";

export interface ICarrinho extends IITem {
  quantidade: number;
}

const Carrinho: React.FC = () => {
  const { itemList, carList, setCarList } = useContext(AppContext);
  const [precoTotal, setPrecoTotal] = useState(0);

  useEffect(() => {
    let counter = 0;
    for (let index = 0; index < carList.length; index++) {
      counter += Number(carList[index].price) * Number(carList[index].amount);
    }
    setPrecoTotal(counter);
  }, [carList]);

  function incrementNumber(id: number): void {
    setCarList((prevState) => {
      let allData = prevState.find((it) => it.id === id);
      let itemListData = itemList.find((it) => it.id === id);
      if (allData) {
        if (itemListData) {
          while (allData.amount < itemListData.amount) {
            allData.amount += 1;
            return [...prevState];
          }
          toast.warning("Não há mais itens no estoque");
        }
      }

      return prevState;
    });
  }

  function decrementNumber(id: number): void {
    // if (n < 2) return;
    setCarList((prevState) => {
      let allData = prevState.find((it) => it.id === id);
      if (allData) {
        if (allData.amount === 1) {
          return [...prevState];
        }
        allData.amount -= 1;
        return [...prevState];
      }
      return prevState;
    });
  }

  return (
    <>
      <Menu />
      <div className="container">
        <h4>Carrinho</h4>
        <div className="boxes-car-list">
          <ul>
            {carList.map((item) => {
              return (
                <li className="car-list">
                  <span>{item.name}</span>
                  <span>{`Preço unitário: $${item.price}`}</span>{" "}
                  <span>{`Quantidade: ${item.amount}`}</span>
                  <span>{`Preço Total: R$${
                    Number(item.price) * item.amount
                  }`}</span>
                  <div className="buttons">
                    <button
                      className="add"
                      onClick={() => {
                        incrementNumber(item.id);
                      }}
                    >
                      +
                    </button>
                    <button
                      className="sub"
                      onClick={() => {
                        decrementNumber(item.id);
                      }}
                    >
                      -
                    </button>
                  </div>
                </li>
              );
            })}
            <div className="result">
              <span>Preço Total:</span> <span>{`R$ ${precoTotal}`}</span>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Carrinho;

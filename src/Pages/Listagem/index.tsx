import React, { useContext } from "react";
import Menu from "../../Components/Menu";
import { AppContext } from "../../Context/appContext";
import { toast } from "react-toastify";
import { IITem } from "../Cadastro";

const Listagem: React.FC = () => {
  const { itemList, carList, setCarList } = useContext(AppContext);

  function handleClickValue(
    id: number,
    name: string,
    price: string,
    amount: number
  ) {
    const allData = carList.some((it) => it.id === id);
    // const allData = carList.find((it) => it.id === id);
    if (allData) {
      toast.warning("Item já adicionado!");
      return;
    }
    setCarList((prevState) => {
      const newCarList: IITem = {
        id,
        name,
        price,
        amount: 1,
      };
      const newList = [...prevState, newCarList];
      return newList;
    });
    toast.success("Item adicionado ao Carrinho");
  }
  return (
    <>
      <Menu />
      <div className="container">
        <h4>Listagem de Items</h4>
        <div className="boxes-list">
          <ul>
            {itemList.map((item) => {
              return (
                <li>
                  <span>{item.name}</span>
                  <span className="price-row">{`Preço Produto: R$${item.price}`}</span>
                  <button
                    className="add-button"
                    onClick={() => {
                      handleClickValue(
                        item.id,
                        item.name,
                        item.price,
                        item.amount
                      );
                    }}
                  >
                    Adicionar ao Carrinho
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Listagem;

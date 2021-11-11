import React, { useState, useContext, useRef, useEffect } from "react";
import { AppContext } from "../../Context/appContext";
import * as yup from "yup";
import { toast } from "react-toastify";
import Menu from "../../Components/Menu";

import "../../styles.css";
export interface IITem {
  id: number;
  name: string;
  price: string;
  amount: number;
}
const Cadastro: React.FC = () => {
  const { setItemList } = useContext(AppContext);
  const [inputName, setInputName] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [inputAmount, setInputAmount] = useState(1);

  const inputFocus = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputFocus.current?.focus();
  }, []);
  function handleChangeName(ev: React.ChangeEvent<HTMLInputElement>): void {
    setInputName(ev.target.value);
  }

  function handleChangePrice(ev: React.ChangeEvent<HTMLInputElement>): void {
    setInputPrice(ev.target.value);
  }

  function handleChangeAmount(ev: React.ChangeEvent<HTMLInputElement>): void {
    if (Number(ev.target.value) < 1) return;
    setInputAmount(Number(ev.target.value));
  }

  function handleError(error: yup.ValidationError): void {
    error.inner.forEach((item) => {
      toast.error(item.message);
      // if (item.path === "inputName") { Isso serve para caso eu queira utilizar os inputs;
      //   setInputNameErro(item.message);
      // }
      // if (item.path === "inputPrice") {
      //   setInputPriceErro(item.message);
      // }
      // if (item.path === "inputAmount") {
      //   console.log(item.path);
      // }
    });
  }

  async function handleSubmit(
    ev: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    ev.preventDefault();
    const schema = yup.object().shape({
      inputName: yup.string().required("Nome do produto é obrigatório"),
      inputPrice: yup
        .number()
        .min(1, "Preço Inválido")
        .required("Preço Obrigatório"),
      inputAmount: yup
        .number()
        .min(1, "Quantidade inválida")
        .required("Quantidade Obrigatória"), // torno obrigatória a inseração de dados;
    });
    try {
      await schema.validate(
        { inputName, inputPrice: Number(inputPrice), inputAmount },
        {
          abortEarly: false,
        }
      );
      setItemList((prevState) => {
        const newItem: IITem = {
          id: Math.random() * 100 + 1,
          name: inputName,
          price: inputPrice,
          amount: Number(inputAmount),
        };
        const newList = [...prevState, newItem];
        return newList;
      });
      setInputName("");
      // setInputNameErro("");
      setInputPrice("");
      // setInputPriceErro("");
      setInputAmount(0);
      inputFocus.current?.focus();
      toast.success("Item Adicionado a Listagem");
    } catch (error) {
      if (error instanceof yup.ValidationError) handleError(error);
    }
  }

  return (
    <div>
      <Menu />
      <div className="container">
        <h4>Set your item</h4>
        <div className="boxes">
          <form onSubmit={handleSubmit}>
            <div className="inpt-boxes">
              <div className="name-box">
                <label>Name</label>
                <div className="input-name-div">
                  <input
                    type="text"
                    className="input-name"
                    placeholder="Nome Produto"
                    value={inputName}
                    onChange={handleChangeName}
                    ref={inputFocus}
                  />
                </div>
              </div>
              <div className="price-box">
                <label>Price</label>
                <div className="price-input-div">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Dollar sign icon</title>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12 0C12.5523 0 13 0.447715 13 1V23C13 23.5523 12.5523 24 12 24C11.4477 24 11 23.5523 11 23V1C11 0.447715 11.4477 0 12 0Z"
                      fill="#939aa0"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.31802 5.31802C7.16193 4.47411 8.30653 4 9.5 4H17C17.5523 4 18 4.44772 18 5C18 5.55228 17.5523 6 17 6H9.5C8.83696 6 8.20107 6.26339 7.73223 6.73223C7.26339 7.20107 7 7.83696 7 8.5C7 9.16304 7.26339 9.79893 7.73223 10.2678C8.20107 10.7366 8.83696 11 9.5 11H14.5C15.6935 11 16.8381 11.4741 17.682 12.318C18.5259 13.1619 19 14.3065 19 15.5C19 16.6935 18.5259 17.8381 17.682 18.682C16.8381 19.5259 15.6935 20 14.5 20H6C5.44772 20 5 19.5523 5 19C5 18.4477 5.44772 18 6 18H14.5C15.163 18 15.7989 17.7366 16.2678 17.2678C16.7366 16.7989 17 16.163 17 15.5C17 14.837 16.7366 14.2011 16.2678 13.7322C15.7989 13.2634 15.163 13 14.5 13H9.5C8.30653 13 7.16193 12.5259 6.31802 11.682C5.47411 10.8381 5 9.69347 5 8.5C5 7.30653 5.47411 6.16193 6.31802 5.31802Z"
                      fill="#939aa0"
                    ></path>
                  </svg>
                  <input
                    type="text"
                    className="price-input"
                    placeholder="Preço do Produto"
                    value={inputPrice}
                    onChange={handleChangePrice}
                  />
                </div>
              </div>
              <div className="amount-box">
                <label>Amount</label>
                <div className="amount-input-div">
                  <input
                    type="number"
                    className="amount-input"
                    placeholder="Quantidade de produtos"
                    value={inputAmount}
                    onChange={handleChangeAmount}
                  />
                </div>
              </div>
            </div>
            <div className="btns-boxes">
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;

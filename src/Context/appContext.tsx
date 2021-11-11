import React, { createContext, useState } from "react";
import { IITem } from "../Pages/Cadastro";

export interface IAppContext {
  itemList: IITem[];
  setItemList: React.Dispatch<React.SetStateAction<IITem[]>>;
  carList: IITem[];
  setCarList: React.Dispatch<React.SetStateAction<IITem[]>>;
}

export const AppContext = createContext({} as IAppContext);

const AppProvider: React.FC = ({ children }) => {
  const [itemList, setItemList] = useState<IITem[]>([]);
  const [carList, setCarList] = useState<IITem[]>([]);

  return (
    <AppContext.Provider
      value={{
        itemList,
        setItemList,
        carList,
        setCarList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

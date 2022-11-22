import { StatusBar } from "expo-status-bar";
import React from "react";
import { ProvedorCarrinho } from "./src/Context/CarrinhoContexto";
import { Routes } from "./src/routes";


function App() {

  return (
    <ProvedorCarrinho>
      <StatusBar
        hidden={false}
        translucent={true}
        style={'light'}
      />
      <Routes />
    </ProvedorCarrinho>
  )
}

export default App
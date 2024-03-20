import { Segment } from "semantic-ui-react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import Rotas from "./Rotas";
import Home from "./views/home/Home";
import FormCliente from "./views/cliente/FormCliente";

function App() {
  return (
    <div className="App">
      <FormCliente />
      <Rotas />
      <Home />

      <div style={{ marginTop: "6%" }}>
        <Segment vertical color="grey" size="tiny" textAlign="center">
          & copy; 2023 - Projeto WEB III - IFPE Jaboatão dos Guararapes{" "}
        </Segment>{" "}
      </div>
    </div>
  );
}

export default App;

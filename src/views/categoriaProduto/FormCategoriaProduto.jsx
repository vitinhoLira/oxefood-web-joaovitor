import axios from "axios";
import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { Link, useLocation } from "react-router-dom";

export default function FormCategoriaProduto() {
  const { state } = useLocation();
  const [idCategoriaProduto, setIdCategoriaProduto] = useState();

  useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8080/api/categoriaproduto/" + state.id)
        .then((response) => {
          setIdCategoriaProduto(response.data.id);
          setDescricao(response.data.descricao);
        });
    }
  }, [state]);

  const [descricao, setDescricao] = useState();

  function salvar() {
    let categoriaProdutoRequest = {
      descricao: descricao,
    };

    if (idCategoriaProduto != null) {
      //Alteração:
      axios
        .put(
          "http://localhost:8080/api/categoriaproduto/" + idCategoriaProduto,
          categoriaProdutoRequest,
        )
        .then((response) => {
          console.log("Categoria alterada com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao alterar esta categoria.");
        });
    } else {
      //Cadastro:
      axios
        .post(
          "http://localhost:8080/api/categoriaproduto",
          categoriaProdutoRequest,
        )
        .then((response) => {
          console.log("Categoria cadastrada com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao incluir o categoria.  " + error);
        });
    }
  }

  return (
    <div>
      <MenuSistema tela={"Categoria de Produto"} />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idCategoriaProduto === undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Categoria &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Cadastro
            </h2>
          )}
          {idCategoriaProduto != undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Categoria &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Alteração
            </h2>
          )}

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Descricao"
                  maxLength="100"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </Form.Group>
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Link to={"/list-categoriaProduto"}>
                <Button
                  type="button"
                  inverted
                  circular
                  icon
                  labelPosition="left"
                  color="orange"
                >
                  <Icon name="reply" />
                  Voltar
                </Button>
              </Link>
              <Button
                inverted
                circular
                icon
                labelPosition="left"
                color="blue"
                floated="right"
                onClick={() => salvar()}
              >
                <Icon name="save" />
                Salvar
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

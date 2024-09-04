import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table, Modal, Header, Segment, Form, Menu } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListProduto() {
    const [lista, setLista] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState(null);
    const [menuFiltro, setMenuFiltro] = useState(false);
    const [codigo, setCodigo] = useState('');
    const [titulo, setTitulo] = useState('');
    const [idCategoria, setIdCategoria] = useState(null);
    const [listaCategoriaProduto, setListaCategoriaProduto] = useState([]);

    const carregarLista = async () => {
        try {
            const responseProdutos = await axios.get("http://localhost:8080/api/produto");
            setLista(responseProdutos.data);

            const responseCategorias = await axios.get("http://localhost:8080/api/categoriaproduto");
            const dropDownCategorias = [{ text: '', value: '' }];
            responseCategorias.data.forEach(c => dropDownCategorias.push({ text: c.descricao, value: c.id }));
            setListaCategoriaProduto(dropDownCategorias);
        } catch (error) {
            console.error('Erro ao carregar a lista de produtos ou categorias', error);
        }
    };

    useEffect(() => {
        carregarLista();
    }, []);

    const confirmaRemover = (id) => {
        setOpenModal(true);
        setIdRemover(id);
    };

    const remover = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/produto/${idRemover}`);
            console.log('Produto removido com sucesso.');
            carregarLista();
        } catch (error) {
            console.error('Erro ao remover um Produto.', error);
        } finally {
            setOpenModal(false);
        }
    };

    const handleMenuFiltro = () => {
        setMenuFiltro(prevState => !prevState);
    };

    const handleChangeCodigo = (value) => {
        setCodigo(value);
        filtrarProdutos(value, titulo, idCategoria);
    };

    const handleChangeTitulo = (value) => {
        setTitulo(value);
        filtrarProdutos(codigo, value, idCategoria);
    };

    const handleChangeCategoriaProduto = (value) => {
        setIdCategoria(value);
        filtrarProdutos(codigo, titulo, value);
    };

    const filtrarProdutos = async (codigoParam, tituloParam, idCategoriaParam) => {
        try {
            const formData = new FormData();
            if (codigoParam) formData.append('codigo', codigoParam);
            if (tituloParam) formData.append('titulo', tituloParam);
            if (idCategoriaParam) formData.append('idCategoria', idCategoriaParam);

            const response = await axios.post("http://localhost:8080/api/produto/filtrar", formData);
            setLista(response.data);
        } catch (error) {
            console.error('Erro ao filtrar produtos', error);
        }
    };

    return (
        <div>
            <MenuSistema tela={'produto'} />
            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified'>
                    <h2>Produto</h2>
                    <Divider />
                    <div style={{ marginTop: '4%' }}>
                        <Menu compact>
                            <Menu.Item
                                name='menuFiltro'
                                active={menuFiltro}
                                onClick={handleMenuFiltro}
                            >
                                <Icon name='filter' />
                                Filtrar
                            </Menu.Item>
                        </Menu>
                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-produto'
                        />
                        <br /><br /><br />
                        {menuFiltro && (
                            <Segment>
                                <Form className="form-filtros">
                                    <Form.Input
                                        icon="search"
                                        value={codigo}
                                        onChange={e => handleChangeCodigo(e.target.value)}
                                        label='Código do Produto'
                                        placeholder='Filtrar por Código do Produto'
                                        labelPosition='left'
                                        width={4}
                                    />
                                    <Form.Group widths='equal'>
                                        <Form.Input
                                            icon="search"
                                            value={titulo}
                                            onChange={e => handleChangeTitulo(e.target.value)}
                                            label='Título'
                                            placeholder='Filtrar por título'
                                            labelPosition='left'
                                        />
                                        <Form.Select
                                            placeholder='Filtrar por Categoria'
                                            label='Categoria'
                                            options={listaCategoriaProduto}
                                            value={idCategoria}
                                            onChange={(e, { value }) => handleChangeCategoriaProduto(value)}
                                        />
                                    </Form.Group>
                                </Form>
                            </Segment>
                        )}
                        <Table color='orange' sortable celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Título</Table.HeaderCell>
                                    <Table.HeaderCell>Categoria</Table.HeaderCell>
                                    <Table.HeaderCell>Código do Produto</Table.HeaderCell>
                                    <Table.HeaderCell>Descrição</Table.HeaderCell>
                                    <Table.HeaderCell>Valor Unitário</Table.HeaderCell>
                                    <Table.HeaderCell>Tempo de entrega Mínimo</Table.HeaderCell>
                                    <Table.HeaderCell>Tempo de entrega Máximo</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {lista.map(produto => (
                                    <Table.Row key={produto.id}>
                                        <Table.Cell>{produto.titulo}</Table.Cell>
                                        <Table.Cell>{produto.categoria.descricao}</Table.Cell>
                                        <Table.Cell>{produto.codigo}</Table.Cell>
                                        <Table.Cell>{produto.descricao}</Table.Cell>
                                        <Table.Cell>{produto.valorUnitario}</Table.Cell>
                                        <Table.Cell>{produto.tempoEntregaMinimo}</Table.Cell>
                                        <Table.Cell>{produto.tempoEntregaMaximo}</Table.Cell>
                                        <Table.Cell textAlign='center'>
                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados deste produto'
                                                icon
                                                as={Link}
                                                to={{ pathname: "/form-produto", state: { id: produto.id } }}
                                            >
                                                <Icon name='edit' />
                                            </Button>
                                            &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover este produto'
                                                icon
                                                onClick={() => confirmaRemover(produto.id)}
                                            >
                                                <Icon name='trash' />
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </Container>
            </div>
            <Modal
                basic
                onClose={() => setOpenModal(false)}
                onOpen={() => setOpenModal(true)}
                open={openModal}
            >
                <Header icon>
                    <Icon name='trash' />
                    <div style={{ marginTop: '5%' }}>Tem certeza que deseja remover esse registro?</div>
                </Header>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                        <Icon name='remove' /> Não
                    </Button>
                    <Button color='green' inverted onClick={remover}>
                        <Icon name='checkmark' /> Sim
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
}

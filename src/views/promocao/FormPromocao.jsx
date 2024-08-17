import axios from "axios";
import React, { useState, useEffect} from "react";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import { Link, useLocation } from "react-router-dom";


export default function FormPromocao() {

    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }
    
        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

    const { state } = useLocation();
    const [idPromocao, setIdPromocao] = useState();

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/promocao/" + state.id)
                .then((response) => {
                    setIdPromocao(response.data.id)
                    setRegra(response.data.regra)
                    setValorDesconto(response.data.valorDesconto)
                    setDataInicio(formatarData(response.data.dataInicio))
                    setDataFim(response.data.dataFim)
                    setTitulo(response.data.titulo)
                })
        }
    }, [state])


    const [regra, setRegra] = useState();
    const [valorDesconto, setValorDesconto] = useState();
    const [dataInicio, setDataInicio] = useState();
    const [dataFim, setDataFim] = useState();
    const [titulo, setTitulo] = useState();

    function salvar() {

        let promocaoRequest = {
            titulo: titulo,
            regra: regra,
            dataInicio: dataInicio,
            dataFim: dataFim,
            valorDesconto: valorDesconto
        }

        if (idPromocao != null) { //Alteração:
            axios.put("http://localhost:8080/api/promocao/" + idPromocao, promocaoRequest)
                .then((response) => { console.log('Promoção alterada com sucesso.') })
                .catch((error) => { console.log('Erro ao alterar uma promoção.') })
        } else { //Cadastro:
            axios.post("http://localhost:8080/api/promocao", promocaoRequest)
                .then((response) => { console.log('Promoção cadastrada com sucesso.') })
                .catch((error) => { console.log('Erro ao incluir a promoção.  '+error) })
        }

    }

    return (

        <div>

            <MenuSistema tela={'promocao'} />

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >



                    {idPromocao === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Promoção &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idPromocao != undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Promoção &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }


                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Título'
                                    maxLength="100"
                                    value={titulo}
                                    onChange={e => setTitulo(e.target.value)}
                                />

                            </Form.Group>

                            <Form.TextArea
								label='Regra'
								placeholder='Informe a regra da promoção'
								tabIndex='4'
								maxLength="1000"
								value={regra}
								onChange={e => setRegra(e.target.value)}
							/>

                            <Form.Group>

                                <Form.Input
                                required
                                    fluid
                                    label='Valor Desconto (R$)'
                                    width={6}>
                                    <InputMask
                                    
                                        value={valorDesconto}
                                        onChange={e => setValorDesconto(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                required
                                    fluid
                                    label='A partir de'
                                    width={6}
                                >
                                    <InputMask
                                        mask="99/99/9999 12:00:00"
                                        maskChar={null}
                                        placeholder="Ex: 99/99/9999 12:00:00"
                                        value={dataInicio}
                                        onChange={e => setDataInicio(e.target.value)}


                                    />
                                </Form.Input>

                                <Form.Input
                                required
                                    fluid
                                    label='Terminando em'
                                    width={6}
                                >
                                    <InputMask
                                        mask="99/99/9999 12:00:00"
                                        maskChar={null}
                                        placeholder="Ex: 99/99/9999 12:00:00"
                                        value={dataFim}
                                        onChange={e => setDataFim(e.target.value)}


                                    />
                                </Form.Input>

                            </Form.Group>

                        </Form>

                        <div style={{ marginTop: '4%' }}>


                            <Link to={'/list-cliente'}>

                                <Button
                                    type="button"
                                    inverted
                                    circular
                                    icon
                                    labelPosition='left'
                                    color='orange'

                                >
                                    <Icon name='reply' />

                                    <Link to={'/list-promocao'}>Listar</Link>

                                </Button>

                            </Link>
                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={() => salvar()}
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>

                        </div>

                    </div>

                </Container>
            </div>
        </div>

    );

}

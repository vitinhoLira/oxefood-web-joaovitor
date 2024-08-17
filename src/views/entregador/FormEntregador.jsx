import axios from "axios";
import React, { useState, useEffect } from "react";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import { Link, useLocation } from "react-router-dom";

const ufList = [
    {
        key: 'o',
        text: 'Alagoas',
        value: 'AL'
    },
    {
        key: 'f',
        text: 'Paraíba',
        value: 'PB'
    },
    {
        key: 'm',
        text: 'Pernambuco',
        value: 'PE'
    },
]

export default function FormEntregador() {

    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

    const { state } = useLocation();
    const [idEntregador, setIdEntregador] = useState();


    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/entregador/" + state.id)
                .then((response) => {
                    setIdEntregador(response.data.id)
                    setNome(response.data.nome)
                    setCpf(response.data.cpf)
                    setDataNascimento(formatarData(response.data.dataNascimento))
                    setFoneCelular(response.data.foneCelular)
                    setFoneFixo(response.data.foneFixo)
                    setRg(response.data.rg)
                    setQtdEntregasRealizadas(response.data.qtdEntregasRealizadas)
                    setValorFrete(response.data.valorFrete)
                    setRua(response.data.enderecoRua)
                    setNumero(response.data.enderecoNumero)
                    setBairro(response.data.enderecoBairro)
                    setCidade(response.data.enderecoCidade)
                    setCep(response.data.enderecoCep)
                    setUf(response.data.enderecoUf)
                    setComplemento(response.data.enderecoComplemento)
                    setAtivo(response.data.ativo)

                })
        }
    }, [state])

    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState();
    const [rg, setRg] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [foneCelular, setFoneCelular] = useState();
    const [foneFixo, setFoneFixo] = useState();
    const [valorFrete, setValorFrete] = useState();
    const [qtdEntregasRealizadas, setQtdEntregasRealizadas] = useState();
    const [ativo, setAtivo] = useState();
    const [rua, setRua] = useState();
    const [numero, setNumero] = useState();
    const [bairro, setBairro] = useState();
    const [cidade, setCidade] = useState();
    const [cep, setCep] = useState();
    const [uf, setUf] = useState();
    const [complemento, setComplemento] = useState();

    function salvar() {

        let entregadorRequest = {
            nome: nome,
            cpf: cpf,
            rg: rg,
            dataNascimento: dataNascimento,
            foneCelular: foneCelular,
            foneFixo: foneFixo,
            qtdEntregasRealizadas: parseInt(qtdEntregasRealizadas),
            valorFrete: parseFloat(valorFrete),
            enderecoRua: rua,
            enderecoNumero: numero,
            enderecoBairro: bairro,
            enderecoCep: cep,
            enderecoCidade: cidade,
            enderecoUf: uf,
            enderecoComplemento: complemento,
            ativo: ativo
        }

        if (idEntregador != null) { //Alteração:
            axios.put("http://localhost:8080/api/entregador/" + idEntregador, entregadorRequest)
                .then((response) => { console.log('Entregador alterado com sucesso.') })
                .catch((error) => { console.log('Erro ao alter um entregador.') })
        } else { //Cadastro:
            axios.post("http://localhost:8080/api/entregador", entregadorRequest)
                .then((response) => { console.log('Entregador cadastrado com sucesso.') })
                .catch((error) => { console.log('Erro ao incluir o entregador.') })
        }

    }

    return (

        <div>

            <MenuSistema tela={'entregador'} />

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >


                    {idEntregador === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idEntregador != undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }


                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="100"
                                    value={nome}
                                    width={8}
                                    onChange={e => setNome(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='CPF'
                                    width={4}>
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                        value={cpf}
                                        onChange={e => setCpf(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    required
                                    fluid
                                    label='RG'
                                    width={4}>
                                    <InputMask
                                        required
                                        mask="9.999.999"
                                        placeholder="Ex: 9.999.999"
                                        value={rg}
                                        onChange={e => setRg(e.target.value)}

                                    />
                                </Form.Input>

                            </Form.Group>

                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Data Nascimento'
                                    width={3}
                                >
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={dataNascimento}
                                        onChange={e => setDataNascimento(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Fone Celular'
                                    width={4}>
                                    <InputMask
                                        mask="(99) 9 9999-9999"
                                        value={foneCelular}
                                        onChange={e => setFoneCelular(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Fone Fixo'
                                    width={4}>
                                    <InputMask
                                        mask="(99) 9999-9999"
                                        value={foneFixo}
                                        onChange={e => setFoneFixo(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Entregas Realizadas'
                                    width={3}
                                    value={qtdEntregasRealizadas}
                                    onChange={e => setQtdEntregasRealizadas(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    label='Valor de Frete'
                                    width={3}
                                    value={valorFrete}
                                    onChange={e => setValorFrete(e.target.value)}
                                />

                            </Form.Group>

                            <Form.Group inline>

                                <label>Ativo: </label>

                                <Form.Radio
                                    label='Sim'
                                    checked={ativo}
                                    onChange={e => setAtivo(true)}

                                />

                                <Form.Radio
                                    label='Não'
                                    checked={!ativo}
                                    onChange={e => setAtivo(false)}



                                />

                            </Form.Group>

                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Bairro'
                                    width={7}
                                    value={bairro}
                                    onChange={e => setBairro(e.target.value)} />

                                <Form.Input
                                    fluid
                                    label='Cidade'
                                    width={7}
                                    value={cidade}
                                    onChange={e => setCidade(e.target.value)} />

                                <Form.Input
                                    fluid
                                    label='CEP'
                                    width={2}>
                                    <InputMask
                                        mask="99999-999"
                                        value={cep}
                                        onChange={e => setCep(e.target.value)}
                                    />
                                </Form.Input>

                            </Form.Group>

                            <Form.Select
                                fluid
                                label='UF'
                                options={ufList}
                                placeholder='Selecione'
                                value={uf}
                                onChange={e => setUf(e.target.value)}
                            />

                            <Form.Input
                                fluid
                                label='Complemento'
                                value={complemento}
                                onChange={e => setComplemento(e.target.value)}
                            />


                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Rua'
                                    width={13}
                                    value={rua}
                                    onChange={e => setRua(e.target.value)}
                                >
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Número'
                                    width={3}
                                    value={numero}
                                    onChange={e => setNumero(e.target.value)}>
                                </Form.Input>

                            </Form.Group>

                            <Form.Group widths='equal' style={{ marginTop: '4%' }} className='form--empresa-salvar'>

                                <Button
                                    type="button"
                                    inverted
                                    circular
                                    icon
                                    labelPosition='left'
                                    color='orange'

                                >
                                    <Icon name='reply' />
                                    Voltar
                                </Button>

                                <Container textAlign='right'>

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

                                </Container>

                            </Form.Group>

                        </Form>

                    </div>

                </Container>

            </div >

        </div >

    );

}

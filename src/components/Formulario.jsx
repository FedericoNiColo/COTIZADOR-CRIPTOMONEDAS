import React from 'react'
import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { useEffect } from 'react'
import { useState } from 'react'

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 1rem;
    color: white;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 2rem;
    border-radius: 0.5rem;
    transition: background-color .3s ease;
    margin-top: 3rem;
    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const ErrorParrafo = styled.p`
color: red;
font-size: 1.5rem;
margin: 0;
font-family: 'Lato', sans-serif;
text-transform: uppercase;
`

const monedas = [
    { id: 'USD', nombre: 'Dolar de Estados Unidos' },
    { id: 'ARG', nombre: 'Peso Argentino' },
    { id: 'USD', nombre: 'Euro' },
    { id: 'GBP', nombre: 'Libra Esternila' },
]
const Formulario = ({ setDatosFormulario }) => {

    const [criptos, setCriptos] = useState([])
    const [error, setError] = useState(false)

    const [moneda, SelectMonedas] = useSelectMonedas('Elige tu Moneda', monedas)
    const [criptomonedas, SelectCriptomonedas] = useSelectMonedas('Elige tu Criptomoneda', criptos)

    useEffect(() => {
        const consultarApi = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()

            const arrayCriptos = resultado.Data.map(cripto => {
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
                return objeto
            })

            setCriptos(arrayCriptos)
        }
        consultarApi()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        if ([moneda, criptomonedas].includes('')) {
            setError(true)

            return
        }

        setError(false)

        setDatosFormulario({
            moneda,
            criptomonedas
        })
    }

    return (
        <>
            {error && <ErrorParrafo>Todos los campos son obligatorios</ErrorParrafo>}
            <form onSubmit={handleSubmit}>

                <SelectMonedas />
                <SelectCriptomonedas />
                <InputSubmit
                    type='submit'
                    value='cotizar'
                />
            </form>

        </>
    )
}

export default Formulario

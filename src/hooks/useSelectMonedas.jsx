import React from 'react'
import styled from '@emotion/styled'
import { useState } from 'react'

const Label = styled.label`
    color: white;
    display: block;
    font-family: 'Lato', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 1.5rem 0;
    @media (min-width: 786px) {
        font-size: 2.4rem;
    }
`

const Select = styled.select`
width: 100%;
font-size: 1.2rem;
padding: 1.5rem;
border-radius: 0.3rem;

@media (min-width: 786px) {
    font-size: 1.8rem;
    border-radius: 0.5rem;
  }
`

const useSelectMonedas = (label, opciones) => {

    const [state, setState] = useState('')

    const SelectMonedas = () => (
        <>
            <Label>{label}</Label>

            <Select value={state} onChange={e => setState(e.target.value)}>
                <option value="">Seleccione</option>
                {opciones.map(opcion => (
                    <option key={opcion.id} value={opcion.id}>
                        {opcion.nombre}
                    </option>
                ))}
            </Select>

        </>
    )

    return [state, SelectMonedas]
}

export default useSelectMonedas

import { useState } from 'react'
import styled from '@emotion/styled'
import ImagenCripto from './img/imagen-criptos.png'
import Formulario from './components/Formulario'
import { useEffect } from 'react'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'

const Contenedor = styled.div`
  max-width: 90rem;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 786px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`
const Imagen = styled.img`
  max-width: 40rem;
  width: 80%;
  margin: 2rem auto 0 auto;
  display: block;

  @media (min-width: 786px) {
    margin: 10rem auto 0 auto;
  }
`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 4rem;
  font-size: 2.5rem;
  width: 100%;

  &::after {
    content:'';
    width: 10rem;
    height: 0.6rem;
    background-color: #66A2FE;
    display: block;
    margin: 1rem auto 0 auto;
  }

  @media (min-width: 786px) {
    font-size: 3.4rem;
    margin-top: 8rem;
    margin-bottom: 5rem;
  }
`

function App() {

  const [datosFormulario, setDatosFormulario] = useState({})
  const [resultado, setResultado] = useState({})

  const [cargando, setCargando] = useState(false)

  useEffect(() => {

    if (Object.keys(datosFormulario).length > 0) {

      const cotizarCripto = async () => {

        setCargando(true)
        setResultado({})

        const { moneda, criptomonedas } = datosFormulario
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomonedas}&tsyms=${moneda}`

        const respuesta = await fetch(url)
        const resultadoJson = await respuesta.json()

        setTimeout(() => {
          setResultado(resultadoJson.DISPLAY[criptomonedas][moneda])
          setCargando(false)
        }, 2000);
      }

      cotizarCripto()
    }
  }, [datosFormulario])

  return (
    <Contenedor>
      <Imagen
        src={ImagenCripto}
        alt="Imagenes criptomonedas"
      />

      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario setDatosFormulario={setDatosFormulario} />

        {cargando && <Spinner />}
        {resultado.PRICE && <Resultado resultado={resultado} />} {/* si existe resultado.PRICE quiere decir que ya esta toda la informacion de la peticion del usuario */}

      </div>
    </Contenedor>
  )
}

export default App

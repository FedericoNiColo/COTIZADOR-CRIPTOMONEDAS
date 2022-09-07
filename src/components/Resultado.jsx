import styled from '@emotion/styled'

const Resultado = ({ resultado }) => {

    const Contenedor = styled.div`
        color: white;
        font-family: 'Lato', sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        margin-bottom: 5rem;
        margin-top: 2rem;

        @media (min-width: 786px) {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
    `

    const Texto = styled.p`
        font-size: 1.2rem;
        span{
            font-weight: 700;
            color: #9497FF;
        }

        @media (min-width: 786px) {
            font-size: 1.6rem;
        }
    `

    const Precio = styled.p`
        font-size: 1.8rem;
        color: #9497FF;
        span{
            font-weight: 700;
        }

        @media (min-width: 786px) {
            font-size: 3rem;
        }
    `

    const Imagen = styled.img`
       display: block;
       width: 12rem;
    `



    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = resultado

    return (
        <Contenedor>
            <Imagen src={`https://cryptocompare.com/${IMAGEURL}`} alt='imagen de la cripto' />
            <div>
                <Precio>El Precio es de: <span>{PRICE}</span></Precio>
                <Texto>Precio más alto del día: <span>{HIGHDAY}</span></Texto>
                <Texto>Precio más bajo del día: <span>{LOWDAY}</span></Texto>
                <Texto>Variación últimas 24 hs: <span>{CHANGEPCT24HOUR}</span></Texto>
                <Texto>Última Actualización: <span>{LASTUPDATE}</span></Texto>
            </div>
        </Contenedor>
    )
}

export default Resultado

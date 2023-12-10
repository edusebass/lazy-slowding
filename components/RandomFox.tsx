
// LOS PROPS SON UN MODELO EN EL CUAL SE MANDARA EL VALOR
type Props = {
    image: string
}

//SIEMPRE SE LLAMA LOS VALORES DE LOS PROPS Y EL NOMBRE DEL MODELO
const RandomFox = ({image}:Props):JSX.Element => {
    return (
        <>
            <img src={image} className="h-64 w-auto rounded-3xl"></img>
        </>
    )
}

export default RandomFox
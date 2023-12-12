import { getImgProps } from 'next/dist/shared/lib/get-img-props'
import {useRef, useEffect, useState} from 'react'
import {ImgHTMLAttributes} from 'react'

// LOS PROPS SON UN MODELO EN EL CUAL SE MANDARA EL VALOR

type LazyImageProps = {
    src: string
}
  
type ImageNative = ImgHTMLAttributes<HTMLImageElement>

type Props = LazyImageProps & ImageNative

//SIEMPRE SE LLAMA LOS VALORES DE LOS PROPS Y EL NOMBRE DEL MODELO
const LazyImage = ({src, ...ImgProps}:Props):JSX.Element => {
    const node = useRef<HTMLImageElement>(null)
    const [currentSrc, setcurrentSrc] = useState("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=")

    useEffect(() => {
        //nuevo observador
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) =>{
                // onIntersection => console.log
                if(entry.isIntersecting) {
                    setcurrentSrc(src)
                }
            })
        })
        //observe node
        if(node.current){
            observer.observe(node.current)
        }
        //desconectar
        return () => {
            observer.disconnect()
        }
    }, [src])

    return (
        <>
            <img ref={node} 
                src={currentSrc} 
                {...ImgProps}
            ></img>
        </>
    )
}

export default LazyImage
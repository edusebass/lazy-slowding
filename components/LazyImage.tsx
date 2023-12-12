import { getImgProps } from 'next/dist/shared/lib/get-img-props'
import {useRef, useEffect, useState} from 'react'
import {ImgHTMLAttributes} from 'react'

// LOS PROPS SON UN MODELO EN EL CUAL SE MANDARA EL VALOR

type LazyImageProps = {
    src: string
    onLazyLoad?: (img: HTMLImageElement) => void
}
  
type ImageNative = ImgHTMLAttributes<HTMLImageElement>

type Props = LazyImageProps & ImageNative

//SIEMPRE SE LLAMA LOS VALORES DE LOS PROPS Y EL NOMBRE DEL MODELO
const LazyImage = ({src, onLazyLoad, ...ImgProps}:Props):JSX.Element => {
    const node = useRef<HTMLImageElement>(null)
    const [currentSrc, setCurrentSrc] = useState("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=")
    const [isLazyLoaded, setIsLazyLoaded] = useState(false)

    useEffect(() => {

        if (isLazyLoaded) {
            return;
        }
        //nuevo observador
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting || !node.current) {
                return;
              }
      
              setCurrentSrc(src);
              observer.disconnect();
              setIsLazyLoaded(true);
      
              if (typeof onLazyLoad === "function") {
                onLazyLoad(node.current);
              }
            });
          });
      
          if (node.current) {
            observer.observe(node.current);
          }
      
          return () => {
            observer.disconnect();
          };
        }, [src, onLazyLoad, isLazyLoaded]);

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
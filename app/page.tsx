"use client"
import LazyImage from '../components/LazyImage'
import type {MouseEventHandler} from 'react'
import {useState} from 'react'



const random = () => {
      return Math.floor(Math.random() * 123 ) + 1
  }

const generateID = () => Math.random().toString(36).substr(2,9)

export default function Home() {

  // los genericcos es definir el useState
  // esto significa que va a aser un array de tipo string solo string el usetate<string>([])
  // const [image, setImage] = useState<string[]>([
  //   `https://randomfox.ca/images/${random()}.jpg`,
  //   `https://randomfox.ca/images/${random()}.jpg`,
  //   `https://randomfox.ca/images/${random()}.jpg`,
  //   `https://randomfox.ca/images/${random()}.jpg`,
  // ])

  const [image, setImage] = useState<Array<IFoxItem>>([])

  const addNewFox: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()

    const target = event.target
    const newImageItem: IFoxItem = {
      id: generateID(),
      url: `https://randomfox.ca/images/${random()}.jpg`
    }
    setImage([
      ...image,
      newImageItem
    ]
    )
  }

  return (
    <>
      <h1 className='caret-violet-600'>Hello</h1>
      <button onClick={addNewFox}>Add new Fox</button>
      <main>
        <div className="m-4">
          <button
            onClick={addNewFox}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Add new fox
          </button>
        </div>
        {image.map(({ id, url }, index) => (
          <div className="p-4" key={id}>
            <LazyImage
              src={url}
              width="320"
              height="auto"
              className="mx-auto rounded-md bg-gray-300"
              onClick={() => {
                console.log("holi!");
              }}
              onLazyLoad={(img) => {
                console.log(`Image #${index + 1} cargada. Nodo:`, img);
              }}
            />
          </div>
        ))}
      </main>
    </>
  )
}

"use client"
import LazyImage from '../components/LazyImage'
import type { MouseEventHandler } from 'react'
import { useState } from 'react'
import { random } from 'lodash'

// No necesitas importar 'url' e 'inspector' ya que no los estás usando

interface IFoxItem {
  id: string;
  url: string;
}

const generateID = () => Math.random().toString(36).substr(2, 9)

export default function Home() {
  const [image, setImage] = useState<Array<IFoxItem>>([])

  const addNewFox: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()

    const newImageItem: IFoxItem = {
      id: generateID(),
      url: `https://randomfox.ca/images/${random(1, 123)}.jpg`
    };

    setImage([...image, newImageItem]);
    window.plausible("add_fox");
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className='text-4xl font-bold mb-4'>Hello</h1>
      <button
        onClick={addNewFox}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Add new Fox
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {image.map(({ id, url }, index) => (
          <div key={id}>
            <LazyImage
              src={url}
              width="320"
              height="auto"
              className="mx-auto rounded-md bg-gray-300 cursor-pointer"
              onClick={() => console.log("holi!")}
              onLazyLoad={(img) => console.log(`Image #${index + 1} loaded. Node:`, img)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

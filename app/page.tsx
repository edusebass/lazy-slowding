"use client"
import RandomFox from '../components/RandomFox'
import type {MouseEventHandler} from 'react'
import {useState} from 'react'

type ImageItems = {
  id: string, 
  url: string
}

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

  const [image, setImage] = useState<Array<ImageItems>>([])

  const addNewFox: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()

    const target = event.target
    const newImageItem: ImageItems = {
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
      {image.map(({id, url}) => ( 
        <div key={id} className='p-4'>
          <RandomFox image={url}/>
        </div>
      ))}

      
    </>
  )
}

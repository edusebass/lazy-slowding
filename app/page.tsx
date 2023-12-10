"use client"
import RandomFox from '../components/RandomFox'
import {useState} from 'react'

const random = () => {
      return Math.floor(Math.random() * 123 ) + 1
  }

type ImageItems = {
  id: string, 
  url: string
}
const generateID = () => Math.random().toString(36).substr(2,9)
export default function Home() {

  // los genericcos es definir el useState
  // esto significa que va a aser un array de tipo string solo string el usetate<string>([])
  // const [image, setimage] = useState<string[]>([
  //   `https://randomfox.ca/images/${random()}.jpg`,
  //   `https://randomfox.ca/images/${random()}.jpg`,
  //   `https://randomfox.ca/images/${random()}.jpg`,
  //   `https://randomfox.ca/images/${random()}.jpg`,
  // ])

  const [image, setimage] = useState<Array<ImageItems>>([
    {id: generateID(), url:`https://randomfox.ca/images/${random()}.jpg`},
    {id: generateID(), url:`https://randomfox.ca/images/${random()}.jpg`},
    {id: generateID(), url:`https://randomfox.ca/images/${random()}.jpg`},
    {id: generateID(), url:`https://randomfox.ca/images/${random()}.jpg`},
    
  ])



  return (
    <>
      <h1 className='caret-violet-600'>Hello</h1>

      {image.map(({id, url}) => ( 
        <div key={id} className='p-4'>
          <RandomFox image={url}/>
        </div>
      ))}

      
    </>
  )
}

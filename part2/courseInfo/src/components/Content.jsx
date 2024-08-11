import React from 'react'
import Part from './Part'

export default function Content({parts}) {
  return (
    <div>
      {parts.map((part)=> <Part part={part} key={part.id}/>)}
    </div>
  )
}

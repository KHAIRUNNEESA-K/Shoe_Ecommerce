import React from 'react'
import Navbar from './Navbar/Navbar'
import Hero from './Hero/Hero'
import Popular from './Popular/Popular'


export default function Home() {
  return (
    <div>
      {/* <Navbar/> */}
      <Hero/>
      <Popular/>
    </div>
  )
}

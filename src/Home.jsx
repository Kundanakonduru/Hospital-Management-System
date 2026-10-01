import React,{useContext} from 'react'
import {HelloContext} from './App'

function Home() {
  const hospitalinfo=useContext(HelloContext)
  return (
    <div>
      <h1>{hospitalinfo.hospitalName}</h1>
      <h2>CEO:{hospitalinfo.CEO}</h2>
      <h3>Co-ounder:{hospitalinfo.Cofounder}</h3>
      <h4>Location:{hospitalinfo.Location}</h4>
    </div>
  )
}

export default Home
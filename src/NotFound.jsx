import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
    const navigate=useNavigate()
  return (
    <div>
        <center>
            <h2>Page not found</h2>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUc3y_sfDCFiES1fZf-NPNzd86EjD6RXOV5oP5P4auuA&s=10" width="400px"/><br></br>
            <button onClick={()=>navigate('/')}>Go to Homepage</button>
        </center>
    </div>
  )
}

export default NotFound
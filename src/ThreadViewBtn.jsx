import React from 'react'

function ThreadViewBtn() {
  
  function handleClick() {
    console.log("Thread View btn clicked")
  }
  
  return (
    <button className='btn btn-ghost bg-gray-700 w-34 h-8 px-2 py-1' onClick={handleClick}>Thread View</button>
  )
}

export default ThreadViewBtn;
import React from 'react'
import {enableThreadView} from './utils/ThreadViewHelper.js';

function ThreadViewBtn({chatContainer, enabled}) {
  
  function handleClick() {
    if (!chatContainer){
      console.error("Chat container is not available.");
      return;
    }
    enableThreadView(chatContainer);
  }
  
  return (
    <>
      {enabled && (
        <button className='btn btn-ghost bg-gray-700 w-34 h-8 px-2 py-1' onClick={handleClick}>Thread View</button>
      )}
    </>
  )
}

export default ThreadViewBtn;
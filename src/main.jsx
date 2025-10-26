import { createRoot } from 'react-dom/client';
import './index.css';
import ThreadViewBtn from './ThreadViewBtn.jsx';

const container = document.querySelector("#thread");
let timer;

function addRoot(header){
  const headerActions = header.children[2].children.namedItem("conversation-header-actions");
  if(headerActions && !header.querySelector("#threadView-root")){
    const rootContainer = document.createElement("div");
    rootContainer.setAttribute("id","threadView-root");
    headerActions.prepend(rootContainer);
    
    const root = createRoot(rootContainer);
    root.render(
      <ThreadViewBtn/>
    )
  };
}

const observer = new MutationObserver(() => {
   const header = container.querySelector("#page-header");
   clearTimeout(timer);
   const db = setTimeout(() =>{
         addRoot(header);
   }, 2000)
});

observer.observe(container,{childList:true,subtree:true});


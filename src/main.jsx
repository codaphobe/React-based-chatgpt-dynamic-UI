import { createRoot } from 'react-dom/client';
import './index.css';
import ThreadViewBtn from './ThreadViewBtn.jsx';
import ThreadUtils from './utils/ThreadUtils.js';


function addRoot(header){
  const headerActions = header.querySelector("#conversation-header-actions");
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

const container = document.querySelector("#thread");
let timer;
const threadUtils = new ThreadUtils();
const observer = new MutationObserver(() => {
  clearTimeout(timer);
  timer = setTimeout(() =>{
      const header = container.querySelector("#page-header");
      const chatContainer = container.querySelector("div:has(> article)");
      if (header && chatContainer){
        addRoot(header);
        threadUtils.initializeThreads(chatContainer);
        const articlesCount = container.querySelectorAll("article").length;
        if (articlesCount === threadUtils.allChats.size) {
          // All articles have been processed, disconnect observer
          observer.disconnect();
          
          //start new chats observer
          newChatsObserverStart(chatContainer);
        }
      }
   }, 1000);
});

observer.observe(container,{childList:true,subtree:true});

function newChatsObserverStart(chatContainer){
    let timer;
    const newChatObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) =>{
          if(mutation.type === "childList"){
            mutation.addedNodes.forEach((node) =>{
              if (node.tagName === "ARTICLE"){
                console.log("New article added, rebuilding threads...");
                console.log(node);
              }
            });
          }
        });
    });
    newChatObserver.observe(chatContainer,{childList:true,subtree:true});
}

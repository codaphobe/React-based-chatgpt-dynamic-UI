import { createRoot } from 'react-dom/client';
import './index.css';
import ThreadViewBtn from './ThreadViewBtn.jsx';
import ThreadUtils from './utils/ThreadUtils.js';


const container = document.querySelector("#thread");
let chatContainer;

function addViewBtnRoot(header){
  const headerActions = header.querySelector("#conversation-header-actions");
  if(headerActions && !header.querySelector("#threadViewBtn-root")){
    const rootContainer = document.createElement("div");
    rootContainer.setAttribute("id","threadViewBtn-root");
    headerActions.prepend(rootContainer);
    
    const root = createRoot(rootContainer);
    root.render(
      <ThreadViewBtn chatContainer={chatContainer} enabled={true}/>
    )
  };
}

let timer;
const observer = new MutationObserver(() => {
  clearTimeout(timer);
  timer = setTimeout(() =>{
      const header = container.querySelector("#page-header");
      chatContainer = container.querySelector("div:has(> article)");
      if (header && chatContainer){
        addViewBtnRoot(header);
        ThreadUtils.initializeThreads(chatContainer);
        const articlesCount = container.querySelectorAll("article").length;
        if (articlesCount === ThreadUtils.getAllChats().length) {
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
  let accumulatedNodes = [];
  let processTimeout;
  const newChatObserver = new MutationObserver((mutations) => {
        
        mutations.forEach((mutation) =>{
          if(mutation.type === "childList"){
            mutation.addedNodes.forEach((node) =>{
              if (node.tagName === "ARTICLE"){
                    accumulatedNodes.push(node);
                    console.log("New article added and accumulated for processing.", node);
              }
            });
          }
        });
        
        clearTimeout(processTimeout);
        processTimeout = setTimeout(() => {
          if (accumulatedNodes.length > 0 && accumulatedNodes.length <= 2) {
            ThreadUtils.addNewChat(accumulatedNodes);
            accumulatedNodes = [];
            ThreadUtils.buildThreads();
          }
        }, 500);
    });
    newChatObserver.observe(chatContainer,{childList:true,subtree:false});
}

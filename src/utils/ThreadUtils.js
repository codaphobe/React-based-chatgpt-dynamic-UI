
const allChats = new Map();
const allThreads = new Map();


export default class ThreadUtils {
    

    static initializeThreads(chatContainer) {
        
        // Collect all chats
        this.collectAllChats(chatContainer);
        
        // Build threads from chats
        this.buildThreads();
    }
    
    static collectAllChats(chatContainer) {
        const articles = chatContainer.querySelectorAll("article");
        
        if (articles.length === 0) {
            console.log("No articles found in chat container.");
            return;
        }
        
        if (articles.length === allChats.size) {
            console.log("All articles have already been collected.");
            return;
        }
        
        this.addNewChat(articles);
        
        //Collect all chats
        // articles.forEach((article) => {
        //     this.allChats.set(article.attributes.getNamedItem("data-testid").value,{
        //     "element":article,
        //     "turn":article.attributes.getNamedItem('data-turn').value
        //     });
        // });
    }
        
    static buildThreads(){
        
        if(allChats.size===0){
            console.log("No chats available to build threads.");
            return;
        }

        let threadCount = 0;
        for(let i=0;i<allChats.size;i++){
            const user = allChats.get(`conversation-turn-${i+1}`);
            const assistant = allChats.get(`conversation-turn-${i+2}`);

            if (user["turn"] === "user" && assistant["turn"]==="assistant"){
                allThreads.set(`thread-id-${threadCount}`,{
                    user : user["element"],
                    assistant : assistant["element"],
                    collapsed :true
                })
                threadCount++;
                i++;
            }   
        }
        console.log(allThreads);
    }
    
    static addNewChat(articles){
        if (articles.length === 0) {
            console.log("No articles found in chat container.");
            return;
        }
        
        articles.forEach((article) => {
            allChats.set(article.attributes.getNamedItem("data-testid").value,{
            element:article,
            turn:article.attributes.getNamedItem('data-turn').value
            });
        });
        console.log(allChats);
    }

    //TODO: method to add new individual thread
    static addNewThread(){

    }

    static getAllThreads(){
        return Array.from(allThreads.entries());
    }

}
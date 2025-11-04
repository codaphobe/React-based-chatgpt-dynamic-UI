export default class ThreadUtils {
    constructor() {
        this.allChats = new Map();
        this.allThreads = new Map();
    }

    initializeThreads(chatContainer) {
        
        // Collect all chats
        this.collectAllChats(chatContainer);
        
        // Build threads from chats
        this.buildThreads();
    }
    
    collectAllChats(chatContainer) {
        const articles = chatContainer.querySelectorAll("article");
        
        if (articles.length === 0) {
            console.log("No articles found in chat container.");
            return;
        }
        
        if (articles.length === this.allChats.size) {
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
        
    buildThreads(){
        
        if(this.allChats.size===0){
            console.log("No chats available to build threads.");
            return;
        }

        let threadCount = 0;
        for(let i=0;i<this.allChats.size;i++){
            const user = this.allChats.get(`conversation-turn-${i+1}`);
            const assistant = this.allChats.get(`conversation-turn-${i+2}`);

            if (user["turn"] === "user" && assistant["turn"]==="assistant"){
                this.allThreads.set(`thread-id-${threadCount}`,{
                    user : user["element"],
                    assistant : assistant["element"],
                    collapsed :true
                })
                threadCount++;
                i++;
            }   
        }
        console.log(this.allThreads);
    }
    
    addNewChat(articles){
        if (articles.length === 0) {
            console.log("No articles found in chat container.");
            return;
        }
        
        articles.forEach((article) => {
            this.allChats.set(article.attributes.getNamedItem("data-testid").value,{
            "element":article,
            "turn":article.attributes.getNamedItem('data-turn').value
            });
        });
        console.log(this.allChats);
    }
    
    addNewThread(){
        
    }
}
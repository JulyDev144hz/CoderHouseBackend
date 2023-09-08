class ChatDTO{
    constructor(chat){
        this.user = chat.user
        this.message = chat.message
        this.createdAt = chat.createdAt
    }
}
module.exports = ChatDTO
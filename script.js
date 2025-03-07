import { messages } from './data.js'

var messageIndex = 0
const chatMessages = document.getElementById("chatMessages")
chatMessages.innerHTML = ""

function createMessageElement(message) {
    const newMessage = document.createElement("div")
    newMessage.classList.add("chatMessage")

    const profilePic = document.createElement("div")
    profilePic.classList.add("chatProfilePic")
    profilePic.style = `--profile-img: url('./images/profilesImages/${messages[messageIndex]["author"]["profile"]}')`
    newMessage.appendChild(profilePic)


    const profileName = document.createElement("span")
    profileName.classList.add("chatProfileName")
    profileName.appendChild(document.createTextNode(message["author"]["name"]))

    const messageTime = document.createElement("span")
    messageTime.classList.add("chatMessageTime")
    const curTime = new Date()
    const timeString = curTime.getHours() + ":" + (curTime.getMinutes() < 10 ? "0" : "") + curTime.getMinutes()
    messageTime.appendChild(document.createTextNode("Today at " + timeString))

    const messageHeader = document.createElement("div")
    messageHeader.classList.add("chatMessageHeader")
    messageHeader.appendChild(profileName)
    messageHeader.appendChild(messageTime)

    const messageContent = document.createElement("div")
    messageContent.classList.add("chatMessageContent")
    messageContent.appendChild(document.createTextNode(message["text"]))

    const messageDetails = document.createElement("div")
    messageDetails.classList.add("chatMessageDetails")
    messageDetails.appendChild(messageHeader)
    messageDetails.appendChild(messageContent)
    newMessage.appendChild(messageDetails)

    return newMessage
}

// Add first 3 messages
while (messageIndex < 3) {

    const newMessage = createMessageElement(messages[messageIndex])
    chatMessages.appendChild(newMessage)
    messageIndex = (messageIndex + 1) % messages.length
}

const messageDelay = 2000

function AddNextMessage() {
    chatMessages.classList.add("chatMessagesSlide")
    setTimeout(() => {
        chatMessages.classList.remove("chatMessagesSlide")
        chatMessages.removeChild(chatMessages.childNodes[0])
        const newMessage = createMessageElement(messages[messageIndex])
        SetTypingMessage()
        newMessage.classList.add("chatMessageAppear")
        setTimeout(() => {
            newMessage.classList.remove("chatMessageAppear")
        }, 200)
        chatMessages.appendChild(newMessage)
        messageIndex = (messageIndex + 1) % messages.length
        setTimeout(AddNextMessage, messageDelay)
    }, 400)
}

function GenerateTypingMessage() {
    const typingUsers = new Set()

    for (var i = 0; i < 3; i++) {
        var messageI = (i + messageIndex) % messages.length

        typingUsers.add(messages[messageI].author.name)
    }

    const userNames = [...typingUsers]
    var peopleTyping = userNames.join(" and ")
    if (userNames.length >= 3) {
        peopleTyping = "Several people"
    }
    return peopleTyping + " are typing..."
}

var typingMessageEl = document.getElementById("chatTypingMessageContents")

function SetTypingMessage() {
    const message = GenerateTypingMessage()
    typingMessageEl.innerHTML = message
}


setTimeout(AddNextMessage, [2000, 4000, 6000][Math.floor(Math.random() * 3)]);
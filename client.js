// Connect to the Socket.io server
const socket = io("http://192.168.1.95:3000");
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');//selctionne l'element id 
const messagesContainer = document.getElementById('messages');
const userName = generateRandomUsername(); // Add a username


/*function that clear the element when an event is activated*/
clearInputField = (eventListener,elementClassName)=>{
    var inputElementClass = document.getElementsByClassName(elementClassName);
    for (var i=0; i<inputElementClass.length; i++){
        inputElementClass[i].addEventListener(eventListener, function(){
            var selectInputField = this.parentElement.querySelector("."+elementClassName);
            selectInputField.value = "";
        });
    };
}


/*
a function that send message in the form of an object or hashmap
the object is called message => composed by a username and text
*/
sendMessage = ()=>{
    const text = messageInput.value.trim(); // Get the trimmed text from the input field
    if (text) {
      //creation of the hasmap of message
      const message = {
        userName: userName,
        text: text
      };
  
      // Create a container for the sent message
      const sentMessageContainer = document.createElement('div');
      sentMessageContainer.classList.add('message-sent');
  
      // Create elements for username and message text
      const userNameElement = document.createElement('span');
      userNameElement.textContent = "Me: " + message.userName;
  
      const textElement = document.createElement('p');
      textElement.textContent = message.text;
  
      // Append elements to the container
      sentMessageContainer.appendChild(userNameElement);
      sentMessageContainer.appendChild(textElement);
  
      // Append the container to the messages container
      messagesContainer.appendChild(sentMessageContainer);
  
      // Send the message to the server
      socket.emit('chat-message', message);
  
      messageInput.value = ''; // Clear the input field
    }

}

//A function that link an eventAction with the function sendMessage
function sendMessageLink(elementIdInjected, eventOne = "click", eventTwo = "keydown") {
  const element = document.getElementById(elementIdInjected);
  element.addEventListener(eventOne, () => {
    sendMessage();
  });
  messageInput.addEventListener(eventTwo, (event) => {
    if (event.key === 'Enter') {
      // Prevent the default Enter key behavior (e.g., form submission)
      event.preventDefault();
      sendMessage();
      
}})};

/*
snnipet of code to test the reception of the client side
socket.on("chat-message",(message)=>{
  console.log("Ecoute");
  console.log(message.text);
});*/

//Function arrow that display the received message that we doesnt send


displayReceiveMessage =(userName) =>{
  socket.on("chat-message",(message)=>{
    console.log("ahahah");
    if (userName !== message.userName){
      //Creation of an element div where we add the class message-received
      const messageContainer = document.createElement("div");
      messageContainer.classList.add("message-received");
      //Creation of an element span add the text Username of the socket
      const userNameElement= document.createElement("span");
      userNameElement.textContent = message.userName;
      //creation of an element p add the text 
      const textElement = document.createElement("p");
      textElement.textContent = message.text;
      //add a child in the container message container
      messageContainer.appendChild(userNameElement);
      messageContainer.appendChild(textElement);
      //append the message container to the message container
      messagesContainer.appendChild(messageContainer);
    }
  })
};


clearInputField("click","text");
sendMessageLink("send-button");
displayReceiveMessage(userName);


/*
Bug meet in this project:
->when you change the name of the js file in the html file but does not reload the website
   ->Quit the window and relaunch this window

*/
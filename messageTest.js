// Connect to the Socket.io server


/*function that clear the element when an event is activated*/
function clearInputField(eventListener,elementClassName){
    var inputElementClass = document.getElementsByClassName(elementClassName);
    for (var i=0; i<inputElementClass.length; i++){
        inputElementClass[i].addEventListener(eventListener, function(){
            var selectInputField = this.parentElement.querySelector("."+elementClassName);
            selectInputField.value = "";
        });
    }
}

clearInputField("click","text");

const socket = io('http://localhost:3000');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messagesContainer = document.getElementById('messages');
const userName = generateRandomUsername(); // Add a username

// Event listener for the send button
sendButton.addEventListener('click', () => {
  const text = messageInput.value.trim();
  if (text) {
    const message = {
      userName: userName,
      text: text
    };

    // Create a container for the sent message
    const sentMessageContainer = document.createElement('div');
    sentMessageContainer.classList.add('message-sent');

    // Create elements for username and message text
    const userNameElement = document.createElement('span');
    userNameElement.textContent = "Me";

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
});

// Event listener for receiving chat messages from the server
socket.on('chat-message', (message) => {
  // Append the received message to the messages container
  if (userName !== message.userName) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message-received');

    const userNameElement = document.createElement('span');
    userNameElement.textContent = message.userName;

    const textElement = document.createElement('p');
    textElement.textContent = message.text;

    messageContainer.appendChild(userNameElement);
    messageContainer.appendChild(textElement);

    messagesContainer.appendChild(messageContainer);
  }
});


/*DECLARATION OF THE VARIABLE*/
// Connect to the Socket.io server
const socket = io("http://192.168.1.95:3000");
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');//selctionne l'element id 
const messagesContainer = document.getElementById('messages');
const userName = generateRandomUsername(); // Add a username


/*EVENT FUNCTION*/


// Modify detectFile to accept a callback function




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





/*SOCKET FUNCTION*/


function sendFile(file) {
  const reader = new FileReader();

  reader.onload = function(event) {
    const fileData = event.target.result;

    // Create a message object that includes the file data
    const message = {
      userName: userName,
      fileData: fileData,
      fileName: file.name // You can also include the file name if needed
    };

    // Create a container for the sent message
    const sentMessageContainer = document.createElement('div');
    sentMessageContainer.classList.add('message-sent');
   
    // Create elements for username and img file
    const userNameElement = document.createElement('span');
    userNameElement.textContent = "Me: " + message.userName;
    const imageElement = document.createElement('img');
    imageElement.src = message.fileData;
    // Append elements to the container
    sentMessageContainer.appendChild(userNameElement);
    sentMessageContainer.appendChild(imageElement);
    // Append the container to the messages container
    messagesContainer.appendChild(sentMessageContainer);
    

    // Emit the message with the file data to the server
    socket.emit('chat-message', message);

    // Clear the file input field
    const fileInput = document.getElementById('file-input');
    fileInput.value = '';
  };

  reader.readAsDataURL(file);
}



// Modify the detectFile function to call sendFile when a file is selected
function detectFile(elementClassName) {
  const fileInputs = document.getElementsByClassName(elementClassName);

  for (let i = 0; i < fileInputs.length; i++) {
    const fileInput = fileInputs[i];

    fileInput.onchange = function(event) {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        console.log("A file has been selected");
        sendFile(selectedFile); // Call sendFile with the selected file
      } else {
        console.log("No file selected");
      }
    };
  }
}

// Usage example: Call detectFile to handle file uploads
detectFile("file-input");


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

// Function to display received messages and images
 displayReceiveMessage = (userName) => {
  socket.on("chat-message", (message) => {
    if (userName !== message.userName) {
      // Creation of an element div where we add the class message-received
      const messageContainer = document.createElement("div");
      messageContainer.classList.add("message-received");
      
      // Creation of an element span to display the username
      const userNameElement = document.createElement("span");
      userNameElement.textContent = message.userName;

      // Check if the message contains image data
      if (message.fileData) {
        // Create an image element to display the image
        const imageElement = document.createElement("img");
        imageElement.src = message.fileData; // Set the image source

        // Append the image element to the message container
        messageContainer.appendChild(userNameElement);
        messageContainer.appendChild(imageElement);
      } else {
        // Creation of an element p to display the text message
        const textElement = document.createElement("p");
        textElement.textContent = message.text;

        // Append the elements to the message container
        messageContainer.appendChild(userNameElement);
        messageContainer.appendChild(textElement);
      }

      // Append the message container to the messages container
      messagesContainer.appendChild(messageContainer);
    }
  });
}


/*SCRIPT*/







clearInputField("click","text");
sendMessageLink("send-button");
displayReceiveMessage(userName);


/*
Bug meet in this project:
->when you change the name of the js file in the html file but does not reload the website
   ->Quit the window and relaunch this window

*/
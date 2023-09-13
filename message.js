//Import of the module
const socket = io();






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




/* function that takes as argument an element when click send the data of another element to a server (console)*/

function sendMessageByClick(elementClassNameSend, elementClassNameInput){
    
    const computerID = os.hostname();
    var sendButtons = document.getElementsByClassName(elementClassNameSend);
    var inputData = document.getElementsByClassName(elementClassNameInput)
    
    for (var i = 0; i<sendButtons.length; i++){
        sendButtons[i].addEventListener("click", function(){
            //Get the element associated with the class name
            var currentInputElement = this.parentElement.querySelector("."+elementClassNameInput);
            var getInputData = currentInputElement.value;
            //Formate the data to send to the server node.js
            
            console.log(dataToSend);
            currentInputElement.value = "";//Clear the text in the input field when we send the text
        });
    }

}

clearInputField("click","text");
sendMessageByClick("send", "text");
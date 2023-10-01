
//import des bibliothèques nécessaires
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const corsOptions = { origin: "*" };
const mongoose = require ("mongoose");




//setting the server class
class Server {
  constructor() {
    //setting the server
    this.app = express();
    this.server = http.createServer(this.app);
    this.ioSocket = socketIo(this.server); // apply a socket between my client side and my server side
    this.app.use(express.static(__dirname)); // accessing static files in this folder
    this.app.use(cors(corsOptions));
  }  

  

  listenEventServer = () => {

    //Handle the connection
    this.ioSocket.on("connection", (socket) => {
      console.log("A user is connected");
      

      //Handle the chat
      socket.on("chat-message", (message) => {
        this.ioSocket.emit("chat-message", message);
        console.log(message);
      });
      //handle the disconnection
      socket.on("disconnect", (socket) => {
        console.log("A user is disconnected");
      })
      });
    };

  installServer = (port, ipAddress = "localhost") => {
    this.port = port;
    this.ipAddress = ipAddress;
    this.server.listen(this.port, this.ipAddress, () => {
      console.log(`server is running on http://${this.ipAddress}:${this.port}/chat_room.html`);
      console.log(`server is running on http://${this.ipAddress}:${this.port}/menu.html`);
    });
  };}


/*SCRIPT*/
const chatServer = new Server();
chatServer.listenEventServer();
chatServer.installServer(3000, ipAddress = "192.168.1.95");

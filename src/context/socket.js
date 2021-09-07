import socketio from "socket.io-client";
import React from 'react'
import constants from '../Constants';
const SOCKET_URL = constants.URL;

export const socket = socketio.connect(SOCKET_URL);
export const SocketContext = React.createContext();
import { createContext, useContext } from 'react';
import { Socket } from 'socket.io-client';

const socketContext = createContext<Socket | null>(null);

export const useSocketContext = () => useContext(socketContext);

export default socketContext;
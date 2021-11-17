import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import socketContext from '../context/socketContext';

interface ISocketContextProvider {
    children: any;
}

const SocketContextProvider = ({children}: ISocketContextProvider) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socket = io();

        socket.on('connect', () => {
            setSocket(socket);
        })
    }, []);

    return (
        <socketContext.Provider value={socket}>
            {children}
        </socketContext.Provider>
    )
}

export default SocketContextProvider;
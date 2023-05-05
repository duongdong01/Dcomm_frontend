import { io } from 'socket.io-client'

class SocketioService {
  // eslint-disable-next-line no-useless-constructor
  constructor () { }

  setupSocketConnection () {
    window.socket = io('https://dcomm-api.onrender.com', {
      auth: {
        token: window.localStorage.getItem('access_token')
      },
      transports: ['websocket'],
      autoConnect: true,
      upgrade: false,
      reconnection: true
    })
    console.log('connect socket')
  }

  disconnect (data) {
    console.log('Disconnect socket')
    if (window.socket) {
      window.socket.disconnect(data)
    }
  }
}

export default new SocketioService()

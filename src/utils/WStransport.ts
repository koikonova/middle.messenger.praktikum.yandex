import EventBus from "./EventBus";

export enum WSTransportEvents {
    // eslint-disable-next-line no-unused-vars
  Connected = 'connected',
  // eslint-disable-next-line no-unused-vars
  Error = 'error',
  // eslint-disable-next-line no-unused-vars
  Message = 'message',
  // eslint-disable-next-line no-unused-vars
  Close = 'close',
}

export class WSTransport extends EventBus {
    private socket: WebSocket | null = null
    private pingInterval: number
    // eslint-disable-next-line no-unused-vars
    constructor(private url: string) {
        super()
        this.pingInterval = 0;
    }

    public send(data: unknown) {
        if (!this.socket) {
            throw new Error('Socket is not connected')
        }

        this.socket.send(JSON.stringify(data))
    }

    public connect(): Promise<void> {
        this.socket = new WebSocket(this.url)

        this.subscribe(this.socket)

        this.setupPing()

        return new Promise((resolve) => {
            this.on(WSTransportEvents.Connected, () => {
                resolve()
            })
        })
    }

    public close() {
        this.socket?.close()
    }

    private setupPing() {
        this.pingInterval = window.setInterval(() => {
            this.send({ type: 'ping' })
        }, 5000)

        this.on(WSTransportEvents.Close, () => {
            clearInterval(this.pingInterval)

            this.pingInterval = 0
        })
    }

    private subscribe(socket: WebSocket) {
        socket.addEventListener('open', () => {
            this.emit(WSTransportEvents.Connected)
        })
        socket.addEventListener('close', () => {
            this.emit(WSTransportEvents.Close)
        })

        socket.addEventListener('error', (e) => {
            this.emit(WSTransportEvents.Error, e)
        })

        socket.addEventListener('message', (message) => {
            const data = JSON.parse(message.data)

            if (data.type && data.type === 'pong') {
                return
            }

            this.emit(WSTransportEvents.Message, data)
        })
    }
}

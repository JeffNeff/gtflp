package controller

import (
	"log"

	"github.com/google/uuid"
	"golang.org/x/net/websocket"
)

var (
	logsManager logsClientManager
)

type logsClientManager struct {
	clients    map[*logsClient]bool
	broadcast  chan interface{}
	register   chan *logsClient
	unregister chan *logsClient
}

func (logsManager *logsClientManager) start() {
	for {
		select {
		case conn := <-logsManager.register:
			logsManager.clients[conn] = true
		case conn := <-logsManager.unregister:
			if _, ok := logsManager.clients[conn]; ok {
				close(conn.send)
				delete(logsManager.clients, conn)
			}
		case message := <-logsManager.broadcast:
			log.Printf("Broadasting to %d clients: %+v", len(logsManager.clients), message)
			for conn := range logsManager.clients {
				log.Printf("Broadasting message to logsClient %s", conn.id)
				select {
				case conn.send <- message:
				default:
					close(conn.send)
					delete(logsManager.clients, conn)
				}
			}
		}
	}
}

func (logsManager *logsClientManager) send(message interface{}) {
	for conn := range logsManager.clients {
		conn.send <- message
	}
}

type logsClient struct {
	id     string
	socket *websocket.Conn
	send   chan interface{}
}

func (c *logsClient) write() {
	defer func() {
		c.socket.Close()
	}()

	for {
		select {
		case message, ok := <-c.send:
			log.Printf("On send %v - %v", message, ok)
			if !ok {
				log.Println("Unable to sent")
				return
			}
			websocket.JSON.Send(c.socket, message)
		}
	}
}

func init() {
	logsManager = logsClientManager{
		broadcast:  make(chan interface{}, 100),
		register:   make(chan *logsClient),
		unregister: make(chan *logsClient),
		clients:    make(map[*logsClient]bool),
	}
	go logsManager.start()

}

func (c *Controller) LogsWSHandler(ws *websocket.Conn) {
	log.Println("WS connection...")

	logsClient := &logsClient{
		id:     uuid.New().String(),
		socket: ws,
		send:   make(chan interface{}),
	}
	logsManager.register <- logsClient
	logsClient.write()
}

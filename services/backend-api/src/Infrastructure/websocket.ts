import WebSocket, { WebSocketServer } from "ws";
import http from "http";

export function initWebSocket(
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
) {
  console.log("init websocket");
  // Websocket

  const wss = new WebSocketServer({ noServer: true });
  const messages: string[] = [];

  wss.on("connection", function connection(ws) {
    console.log("New client connected");
    ws.on("error", onSocketPostError);

    //ws.on("error", console.error);
    messages.forEach((m) => ws.send(m));
    ws.on("message", (message) => {
      console.log("Received: %s", message);

      // Broadcast to all connected clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message.toString());
        }
      });

      ws.on("close", () => {
        console.log("Client disconnected");
      });
    });
  });

  function onSocketPreError(e: Error) {
    console.log("pre error: ", e);
  }

  function onSocketPostError(e: Error) {
    console.log("post error ", e);
  }

  // Handle HTTP upgrade requests
  server.on("upgrade", (request, socket, head) => {
    console.log("upgrade");
    socket.on("error", onSocketPreError);

    // TODO: add auth

    wss.handleUpgrade(request, socket, head, (ws) => {
      socket.removeListener("error", onSocketPreError);
      wss.emit("connection", ws, request);
    });
  });
}

import net from "net";

const server = net.createServer();

const clients = [];

server.on("connection", (socket) => {
  console.log("New connection to the server");
  const clientId = clients.length + 1;

  clients.map((client)=>{
    client.socket.write(`User ${clientId} joined`)
  })

  socket.write(`id-${clientId}`);
  socket.on("data", (data) => {
    const dataString = data.toString("utf-8").split("-"); // [id , message ]
    clients.map((client) => {
      client.socket.write(`> User ${dataString[0]}: ${dataString[2]}`);
    });
  });
  socket.on('end', ()=>{
    clients.map((client)=>{
        client.socket.write(`User ${clientId} left!`)
    })
  })
  clients.push({ id: clientId.toString(), socket });
  console.log(clients);
});

server.listen(3008, "127.0.0.1", () => {
  console.log("Server running on port", server.address());
});

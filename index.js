const app = require("./api/server.js");

const port = process.env.port || 8080;

app.listen(port, () => {
  console.log(`\n*** Server running on port ${ port } ***\n`);
});
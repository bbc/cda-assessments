const { default: server } = require('./server');
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Commonwealth games server listening at http://localhost:${port}`);
});

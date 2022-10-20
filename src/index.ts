/* eslint-disable no-process-exit */
import * as http from 'http';
import App from './app';

const server = http.createServer(new App().express);
const port = '3000';
// Error process
server.on('error', (error: NodeJS.ErrnoException) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  switch (error.code) {
    case 'EACCES':
      process.exit(1);
    case 'EADDRINUSE':
      process.exit(1);
    default:
      throw error;
  }
});

//listen
server.listen(port, () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr!.port}`;
  console.info(`Listening on ${bind}`);
});

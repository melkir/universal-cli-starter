import * as http from 'http';
import App from '../app';

const port = 3000;
App.set('port', port);

const server = http.createServer(App);
server.listen(port);
server.on('listening', onListening);

function onListening(): void {
  console.log('Listening on port ' + port);
}

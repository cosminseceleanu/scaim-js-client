const Logger = (() => {
	const attachListeners = (connection) => {
		connection.onConnect(() => log('Connected'));
		connection.onDisconnect(() => log('Disconnected'));
		connection.onError(e => log('Error -->', e));
		connection.onMessageReceived(event => log(`Message received from ${event.detail.from}`));
		connection.onMessageAck(event => log(`Message ack for ${event.detail.id}`));
		connection.onReadReceived(event => log(`Read received from ${event.detail.from}`));
		connection.onReadAck(event => log(`Read ack for ${event.detail.id}`));
	};

	const log = message => console.log(message);

	return {
		attachListeners,
		log,
	};
})();

export default Logger;

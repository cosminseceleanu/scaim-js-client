import Connection from './Connection';
import {Events} from './events';
import Logger from './Logger';

export const Scaim = (() => {
	const fetchToken = (scaimServerUri, username, password, onTokenFetched, onError) => {
		fetch(`${scaimServerUri}/users/auth`, {
			method: 'POST',
			body: JSON.stringify({username, password}),
			headers: {'Content-Type': 'application/json'},
		}).then(response => response.json())
			.then(token => onTokenFetched(token))
			.catch(e => onError(e));
	};

	const connect = (host, token, debug = false) => {
		const socket = new WebSocket(`ws://${host}/ws?token=${token}`);
		const connection = Connection(socket);
		connection.onEventReceived(broadcastReceivedEventsListener);
		if (debug) {
			Logger.attachListeners(connection);
		}
		connection.onPing(event => connection.sendPong(event.detail));

		return connection;
	};

	const broadcastReceivedEventsListener = (connectionEvent) => {
		const {event, payload} = JSON.parse(connectionEvent.data);

		switch (event) {
			case Events.MESSAGE_RECEIVED:
				dispatchEvent(Events.MESSAGE_RECEIVED, JSON.parse(payload));
				break;
			case Events.MESSAGE_ACK:
				dispatchEvent(Events.MESSAGE_ACK, JSON.parse(payload));
				break;
			case Events.READ_RECEIVED:
				dispatchEvent(Events.READ_RECEIVED, JSON.parse(payload));
				break;
			case Events.READ_ACK:
				dispatchEvent(Events.READ_ACK, JSON.parse(payload));
				break;
			case Events.SUBSCRIBER_ONLINE:
				dispatchEvent(Events.SUBSCRIBER_ONLINE, JSON.parse(payload));
				break;
			case Events.SUBSCRIBER_OFFLINE:
				dispatchEvent(Events.SUBSCRIBER_OFFLINE, JSON.parse(payload));
				break;
			case Events.ERROR:
				dispatchEvent(Events.ERROR, payload);
				break;
			case Events.PING:
				dispatchEvent(Events.PING, payload);
				break;
			default:
				throw new Error(`Event of type ${event} is not supported`);
		}
	};

	const dispatchEvent = (name, data) => {
		document.dispatchEvent(new CustomEvent(name, {detail: data}));
	};

	return { connect, fetchToken };
})();

export default Scaim;

import md5 from 'blueimp-md5';
import {Events, Message, Read, Event} from './events';


const Connection = (socket) => {
	const onConnect = listener => socket.addEventListener('open', listener);
	const onDisconnect = listener => socket.addEventListener('close', listener);
	const onError = listener => socket.addEventListener('error', listener);
	const onEventReceived = listener => socket.addEventListener('message', listener);
	const onMessageReceived = listener => document.addEventListener(
		Events.MESSAGE_RECEIVED,
		listener,
	);
	const onMessageAck = listener => document.addEventListener(Events.MESSAGE_ACK, listener);
	const onReadReceived = listener => document.addEventListener(Events.READ_RECEIVED, listener);
	const onReadAck = listener => document.addEventListener(Events.READ_ACK, listener);

	const sendMessage = (from, to, data, attributes = {}, id = null) => {
		const msgId = id || generateId(from, data);
		const message = Message(msgId, from, to, data, attributes);
		sendEvent(Events.MESSAGE, message);

		return message.id;
	};

	const sendRead = (from, to, attributes = {}, id = null) => {
		const readId = id || generateId(from, 'read');
		const read = Read(readId, from, to, attributes);
		sendEvent(Events.READ, read);

		return read.id;
	};

	const sendEvent = (name, payload) => {
		const event = Event(name, payload);

		socket.send(JSON.stringify(event));
	};

	const generateId = (from, namespace) => {
		const value = `${from}-${namespace}`;

		return md5(value, Date.now());
	};

	const disconnect = () => socket.close();

	return {
		onConnect,
		onDisconnect,
		onError,
		onEventReceived,
		onMessageReceived,
		onReadReceived,
		onMessageAck,
		onReadAck,
		sendMessage,
		sendRead,
		generateId,
		disconnect,
	};
};

export default Connection;

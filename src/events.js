export const Events = {
	MESSAGE: 'message',
	MESSAGE_ACK: 'message.ack',
	MESSAGE_RECEIVED: 'message.received',
	READ: 'read',
	READ_ACK: 'read.ack',
	READ_RECEIVED: 'read.received',
	ERROR: 'error',
	PING: 'ping',
	PONG: 'pong',
	SUBSCRIBER_ONLINE: 'subscriber.online',
	SUBSCRIBER_OFFLINE: 'subscriber.offline',
};

export const Message = (id, from, to, data, attributes = {}) => ({
	id,
	from,
	to,
	text: data,
	attributes,
});

export const Read = (id, from, to, attributes = {}) => ({ id, from, to, attributes });

export const Event = (name, payload) => ({
	event: name,
	payload: JSON.stringify(payload),
});

export const Events = {
    MESSAGE: "message",
    MESSAGE_ACK: "message.ack",
    MESSAGE_RECEIVED: "message.received",
    READ: "read",
    READ_ACK: "read.ack",
    READ_RECEIVED: "read.received",
    ERROR: "error"
};

export const Message = (id, from, to, data, attributes = {}) => {
    return {
        id: id,
        from: from,
        to: to,
        text: data,
        attributes: attributes
    }
};

export const Read = (id, from, to, attributes = {}) => {
    return {
        id: id,
        from: from,
        to: to,
        attributes: attributes
    }
};

export const Event = (name, payload) => {
    return {
        event: name,
        payload: JSON.stringify(payload)
    }
};

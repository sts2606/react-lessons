const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {
  dialogs: [
    { id: 1, name: 'Vasya' },
    { id: 2, name: 'Petya' },
    { id: 3, name: 'Kolya' },
    { id: 4, name: 'Marina' },
  ],
  messages: [
    { id: 1, message: 'Message 1' },
    { id: 2, message: 'Message 2' },
    { id: 3, message: 'Message 3' },
  ],
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      let body = action.newMessageBody;
      return {
        ...state,
        messages: [...state.messages, { id: 4, message: body }],
      };
    default:
      return state;
  }
};

export const sendMessageCreator = (newMessageBody) => {
  return { type: SEND_MESSAGE, newMessageBody };
};

export default dialogsReducer;

import profileReducer from './reducers/profileReducer';
import dialogsReducer from './reducers/dialogsReducer';

const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';

let store = {
  _state: {
    profilePage: {
      newPostText: 'react',
      posts: [
        { id: 1, message: 'Post 1', likesCount: 2 },
        { id: 2, message: 'Post 2', likesCount: 2 },
        { id: 3, message: 'Post 3', likesCount: 4 },
        { id: 4, message: 'Post 4', likesCount: 5 },
      ],
    },

    dialogsPage: {
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
      newMessageBody: '',
    },
  },

  getState() {
    return this._state;
  },

  _callSubscriber() {
    console.log('rerenderEntireTree');
  },

  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.profilePage = profileReducer(this._state.profilePage, action);

    this._callSubscriber(this._state);
  },
};

export default store;

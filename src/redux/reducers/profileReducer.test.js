import profileReducer, {
  addPostActionCreator,
  deletePost,
} from './profileReducer';

let state = {
  posts: [
    { id: 1, message: 'Post 1', likesCount: 2 },
    { id: 2, message: 'Post 2', likesCount: 2 },
    { id: 3, message: 'Post 3', likesCount: 4 },
    { id: 4, message: 'Post 4', likesCount: 5 },
  ],
};

test('length of posts should incremented', () => {
  let action = addPostActionCreator('TEST');

  let newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(5);
});

test('message of new post should be "TEST"', () => {
  let action = addPostActionCreator('TEST');

  let newState = profileReducer(state, action);
  expect(newState.posts[4].message).toBe('TEST');
});

test('after deleting length of messages should decrement', () => {
  let action = deletePost(1);

  let newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(3);
});

test('after deleting length of messages should not decrement if posts id is incorrect', () => {
  let action = deletePost(1.5);

  let newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(4);
});

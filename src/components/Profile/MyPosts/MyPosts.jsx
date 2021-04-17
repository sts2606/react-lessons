import React from 'react';
import { Field, reduxForm } from 'redux-form';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import {
  maxLengthCreator,
  required,
} from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';

const maxLength = maxLengthCreator(10);

const MyPosts = (props) => {
  const postElements = props.posts.map((post) => (
    <Post message={post.message} key={post.id} likesCount={post.likesCount} />
  ));

  let onAddPost = (values) => {
    props.addPost(values.newPostBody);
  };

  return (
    <div className={classes.postsBlock}>
      <h3>My Posts</h3>
      <AddNewPostFormRedux onSubmit={onAddPost} />
      <div className={classes.posts}>{postElements}</div>
    </div>
  );
};

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={Textarea}
          name="newPostBody"
          placeholder="Enter your post"
          validate={[required, maxLength]}
        />
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

const AddNewPostFormRedux = reduxForm({ form: 'postsAddMessageForm' })(
  AddNewPostForm
);
export default MyPosts;

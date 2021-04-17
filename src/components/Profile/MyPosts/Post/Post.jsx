import classes from './Post.module.css';

const Post = ({ message, likesCount }) => {
  return (
    <div className={classes.item}>
      <img
        src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"
        alt="user"
      />
      <p>{message}</p>
      <p>{`Likes ${likesCount}`}</p>
    </div>
  );
};

export default Post;

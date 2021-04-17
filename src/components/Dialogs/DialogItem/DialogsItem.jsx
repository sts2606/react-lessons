import { NavLink } from 'react-router-dom';
import classes from './../Dialogs.module.css';

const DialogItem = ({ id, name }) => {
  const url = `/dialog/${id}`;
  return (
    <div className={classes.dialog}>
      <NavLink to={url}>{name}</NavLink>
    </div>
  );
};

export default DialogItem;

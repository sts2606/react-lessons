import DialogItem from './DialogItem/DialogsItem';
import Message from './Message/Message';
import classes from './Dialogs.module.css';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../common/FormsControls/FormsControls';
import { maxLengthCreator, required } from '../../utils/validators/validators';

const maxLength = maxLengthCreator(100);

const Dialogs = (props) => {
  let state = props.dialogsPage;
  let dialogsElements = state.dialogs.map((dialog) => (
    <DialogItem id={dialog.id} name={dialog.name} key={dialog.id} />
  ));

  let messageElements = state.messages.map((message) => (
    <Message key={message.id} message={message.message} />
  ));

  const addNewMessage = (values) => {
    props.sendMessage(values.newMessageBody);
  };

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItems}>{dialogsElements}</div>
      <div className={classes.messages}>
        <div>{messageElements}</div>
        <AddMessageFormRedux onSubmit={addNewMessage} />
      </div>
    </div>
  );
};

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={Textarea}
          validate={[required, maxLength]}
          name="newMessageBody"
          placeholder="Enter your message"
        />
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  );
};

const AddMessageFormRedux = reduxForm({ form: 'dialogAddMessageForm' })(
  AddMessageForm
);

export default Dialogs;

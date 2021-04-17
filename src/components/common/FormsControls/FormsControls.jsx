import { Field } from 'redux-form';
import classes from './FormsControls.module.css';

export const Textarea = ({ input, meta, ...props }) => {
  const hasError = meta.error && meta.touched;
  return (
    <div
      className={classes.formControl + ' ' + (hasError ? classes.error : '')}
    >
      <div>
        <textarea {...input} {...props} />
      </div>
      {hasError && <span>{meta.error}</span>}
    </div>
  );
};

export const Input = ({ input, meta, ...props }) => {
  const hasError = meta.error && meta.touched;
  return (
    <div
      className={classes.formControl + ' ' + (hasError ? classes.error : '')}
    >
      <div>
        <input {...input} {...props} />
      </div>
      {hasError && <span>{meta.error}</span>}
    </div>
  );
};

export const createField = (
  placeholder,
  name,
  validators,
  component,
  props = {},
  text = ''
) => {
  return (
    <div>
      <Field
        placeholder={placeholder}
        component={component}
        name={name}
        validate={validators}
        {...props}
      />
      {text}
    </div>
  );
};

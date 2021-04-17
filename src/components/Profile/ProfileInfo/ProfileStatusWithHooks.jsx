import React, { useEffect, useState } from 'react';

const ProfileStatus = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);

    props.updateStatus(status);
  };

  return (
    <div>
      {!editMode && (
        <div>
          <span onDoubleClick={activateEditMode}>
            {props.status || 'STATUS'}
          </span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            value={status}
            onBlur={deactivateEditMode}
            autoFocus={true}
            onChange={onStatusChange}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileStatus;

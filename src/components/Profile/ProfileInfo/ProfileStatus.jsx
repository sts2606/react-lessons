import React, { Component } from 'react';
import Preloader from '../../common/Preloader/Preloader';
import classes from './ProfileInfo.module.css';

class ProfileStatus extends Component {
  state = {
    editMode: false,
    status: this.props.status,
  };

  onStatusChange = (e) => {
    this.setState({
      status: e.currentTarget.value,
    });
  };

  activateEditMode = () => {
    this.setState({
      editMode: true,
    });
  };

  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
    this.props.updateStatus(this.state.status);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status,
      });
    }
  }

  render() {
    return (
      <div>
        {!this.state.editMode && (
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status || 'STATUS'}
            </span>
          </div>
        )}
        {this.state.editMode && (
          <div>
            <input
              value={this.state.status}
              onBlur={this.deactivateEditMode}
              autoFocus={true}
              onChange={this.onStatusChange}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;

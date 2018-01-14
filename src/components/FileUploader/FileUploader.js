import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FileUploader.scss';

const TEXT_STATES = {
  default: 'Drag a file here to begin',
  ondrag: 'Drop the file to begin',
  ondrop: 'Processing your file....'
};

class FileUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: TEXT_STATES.default,
    };
  }

  dropHandler = (e) => {
    e.preventDefault();
    const { text } = this.state;
    if (text !== TEXT_STATES.ondrop) {
      this.setState({ text: TEXT_STATES.ondrop });
    }
  };

  dragHandler = (e) => {
    e.preventDefault();
    const { text } = this.state;
    if (text !== TEXT_STATES.ondrag) {
      this.setState({ text: TEXT_STATES.ondrag });
    }
  };

  render() {
    const { text } = this.state;
    return (
      <div className={ s.container }>
        <div
          className={ s.textbox }
          onDragOver={ this.dragHandler }
          onDrop={ this.dropHandler }
        >
          <span>{ text }</span>
        </div>
      </div>
    );
  }
}

export default withStyles(FileUploader, s);

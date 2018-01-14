import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FileUploader.scss';
import encryptFile from '../../utils/encryptfile';

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

  extractFile(ev) {
    const dt = ev.dataTransfer;
    let file;
    if (dt.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < dt.items.length; i++) {
        if (dt.items[i].kind === 'file') {
          file = dt.items[i].getAsFile();
        }
      }
    } else {
      console.log('not able to find file');
    }
    return file;
  }

  dropHandler = (ev) => {
    ev.preventDefault();
    const { text } = this.state;
    if (text !== TEXT_STATES.ondrop) {
      this.setState({ text: TEXT_STATES.ondrop });
    }
    const file = this.extractFile(ev);
    const { key, encryptedFile } = encryptFile(file);
    console.log('key =>', key);
    console.log('encryptedFile =>', encryptedFile);
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

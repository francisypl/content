import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FileUploader.scss';
import encryptFile from '../../utils/encryptfile';

const TEXT_STATES = {
  default: 'Drag a file here to begin',
  ondrag: 'Drop the file to begin',
  ondrop: 'Processing your file....',
};

class FileUploader extends Component {

  static contextTypes = {
    contract: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      text: TEXT_STATES.default,
    };
    this.dropHandler = this.dropHandler.bind(this);
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

  async dropHandler(ev) {
    ev.preventDefault();
    const { text } = this.state;
    if (text !== TEXT_STATES.ondrop) {
      this.setState({ text: TEXT_STATES.ondrop });
    }
    const file = this.extractFile(ev);
    const { key, encryptedFile } = await encryptFile(file);
<<<<<<< Updated upstream
    console.log('key =>', key);
    console.log('encryptedFile =>', encryptedFile);
=======
    const contractAddr = await deployContract(this.context.contract.contract, key, 1);
    // const contractAddr = '';
    const url = this.uploadtoS3(encryptedFile);
    this.setState({
      results: { key, url, contractAddr },
      download: `data:application/octet-stream,${encryptedFile}`,
    });
>>>>>>> Stashed changes
  }

  dragLeave = (e) => {
    e.preventDefault();
    this.setState({ text: TEXT_STATES.default });
  }

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
          onDragLeave={ this.dragLeave }
          onDrop={ this.dropHandler }
        >
          <span>{ text }</span>
        </div>
      </div>
    );
  }
}

export default withStyles(FileUploader, s);

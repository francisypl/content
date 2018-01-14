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
      results: { key: '', url: '' },
      download: '',
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

  uploadtoS3() {
    return 'https://www.google.com';
  }

  async dropHandler(ev) {
    ev.preventDefault();
    const { text } = this.state;
    if (text !== TEXT_STATES.ondrop) {
      this.setState({ text: TEXT_STATES.ondrop });
    }
    const file = this.extractFile(ev);
    const { key, encryptedFile } = await encryptFile(file);
    const url = this.uploadtoS3(encryptedFile);
    this.setState({
      results: { key, url },
      download: `data:application/octet-stream,${encryptedFile}`,
    });
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
    const { text, results, download } = this.state;
    const hasResults = results !== '' && download !== '';
    return (
      <div className={ s.container }>
        <div
          className={ s.textbox }
          onDragOver={ this.dragHandler }
          onDragLeave={ this.dragLeave }
          onDrop={ this.dropHandler }
        >
          <span>{ !hasResults && text }</span>
          {hasResults &&
              <div>
                <span>{'Private Key'}</span>
                <div className={ s.result }>{ results && results.key && results.key} }</div>
                <span>{'Encrypted Content Url'}</span>
                <div className={ s.result }>{ results && results.url && results.url }</div>
              </div>}
          { hasResults &&
            <a className={ s.downloadLink } href={ download }>
              Download Encrypted File</a> }
        </div>
      </div>
    );
  }
}

export default withStyles(FileUploader, s);

import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FileUploader.scss';
import encryptFile from '../../utils/encryptfile';
import { deployContract } from '../../utils/contract';

const TEXT_STATES = {
  default: 'Drag a file here to begin',
  ondrag: 'Drop the file to begin',
  ondrop: 'Processing your file....'
};
const Dropzone = require('react-dropzone');
const upload = require('superagent')

class FileUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: TEXT_STATES.default,
      results: { key: '', url: '' },
      download: '',
      contractAddr: '',
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


  uploadtoS3(file) {
    const { ciphertext: { words } } = file;

    var myFile = new File(words, "upload.txt");
    return upload.post('https://content-wcef.herokuapp.com/upload')
    .attach('file', myFile)
    .accept('json')
    .then((res) => {
      return res.body.url;
    })
    .catch(function(err){
      console.log("error caught: " + err);
    });
  }

  async dropHandler(ev) {
    ev.preventDefault();
    const { text } = this.state;
    if (text !== TEXT_STATES.ondrop) {
      this.setState({ text: TEXT_STATES.ondrop });
    }
    const file = this.extractFile(ev);
    var price_in_wei = 1;
    
    const { key, encryptedFile } = await encryptFile(file);
    const contractAddr = await deployContract(key, 1);
    const url = await this.uploadtoS3(encryptedFile);
    this.setState({
      results: { key, url, contractAddr },
      download: `data:application/octet-stream,${encryptedFile}`,
    });

    upload.post('https://content-wcef.herokuapp.com/content')
      .send({
        'contract_address': contractAddr,
        'file_url': url,
        'price_in_wei': price_in_wei
      })
      .accept('json')
      .then(res => {
        // make promotor endpoint
        // http://localhost:3001/contract/contractAddr/promotor/promotorId
        // <Link to=`http://localhost:3001/${contract_address}/${}`
      })
      .catch(err => console.log(err));
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
                <div className={ s.result }>{ results && results.key} }</div>
                <span>{'Encrypted Content Url'}</span>
                <div className={ s.result }>{ results && results.url }</div>
                <span>{'Contract Address'}</span>
                <div className={ s.result }>{ results && results.contractAddr }</div>
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

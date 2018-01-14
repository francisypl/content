import React, { Component } from 'react';

class PromoteLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      walletId: '',
      url: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    this.setState({ url: `${window.location.href}/${this.state.walletId}` });
    console.log(this.state.url);
  }

  render() {
    return (
      <div>
        <input
          onChange={event => this.setState({ walletId: event.target.value })}
        />
        <button onClick={this.onSubmit}>Get URL</button>
        <br />
        URL: {this.state.url}
        </div>
    );
  }
}
export default PromoteLink;

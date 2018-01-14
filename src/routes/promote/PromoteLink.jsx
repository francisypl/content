import React, { Component, PropTypes } from 'react';

class PromoteLink extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      walletId: '',
      url: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    this.setState({ url: `${window.location.hostname}/view/${this.props.id}/${this.state.walletId}` });
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

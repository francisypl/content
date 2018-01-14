
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ContentView.scss';

class ContentView extends Component {

  static propTypes = {
    path: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    title: PropTypes.string,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          {JSON.stringify(this.props)}
        </div>
      </div>
    );
  }

}

ContentView.propTypes = {
  id: PropTypes.string.isRequired,
  promoAddr: PropTypes.string.isRequired,
  contractAddress: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default withStyles(ContentView, s);

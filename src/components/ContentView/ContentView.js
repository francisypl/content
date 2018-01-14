
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ContentView.scss';
import Link from '../Link';

class ContentView extends Component {

  static propTypes = {
    path: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    title: PropTypes.string,
  };

  render() {
    const { price, id } = this.props;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.textbox}>
            <div className={s.price}>{`${price} wei`}</div>
            <button className={s.cButton}>{'Pay To View Content'}</button>
            <Link className={s.cButton} to={`/promote/${id}`}>
              <span className={s.btnText}>{'Promote'}</span>
            </Link>
          </div>
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

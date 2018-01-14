import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './View.scss';
import ContentView from '../../components/ContentView';

function View(props) {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <ContentView { ...props } />
      </div>
    </div>
  );
}

View.propTypes = {
  id: PropTypes.string.isRequired,
  promoAddr: PropTypes.string.isRequired,
  contractAddress: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default withStyles(View, s);

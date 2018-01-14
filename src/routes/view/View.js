import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './View.scss';

function View({ id }) {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{id}</h1>
        <p>...</p>
      </div>
    </div>
  );
}

View.propTypes = { id: PropTypes.string.isRequired };

export default withStyles(View, s);

import React from 'react';
import View from './View';

export const path = '/view/:id';
export const action = async (state) => {
  const id = state.params.id;
  return <View id={id} />;
};

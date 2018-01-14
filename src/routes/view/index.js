import React from 'react';
import View from './View';
import getDataWithId from '../../utils/api';

export const path = '/view/:id/:promoter_addr';
export const action = async (state) => {
  const id = state.params.id;
  const promoAddr = state.params.promoter_addr;
  const data = await getDataWithId(id);
  const props = {
    ...data,
    id,
    promoAddr,
  };

  return <View { ...props } />;
};

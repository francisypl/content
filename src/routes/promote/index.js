/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Promote from './Promote';
import PromoteLink from './PromoteLink';

export const path = '/promote/:id';
export const action = async (state) => {
  const title = 'Enter Wallet Address';
  const id = state.params.id;
  state.context.onSetTitle(title);
  return (
    <div>
      <Promote title={title} />
      <PromoteLink id={id} />
    </div>
  );
};

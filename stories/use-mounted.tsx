import React from 'react';
import { useMounted } from '@';

const Test = () => {
  const isMounted = useMounted();

  return <div>The app is {isMounted}</div>;
};

export default {
  title: 'useMounted',
};

export const Demo = () => <Test />;

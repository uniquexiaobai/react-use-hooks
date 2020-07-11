import React, { useState } from 'react';
import { useThrottle } from '@';

const Test = () => {
  const [count, setCount] = useState(0);
  const inc = useThrottle(() => {
    setCount(c => c + 1);
  }, 1000);

  return (
    <div>
      <h1 onClick={inc}>{count}</h1>
    </div>
  );
};

export default {
  title: 'useThrottle',
};

export const Demo = () => <Test />;

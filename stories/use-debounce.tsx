import React, { useState } from 'react';
import { useDebounce } from '@';

const Test = () => {
  const [count, setCount] = useState(0);
  const inc = useDebounce(() => {
    setCount(c => c + 1);
  }, 1000);

  return (
    <div>
      <h1 onClick={inc}>{count}</h1>
    </div>
  );
};

export default {
  title: 'useDebounce',
};

export const Demo = () => <Test />;

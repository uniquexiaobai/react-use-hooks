import React from 'react';
import { useCopyClipboard } from '@';

const Test = () => {
  const [isCopied, copy] = useCopyClipboard();

  const handleClick = () => {
    copy('text');
  };

  return (
    <button onClick={handleClick}>
      Was it copied? {isCopied ? 'Yes! 👍' : 'Nope! 👎'}
    </button>
  );
};

export default {
  title: 'useCopyClipboard',
};

export const Demo = () => <Test />;

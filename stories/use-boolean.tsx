import React from 'react';
import { useBoolean } from '@';
import { action } from '@storybook/addon-actions';

const Test = () => {
  const [on, toggle] = useBoolean(false);

  const onToggle = () => {
    toggle();
  };

  return <button onClick={onToggle}>{String(on)}</button>;
};

export default {
  title: 'useBoolean',
};

export const Demo = () => <Test />;

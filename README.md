# @lokibai/react-use-hooks

> react hooks

[![NPM](https://img.shields.io/npm/v/@lokibai/react-use-hooks.svg)](https://www.npmjs.com/package/@lokibai/react-use-hooks)

## Install

```bash
npm install --save @lokibai/react-use-hooks
```

## Usage

```jsx
import React from 'react';
import { useBoolean } from '@lokibai/react-use-hooks';

const App = () => {
  const [on, toggle] = useBoolean();

  const onToggle = () => {
    toggle();
  };

  return <button onClick={onToggle}>{String(on)}</button>;
};
```

## License

MIT © [](https://github.com/)

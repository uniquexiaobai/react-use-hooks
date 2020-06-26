# @lokibai/react-use-hooks

> react hooks

[![NPM](https://img.shields.io/npm/v/@lokibai/react-use-hooks.svg)](https://www.npmjs.com/package/@lokibai/react-use-hooks)

- [@lokibai/react-use-hooks](#-lokibai-react-use-hooks)
  * [Install](#install)
  * [Usage](#usage)
    + [useBoolean](#useboolean)
    + [useCopyClipboard](#usecopyclipboard)
    + [useInViewport](#useinviewport)
    + [useMounted](#usemounted)
    + [useDebounce/useThrottle](#usedebounce-usethrottle)
  * [License](#license)

## Install

```bash
npm install --save @lokibai/react-use-hooks
```

## Usage

### useBoolean

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

### useCopyClipboard

```jsx
import { useCopyClipboard } from '@lokibai/react-use-hooks';

const App = () => {
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
```

### useInViewport

```jsx
import { useInViewport } from '@lokibai/react-use-hooks';

const App = () => {
	const [isInViewport, ref] = useInViewport();

	React.useEffect(() => {
		console.log(isInViewport);
	}, [isInViewport]);

	return (
		<div
			ref={ref}
			style={{
				width: '200px',
				height: '200px',
				background: 'red',
				marginTop: '1000px',
			}}
		></div>
	);
};
```

### useMounted

```jsx
import { useMounted } from '@lokibai/react-use-hooks';

const App = () => {
	const isMounted = useMounted();

	return <div>The app is {isMounted}</div>;
};
```

### useDebounce/useThrottle

```jsx
import { useDebounce } from '@lokibai/react-use-hooks';

const App = () => {
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
```

## License

MIT © [](https://github.com/)

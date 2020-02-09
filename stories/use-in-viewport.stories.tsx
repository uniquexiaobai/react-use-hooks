import React from 'react';
import { useInViewport } from '@';

const Test = () => {
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

export default {
	title: 'useInViewport',
};

export const Demo = () => <Test />;

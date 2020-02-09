import React from 'react';
import { Hello } from '@';

export default {
	title: 'Hello',
};

export const toStorybook = () => <Hello />;

toStorybook.story = {
	name: 'Demo',
};

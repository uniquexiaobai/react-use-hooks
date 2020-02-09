import { useState } from 'react';

const copyPolyfill = (text: string) => {
	const textArea = document.createElement('textarea');

	textArea.style.position = 'absolute';
	textArea.style.top = '-9999px';
	textArea.style.left = '-9999px';
	textArea.value = text;

	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	try {
		return document.execCommand('copy');
	} catch (err) {
		console.log(err);
		return false;
	} finally {
		document.body.removeChild(textArea);
	}
};

const copy = (text: string) => {
	document.addEventListener('copy', function onCopy(e: any) {
		e.clipboardData.setData('text/plain', text);
		e.preventDefault();
		document.removeEventListener('copy', onCopy);
	});

	let isCopied;

	try {
		isCopied = document.execCommand('copy');
	} catch (err) {
		isCopied = false;
		console.log(err);
	}

	if (!isCopied) {
		isCopied = copyPolyfill(text);
	}

	return isCopied;
};

// TODO: Async Clipboard API
// https://developers.google.com/web/updates/2018/03/clipboardapi
const useCopyClipboard = (): [boolean, (x: string) => void] => {
	const [isCopied, setCopied] = useState<boolean>(false);

	return [
		isCopied,
		text => {
			const didCopy = copy(text);
			setCopied(didCopy);
		},
	];
};

export default useCopyClipboard;

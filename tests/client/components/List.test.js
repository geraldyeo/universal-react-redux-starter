import tape from 'tape';
import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';
import expect, { createSpy, spyOn, isSpy } from 'expect';

tape('it should throw', (test) => {
	test.doesNotThrow(() => {
		expect(1).toEqual(1);
	});
	test.end();
});

tape('it should fail', (test) => {
	test.equal(false, true, 'it should fail miserably.');
	test.end();
});

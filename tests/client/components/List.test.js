import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';
import expect, { createSpy, spyOn, isSpy } from 'expect';
import tape from 'tape';

tape('it should fail', (test) => {
	test.equal(false, true, 'it should fail miserably.');
	test.end();
});

import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';
import expect, { createSpy, spyOn, isSpy } from 'expect';

describe('List', () => {
	it('should fail', () => {
		expect(true).toBe(false);
	});
});

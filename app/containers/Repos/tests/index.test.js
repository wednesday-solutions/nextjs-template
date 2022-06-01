/**
 *
 * Tests for Repos container
 *
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom';
import { renderProvider } from '@utils/testUtils';
import { ReposTest as Repos } from '../index';

describe('<Repos /> container tests', () => {
  // let submitSpy

  beforeEach(() => {
    // submitSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<Repos recommendations={[]} />);
    expect(baseElement).toMatchSnapshot();
  });
});

import React from 'react';
import If from '../index';
import { renderProvider } from '@utils/testUtils';

describe('<If />', () => {
  it('Should renderProvider and match the snapshot', () => {
    const { baseElement } = renderProvider(<If />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should enter the true branch', () => {
    const { container } = renderProvider(
      <If condition={true} otherwise={<div />}>
        <span />
      </If>
    );
    expect(container).toMatchInlineSnapshot(`
      <div>
        <span />
      </div>
    `);
  });

  it('should enter the false branch', () => {
    const { container } = renderProvider(
      <If condition={false} otherwise={<div />}>
        <span />
      </If>
    );
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div />
      </div>
    `);
  });
});

import fonts from '../fonts';

describe('fonts', () => {
  it('should have the correct font-size', () => {
    expect(fonts.size.small()).toEqual(expect.arrayContaining([expect.stringContaining('font-size:1rem')]));
    expect(fonts.size.regular()).toEqual(expect.arrayContaining([expect.stringContaining('font-size:1.125rem;')]));
    expect(fonts.size.big()).toEqual(expect.arrayContaining([expect.stringContaining('font-size:1.75rem;')]));
    expect(fonts.size.large()).toEqual(expect.arrayContaining([expect.stringContaining('font-size:2.25rem;')]));
    expect(fonts.size.extraLarge()).toEqual(expect.arrayContaining([expect.stringContaining('font-size:3rem;')]));
  });
  it('should have the correct font-weight', () => {
    expect(fonts.weights.light()).toEqual(expect.arrayContaining([expect.stringContaining('font-weight:300;')]));
    expect(fonts.weights.bold()).toEqual(expect.arrayContaining([expect.stringContaining('font-weight:500;')]));
    expect(fonts.weights.normal()).toEqual(expect.arrayContaining([expect.stringContaining('font-weight:normal;')]));
  });

  it('should have the correct font-weight and font-size', () => {
    expect(fonts.style.heading()).toEqual(expect.arrayContaining([expect.stringContaining('font-weight:500;')]));
    expect(fonts.style.heading()).toEqual(expect.arrayContaining([expect.stringContaining('font-size:2.25rem;')]));

    expect(fonts.style.subheading()).toEqual(expect.arrayContaining([expect.stringContaining('font-weight:500;')]));
    expect(fonts.style.subheading()).toEqual(expect.arrayContaining([expect.stringContaining('font-size:1.75rem;')]));

    expect(fonts.style.standard()).toEqual(expect.arrayContaining([expect.stringContaining('font-size:1.125rem;')]));
    expect(fonts.style.standard()).toEqual(expect.arrayContaining([expect.stringContaining('font-weight:normal;')]));

    expect(fonts.style.subText()).toEqual(expect.arrayContaining([expect.stringContaining('font-size:1rem;')]));
    expect(fonts.style.subText()).toEqual(expect.arrayContaining([expect.stringContaining('font-weight:normal;')]));
  });
});

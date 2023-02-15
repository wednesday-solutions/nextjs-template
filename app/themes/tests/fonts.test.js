import fonts from '../fonts';

describe('fonts', () => {
  it('should have the correct font-size', () => {
    expect(
      fonts.size
        .small()
        .styles.replace(/[\r\n\s]+/gm, '')
        .trim()
    ).toBe('font-size:1rem;');
    expect(
      fonts.size
        .regular()
        .styles.replace(/[\r\n\s]+/gm, '')
        .trim()
    ).toBe('font-size:1.125rem;');
    expect(
      fonts.size
        .big()
        .styles.replace(/[\r\n\s]+/gm, '')
        .trim()
    ).toBe('font-size:1.75rem;');
    expect(
      fonts.size
        .large()
        .styles.replace(/[\r\n\s]+/gm, '')
        .trim()
    ).toBe('font-size:2.25rem;');
    expect(
      fonts.size
        .extraLarge()
        .styles.replace(/[\r\n\s]+/gm, '')
        .trim()
    ).toBe('font-size:3rem;');
  });
  it('should have the correct font-weight', () => {
    expect(
      fonts.weights
        .light()
        .styles.replace(/[\r\n\s]+/gm, '')
        .trim()
    ).toBe('font-weight:300;');
    expect(
      fonts.weights
        .bold()
        .styles.replace(/[\r\n\s]+/gm, '')
        .trim()
    ).toBe('font-weight:500;');
    expect(
      fonts.weights
        .normal()
        .styles.replace(/[\r\n\s]+/gm, '')
        .trim()
    ).toBe('font-weight:normal;');
  });

  it('should have the correct font-weight and font-size', () => {
    expect(
      fonts.style
        .heading()
        .styles.replace(/[\r\n\s]+/gm, '')
        .trim()
    ).toBe('font-size:2.25rem;;font-weight:500;;');
    expect(
      fonts.style
        .subheading()
        .styles.replace(/[\r\n\s]+/gm, '')
        .trim()
    ).toEqual('font-size:1.75rem;;font-weight:500;;');
    expect(
      fonts.style
        .standard()
        .styles.replace(/[\r\n\s]+/gm, '')
        .trim()
    ).toEqual('font-size:1.125rem;;font-weight:normal;;');
    expect(
      fonts.style
        .subText()
        .styles.replace(/[\r\n\s]+/gm, '')
        .trim()
    ).toEqual('font-size:1rem;;font-weight:normal;;');
  });
});

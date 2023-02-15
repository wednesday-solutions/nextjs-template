import media from '../media';

describe('styles', () => {
  it('should return correct media query according to screen size', () => {
    expect(media.largeDesktop.max(`background: gray`).styles.replace(/[\r\n\s]+/gm, '')).toBe(
      '@media(max-width:90em){background:gray;;;}'
    );
  });

  it('should return correct media according to min or max', () => {
    expect(
      media.desktop
        .min(`background: gray`)
        .styles.replace(/[\r\n\s]+/gm, '')
        .trim()
    ).toBe('@media(min-width:64.0625em){background:gray;;;}');
  });
});

import styles from '../styles';
import { colors } from '@themes';

describe('styles', () => {
  it('should have the correct linear-gradient string', () => {
    expect(styles.defaultLinearGradient('red', 'orange')).toBe('linear-gradient(red, orange)');
  });

  it('should have the correct box-shadow', () => {
    expect(
      styles
        .boxShadow(colors.transparent80)
        .styles.replace(/[\r\n\s]+/gm, '')
        .trim()
    ).toBe('box-shadow:rgba(0,0,0,0.2)2px2px;');
  });
});

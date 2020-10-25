import styles from '../styles';
import { colors } from '@themes';

describe('styles', () => {
  it('should have the correct linear-gradient string', () => {
    expect(styles.defaultLinearGradient('red', 'orange')).toEqual('linear-gradient(red, orange)');
  });

  it('should have the correct box-shadow', () => {
    expect(styles.boxShadow(colors.transparent80)).toEqual([
      'box-shadow:',
      'rgba(0, 0, 0, 0.2)',
      ' ',
      '2px',
      ' ',
      '2px',
      ' ',
      ';'
    ]);
  });

  it('should have the correct text-shadow', () => {
    expect(styles.textShadow(colors.transparent80)).toEqual([
      'text-shadow:',
      'rgba(0, 0, 0, 0.2)',
      ' ',
      '2px',
      ' ',
      '2px',
      ' ',
      ';'
    ]);
  });
});

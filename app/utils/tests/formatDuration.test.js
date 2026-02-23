import { formatDuration } from '../formatDuration'

describe('formatDuration', () => {
  it('should format milliseconds to m:ss', () => {
    expect(formatDuration(210000)).toBe('3:30')
  })

  it('should pad seconds with leading zero', () => {
    expect(formatDuration(65000)).toBe('1:05')
  })

  it('should handle zero', () => {
    expect(formatDuration(0)).toBe('0:00')
  })

  it('should handle exact minutes', () => {
    expect(formatDuration(120000)).toBe('2:00')
  })
})

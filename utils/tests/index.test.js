import { getQueryStringValue, getDeviceType, setDeviceType } from '../index';
describe('Utils', () => {
  test('should return not return anything ', () => {
    Object.defineProperty(window, 'location', {
      value: {
        writable: false,
        search: ''
      }
    });
    const result = getQueryStringValue(['campaign_uuid']);
    expect(result).toEqual({});
  });

  test('should return query string value when campaign_uuid is provided', () => {
    delete global.window.location;
    Object.defineProperty(window, 'location', {
      value: {
        writable: false,
        search: '?campaign_uuid=784c7251-a124-4257-b47a-6b1e94dc51bx'
      }
    });
    const result = getQueryStringValue(['campaign_uuid']);
    expect(result).toEqual({
      campaign_uuid: '784c7251-a124-4257-b47a-6b1e94dc51bx'
    });
  });
});

describe('getDeviceType', () => {
  test('should return MOBILE for device mobile', () => {
    const result = getDeviceType('mobile');
    expect(result).toEqual('MOBILE');
  });

  test('should return DESKTOP by default', () => {
    const result = getDeviceType('desktop');
    expect(result).toEqual('DESKTOP');
  });
  test('should return TABLET for device tablet', () => {
    const result = getDeviceType('tablet');
    expect(result).toEqual('TABLET');
  });

  test('should return DESKTOP if no device', () => {
    jest.spyOn(window.screen, 'width', 'get').mockReturnValue(1280);
    setDeviceType();
    const result = getDeviceType();
    expect(result).toEqual('DESKTOP');
  });
});

describe('setDeviceType', () => {
  test('should return mobile for width 360', () => {
    const result = setDeviceType(360);
    expect(result).toEqual('mobile');
  });

  test('should return desktop for width 1280', () => {
    const result = setDeviceType(1280);
    expect(result).toEqual('desktop');
  });
  test('should return tablet for width 800', () => {
    const result = setDeviceType(800);
    expect(result).toEqual('tablet');
  });
  test('should return tablet for mocked screen width', () => {
    jest.spyOn(window.screen, 'width', 'get').mockReturnValue(1000);
    const result = setDeviceType();
    expect(result).toEqual('desktop');
  });
});

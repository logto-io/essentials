import { toTitle, urlSafeBase64 } from './string';

describe('toTitle()', () => {
  test('upper-case the first non-blank character of each word', () => {
    expect(toTitle('normal title')).toEqual('Normal Title');
  });

  test('remove `-` characters in the string', () => {
    expect(toTitle('String-Contains-Minus-Signs')).toEqual('String Contains Minus Signs');
  });
});

describe('UrlSafeBase64()', () => {
  const RAW_CONTENT = 'subjects?d=1subjects>d=1{"alg":"RS256","name":"测试"}';
  const ENCODED_CONTENT =
    'c3ViamVjdHM/ZD0xc3ViamVjdHM+ZD0xeyJhbGciOiJSUzI1NiIsIm5hbWUiOiLmtYvor5UifQ==';
  const URL_SAFE_ENCODED_CONTENT =
    'c3ViamVjdHM_ZD0xc3ViamVjdHM-ZD0xeyJhbGciOiJSUzI1NiIsIm5hbWUiOiLmtYvor5UifQ';

  describe('encode()', () => {
    test('replace plus sign `+` (by minus sign `-`) and slash `/` (by underscore `_`) in base64-encoded content', () => {
      expect(urlSafeBase64.encode(RAW_CONTENT)).toEqual(URL_SAFE_ENCODED_CONTENT);
    });
  });

  describe('decode()', () => {
    test('restore plus sign `+` (by minus sign `-`) and slash `/` (by underscore `_`) in base64-encoded content', () => {
      expect(urlSafeBase64.decode(URL_SAFE_ENCODED_CONTENT)).toEqual(RAW_CONTENT);
    });
  });

  describe('replaceNonUrlSafeCharacters()', () => {
    test('replaceNonUrlSafeCharacters and remove non-url-safe character `=`', () => {
      expect(urlSafeBase64.replaceNonUrlSafeCharacters(ENCODED_CONTENT)).toEqual(
        URL_SAFE_ENCODED_CONTENT
      );
    });
  });

  describe('restoreNonUrlSafeCharacters()', () => {
    test('restoreNonUrlSafeCharacters', () => {
      expect(urlSafeBase64.restoreNonUrlSafeCharacters(`${URL_SAFE_ENCODED_CONTENT}==`)).toEqual(
        ENCODED_CONTENT
      );
    });
  });

  describe('isSafe()', () => {
    test('empty string should be true', () => {
      expect(urlSafeBase64.isSafe('')).toBeTruthy();
    });

    test('url-safe characters should be true', () => {
      expect(
        urlSafeBase64.isSafe('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-_')
      ).toBeTruthy();
    });

    test('non-url-safe characters should be false', () => {
      expect(urlSafeBase64.isSafe('=+')).toBeFalsy();
    });
  });
});

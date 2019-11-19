import { encodeTemplate, decodeTemplate } from '../index.js';

describe('encodeTemplate', () => {
  it('should encode a template', () => {
    expect(encodeTemplate('my {foo}', { foo: 'templ8' })).toEqual('my templ8');
  });
  it('should encode multiple values', () => {
    expect(
      encodeTemplate('my {foo} is a {bar}', { foo: 'other car', bar: 'tardis' })
    ).toEqual('my other car is a tardis');
  });
});

describe('decodeTemplate', () => {
  it('should return an empty object if no values were parsed', () => {
    expect(
      decodeTemplate('my {foo}', undefined)
    ).toEqual({});
  });
  it('should decode a string using a template', () => {
    expect(
      decodeTemplate('my {foo}', "my party and I'll cry if I wanna")
    ).toEqual({
      foo: "party and I'll cry if I wanna"
    });
  });
  it('should decode multiple strings', () => {
    expect(
      decodeTemplate('my {foo} is a {bar}', 'my other car is a tardis')
    ).toEqual({
      foo: 'other car',
      bar: 'tardis'
    });
  });
});

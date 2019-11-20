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
  it('should encode array values', () => {
    expect(encodeTemplate('my [foo]', { foo: ['wordy', 'lordy'] })).toEqual('my wordy,lordy');
  });
});

describe('decodeTemplate', () => {
  it('should return null if no values were parsed', () => {
    expect(
      decodeTemplate('my {foo}', undefined)
    ).toEqual(null);
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
  it('should decode array values', () => {
    expect(
      decodeTemplate('my [foo]', "my wordy,lordy")
    ).toEqual({
      foo: ['wordy', 'lordy']
    });
  });
  it('should decode a single array value', () => {
    expect(
      decodeTemplate('my [foo]', "my wordy")
    ).toEqual({
      foo: ['wordy']
    });
  });
  it('should decode in the correct order', () => {
    expect(
      decodeTemplate('my [foo], {bar} how [adjectives]', "my wordy, lordy how interesting,unusual")
    ).toEqual({
      foo: ['wordy'],
      bar: 'lordy',
      adjectives: ['interesting','unusual']
    });
  });
});

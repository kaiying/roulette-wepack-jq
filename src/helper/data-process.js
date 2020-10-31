import { isNil, isEmpty, filter } from 'ramda';

export const isNull = data => data === null;

export const isEmptyString = data => data === '';

export const isStringNumber = data => !isNull(data.match(/^\d*$/));

export const isEmptyValue = data => isNil(data) || isEmpty(data);

export const emptyReplace = (value, defaultValue) => (isEmptyValue(value) ? defaultValue : value);

export const isFunction = data => typeof data === 'function';

export const rejectArrayNullItems = data => filter(any => !isNil(any), data);

export const rejectEmpty = data => filter(any => !isEmptyValue(any), data);

export const linkTarget = blank => (blank === true ? '_blank' : '_self');

export const randomInteger = (max, min = 0) => Math.floor(Math.random() * max + min);

export const isNumber = num => Number(num) === num;

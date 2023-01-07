import dayjs from 'dayjs';
import {escape} from 'he';

/**
 * @param {TemplateStringsArray} strings
 * @param {...*} values
 */
export const html = (strings, ...values) => strings.reduce((before, after, index) => {
  const value = values[index - 1];

  return before + escape(String(value)) + after;
});

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizeTripEventTime(data) {
  const {time, format} = data;
  return time ? dayjs(time).format(format) : '';
}

export {
  getRandomArrayElement,
  humanizeTripEventTime,
};

import stylish from './stylish.js';
import plain from './plain.js';

const getFormattedFile = (format, content) => {
  switch (format) {
    case 'stylish':
      return stylish(content);
    case 'plain':
      return plain(content);
    case 'json':
      return JSON.stringify(content);
    default:
      return new Error(`Unknown formatter '${format}', you can choose exist formatters 'stylish', 'plain' or 'json'`);
  }
};
export default getFormattedFile;

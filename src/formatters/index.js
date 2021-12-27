import stylish from './stylish.js';
import plain from './plain.js';

const formatFile = (format, file) => {
  switch (format) {
    case 'stylish':
      return stylish(file);
    case 'plain':
      return plain(file);
    default:
      return new Error(`Unknown formatter '${format}', you can choose exist formatters 'stylish' or 'plain'`);
  }
};
export default formatFile;

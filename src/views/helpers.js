module.exports = {
  getError: (errors, prop) => {
    try {
      let message = '';
      for (const property in errors.mapped()) {
        if (property.includes(prop)) {
          message = errors.mapped()[property].msg;
        }
      }
      return message;
    } catch (err) {
      return '';
    }
  },
};

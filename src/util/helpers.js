'use strict';


const validateInput = (input) => {
  if (input.error){
    throw new Error(`Invalid ${input.error.details[0].context.key}`);
  }
};

module.exports = {
  validateInput
};
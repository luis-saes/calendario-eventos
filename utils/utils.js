const errorFunction = (error, message) => {
  if (error) {
    return console.error(error.message);
  }
  console.log(message);
};

module.exports = {
  errorFunction,
};

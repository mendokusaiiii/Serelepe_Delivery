const errors = [
  { status: 400, message: '' },
];

const errorHandler = (error, _req, res, next) => {
  console.log(error);
  const errorCode = errors
    .find((err) => err.message === error.message).status || 500;
  res.status(errorCode).json({ message: error.message });
  next();
};

module.exports = errorHandler;

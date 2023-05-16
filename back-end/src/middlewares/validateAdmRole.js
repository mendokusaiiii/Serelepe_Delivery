const validateAdmin = (req, _res, next) => {
  const { role } = req.body.user;

  if (role !== 'administrator') throw new Error('Unauthorized');
  next();
};

module.exports = {
  validateAdmin,
};
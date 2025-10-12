const log = (req, res, next) => {
  console.log(new Date().toLocaleString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }),req.method, req.originalUrl);
  next();
};

module.exports = log;

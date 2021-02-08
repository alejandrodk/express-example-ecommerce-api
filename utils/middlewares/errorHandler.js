const Sentry = require("@sentry/node");
const { config } = require("../../config");

Sentry.init({
  dsn: config.sentryDns,
  environment: config.env
});

function logErrors(err, req, res, next) {
  const errorId = Sentry.captureException(err);
  console.log(errorId)
  console.log(err.stack);
  next(err);
}

function clientErrorHanlder(err, req, res, next) {
  if (req.xhr) {
    return req.status(500).json({ err: err.message });
  }
  next(err);
}

function errorHandler(err, req, res, next) {
  // catch errors while streaming
  if (res.headerSent) {
    return next(err);
  }

  if (!config.dev) {
    err.stack = null;
  }

  res.status(err.status || 500);
  res.render("error", { error: err });
}

module.exports = {
  logErrors,
  clientErrorHanlder,
  errorHandler,
};

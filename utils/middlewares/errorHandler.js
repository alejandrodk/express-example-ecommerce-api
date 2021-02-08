const Sentry = require("@sentry/node");
const { config } = require("../../config");

Sentry.init({
  dsn: config.sentryDns,
  environment: config.env,
});

function isRequestAjaxOrApi(req) {
  return !req.accepts("html") || req.xhr;
}

function withErrorStack(err, stack) {
  if (config.env) {
    return { ...err, stack };
  }
}

function logErrors(err, req, res, next) {
  const errorId = Sentry.captureException(err);
  console.log('errorId: ', errorId);
  console.log(err.stack);
  next(err);
}

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) next(boom.badImplementation(err));

  next(err);
}

function clientErrorHanlder(err, req, res, next) {
  const {
    output: { statusCode, payload },
  } = err;

  // catch errors for AJAX or while streaming
  if (isRequestAjaxOrApi(req) || res.headersSent) {
    return req.status(statusCode).json(withErrorStack(payload, err.stack));
  }
  next(err);
}

function errorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload },
  } = err;

  res.status(statusCode);
  res.render("error", withErrorStack(payload, err.stack));
}

module.exports = {
  logErrors,
  wrapErrors,
  clientErrorHanlder,
  errorHandler,
};

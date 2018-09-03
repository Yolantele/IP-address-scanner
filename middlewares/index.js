const CLS = require('cls-hooked');
const uuid = require('uuid/v4');
const constants = require('../constants');
const logger = require('../logger');

const tracking = CLS.createNamespace(constants.TRACKING_NAMESPACE);

exports.tracking = () => async (req, res, next) => {
    tracking.run(() => next());
};

exports.requestInit = () => async (req, res, next) => {
    const requestId = req.headers[constants.CORRELATION_HEADER] || uuid();
    const executionId = uuid();

    tracking.set('requestId', requestId);
    tracking.set('executionId', requestId);
    res.set('x-request-id', requestId);

    logger.new({
        requestId,
        executionId
    });
    logger.debug({
        message: 'New Request',
        req
    });
    next();
};

exports.logsClose = () => async (req, res, next) => {
    logger.debug({
        res
    });
    logger.info({
        method: req.method,
        path: req.path,
        status_code: res.statusCode,
        remoteAddress: req.connection.remoteAddress,
        remotePort: req.connection.remotePort,
        type: 'API_CALL'
    });
    next();
};
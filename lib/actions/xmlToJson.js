/*eslint no-invalid-this: 0 no-console: 0*/
const eioUtils = require('elasticio-node').messages;
const xml2js = require('xml2js');

module.exports.process = processAction;

/**
 * This method will be called from elastic.io platform providing following data
 *
 * @param msg incoming message object that contains ``body`` with payload
 * @param cfg configuration that is account information and configuration field values
 */
function processAction(msg, cfg) {
    console.log('Action started, message=%j cfg=%j', msg, cfg);
    if (!msg.body || !msg.body.xmlString) {
        this.emit('error', 'Missing XML String as input');
        this.emit('end');
        return;
    }
    const that = this;
    const xmlString = msg.body.xmlString;
    const parser = new xml2js.Parser({
        trim: false,
        normalize: false,
        explicitArray: false,
        normalizeTags: false
    });
    parser.parseString(xmlString, function processResult(err, data) {
        if (err) {
            console.log('Error occurred', err.stack || err);
            that.emit('error', err);
            that.emit('end');
            return;
        }
        console.log('Successfully converted XML to JSON result=%j', data);
        that.emit('data', eioUtils.newMessageWithBody(data));
        that.emit('end');
    });
}
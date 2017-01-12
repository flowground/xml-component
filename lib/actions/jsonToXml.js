/*eslint no-invalid-this: 0 no-console: 0*/
const eioUtils = require('elasticio-node').messages;
const xml2js = require('xml2js');

/**
 * This method will be called from elastic.io platform providing following data
 *
 * @param msg incoming message object that contains ``body`` with payload
 * @param cfg configuration that is account information and configuration field values
 */
function processAction(msg, cfg) {
    console.log('Action started, message=%j cfg=%j', msg, cfg);
    try {
        const builder = new xml2js.Builder();
        const result = builder.buildObject(msg.body);
        console.log('Successfully converted body to XML result=%s', result);
        this.emit('data', eioUtils.newMessageWithBody({
            xmlString: result
        }));
    } finally {
        this.emit('end');
    }
}

module.exports.process = processAction;
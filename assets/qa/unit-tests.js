// pull in modules to test
var credentials = require('../../lib/credentials.js');

var expect = require('chai').expect;

suite('credentials connection string tests', function(){
    test('getConnectionString("prod") should return a production env string', function(){
        expect(typeof credentials.getConnectionString("prod") === 'string');
    });

    test('getConnectionString("dev") should return a development env string', function(){
        expect(typeof credentials.getConnectionString("development") === 'string');
    });

    test('getConnectionString(<env>) other than "dev" or "prod" should return undefined', function(){
        expect(typeof credentials.getConnectionString("blah") === undefined);
    });
});

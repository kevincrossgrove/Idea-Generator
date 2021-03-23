const mocha = require('mocha');
const assert = require('assert');
const MarioKart = require('../models/mariokart')

// Describe tests
describe('Saving records', () => {
    
    // Create Tests
    it('Saves a record to the database', () => {
        var kart = new MarioKart({
            name: 'Mario',
            weight: 100
        });

        // Done lets mocha know to wait until done() is hit to move onto the next test.
        kart.save().then((done) => {
           assert(char.isNew === false);
           done();
        });
    });

});
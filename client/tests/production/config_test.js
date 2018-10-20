/**
 * Created by guy on 10/20/18.
 */

const container = require('../../src/services')
const assert = require('assert');
const config = require('../../src/services/internal/config/Config');

describe("API endpoint configs", function(){

    it("should have a key 'api_root' with value 'https://www.nikahku.com/api/'", function(){
        // const config = container.get('config');
        // assert(config != null)
        assert(config('app.api_root') === 'https://www.nikahku.com/api/')
    });

    it("should have a key 'assets' with value 'https://www.nikahku.com/assets/'", function(){
        // const config = container.get('config');
        // assert(config != null)
        assert(config('app.assets') === 'https://www.nikahku.com/assets/')
    })
});
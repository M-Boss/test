/**
 * Created by guy on 10/20/18.
 */

const assert = require('assert');
const config = require('../../src/services/internal/config/Config');

describe("API endpoint configs", function(){

    it("should have a key 'api_root' with value 'https://www.nikahku.com/api/'", function(){
        assert(config('app.api_root') === 'https://www.nikahku.com/api/')
    });

    it("should have a key 'assets' with value 'https://www.nikahku.com/assets/'", function(){
        assert(config('app.assets') === 'https://www.nikahku.com/assets/')
    });
});
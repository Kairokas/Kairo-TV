var assert = require('assert');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should check if text matches', function() {
      assert.equal("test" === "test", true);
    });

    it('should check if text doesnt match', function() {
        assert.equal("test" !== "test", true);
      });
  });
});
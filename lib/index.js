var fs  = require("fs"),
outcome = require("outcome"),
mkdirp  = require("mkdirp"),
path    = require("path");

module.exports = function (awsm) {

  var defaultKeyDir = awsm.config.get("keyPath") || "~/.awsm/";

  awsm.chainer.add("keyPair.save", {
    type: "keyPair",
    call: function (keyPath, next) {

      if (arguments.length === 1) {
        var next = keyPath;
        keyPath = path.join(defaultKeyDir, this.get("region"), this.get("name"));
      }

      keyPath = keyPath.replace("~", process.env.HOME).replace(/^\./, process.cwd());

      this.set("keyPath", keyPath);

      var self = this;
      function onSave () {  
        next(null, self);
      }

      try {
        mkdirp.sync(path.dirname(keyPath));
      } catch (e) {

      }

      fs.writeFile(keyPath, this.get("material"), outcome.e(next).s(onSave));
    }
  });

}
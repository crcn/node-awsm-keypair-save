Small plugin for [awsm](/crcn/node-awsm) that allows you to save keypairs.

#### Example:

```javascript
var aws = require("awsm")(config);
aws.use(require("awsm-keypair-save"));

// create the keypair
aws.
chain().
keyPairs().
create("test").
save("/path/to/keypair/file").
then(function() {
 // done 
});
```
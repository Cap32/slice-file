var test = require('tap').test;
var lf = require('../');

test('slice callback', function (t) {
    t.plan(1);
    
    var file = __dirname + '/data/lines.txt';
    lf(file).slice(4,6, function (err, lines) {
        if (err) t.fail(err);
        t.deepEqual(lines.map(String), [ 'five\n', 'six\n' ]);
    });
});

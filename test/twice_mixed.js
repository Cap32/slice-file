var test = require('tap').test;
var sliceFile = require('../');
var through = require('through');
var fs = require('fs');
var wordFile = __dirname + '/data/words';

test('forward mixed with reverse slice', function (t) {
    t.plan(2);
    
    var xs = sliceFile(wordFile);
    var first = [];
    var second = [];
    
    xs.slice(0,5).pipe(through(
        function (line) {
            first.push(line.toString('utf8'));
        },
        function () {
            t.deepEqual(first, [
                "A\n",
                "A's\n",
                "AA's\n",
                "AB's\n",
                "ABM's\n"
            ]);
            
            xs.sliceReverse(-10, -5).pipe(through(
                function (line) {
                    second.push(line.toString('utf8'));
                },
                function () {
                    t.deepEqual(second, [
                        "épée\n",
                        "émigrés\n",
                        "émigré's\n",
                        "émigré\n",
                        "élan's\n"
                    ]);
                }
            ));
        }
    ));
});

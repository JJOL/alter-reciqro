const fs = require('fs');

module.exports = function(results) {
    // accumulate the errors and warnings
    var summary = results.reduce(
        function(seq, current) {
            seq.filePath = current.filePath;
            seq.errors += current.errorCount;
            seq.warnings += current.warningCount;
            return seq;
        },
        { errors: 0, warnings: 0 }
    );

    if (summary.errors > 0 || summary.warnings > 0) {
        let data = summary.errors +","+ summary.warnings+"\n";
        fs.appendFileSync('lint.csv', data);
        return data;
    }

    return "";
};
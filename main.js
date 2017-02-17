var sig_regex = /(^Sent from (\w+\s*){1,4}$)|(--\s*$|__\s*$|-\w$)/mig;

module.exports = function(text) {
    text = text.toString();

    var match =
        text.match(/(From:[\s\S]+?Sent:[\s\S]+?To:[\s\S]+?Subject:[\s\S]+?)$/m) ||
        text.match(/(^[^\n]+On[^\n]+?wrote:$)/m) ||
        text.match(/^(?!On.*On\s.+?wrote:)(On\s[\s\S]+?wrote:)$/mi);
    if (match) {
        text = text.split(match[0])[0];
    }

    var lines = text.split(/\n/);

    var resultLines = [];

    for (var i = 0; i < lines.length; i++) {

        var line = lines[i];

        if (sig_regex.test(line)) {
            break;
        }

        resultLines.push(line);
    }

    return resultLines.join("\n");
};


//var esrever = require('esrever');

//var sig_regex = /(--\s*$|__\s*$|\w-$)|(^(\w+\s*){1,3} ym morf tneS$)/mig;
//
//module.exports = function(text) {
//    text = text.toString();
//    if (text.indexOf("\r\n") > -1) {
//        text = text.replace("\r\n", "\n");
//    }
//    var match = text.match(/(From:[\s\S]+?Sent:[\s\S]+?To:[\s\S]+?Subject:[\s\S]+?)$/m) ||
//        text.match(/(^[^\n]+On[^\n]+?wrote:$)/m);
//    if (match) {
//        text = text.split(match[0])[0];
//    } else {
//        match = text.match(/^(?!On.*On\s.+?wrote:)(On\s[\s\S]+?wrote:)$/mi);
//
//        if (match) {
//            var item = match[0];
//            var removed = text.split(item);
//            item = item.replace(/\n/g, " ");
//            text = removed[0] + item + removed[1];
//        }
//    }
//    var multiline = text.match(/([^\n])(?=\n_{7}_+)$/m);
//    if (multiline) {
//        var index = multiline.index + 1;
//        text = (text.slice(0,index) + "\n" + text.slice(index + Math.abs(0)));
//    }
//    text = esrever.reverse(text);
//    var found_visible = false;
//    var fragments = [];
//    var lines = text.split(/\n/);
//    var fragment = null;
//
//    lines.forEach(function(line) {
//        line.substr(0, line.indexOf("\n"));
//        if (!sig_regex.test(line)) {
//            line = line.trimLeft();
//        }
//
//        var is_quoted = (/([>|]+?)/.test(line));
//        if (fragment && line === "") {
//            if (sig_regex.test(fragment.lines[fragment.lines.length-1])) {
//                fragment.signature = true;
//                finish_fragment();
//            }
//        }
//
//        if (fragment && cmp(fragment, is_quoted, line)) {
//            fragment.lines.push(line);
//        } else {
//            finish_fragment();
//            fragment = new Fragment(is_quoted, line);
//        }
//    });
//
//    finish_fragment();
//
//    function cmp(fragment, is_quoted, line) {
//        return (fragment.quoted === is_quoted) || (fragment.quoted && (quote_header(line) || line === ""));
//    }
//
//    function finish_fragment() {
//        if (fragment) {
//            fragment.finish();
//            if (!found_visible) {
//                if (fragment.quoted || fragment.signature ||
//                    fragment.content.trim() === '') {
//                    fragment.hidden = true;
//                } else {
//                    found_visible = true;
//                }
//            }
//            fragments.push(fragment);
//        }
//        fragment = null;
//    }
//    var toReturn = "";
//    fragments.reverse().forEach(function(frag) {
//        if(!frag.hidden) {
//            toReturn += frag.content + "\n";
//        }
//    });
//
//    return toReturn.trim();
//};
//
//
//function Fragment(quoted, first_line) {
//    this.signature = this.hidden = false;
//    this.quoted = quoted;
//    this.lines = [first_line];
//    this.content = null;
//}
//
//Fragment.prototype.finish = function() {
//    this.content = this.lines.join("\n");
//    this.lines = null;
//    this.content = esrever.reverse(this.content);
//};
//
//function quote_header(line) {
//    return (new RegExp(/^:etorw.*nO$/m).test(line));
//}

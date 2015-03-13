// Description:
//   Get multiple image results from google

var _ = require('lodash');

module.exports = function(robot) {
  robot.helpCommand("brobbot bomb [me] `query`", "Googles `query` and returns 1st result's URL.");
  robot.helpCommand("brobbot `query`bomb [me] `query`", "Googles `query` and tries to return the first animated GIF result.");

  robot.respond(/^bomb( me)? (.*)/i, function(msg) {
    imageMe(msg, msg.match[2], function(url) {
      msg.send(url);
    });
  });

  robot.respond(/^([^\s]+)bomb( me)?/i, function(msg) {
    imageMe(msg, msg.match[1], function(url) {
      msg.send(url);
    });
  });
};

function imageMe(msg, query, cb) {
  var q = {
    v: '1.0',
    rsz: '8',
    q: query,
    safe: 'active'
  };

  msg.http('http://ajax.googleapis.com/ajax/services/search/images')
    .query(q)
    .get()(function(err, res, body) {
      var images = JSON.parse(body);
      images = images.responseData ? images.responseData.results : null;

      if (images && images.length > 0) {
        cb(_.map(randomItems(images, 10), ensureImageExtension))
      }
    });
}

function randomItems(list, size) {
  var ret = [];

  for (var i = 0; i < size && list.length > 0; i++) {
    idx = _.random(list.length - 1);
    ret.push(list[idx]);
    list.splice(idx, 1);
  }

  return ret;
}

function ensureImageExtension(url) {
  var ext = url.split('.').pop();
  if (/(png|jpe?g|gif)/i.test(ext)) {
    return url;
  }
  else {
    return url + "#.png";
  }
}

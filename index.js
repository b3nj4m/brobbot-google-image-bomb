// Description:
//   Get multiple image results from google

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
        image = msg.random(images);
        cb(ensureImageExtension(image.unescapedUrl));
      }
    });
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

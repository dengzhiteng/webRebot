const cheerio = require("cheerio");
const server = require("./curl");
const fs = require("fs");
const download = require("download");

var hunangy = "http://www.hunangy.com/info/1021/13477.htm";

var url = hunangy;

server.download(url, function (data) {
  if (data) {
    var $ = cheerio.load(data);
    let imageSrc = [];
    $("img").each(function (i, e) {
      var src = $(e).attr("src");
      src = src.includes("http") ? src : "http://www.hunangy.com/" + src;
      imageSrc.push(encodeURI(src));
    });
    console.log(imageSrc);
    imageSrc.map((item) => {
      (async () => {
        await download(item, "dist/images/hunangy");
      })();
    });
  }
});

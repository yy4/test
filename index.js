/**
 * Created by qingyun on 16/9/13.
 */
var http=require("http");
http.createServer(function (req, res) {
    res.end("hello world gaga!");
}).listen(8888);
import * as http from "http";

var requestMsg = require('request');

var headers = {
	'Authorization': 'token ' + process.env.GITHUB_TOKEN,
	'Accept': 'application/vnd.github.v3+json',
	'User-Agent': 'dreamer-gatsby'
};

var dataString = '{"ref":"master"}';

var options = {
	url: process.env.WEBHOOK_URL,
	method: 'POST',
	headers: headers,
	body: dataString
};

function callback(error, response, body) {
	if (!error && response.statusCode == 200) {
		console.log(body);
	} else {
		console.log(response);
	}
}

class Main {
	constructor() {
		// httpサーバーを設定する
		const server: http.Server = http.createServer(
			(request: http.IncomingMessage, response: http.ServerResponse) =>
				this.requestHandler(request, response));
		// サーバーを起動してリクエストを待ち受け状態にする
		server.listen(process.env.PORT);
	}

  /*
  * サーバーにリクエストがあった時に実行される関数
  */
	private requestHandler(
		request: http.IncomingMessage,response: http.ServerResponse): void {
			
		requestMsg(options, callback);
		response.end('Hook Github Actions');

	}
}

const main = new Main();
// こちらは Raspberry Pi 側で実行する想定の Node 用コード

const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));
import nodeWebSocketLib from "websocket"; // https://www.npmjs.com/package/websocket
import { RelayServer } from "./RelayServer.js";

var channel;

async function connect() {
  // webSocketリレーの初期化
  var relay = RelayServer(
    "chirimentest",
    "chirimenSocket",
    nodeWebSocketLib,
    "https://chirimen.org"
  );
  channel = await relay.subscribe("chirimenAudio");
  console.log("web socketリレーサービスに接続しました");
  channel.onmessage = showMessage;
}

function showMessage(message) {
  console.log(messge.data);
}

function sendMessage(message) {
  console.log("sending message: ", message);
  channel.send(message);
}

(async () => {
  await connect();

  // 再生開始指示
  sendMessage("play");
  // 5 秒後に一時停止
  await sleep(5000);
  sendMessage("pause");
  // 2 秒後に再生位置を先頭に戻して再生
  await sleep(2000);
  sendMessage("load");
  sendMessage("play");
  // 5 秒後に一時停止
  await sleep(5000);
  sendMessage("pause");

  console.log("end of program");
})();


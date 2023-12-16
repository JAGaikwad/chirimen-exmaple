// こちらはブラウザ側で読み込み音声を再生/一時停止するコード
import { RelayServer } from "https://chirimen.org/remote-connection/js/beta/RelayServer.js";

let channel;
let player;

function showMessage(message) {
  messageDiv.innerText = message;
}

onload = async function () {
  player = document.getElementById("player");
  const allowAudioButton = document.getElementById("allow-audio-button");
  allowAudioButton.addEventListener("click", () => {
    player.load();
    showMessage("音声ファイルをロードしました(スマホでの再生許可)");
  });

  // webSocketリレーの初期化
  const relay = RelayServer("chirimentest", "chirimenSocket");
  channel = await relay.subscribe("chirimenAudio");
  showMessage("web socketリレーサービスに接続しました");
  channel.onmessage = getMessage;
};

function getMessage(message) {
  let msg = message.data;
  showMessage(`message received: ${msg}`);
  if (msg === "play") {
    player.play();
  } else if (msg === "pause") {
    player.pause();
  } else if (msg === "load") {
    player.load();
  }
}


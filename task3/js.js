const wsUrl = "wss://echo-ws-service.herokuapp.com";
const apiURL = "https://www.openstreetmap.org/";

function pageLoaded() {
  const infoOutput = document.querySelector(".info_output");
  const chatOutput = document.querySelector(".chat_output");
  const input = document.querySelector("input");
  const sendBtn = document.querySelector(".btn_send");
  const sendBtnGeo = document.querySelector(".btn_send_geo");
  
  let socket = new WebSocket(wsUrl);
  
  socket.onopen = () => {
    infoOutput.innerText = "Вы в матрице";
  }
  
  socket.onmessage = (event) => {
    writeToChat(event.data, true);
  }
  
  socket.onerror = () => {
    infoOutput.innerText = "Связь с матрицей разорвана";
  }
  
  sendBtn.addEventListener("click", sendMessage);
  sendBtnGeo.addEventListener("click", sendGeo);
  
  function sendMessage() {
    if (!input.value) return;
    socket.send(input.value);
    writeToChat(input.value, false);
    input.value === "";
  }

  function sendGeo() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
    } else {
        infoOutput.innerText = "В вашем браузере недоступна возможность определения местоположения";
    }
  }
  
  function locationSuccess(data) {
    let coords = [data.coords.longitude, data.coords.latitude];
    let url = formatURL(coords);
    console.log(url);
    writeToChat(`<a href="${url}" target="__blank">Гео-локация</a>`,false)
  }
  
  function locationError() {
    infoOutput.innerText = "При определении местоположения произошла ошибка";
  }
  
  function formatURL(coords) {
    let url = new URL(apiURL);
    url.searchParams.set("lat", coords[1]);
    url.searchParams.set("lon", coords[0]);
    return url;
  }

  function writeToChat(message, isRecieved) {
    let messageHTML = `<div class="${isRecieved? "recieved" : "sent"}">${message}</div>`;
    chatOutput.innerHTML += messageHTML;
  }
}

document.addEventListener("DOMContentLoaded", pageLoaded);

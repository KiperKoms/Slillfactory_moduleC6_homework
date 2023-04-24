const wsUri = "wss://echo-ws-service.herokuapp.com";

const inputMessage = document.querySelector('.message');
const output = document.querySelector('.output-field');
const btnSend = document.querySelector('.send-btn');
const btnGeo = document.querySelector('.geo-btn');


let websocket;

function writeToScreen(message) {
  let pre = document.createElement("p");
  pre.style = "break-word";
  pre.innerHTML = message;
  output.appendChild(pre);
}

document.addEventListener('DOMContentLoaded', () => {
  websocket = new WebSocket(wsUri);
  websocket.onopen = function(evt) {
    writeToScreen(
      '<span class="sistem-message"; ">CONNECTED</span> '
    );
  };
  websocket.onclose = function(evt) {
    writeToScreen(
      '<span class="sistem-message"; ">DISCONNECTED</span> '
    );
  };
  websocket.onmessage = function(evt) {
    if (!evt.data.includes('www.openstreetmap.org')){
      writeToScreen(
        '<span class="response-message">' + evt.data+'</span>'
      );
    };
  }; 
  websocket.onerror = function(evt) {
    writeToScreen(
      '<span class="sistem-message"; style="color: red;">ERROR: ' + evt.data+'</span>'
    );
  };
});

btnSend.addEventListener('click', () => {
  const message = inputMessage.value;
  if (message){
    writeToScreen(
      '<span class="input-message">' + message+'</span>'
      );
    websocket.send(message);
    inputMessage.value = "";
    }
  });


inputMessage.addEventListener('keydown', (e) => {
   if (e.keyCode == 13) {
     const message = inputMessage.value;
     if (message){
       writeToScreen(
         '<span class="input-message">' + message+'</span>'
         );
       websocket.send(message);
       inputMessage.value = "";
     }
   } 
 });

// Функция, выводящая текст об ошибке
const error = () => {
  writeToScreen("Невозможно получить ваше местоположени");
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  const mapLink = `https://www.openstreetmap.org/#map=14/${latitude}/${longitude}`;
  const LinkMessage = document.createElement("div");
  LinkMessage.innerHTML = `<a class="input-message" href="${mapLink}">Геолокация</a>`;
  websocket.send(mapLink);
  output.appendChild(LinkMessage)
}

// Нажатие кнопки Геолоккация
btnGeo.addEventListener('click', () => {

  if (!navigator.geolocation) {
    writeToScreen('Geolocation не поддерживается вашим браузером');
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
});

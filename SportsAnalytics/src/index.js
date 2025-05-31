"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = __importDefault(require("jquery"));
console.log("hello typescript");
//const xhttpr = new XMLHttpRequest();
//xhttpr.open('GET', 'https://sofascore.p.rapidapi.com/teams/get-next-matches?teamId=3419', true);
//   xhttpr.open('GET', 'https://sofascore.p.rapidapi.com/teams/detail?teamId=3419', true);
//xhttpr.open('GET', 'https://sofascore.p.rapidapi.com/players/detail?playerId=846971', true);
//xhttpr.open('GET', 'https://sofascore.p.rapidapi.com/search?q=stakusic&type=all&page=0', true);
//xhttpr.open('GET', 'https://sofascore.p.rapidapi.com/search?q=siakam&type=all&page=0', true);
//xhttpr.setRequestHeader('Content-Type', 'application/json');
//xhttpr.setRequestHeader('x-rapidapi-host', 'sofascore.p.rapidapi.com');
//xhttpr.setRequestHeader('x-rapidapi-key', '82f34d4facmsh62729fce9bea6d8p197e46jsn4612f69a776a');
//xhttpr.send();
// xhttpr.onload = ()=> {
//   if (xhttpr.status === 200) {
//       const response = JSON.parse(xhttpr.response);
//       // Process the response data here
//       const pretty = JSON.stringify(response, null, 2);
//       console.log(pretty);
//       const element = document.getElementById('json');
//     if (element) {
//         element.textContent = JSON.stringify(response, undefined, 2);
//     }
//   } else {
//       // Handle error
//       console.log("error");
//   }
// };
// const ChangePlayer = async (playerId=846971) => {
//   console.log(playerId);
// };
//ChangePlayer();
(0, jquery_1.default)('#player-id-btn').on('click', () => {
    //const playerId = $('#player-id').val() as number;
    //ChangePlayer(playerId);
});

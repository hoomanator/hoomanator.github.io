"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = __importDefault(require("jquery"));
console.log("hello typescript");
const xhttpr = new XMLHttpRequest();
xhttpr.open('GET', 'https://sofascore.p.rapidapi.com/teams/get-next-matches?teamId=3419', true);
//   xhttpr.open('GET', 'https://sofascore.p.rapidapi.com/teams/detail?teamId=3419', true);
//xhttpr.open('GET', 'https://sofascore.p.rapidapi.com/players/detail?playerId=846971', true);
//xhttpr.open('GET', 'https://sofascore.p.rapidapi.com/search?q=stakusic&type=all&page=0', true);
//xhttpr.open('GET', 'https://sofascore.p.rapidapi.com/search?q=siakam&type=all&page=0', true);
xhttpr.setRequestHeader('Content-Type', 'application/json');
xhttpr.setRequestHeader('x-rapidapi-host', 'sofascore.p.rapidapi.com');
xhttpr.setRequestHeader('x-rapidapi-key', '82f34d4facmsh62729fce9bea6d8p197e46jsn4612f69a776a');
xhttpr.send();
xhttpr.onload = () => {
    if (xhttpr.status === 200) {
        const response = JSON.parse(xhttpr.response);
        // Process the response data here
        const pretty = JSON.stringify(response, null, 2);
        console.log(pretty);
        const element = document.getElementById('json');
        if (element) {
            element.textContent = JSON.stringify(response, undefined, 2);
        }
    }
    else {
        // Handle error
        console.log("error");
    }
};
const ChangePlayer = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (playerId = 846971) {
    console.log(playerId);
});
ChangePlayer();
(0, jquery_1.default)('#player-id-btn').on('click', () => {
    const playerId = (0, jquery_1.default)('#player-id').val();
    ChangePlayer(playerId);
});

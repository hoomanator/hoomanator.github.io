"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = __importDefault(require("jquery"));
global.jQuery = jquery_1.default;
(0, jquery_1.default)('#buttonId').on('click', () => {
    const myHTML = `
              <b>
                This text is shown using
                the jQuery in TypeScript 
                by installing it using 
                npm package.
              </b>`;
    (0, jquery_1.default)('#dialog-container').html(myHTML);
});

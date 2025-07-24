"use strict";
class Coder1 {
    constructor(name, music, age, lang) {
        this.name = name,
            this.music = music,
            this.age = age,
            this.lang = lang;
    }
}
//Add visibility modifier (public)
class Coder {
    constructor(name, music, age, lang = 'Typescript') {
        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;
        this.name = name,
            this.music = music,
            this.age = age,
            this.lang = lang;
    }
    getAge() {
        return `Hello, I'm ${this.age}`;
    }
}
const Hooman = new Coder('Hooman', 'Rock', 54);
console.log(Hooman.getAge());
//console.log(Hooman.age)
//console.log(Hooman.lang)
class WebDev extends Coder {
    constructor(computer, name, music, age) {
        super(name, music, age);
        this.computer = computer;
        this.computer = computer;
    }
    getLang() {
        return `I write ${this.lang}`;
    }
}
const Sara = new WebDev('Mac', 'Sara', 'Lofi', 25);
console.log(Sara.getLang());
class Guitarist {
    constructor(name, instrument) {
        this.name = name;
        this.instrument = instrument;
    }
    play(action) {
        return `${this.name} ${action} the ${this.instrument}`;
    }
}
const Page = new Guitarist('Jimmy', 'guitar');
console.log(Page.play('strums'));
////////// 2:27:53 /////////////

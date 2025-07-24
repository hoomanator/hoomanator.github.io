class Coder1 {
    name: string //property
    music: string
    age: number
    lang: string

    constructor(
        name: string,
        music: string,
        age: number,
        lang: string
    ) {
        this.name = name,
            this.music = music,
            this.age = age,
            this.lang = lang
    }
}

//Add visibility modifier (public)
class Coder {
    secondLang!: string
    constructor(
        public readonly name: string,
        public music: string,
        private age: number,
        protected lang: string = 'Typescript'
    ) {
        this.name = name,
            this.music = music,
            this.age = age,
            this.lang = lang
    }

    public getAge() {
        return `Hello, I'm ${this.age}`
    }
}

const Hooman = new Coder('Hooman', 'Rock', 54)
console.log(Hooman.getAge())
//console.log(Hooman.age)
//console.log(Hooman.lang)

class WebDev extends Coder {
    constructor(
        public computer: string,
        name: string,
        music: string,
        age: number,
    ) {
        super(name, music, age)
        this.computer = computer
    }

    public getLang() {
        return `I write ${this.lang}`
    }
}

const Sara = new WebDev('Mac', 'Sara', 'Lofi', 25)
console.log(Sara.getLang())

interface Musician {
    name: string,
    instrument: string,
    play(action: string): string
}

class Guitarist implements Musician {
    name: string
    instrument: string
    constructor(name: string, instrument: string){
        this.name= name
        this.instrument = instrument
    }

    play(action: string) {
        return `${this.name} ${action} the ${this.instrument}`
    }
}

const Page = new Guitarist('Jimmy', 'guitar')
console.log(Page.play('strums'))

////////// 2:27:53 /////////////
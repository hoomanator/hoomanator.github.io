type One = string
type Two = string | number
type Three = 'Hello'

//convert to more or less specific
let a: One = 'hello'
let b = a as Two   //less specific
let c = a as Three // more specific

let d = <One>'world'
let e = <string | number>'world'
const addOrConcat = (a: number, b: number, c: 'add' | 'concat'): number |
    string => {
    if (c === 'add') return a + b
    return '' + a + b
}

let myVal: string = addOrConcat(2,2,'concat') as string
//Be careful! TS sees no problem - but a string is returned
let nextVal: number = addOrConcat(2,2,'concat') as number

//double casting or force casting
(10 as unknown) as string

//DOM
//They both retrieve elements from a webpage, however the both have specific uses. If you want your code to be the most efficient and effective code, then when you are trying to retrieve an id then you should use getElementById. If you are trying to retrieve a class or tag then you should use querySelector
//It might be easy to just use querySelector all the time but that would not be the best idea. The reason is because querySelector looks through multiple elements

//None null assertion by using !
const img = document.querySelector('img')!
//or
const myImg = document.getElementById('#img') as HTMLImageElement
//or
const myImg2 = <HTMLImageElement>document.getElementById('#img')

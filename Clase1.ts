let a: string = "Hola mundo";
let b: number = 10
let c: boolean = true
let d: any = "Hola"
let array: number[] = [1, 2, 3]
let array2: Array<number> = [1, 2, 3]
let tupla: [number, string] = [1, "hola"]

//Ejmeplo con una clase
class Transporte {
    //No permite acceso por parte de una clase hija (herencia)
    private velocidad: number;
    //  Permite acceso a la variable desde una clase hija (herencia)
    // protected velocidad: number;
    constructor(velocidad: number) {
        this.velocidad = velocidad;
    }
    getVelocidad(): number {
        return this.velocidad;
    }

    setVelocidad(velocidad: number): void {
        this.velocidad = velocidad;
    }
}

//Herencia
class Auto extends Transporte {
    private cantidadDePuertas: number;
    constructor(velocidad: number, cantidadDePuertas: number) {
        super(velocidad);
        this.cantidadDePuertas = cantidadDePuertas;
    }
    getVelocidad() {
        return super.getVelocidad() + 10;
    }
    getSound(): string {
        return "brrrr I'm a car";
    }
}


let transporte: Transporte = new Transporte(20);
transporte.setVelocidad(20);
console.log(transporte.getVelocidad());


let auto: Auto = new Auto(20, 4);
console.log(auto.getSound());

const trasportes: Transporte[] = [transporte, auto];
let carro = trasportes[1] as Auto;
console.log(carro.getVelocidad());

trasportes.forEach(element => {
    if (element instanceof Auto) {
        console.log(element.getSound());
    }
    console.log("No soy carro y my velocidad es: " + element.getVelocidad());
});



//Modelando una petición fetch
interface Character {
    "id": number;
    "name": string;
    "status": string;
    "species": string;
    "type": string,
    "origin": CharacterOrigin,
}

interface CharacterOrigin {
    "name": string;
    "url": string;
}

const rick: Character = {
    "id": 1,
    "name": "Rick Sanchez",
    "status": "Alive",
    "species": "Human",
    "type": "",
    "origin": {
        "name": "Earth (C-137)",
        "url": "https://rickandmortyapi.com/api/location/1"
    },
}


const carachters: Character[] = [rick, {
    "id": 2,
    "name": "Morty Smith",
    "status": "Alive",
    "species": "Human",
    "type": "",
    "origin": {
        "name": "Earth (C-137)",
        "url": "https://rickandmortyapi.com/api/location/1"
    },
}];




//Tipos
type Dni = string;
const dni1: Dni = "12345678";
const dni2: number = 12;

function isDNICorrect(dni: Dni) {
    if (dni.length < 1) {
        return false;
    }
    return true;
}
console.log(isDNICorrect(dni1));



interface Personita {
    nombre: string;
    edad: number;
}

interface Employee extends Personita {
    sueldo: number;
    empleo: string;
}

const persona: Personita = {
    nombre: "Juan",
    edad: 20
}
console.log(persona);

const lawyer: Employee = {
    nombre: "Juan",
    edad: 20,
    sueldo: 2000,
    empleo: "Lawyer"
}
console.log(lawyer);

interface interface1 {
    prop1: string;
}
interface interface2 {
    prop2: number;
}

type InterfaceMixAnd = interface1 & interface2;
type InterfaceMixOr = interface1 | interface2;

const objectInterfaceMix: InterfaceMixAnd = {
    prop1: "hola",
    prop2: 2
}

const objectInterfaceMixOr: InterfaceMixOr = {
    prop1: "hola",
}


function sum(a: number, b: number): number {
    return a + b;
}

const reduce = (a: number, b: number): number => {
    return a - b;
}

type SumaFunction = (a: number, b: number) => number;
const callbackFunction = (a: number, b: number): number => {
    return a + b;
}
const result = (sum: SumaFunction) => {
    let a: number = 1;
    let b: number = 2;
    return sum(a, b);
}


console.log(result((p1, p2) => {
    console.log(callbackFunction(12, 8));
    return p1 + p2;
}));


//  Destrcutración de funciones
function sayHi(persona: { name: string, age: number }): void {
    console.log(`Hola ${persona.name} tienes ${persona.age} años`);
}
sayHi({ name: "Juan", age: 20 });


//❎  function sayHiDestructuring({ name : string, age:number }): void {
function sayHiDestructuring({ name, age }: { name: string, age: number }) {
    console.log(`Hola ${name} tienes ${age} años`);
    return age
}
const tony = { name: "Tony", age: 20 };
sayHiDestructuring(tony);

const arrowFn = ({ name, edad }: { name: string, edad: number }): void => {
    console.log(name, edad);
}

const error = (mensaje: string): never => {
    throw new Error("Error" + mensaje);
}

const avengers = ["Thor", "Ironman", "Spiderman"];

// type HeroId = `${string}-${string}-${string}-${string}-${string}`
// type Hero = {
//     readonly id?: HeroId
//     name: string;
//     age: number;
//     isActive?: boolean
// }
// function createHero(hero: Hero): Hero {
//     const { name, age } = hero;
//     return {
//         id: crypto.randomUUID(),
//         // ❌ Marcaría error, dado que no sigue el mismo patron que declaramos sería el tipo para esta propiedad
//         // id: "123",
//         name,
//         age,
//         isActive: true
//     }
// }

// function isHero(object: { name: string, age: number }): object is Hero {
//     return "name" in object && "age" in object;
// }

// const WONDER_WOMAN = createHero({ name: "Ana", age: 400 });

// ❌ no se puede asignar un valor a una propiedad de solo lectura
// 📌 No evita realmente mutabilidad
// WONDER_WOMAN.id = 1223012983091283

// // 📌 Evitando mutabilidad
// const SUPERGIRL = Object.freeze(createHero({ name: "Ana", age: 400 }));
// // ❌ no se puede asignar un valor a una propiedad de solo lectura
// SUPERGIRL.id = 1223012983091283



// if (isHero(WONDER_WOMAN)) {
//     console.log("WONDER_WOMAN es del tipo Hero");
// } else {
//     console.log("WONDER_WOMAN no es del tipo Hero");
// }

type HexColor = `#${string}`
type RgbColor = `rgb(${number},${number},${number})`
type Color = HexColor | RgbColor;
const color: Color = "#fff";


// Union Types
// type HeroId = `${string}-${string}-${string}-${string}-${string}`
// type HeroPower = "flying" | "strength" | "teleporting" | "super-hearing"
// type HeroPowerScale = "weak" | "normal" | "strong"

// type HeroBasicInfo = {
//     name: string;
//     age: number;
// }
// type HeroProperties = {
//     readonly id?: HeroId
//     isActive?: boolean
// }
// type Hero = HeroBasicInfo & HeroProperties

// function createHero(hero: HeroBasicInfo): Hero {
//     const { name, age } = hero;
//     return {
//         id: crypto.randomUUID(),
//         // ❌ Marcaría error, dado que no sigue el mismo patron que declaramos sería el tipo para esta propiedad
//         // id: "123",
//         name,
//         age,
//         isActive: true
//     }
// }

// const WONDER_WOMAN = createHero({ name: "Ana", age: 400 });

// //📌 Type Indexing
// type HeroId = `${string}-${string}-${string}-${string}-${string}`

// type HeroBasicInfo = {
//     name: string;
//     age: number;
// }
// type HeroProperties = {
//     readonly id?: HeroId
//     isActive?: boolean
//     address: {
//         planet: string;
//         city: string;
//     }
// }

// type Hero = HeroBasicInfo & HeroProperties

// function createHero(hero: HeroBasicInfo): Hero {
//     const { name, age } = hero;
//     const SUPERGIRL_ADDRESS: HeroProperties["address"] = {
//         planet: "Earth",
//         city: "Metropolis"
//     }
//     return {
//         id: crypto.randomUUID(),
//         // ❌ Marcaría error, dado que no sigue el mismo patron que declaramos sería el tipo para esta propiedad
//         // id: "123",
//         name,
//         age,
//         isActive: true,
//         address: SUPERGIRL_ADDRESS
//     }
// }
// const SUPERGIRL = createHero({ name: "Ana", age: 400 });

//  📌 Type From Value
const address = {
    planet: "Earth",
    city: "Metropolis",
    owner: {
        name: "Clark",
        age: 30
    }
}
// type Address = typeof address;

const suma = (a: number, b: number): number => {
    return a + b;
}

type Suma = typeof suma;

const suma2: Suma = (a, b) => {
    return a + b;
}

// type from function return
function createAddress() {
    return {
        planet: "Earth",
        city: "Metropolis",
        owner: {
            name: "Clark",
            age: 30
        }
    }
}

type Address = ReturnType<typeof createAddress>;

//Arreglos
const languages = [];

//MATRICES
//Definiendo tipo de dato para una matriz
type CellValue = "X" | "O" | "";
type RGB = readonly [number, number, number]
const red: RGB = [255, 0, 0];
//❌  red.push(12);
//❌ red[0] = 10;

//❌ No puede haber mas elementos
// const red: RGB = [255, 0, 0,10];
//TUPLA tiene un limite de elementos
type GameBoard = [
    [CellValue, CellValue, CellValue],
    [CellValue, CellValue, CellValue],
    [CellValue, CellValue, CellValue],
];
const numbers: GameBoard = [
    ["X", "O", "X"],
    ["O", "X", "O"],
    ["O", "", "X"],
]

//Enums
// Así se haría en JS
const ERROR_TYPES = {
    ERROR: "error",
    WARNING: "warning",
    SUCCESS: "success"
}

function showMessage(typeOfError) {
    if (typeOfError === ERROR_TYPES.ERROR) {
        console.log("Error");
    }
    if (typeOfError === ERROR_TYPES.WARNING) {
        console.log("Warning");
    }
    if (typeOfError === ERROR_TYPES.SUCCESS) {
        console.log("Success");
    }
}

// Así se haría en TS
// 1. Debem ser finitos
// 2. No se pueden modificar
// 3. No se pueden comparar con otros tipos de datos

// Coloca un indice a cada elemento desde el 0
// con la palabra enum crea un código de comparación al momento de la copilación a JS
// Realiza la comparación con un valor
// enum ERROR_TYPES_TS {
//     ERROR,
//     WARNING,
//     SUCCESS,
// }
// La comparación sucede de esta manera
// typeOfError === ERROR_TYPES_TS.ERROR

//Realiza la comparación con el indice
const enum ERROR_TYPES_TS {
    ERROR,
    WARNING,
    SUCCESS,
}
// La comparación sucede de esta manera
// typeOfError === 0 
// ERROR_TYPES_TS.ERROR === 0

//Podemos realizar la inicialización de la variable
const enum ERROR_TYPES_TS2 {
    ERROR = "error",
    WARNING = "warning",
    SUCCESS = "success",
}
//typeOfError === "error"

function showMessageTS(typeOfError: ERROR_TYPES_TS) {
    if (typeOfError === ERROR_TYPES_TS.ERROR) {
        console.log("Error");
    }
    if (typeOfError === ERROR_TYPES_TS.WARNING) {
        console.log("Warning");
    }
    if (typeOfError === ERROR_TYPES_TS.SUCCESS) {
        console.log("Success");
    }
}
showMessageTS(0);

//Aserciones de tipo
// 1. Aserción de tipo con <>

// 2. Aserción de tipo con as
const canvas = document.getElementById("canvas");
const canvasError = document.getElementById("canvas") as HTMLCanvasElement;
if (canvas !== null && canvas instanceof HTMLCanvasElement) {
    const ctx =canvas.getContext("2d");
}
// 3. Aserción de tipo con const
// 4. Aserción de tipo con funciones


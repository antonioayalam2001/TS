type Hero = {
    name: string;
    age: number;
    powers: string[];
    sayPhrase: () => string;
    enemies?: Villain[];
    knownPeople: (Character | Villain)[];
    address?: string | number;
}

interface Character {
    name: string;
    age: number;
}
interface Villain extends Character {
    isEnemy: boolean;
}

const hero: Hero = {
    name: 'Batman',
    age: 30,
    powers: ['money'],
    knownPeople: [{
        name: 'Robin',
        age: 20,
        isEnemy: true,
    },
    {
        name: 'Alfred',
        age: 50,
    }
    ],
    sayPhrase: () => {
        return 'I am Batman';
    },
    address: 'Gotham',
}

// Narrowing
// Es cuando se le asigna un tipo más específico a una variable
// Se puede hacer con if, switch, operador ternario, etc.
function showLong(objeto: number | string) {
    if (typeof objeto === 'number') {
        //Para este punto TS ya sabe que objeto es un number
        return objeto.toString.length;
    }
    //Para este punto TS ya sabe que objeto es un string
    return objeto.length;
}

showLong(10);
showLong("10");

interface Mario {
    company: 'nintendo';
    name: string;
    jump: () => void;
}

interface Sonic {
    company: 'sega';
    name: string;
    run: () => void;
}

const mario: Mario = {
    company: 'nintendo', //Esto da error porque company debe ser 'nintendo' ❌
    name: "Mario",
    jump: () => {
        console.log('Mario is jumping');
    }
}

type GameCharacter = Mario | Sonic;

// character is mario es un type guard que nos permite saber si un objeto es de un tipo u otro
// es mera sintaxis, no es una función nativa de TS o JS pero da mas información con menos código y es muy útil
function checkIsMario(character: GameCharacter): character is Mario {
    // ✔️ Forma 1
    // return character.company === 'nintendo';
    // ✔️ Forma 2
    // Tratamos a nuestro personaje como si fuera Mario y si no tiene la propiedad jump, entonces no es Mario
    return (character as Mario).jump === undefined;
}
function play(character: GameCharacter) {
    if (checkIsMario(character)) {
        // Aquí ya sabemos que character es Mario
        character.jump();
        return
    }
    // Aquí ya sabemos que character es Sonic
    character.run();
}

//NEVER
function fn(x:string | number) {
    if (typeof x === 'string') {
        // x es un string
        return x.toUpperCase();
    } else if (typeof x === 'number') {
        // x es un number
        return x.toFixed(2);
    } else {
        // x es un never
        return x;
    }
}
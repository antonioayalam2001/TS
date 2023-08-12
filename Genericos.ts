//Genericos
function getArray<T>(items: T[]): T[] {
    return new Array<T>().concat(items);
}

function fn<T>(arg: T): T {
    return arg;
}
let string = fn<string>("10");

let numArray = getArray<number>([100, 200, 300]);

function twoGenerics<T extends string, U = number>(value1: T, value2: U): void {
    const length = value1.length;
    value1.
        console.log(typeof value1, typeof value2);
}

twoGenerics<string, number>("10", 10);

type ValidTypes = number | string;
function oneGeneric<T extends ValidTypes>(value: T): void {
    console.log(typeof value);
}
oneGeneric<number>(10);
oneGeneric<string>("10");
oneGeneric<boolean>(true); //❌❌❌ No es un tipo valido de los definidos en ValidTypes

//Interfaz Generica
interface IGeneric<T, U> {
    value: T;
    get(): U;
}

const identity: IGeneric<number, string> = {
    value: 10,
    get() {
        return "Hello";
    }
}

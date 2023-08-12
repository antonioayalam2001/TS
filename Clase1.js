var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var a = "Hola mundo";
var b = 10;
var c = true;
var d = "Hola";
var array = [1, 2, 3];
var array2 = [1, 2, 3];
var tupla = [1, "hola"];
//Ejmeplo con una clase
var Transporte = /** @class */ (function () {
    //  Permite acceso a la variable desde una clase hija (herencia)
    // protected velocidad: number;
    function Transporte(velocidad) {
        this.velocidad = velocidad;
    }
    Transporte.prototype.getVelocidad = function () {
        return this.velocidad;
    };
    Transporte.prototype.setVelocidad = function (velocidad) {
        this.velocidad = velocidad;
    };
    return Transporte;
}());
//Herencia
var Auto = /** @class */ (function (_super) {
    __extends(Auto, _super);
    function Auto(velocidad, cantidadDePuertas) {
        var _this = _super.call(this, velocidad) || this;
        _this.cantidadDePuertas = cantidadDePuertas;
        return _this;
    }
    Auto.prototype.getVelocidad = function () {
        return _super.prototype.getVelocidad.call(this) + 10;
    };
    Auto.prototype.getSound = function () {
        return "brrrr I'm a car";
    };
    return Auto;
}(Transporte));
var transporte = new Transporte(20);
transporte.setVelocidad(20);
console.log(transporte.getVelocidad());
var auto = new Auto(20, 4);
console.log(auto.getSound());
var trasportes = [transporte, auto];
var carro = trasportes[1];
console.log(carro.getVelocidad());
trasportes.forEach(function (element) {
    if (element instanceof Auto) {
        console.log(element.getSound());
    }
    console.log("No soy carro y my velocidad es: " + element.getVelocidad());
});
var rick = {
    "id": 1,
    "name": "Rick Sanchez",
    "status": "Alive",
    "species": "Human",
    "type": "",
    "origin": {
        "name": "Earth (C-137)",
        "url": "https://rickandmortyapi.com/api/location/1"
    },
};
var carachters = [rick, {
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
var dni1 = "12345678";
var dni2 = 12;
function isDNICorrect(dni) {
    if (dni.length < 1) {
        return false;
    }
    return true;
}
console.log(isDNICorrect(dni1));
var persona = {
    nombre: "Juan",
    edad: 20
};
console.log(persona);
var lawyer = {
    nombre: "Juan",
    edad: 20,
    sueldo: 2000,
    empleo: "Lawyer"
};
console.log(lawyer);
var objectInterfaceMix = {
    prop1: "hola",
    prop2: 2
};
var objectInterfaceMixOr = {
    prop1: "hola",
};
function sum(a, b) {
    return a + b;
}
var reduce = function (a, b) {
    return a - b;
};
var callbackFunction = function (a, b) {
    return a + b;
};
var result = function (sum) {
    var a = 1;
    var b = 2;
    return sum(a, b);
};
console.log(result(function (p1, p2) {
    console.log(callbackFunction(12, 8));
    return p1 + p2;
}));

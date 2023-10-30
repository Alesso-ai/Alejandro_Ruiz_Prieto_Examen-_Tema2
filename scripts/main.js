/*
    Alejandro Ruiz Prieto

    Git Hub: 
*/

/*Carga de toda la pagina, que lo primero que te pides es que inicies sesion
con el numero pin*/
window.addEventListener("load", iniciarSesion);

/*Creamos unas variables con el pin fijo por eso es constante
y otra con el saldo y los intentos*/
const PIN_CORRECTO = "1234";
let saldo = 1000;
let intentos = 3;

/*Creando las constantes para los botones para llamarlas del html*/
const btnRetirar = document.getElementById("btnRetirar");
const btnDepositar = document.getElementById("btnDepositar");
const btnTransferir = document.getElementById("btnTransferir");
const btnSalir = document.getElementById("btnSalir");
const saldoTexto = document.getElementById("saldoTexto");
const cambioContra = document.getElementById("cambioContra");


//Funcion para monstrar el saldo
function mostrarSaldo() {
  saldoTexto.innerText = `Su saldo actual es de:  ${saldo.toFixed(2)} €`;
}

//Funcion para retirar dinero
function retirar() {
  const retiro = parseFloat(prompt("Ingrese la cantidad para retirar"));

  if (isNaN(retiro) || retiro <= 0 || retiro > saldo) {
    alert("Cantidad invalida, intentelo de nuevo");
  } else {
    saldo = saldo - retiro;
    alert(`Se ha retirado: ${retiro.toFixed(2)}€`);

    mostrarSaldo();
  }
}

//Funcion para depositar 
function depositar() {
  const deposito = parseFloat(prompt("Ingresa la cantidad a depositar."));

  if (isNaN(deposito) || deposito <= 0) {
    alert("Cantidad invalida, intentelo de nuevo");
  } else {
    saldo = saldo + deposito;
    saldoTexto.innerText = `${saldo}`;
    alert(`Se ha depositado : ${deposito.toFixed(2)}`);
    mostrarSaldo();
  }
}

//Funcion para transferir
function transferir() {
  const monto = parseFloat(prompt("Ingrese la cantidad a transferir ."));

  if (isNaN(monto) || monto <= 0 || monto > saldo) {
    alert("Cantidad invalida o insuficiente a transferir, intetelo de nuevo.");
  } else {
    const cuentaDestino = prompt("Ingrese la cuenta a transferir");

    if (!validarIBAN(cuentaDestino)) {
      alert(`La cuenta ${cuentaDestino} no es una cuenta bancaria válida`);

      return;
    }
    alert(
      `Se han transferido ${monto.toFixed(2)} € a la cuenta ${cuentaDestino}.`
    );

    saldo -= monto;
    mostrarSaldo();
  }
}

//Funcion inciar sesion
function iniciarSesion() {
  let pin = prompt("Ingrese su PIN. ");

  while (pin !== PIN_CORRECTO && intentos > 1) {
    intentos--;
    alert(`PIN INCORRECTO. Le quedan ${intentos} intentos`);
    pin = prompt("Ingrese Su PIN. ");
  }
  if (pin === PIN_CORRECTO) {
    mostrarSaldo();
  } else {
    window.location.href = "templates/bloqueo.html";
  }
}


function cambioContraseña(){
  

}




//Funcion para validar que tengas que meter ES y 22 numeros a la hora de transferir dinero
function validarIBAN(iban) {
  var expresionRegular = /^(ES\d{22})$/;
  return expresionRegular.test(iban);
}


//Añadir eventos de click para que cuando haga click funcione el boton
btnDepositar.addEventListener("click", depositar);
btnRetirar.addEventListener("click", retirar);
btnTransferir.addEventListener("click", transferir);
saldoTexto.addEventListener("click", mostrarSaldo);
cambioContra.addEventListener("click" , cambioContraseña);

btnSalir.addEventListener("click", () => {
  alert("Gracias por usar nuestros servicios.");
  window.location.href = "/templates/despedida.html";
});

var numeroALetras = (function() {

    // Código basado en https://gist.github.com/alfchee/e563340276f89b22042a
        function Unidades(num){
    
            switch(num)
            {
                case 1: return 'UN';
                case 2: return 'DOS';
                case 3: return 'TRES';
                case 4: return 'CUATRO';
                case 5: return 'CINCO';
                case 6: return 'SEIS';
                case 7: return 'SIETE';
                case 8: return 'OCHO';
                case 9: return 'NUEVE';
            }
    
            return '';
        }//Unidades()
    
        function Decenas(num){
    
            let decena = Math.floor(num/10);
            let unidad = num - (decena * 10);
    
            switch(decena)
            {
                case 1:
                    switch(unidad)
                    {
                        case 0: return 'DIEZ';
                        case 1: return 'ONCE';
                        case 2: return 'DOCE';
                        case 3: return 'TRECE';
                        case 4: return 'CATORCE';
                        case 5: return 'QUINCE';
                        default: return 'DIECI' + Unidades(unidad);
                    }
                case 2:
                    switch(unidad)
                    {
                        case 0: return 'VEINTE';
                        default: return 'VEINTI' + Unidades(unidad);
                    }
                case 3: return DecenasY('TREINTA', unidad);
                case 4: return DecenasY('CUARENTA', unidad);
                case 5: return DecenasY('CINCUENTA', unidad);
                case 6: return DecenasY('SESENTA', unidad);
                case 7: return DecenasY('SETENTA', unidad);
                case 8: return DecenasY('OCHENTA', unidad);
                case 9: return DecenasY('NOVENTA', unidad);
                case 0: return Unidades(unidad);
            }
        }//Unidades()
    
        function DecenasY(strSin, numUnidades) {
            if (numUnidades > 0)
                return strSin + ' Y ' + Unidades(numUnidades)
    
            return strSin;
        }//DecenasY()
    
        function Centenas(num) {
            let centenas = Math.floor(num / 100);
            let decenas = num - (centenas * 100);
    
            switch(centenas)
            {
                case 1:
                    if (decenas > 0)
                        return 'CIENTO ' + Decenas(decenas);
                    return 'CIEN';
                case 2: return 'DOSCIENTOS ' + Decenas(decenas);
                case 3: return 'TRESCIENTOS ' + Decenas(decenas);
                case 4: return 'CUATROCIENTOS ' + Decenas(decenas);
                case 5: return 'QUINIENTOS ' + Decenas(decenas);
                case 6: return 'SEISCIENTOS ' + Decenas(decenas);
                case 7: return 'SETECIENTOS ' + Decenas(decenas);
                case 8: return 'OCHOCIENTOS ' + Decenas(decenas);
                case 9: return 'NOVECIENTOS ' + Decenas(decenas);
            }
    
            return Decenas(decenas);
        }//Centenas()
    
        function Seccion(num, divisor, strSingular, strPlural) {
            let cientos = Math.floor(num / divisor)
            let resto = num - (cientos * divisor)
    
            let letras = '';
    
            if (cientos > 0)
                if (cientos > 1)
                    letras = Centenas(cientos) + ' ' + strPlural;
                else
                    letras = strSingular;
    
            if (resto > 0)
                letras += '';
    
            return letras;
        }//Seccion()
    
        function Miles(num) {
            let divisor = 1000;
            let cientos = Math.floor(num / divisor)
            let resto = num - (cientos * divisor)
    
            let strMiles = Seccion(num, divisor, 'UN MIL', 'MIL');
            let strCentenas = Centenas(resto);
    
            if(strMiles == '')
                return strCentenas;
    
            return strMiles + ' ' + strCentenas;
        }//Miles()
    
        function Millones(num) {
            let divisor = 1000000;
            let cientos = Math.floor(num / divisor)
            let resto = num - (cientos * divisor)
    
            let strMillones = Seccion(num, divisor, 'UN MILLON DE', 'MILLONES DE');
            let strMiles = Miles(resto);
    
            if(strMillones == '')
                return strMiles;
    
            return strMillones + ' ' + strMiles;
        }//Millones()
    
        return function NumeroALetras(num, currency) {
            currency = currency || {};
            let data = {
                numero: num,
                enteros: Math.floor(num),
                centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
                letrasCentavos: '',
                letrasMonedaPlural: currency.plural || 'PESOS',//'PESOS', 'Dólares', 'Bolívares', 'etcs'
                letrasMonedaSingular: currency.singular || 'PESO', //'PESO', 'Dólar', 'Bolivar', 'etc'
                letrasMonedaCentavoPlural: currency.centPlural || 'CENTAVOS',
                letrasMonedaCentavoSingular: currency.centSingular || 'CENTAVO'
            };
    
            if (data.centavos > 0) {
                data.letrasCentavos = 'CON ' + (function () {
                        if (data.centavos == 1)
                            return Millones(data.centavos) + ' ' + data.letrasMonedaCentavoSingular;
                        else
                            return Millones(data.centavos) + ' ' + data.letrasMonedaCentavoPlural;
                    })();
            };
    
            if(data.enteros == 0)
                return 'CERO ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
            if (data.enteros == 1)
                return data.letrasMonedaSingular + ' ' + Millones(data.enteros) + ' ' +  data.letrasCentavos;
            else
                return data.letrasMonedaPlural + ' ' + Millones(data.enteros) + ' ' +  data.letrasCentavos;
        };
    
    })();
    
    numeroALetras(55.34, {
      plural: 'dólares estadounidenses',
      singular: 'dólar estadounidense',
      centPlural: 'centavos',
      centSingular: 'centavo',
    });

    
    

/*///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////FORMULARIO LIQUIDACION///////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////*/
/*------------------crea nodo para imprimir resultado liquidaicón-------------------------*/
/*////////////////////////////////Valida y procesa datos del formulario//////////////////////////// */
let natalia = "la Dra. Natalia Laura Varady";
let mauricio = "el Dr. Mauricio Julián Luparia de la Colina";
let maximina = "la Dra. Maximina Paz Luparia de la Colina";


$("#formulario").submit(function (e) {
    e.preventDefault();
    let formulario = e.target;
    let gastos = 0;
    let servicios = 0;
    /*-----------------toma datos de inputs------------------*/
    let contribuyente = formulario.caso.children[2].value;
    console.log(contribuyente);
    let juicio = formulario.caso.children[6].value;
    console.log(juicio);
    let monto = formulario.gastosJuicio.children[2].value;
    console.log(monto);
    if(document.getElementById('radio1').checked){
        gastos = 1400;
    }else
    if(document.getElementById('radio2').checked){
        gastos = 2200;
    }
    console.log(gastos);
    if(document.getElementById('radio3').checked){
        let cantidad = document.getElementById('selectorServicios').value;
        servicios = 2700 *  cantidad;
    }else
    if(document.getElementById('radio4').checked){
        servicios = 0;
    }
    console.log(servicios);
    let porcentaje = document.getElementById('selectorHono').value;
    console.log(porcentaje);
    class valoresIngresados {
        constructor(contribuyente, juicio, monto, gastos, servicios, porcentaje){
            this.contribuyente = contribuyente;
            this.juicio = juicio;
            this.monto = monto;
            this.gastos = gastos, 
            this.servicios = servicios;
            this.porcentaje = porcentaje; 
        }
    }
    const valoresIngresados1 = new valoresIngresados(contribuyente, juicio, monto, gastos, servicios, porcentaje);
    liquidacion(valoresIngresados1);
    console.log(valoresIngresados1.gastos)
});
/*
$("#formularioDos").submit(function (e) {
    e.preventDefault();
    let formulario = e.target;
    /*-----------------toma datos de inputs------------------*/
    /*
    let contribuyente = formulario.caso.children[2].value;
    console.log(contribuyente);
    let juicio = formulario.caso.children[6].value;
    console.log(juicio);
    let monto = formulario.gastosJuicio.children[2].value;
    console.log(monto);
    if(document.getElementById('radio1').checked){
        gastos = 1400;
    }else
    if(document.getElementById('radio2').checked){
        gastos = 2200;
    }
    console.log(gastos);
    if(document.getElementById('radio3').checked){
        let cantidad = document.getElementById('selectorServicios').value;
        servicios = 2700 *  cantidad;
    }else
    if(document.getElementById('radio4').checked){
        servicios = 0;
    }
    console.log(servicios);
    let porcentaje = document.getElementById('selectorHono').value;
    console.log(porcentaje);
    class valoresIngresados {
        constructor(contribuyente, juicio, monto, gastos, servicios, porcentaje){
            this.contribuyente = contribuyente;
            this.juicio = juicio;
            this.monto = monto;
            this.gastos = gastos, 
            this.servicios = servicios;
            this.porcentaje = porcentaje; 
        }
    }
    const valoresIngresados1 = new valoresIngresados(contribuyente, juicio, monto, gastos, servicios, porcentaje);
    liquidacion(valoresIngresados1);
    console.log(valoresIngresados1.gastos)
});
*/

function liquidacion(a){
    let tasa = a.monto * 0.022;
    console.log(tasa);
    let sTasa = tasa * 0.1;
    console.log(sTasa);
    let honorarios = (a.monto * a.porcentaje)/100;
    if(honorarios < 10080){
        honorarios = 10080;
    }
    console.log(honorarios);
    let aportes = honorarios *0.1;
    console.log(aportes);
    class resultado {
        constructor(contribuyente, juicio, monto, gastos, servicios, porcentaje, tasa, sTasa, honorarios, aportes){
            this.contribuyente = contribuyente;
            this.juicio = juicio;
            this.monto = monto;
            this.gastos = gastos;
            this.montoLetra = numeroALetras(this.monto); 
            this.servicios = servicios;
            this.porcentaje = porcentaje; 
            this.tasa = tasa;
            this.sTasa = sTasa;
            this.honorarios = honorarios;
            this.honoLetra = numeroALetras(this.honorarios);
            this.aportes = aportes;
            this.gastosTotal = tasa + sTasa + servicios + gastos;
            this.honorariosTotal = honorarios + aportes;
            this.TotalLiquidacion = this.gastosTotal + this.honorariosTotal;
        }
    }
    const resultado1 = new resultado(a.contribuyente, a.juicio, a.monto, a.gastos, a.servicios, a.porcentaje, tasa, sTasa, honorarios, aportes);
    muestraResultado(resultado1);
    muestraAcuerdo(resultado1);
    console.log("resultado gastos" + resultado1.gastos)
}

function muestraResultado(a){
    $("#resultado").append(`<h2>Liquidación deuda:</h2>
    <table><tr><th>Fisco de la Provincia de Buenos Aires c/</th>
    <th>${a.contribuyente} s/ apremio</th></tr>
    <tr><th>Juicio N°</th>
    <th>${a.juicio}</th></tr>
    <tr><th>Capital:</th>
    <th>$ ${a.monto}</th><th></th></tr>
    <tr><th>Tasa de Justicia:</th>
    <th>$ ${a.tasa.toFixed(2)}</th></tr>
    <tr><th>Sobre Tasa:</th>
    <th>$ ${a.sTasa.toFixed(2)}</th></tr>
    <tr><th>Gastos Estudio:</th>
    <th>$ ${a.gastos}</th></tr>
    <tr><th>Servicios Registrales:</th>
    <th>$ ${a.servicios}</th></tr>
    <tr><th>Total costas:</th>
    <th>$ ${a.gastosTotal.toFixed(2)}</th><th></th></tr>
    <tr><th>Base regulatoria:</th>
    <th>$ ${a.monto}</th><th></th></tr>
    <tr><th>Honorarios ${a.porcentaje}%:</th>
    <th>$ ${a.honorarios.toFixed(2)}</th></tr>
    <th>aportes s/ honorarios:</th>
    <th>$ ${a.aportes.toFixed(2)}</th></tr>
    <th>Subtotal a cargo del deudor:</th>
    <th>$ ${a.honorariosTotal.toFixed(2)}</th><th></th></tr>
    <th>TOTAL GASTOS Y HONORARIOS:</th>
    <th>$ ${a.TotalLiquidacion.toFixed(2)}</th></tr>
    </table>`);
}
function muestraAcuerdo(a){
    $(".contribuyente").append(`${a.contribuyente}`);
    $("#montoLetra").append(`${a.montoLetra}`);
    $("#monto").append(`${a.monto}`);
    $("#tasa").append(`${a.tasa}`);
    $("#sTasa").append(`${a.sTasa}`);
    $("#honorariosAcuerdo").append(`${a.honorarios}`);
    $("#aportes").append(`${a.aportes}`);
    $("#gastos").append(`${a.gastos}`);
}


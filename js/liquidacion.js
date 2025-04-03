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

$("#formulario").fadeIn(1000);



function meses(){
    let today = new Date();
    let anio = today.getFullYear();
    let mes = (today.getMonth()+1);
    let dia = today.getDate();
    let mesTexto = "";

    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    switch (mes){
        case 1:
            mesTexto = "enero";
        break;
        case 2:
            mesTexto = "febrero";
        break;
        case 3:
            mesTexto = "marzo";
        break;
        case 4:
            mesTexto = "abril";
        break;
        case 5:
            mesTexto = "mayo";
        break;
        case 6:
            mesTexto = "junio";
        break;
        case 7:
            mesTexto = "julio";
        break;
        case 8:
            mesTexto = "agosto";
        break;
        case 9:
            mesTexto = "septiembre";
        break;
        case 10:
            mesTexto = "octubre";
        break;
        case 11:
            mesTexto = "noviembre";
        break;
        case 12:
            mesTexto = "diciembre";
        break;
    }

    
    $("#dia").append(`${dia}`);
    $("#mes").append(`${mesTexto}`);
    $("#anio").append(`${anio}`);
    $("#diaLiq").prepend(`${dia}`);
    $("#mesLiq").prepend(`${mesTexto}`);
    $("#anioLiq").prepend(`${anio}`);
}
meses();






$("#formulario").submit(function (e) {
    e.preventDefault();
    let formulario = e.target;
    let gastos = 0;
    let servicios = 0;
    /*-----------------toma datos de inputs------------------*/
    let contribuyente = formulario.caso.children[2].value;
    let juicio = formulario.caso.children[6].value;
    $("#juicio").append(`${juicio}`);
    let monto = formulario.gastosJuicio.children[2].value;
    if(document.getElementById('radio1').checked){
        gastos = 19190;
    }else
    if(document.getElementById('radio2').checked){
        gastos = 38381;
    }
    if(document.getElementById('radio3').checked){
        let cantidad = document.getElementById('selectorServicios').value;
        servicios = 26000 *  cantidad;
    }else
    if(document.getElementById('radio4').checked){
        servicios = 0;
    }
    let porcentaje = document.getElementById('selectorHono').value;
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
});

$("#formularioDos").submit(function (e) {
    e.preventDefault();
    let selectApoderado = document.getElementById('selectorApoderados').value;
    
    let dni = formularioDos.datos.children[5].value;
    $("#dni").append(`<span>${dni}<span>`);
    let domicilio = formularioDos.datos.children[10].value;
    $("#domicilio").append(`<span>${domicilio}<span>`);
    let expediente = formularioDos.datos.children[14].value;
    $("#expediente").append(`<span>${expediente}<span>`);
    let selectJuzgado = document.getElementById('juzgado').value;
    $("#juz").append(`<span>${selectJuzgado}<span>`);

    if(document.getElementById('radio5').checked){
        $("#tipo").append(`<span>DNI </span>`);
    }if(document.getElementById('radio6').checked){
        $("#tipo").append(`<span>CUIT </span>`);
    }

    let tituloUno = formularioDos.titulos.children[9].value;
    let tituloDos = formularioDos.titulos.children[11].value;
    let tituloTres = formularioDos.titulos.children[13].value;
    let tituloCuatro = formularioDos.titulos.children[15].value;
    let tituloCinco = formularioDos.titulos.children[17].value;
    let tituloSeis = formularioDos.titulos.children[19].value;


    if(document.getElementById('radio7').checked){
        $("#titulo").append(`<span>${tituloUno}<span>`);
    }if(document.getElementById('radio8').checked){
        $("#titulo").append(`<span>${tituloUno} y ${tituloDos}<span>`);
    }if(document.getElementById('radio9').checked){
        $("#titulo").append(`<span>${tituloUno}, ${tituloDos} y ${tituloTres}<span>`);
    }if(document.getElementById('radio10').checked){
        $("#titulo").append(`<span>${tituloUno}, ${tituloDos}, ${tituloTres} y ${tituloCuatro}<span>`);
    }if(document.getElementById('radio11').checked){
        $("#titulo").append(`<span>${tituloUno}, ${tituloDos}, ${tituloTres}, ${tituloCuatro} y ${tituloCinco}<span>`);
    }if(document.getElementById('radio12').checked){
        $("#titulo").append(`<span>${tituloUno}, ${tituloDos}, ${tituloTres}, ${tituloCuatro}, ${tituloCinco} y ${tituloSeis}<span>`);
    }
    switch(selectApoderado){
        case "natalia":
            $("#apoderado").append(`<span>la Dra. Natalia Laura Varady<span>`);
            break;
        case "mauricio":
            $("#apoderado").append(`<span>el Dr. Mauricio Julián Luparia de la Colina<span>`);
            break;
            case "maximina":
        $("#apoderado").append(`<span>la Dra. Maximina Paz Luparia de la Colina<span>`);
            break;
    }

});

$("#radio7").click(function (){  
    $("#tituloUno").fadeIn(1000);
    $("#tituloDos").hide();
    $("#tituloTres").hide();
    $("#tituloCuatro").hide();
    $("#tituloCinco").hide();
    $("#tituloSeis").hide();
});
$("#radio8").click(function (){  
    $("#tituloUno").fadeIn(1000);
    $("#tituloDos").fadeIn(1000);
    $("#tituloTres").hide();
    $("#tituloCuatro").hide();
    $("#tituloCinco").hide();
    $("#tituloSeis").hide();
});
$("#radio9").click(function (){  
    $("#tituloUno").fadeIn(1000);
    $("#tituloDos").fadeIn(1000);
    $("#tituloTres").fadeIn(1000);
    $("#tituloCuatro").hide();
    $("#tituloCinco").hide();
    $("#tituloSeis").hide();
});
$("#radio10").click(function (){  
    $("#tituloUno").fadeIn(1000);
    $("#tituloDos").fadeIn(1000);
    $("#tituloTres").fadeIn(1000);
    $("#tituloCuatro").fadeIn(1000);
    $("#tituloCinco").hide();
    $("#tituloSeis").hide();
});
$("#radio11").click(function (){  
    $("#tituloUno").fadeIn(1000);
    $("#tituloDos").fadeIn(1000);
    $("#tituloTres").fadeIn(1000);
    $("#tituloCuatro").fadeIn(1000);
    $("#tituloCinco").fadeIn(1000);
    $("#tituloSeis").hide();
});
$("#radio12").click(function (){  
    $("#tituloUno").fadeIn(1000);
    $("#tituloDos").fadeIn(1000);
    $("#tituloTres").fadeIn(1000);
    $("#tituloCuatro").fadeIn(1000);
    $("#tituloCinco").fadeIn(1000);
    $("#tituloSeis").fadeIn(1000);
});


function liquidacion(a){
    let tasa = a.monto * 0.022;
    let sTasa = tasa * 0.1;
    let honorarios = (a.monto * a.porcentaje)/100;
    if(honorarios < 115143){
        honorarios = 115143;
    }
    let aportes = honorarios *0.1;
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
            this.honoFisco = honorarios * 0.4;
            this.honoApoderado = honorarios * 0.6;
            this.ingBrutos = honorarios * 0.035;
            this.totalDeducciones = aportes + this.ingBrutos;
            this.honoNeto = honorarios - this.totalDeducciones;
            this.netoEstudio = this.honoNeto * 0.6;
            this.netoFisco = this.honoNeto * 0.4;
            this.aporteFisco = this.netoFisco * 0.2;
            this.aporteEstudio = (aportes * 2) - this.aporteFisco;
            this.totalAportes = this.aporteFisco + this.aporteEstudio;
            this.aPagar = this.tasa + this.sTasa + this.servicios + this.ingBrutos + this.netoFisco + this.totalAportes;
        }
    }
    const resultado1 = new resultado(a.contribuyente, a.juicio, a.monto, a.gastos, a.servicios, a.porcentaje, tasa, sTasa, honorarios, aportes);
    muestraResultado(resultado1);
    muestraAcuerdo(resultado1);
}
$("#btnEnviar").click(function (){  
    $("#formulario").hide();  
    $("#resultado").fadeIn(700);
});
$("#btnAcuerdo").click(function (){  
    $("#resultado").hide();  
    $("#formularioDos").fadeIn(700);
});

$("#btnHacerAcuerdo").click(function (){  
    $("#formularioDos").hide();  
    $("#acuerdo").fadeIn(700);
});



function muestraResultado(a){
    $("#resultado").prepend(`
    <h2>Liquidación deuda:</h2>
    <h3>Fisco de la Provincia de Buenos Aires c/ ${a.contribuyente} s/ apremio</h3><br>
    <h4>Juicio N° ${a.juicio}</h4><br> 
    <hr>   
    <table>
    <tr>
    <th>Deuda ARBA :</th>
    <th class="number">$ ${a.monto}</th>
    </tr>
    <tr>
    <th>Tasa de Justicia:</th>
    <th>$ ${a.tasa.toFixed(2)}</th>
    </tr>
    <tr>
    <th>Sobre Tasa:</th>
    <th>$ ${a.sTasa.toFixed(2)}</th>
    </tr>
    <tr>
    <th>Gastos Estudio:</th>
    <th>$ ${a.gastos.toFixed(2)}</th>
    </tr>
    <tr>
    <th>Servicios Registrales:</th>
    <th>$ ${a.servicios.toFixed(2)}</th>
    </tr>
    <tr>
    <th class="totales">TOTAL COSTAS:</th>
    <th class="totales">$ ${a.gastosTotal.toFixed(2)}</th>
    </tr>
    </table>
    <hr>
    <table>
    <tr><th>Base regulatoria:</th>
    <th>$ ${a.monto}</th></tr>
    <tr><th>Honorarios ${a.porcentaje}%:</th>
    <th>$ ${a.honorarios.toFixed(2)}</th></tr>
    <th>aportes s/ honorarios:</th>
    <th>$ ${a.aportes.toFixed(2)}</th></tr>
    <tr><th class="totales">SUBTOTAL A CARGO DEL DEUDOR:</th>
    <th class="totales">$ ${a.honorariosTotal.toFixed(2)}</th></tr>
    </table>
    <hr>
    <table>
    <tr><th class="totales">TOTAL GASTOS Y HONORARIOS:</th>
    <th class="totales">$ ${a.TotalLiquidacion.toFixed(2)}</th></tr>
    </table>
    <hr>
    <table class="extraDetail none">
    <tr><th class="totales">DETALLE ESTUDIO<th/><tr/>
    <tr><th>Honorarios :</th>
    <th>$ ${a.honorarios.toFixed(2)}</th></tr>
    <th>aporte 10%:</th>
    <th>$ ${a.aportes.toFixed(2)}</th></tr>
    <th>Ingresos Brutos:</th>
    <th>$ ${a.ingBrutos.toFixed(2)}</th></tr>
    <tr><th class="totales">Total Deducciones :</th>
    <th class="totales">$ ${a.totalDeducciones.toFixed(2)}</th></tr>
    <th>Honorario Neto</th>
    <th>$ ${a.honoNeto.toFixed(2)}</th></tr>
    <th>60% estudio:</th>
    <th>$ ${a.netoEstudio.toFixed(2)}</th></tr>
    <th>40% fisco:</th>
    <th>$ ${a.netoFisco.toFixed(2)}</th></tr>
    <tr><th colspan="2">....................................................................................................
    </th></tr>
    <tr><th>Aportes Fiscalia :</th>
    <th>$ ${a.aporteFisco.toFixed(2)}</th></tr>
    <th>Aportes Estudio:</th>
    <th>$ ${a.aporteEstudio.toFixed(2)}</th></tr>
    <th class="totales">Total Aportes:</th>
    <th class="totales">$ ${a.totalAportes.toFixed(2)}</th></tr>
    <tr><th class="totales">A pagar: </th>
    <th class="totales">$ ${a.aPagar.toFixed(2)}</th></tr>
    </table>`);
}
function muestraAcuerdo(a){
    
    $(".contribuyente").append(`${a.contribuyente.toUpperCase()}`);
    $("#montoLetra").append(`${a.montoLetra}`);
    $("#honoLetra").append(`${a.honoLetra}`);
    $("#monto").append(`${a.monto}`);
    $("#tasa").append(`${a.tasa.toFixed(2)}`);
    $("#sTasa").append(`${a.sTasa.toFixed(2)}`);
    $("#honorariosAcuerdo").append(`${a.honorarios.toFixed(2)}`);
    $("#honoapoderado").append(`${a.honoApoderado.toFixed(2)}`);
    $("#honofisco").append(`${a.honoFisco.toFixed(2)}`);
    $("#aportes").append(`${a.aportes.toFixed(2)}`);
    $("#gastos").append(`${a.gastos.toFixed(2)}`);
}

function limpiarFormulario() {
    document.getElementById("formulario").reset();
    $("#resultado").remove();
    $(".container").append(`<div id="resultado"></div>`);
}

$("#btnLimpiar").click(function (){    
    limpiarFormulario();  
});

function limpiarFormularioDos() {
    document.getElementById("formularioDos").reset();
    $("#tituloUno").fadeIn(1000);
    $("#tituloDos").hide();
    $("#tituloTres").hide();
    $("#tituloCuatro").hide();
    $("#tituloCinco").hide();
    $("#tituloSeis").hide();
}

$("#btnLimpiarDos").click(function (){    
    limpiarFormularioDos();  
});

$("#btnVer").click(function (){   
    $(".extraDetail").fadeIn("fast");
    $("#btnVer").hide();
    $("#btnOcultar").show();
});

$("#btnOcultar").click(function (){   
    $(".extraDetail").fadeOut("fast");
    $("#btnOcultar").hide();
    $("#btnVer").show();
});

let FB = true; /* FeedBack cambiar a false para deshabilitar los mensajes de log*/

FB ? console.log("node.js Funcionando.\nImportando Módulos...\n") : 1;

FB ? console.log("Importando Módulo \"request\"...") : 2;
const request = require("request");
FB ? console.log("Importado.\n") : 3;

FB ? console.log("Importando Módulo \"http\"...") : 4;
const http = require("http");
FB ? console.log("Importado.\n") : 5;

FB ? console.log("Importando Módulo \"jsdom\"...") : 6;
const jsdom = require("jsdom");
FB ? console.log("Importado.\n") : 7;

FB ? console.log("Importando Módulo \"fs(file system)\"...") : 8;
const fs = require("fs");
FB ? console.log("Importado.\n") : 9;

FB ? console.log("Se importaron todos los módulos.\n\n") : 10;

FB ? console.log("Declarando Variables y Objetos en alcance global...") : 11;
let tabla;
let stats;
let {
  JSDOM
} = jsdom;
let dom;
let q;
let equipos = {};
let quiniela = {};
let tablaCreada = false;
FB ? console.log("Declarados.\n\n") : 12;



function GuardarRespuesta(tabla) {
  fs.writeFile("tabla.html", tabla, function(err) { if(err) {return console.log(err); } FB ? console.log("La tabla descargada se guardo correctamente como \"tabla.html\" ") : 25; LevantarServidor();});
}
 

function DescargarTabla() {
  FB ? console.log("Se está realizando la petición a \"https://www.combinacionganadora.com/quiniela\"...") : 13;
  request ({
    uri: "https://www.combinacionganadora.com/quiniela"
  },
  function(error,response,body) {
    FB ? console.log("Petición finalizada") : 14;
    FB ? console.log("Crawleando el documento HTML...") : 15;
    let {
      JSDOM
    } = jsdom;
    dom = new JSDOM(body);
    q = dom.window.document.querySelector.bind(dom.window.document);
    try {
    tabla = q("[data-results-details-gameType]").outerHTML;
    } catch(err) { console.log("No internet??? Error: \n" + err); }
    FB ? console.log("Se crawleó correctamente. Contenido crawleado:\n" + tabla) : 16;
    GuardarRespuesta(tabla);
  });
}

function CargarArchivo() {
	FB ? console.log("Importando \"tabla.html\"...\n") : 17;
  fs.readFile("./tabla.html", "utf8", function(err, contents) {
    FB ? console.log("Volcando contenido de \"tabla.html\" en variable global...") : 18;
    tabla = contents; 
    FB ? console.log("archivo \"tabla.html\" volcado. \n\nContenido:\n"+ contents + "\n\n") : 19;
    tablaCreada = true;
    GuardarRespuesta(tabla);
    });
}

try {
  if (!fs.existsSync("tabla.html")) {
    DescargarTabla();
  }
}
catch(err) {
  FB ? console.log(err) : 20;
}

try {
 if (fs.existsSync("tabla.html")) {
 	ComprobarTabla();
  }
}
catch(err) {
  FB ? console.log(err) : 26;
}

function ComprobarTabla() {
  tablaCreada = true;
  if (tabla == undefined) {
    tablaCreada = false;
    FB ? console.log("Se encontró \"tabla.html\" en la ruta local\n") : 21;
    CargarArchivo();
  }

}

function LevantarServidor() {
  FB ? console.log("Levantando Servidor...\n") : 22;
  http.createServer(function (req, res) {
    res.writeHead(200, {'content-type': 'text/html'});
    res.write(tabla.toString());
    res.end();
    }).listen(8080, "127.0.0.1");
  FB ? console.log("Servidor HTTP a la escucha en la dirección 127.0.0.1:8080") : 23;
  ObtenerEquiposQuiniela();
}

function ObtenerEquiposQuiniela() {
  dom = new JSDOM(tabla);
  t = dom.window.document.getElementsByTagName.bind(dom.window.document);
  FB ? console.log("Obteniendo los equipos de la próxima quiniela...\n") : 26;
  equipos.todos = t("img");
  
  for (let i = 0; i < equipos.todos.length; ++i) {
  	equipos["eq"+(1+i)] = (equipos.todos[i].alt.substring(7, equipos.todos[i].length));
  }
  
  FB ? console.log("Obteniendo los partidos de la próxima quiniela...\n") : 27;
  
  quiniela.primerPartido = equipos.eq1 + "-" + equipos.eq2;
  quiniela.segundoPartido = equipos.eq3 + "-" + equipos.eq4;
  quiniela.tercerPartido = equipos.eq5 + "-" + equipos.eq6;
  quiniela.cuartoPartido = equipos.eq7 + "-" + equipos.eq8;
  quiniela.quintoPartido = equipos.eq9 + "-" + equipos.eq10;
  quiniela.sextoPartido = equipos.eq11 + "-" + equipos.eq12;
  quiniela.septimoPartido = equipos.eq13 + "-" + equipos.eq14;
  quiniela.octavoPartido = equipos.eq15 + "-" + equipos.eq16;
  quiniela.novenoPartido = equipos.eq17 + "-" + equipos.eq18;
  quiniela.dPartido = equipos.eq19 + "-" + equipos.eq20;
  quiniela.dPrimerPartido = equipos.eq21 + "-" + equipos.eq22;
  quiniela.dSegundoPartido = equipos.eq23 + "-" + equipos.eq24;
  quiniela.dTercerPartido = equipos.eq25 + "-" + equipos.eq26;
  quiniela.dCuartoPartido = equipos.eq27 + "-" + equipos.eq28;
  quiniela.dQuintoPartido = equipos.eq29 + "-" + equipos.eq30;
  
  FB ? console.log("Primer partido de la quiniela: " + quiniela.primerPartido + "\n") : 28;
  FB ? console.log("Segundo partido de la quiniela: " + quiniela.segundoPartido + "\n") : 29;
  FB ? console.log("Tercer partido de la quiniela: " + quiniela.tercerPartido + "\n") : 30;
  FB ? console.log("Cuarto partido de la quiniela: " + quiniela.cuartoPartido + "\n") : 31;
  FB ? console.log("Quinto partido de la quiniela: " + quiniela.quintoPartido + "\n") : 32;
  FB ? console.log("Sexto partido de la quiniela: " + quiniela.sextoPartido + "\n") : 33;
  FB ? console.log("Septimo partido de la quiniela: " + quiniela.septimoPartido + "\n") : 34;
  FB ? console.log("Octavo partido de la quiniela: " + quiniela.octavoPartido + "\n") : 35;
  FB ? console.log("Noveno partido de la quiniela: " + quiniela.novenoPartido + "\n") : 36;
  FB ? console.log("Decimo partido de la quiniela: " + quiniela.dPartido + "\n") : 37;
  FB ? console.log("Decimo primer partido de la quiniela: " + quiniela.dPrimerPartido + "\n") : 38;
  FB ? console.log("Decimo segundo partido de la quiniela: " + quiniela.dSegundoPartido + "\n") : 39;
  FB ? console.log("Decimo tercer partido de la quiniela: " + quiniela.dTercerPartido + "\n") : 40;
  FB ? console.log("Decimo cuarto partido de la quiniela: " + quiniela.dCuartoPartido + "\n") : 41;
  FB ? console.log("Ultimo partido de la quiniela: " + quiniela.dQuintoPartido + "\n") : 42;
  
  ObtenerStats();
  
}



function ObtenerStats() {
  
  FB ? console.log("Importando \"stats.html\"...\n") : 43;
  fs.readFile("./stats.html", "utf8", function(err, contents) {
    FB ? console.log("Volcando contenido de \"stats.html\" en variable global...") : 44;
    stats = contents; 
    FB ? console.log("archivo \"stats.html\" volcado. \n\nContenido:\n"+ contents + "\n\n") : 45;
    dom = new JSDOM(stats);
    t = dom.window.document.getElementsByTagName.bind(dom.window.document);
    equipos.primera2019 = t("p")[0].innerHTML;
    equipos.segunda2019 = t("p")[1].innerHTML;
    equipos.primera2018 = t("p")[2].innerHTML; 
    equipos.segunda2018 = t("p")[3].innerHTML;
    equipos.tercera2018 = t("p")[4].innerHTML;

    c = dom.window.document.getElementsByClassName.bind(dom.window.document);

    let temp = equipos.eq1.toString();
    let media = {}
    let veces = 0;
    let res = 0;
    let DATOS = {};
    DATOS.partido1 = {};
    DATOS.partido1.eq1 = {};
    let datosTemp =[];
    let arrMedias =[];
    temp = c(temp);

    for(let j = 0; j < 30; ++j) {
       arrMedias[j]=(ObtenerMediaPD(equipos["eq"+(1+j)]));
    }
    
    
    datosTemp=ObtenerPorcentaje(arrMedias[0], arrMedias[1], 1);
    DATOS.partido1.eq1=datosTemp[0];
    DATOS.partido1.eq2=datosTemp[1];
    
    FB ? console.log(equipos.eq1 + " - " +
                                   equipos.eq2 + "\n" +
                                   DATOS.partido1.eq1 + "%       -       " +
                                   DATOS.partido1.eq2 + "%") : 49;
                                 
    
    
function ObtenerMediaPD(equipo) {
   res = 0;
   temp = equipo.toString();
   let temp2 = temp;
   FB ? console.log("Obteniendo puntos de desempeño del " + temp) : 46;
   temp = c(temp);
	
    veces = 0;
    for(let i = 0; i < temp.length; ++i) {
      media["m"+(1+i)] = temp[i].innerHTML;
      FB ? console.log("Obtenido: " + media["m"+(1+i)]) : 47;
      ++veces;
    }
    
    FB ? console.log("Calculando media aritmética de puntos de desempeño...") : 48;
    for(let i = 0; i < veces; ++i) {
    	res += parseInt(media["m"+(1+i)]);
    }
    
    temp = res/veces;
    FB ? console.log("Los puntos medios del " + temp2 + " son " + temp + "\n") : 49;
    return temp;
}

function ObtenerPorcentaje(mediaEq1, mediaEq2, suavizado) {
  
  let diferencia = 100;
  let eq1 = parseInt(mediaEq1);
  let eq2 = parseInt(mediaEq2);

  if(mediaEq1 > mediaEq2) {
    diferencia = (mediaEq1 - mediaEq2) / suavizado;
    eq1 += diferencia;
    eq2 -= diferencia;
    console.log(eq1 + " " + eq2);
  }
  
  else if(mediaEq1 < mediaEq2) {
  	diferencia = (mediaEq2 - mediaEq-1) / suavizado;
      eq1 -= diferencia;
      eq2 += diferencia;
  }
  
  else {
  }

  let arrayConDatos = [eq1, eq2];
  return arrayConDatos;  
}
    
    
    });
    
    
    
    
}

/*
  funciones para contactar con la api.
*/


usuarios = [];

function login(usuario,contraseña,u){ // function para logear
var http = new HttpRequest();
http.utf=true;
http.params='name='+usuario+'&contraseña='+contraseña;
crearPeticion("getUser",http,u);

}

function addcustom(u,string){ //function para agregar custom al guardaRopa
var http = new HttpRequest();
var usuario= u.datos.usuario
var contraseña= u.datos.contraseña
http.utf=true;
http.params='name='+usuario+'&contraseña='+contraseña+'&custom='+string;
crearPeticion("addCustom",http,u);
/*if(temp==true){  // lo agregamos tambien a los objetos que tenemos ya logeado.
    for(var i in usuarios){
        if(usuarios[i].usuario==u.datos.usuario){
            usuarios[i].custom.push(string);
        }
    }
}*/
 // devuelvo el estado de la funcion crearPeticion
}

function mostrarLista(u){ //function para mostrar la lista del guardaRopa
for(var i in usuarios){
    if(usuarios[i].usuario==u.datos.usuario){
        print(u,"X----- guardaRopa -----X");
        print(u,"");
        for(var a in usuarios[i].custom){
            print(u,"ID: "+a+"  "+usuarios[i].custom[a]);
        }
        print(u,"");
        print(u,"X----- fin de la lista -----X");
        print(u,"");
        print(u,"Para ponerte ropa #custom +id");
    }
}
}
estado=false;
function crearUsuario(usuario,contraseña,u){ //function para crear usuario.
 var http = new HttpRequest();
 http.method='post'
 http.utf=true;
 http.params='name='+usuario+'&contraseña='+contraseña;
 crearPeticion("addUser",http,u);
 
}

function custom(usuario,id){ // function para buscar y poner custom al usuario.
    for(var i in usuarios){
        if(usuarios[i].usuario==usuario.datos.usuario){
           if(id<usuarios[i].custom.length){
            usuario.customName=usuarios[i].custom[id];
            return true;
           }
        }
    }
    return false;
}
function agregarUsuario(obj){ // function para agregar objetos.
    usuarios.push(obj);
}
function obtenerEstado(){
    var http = new HttpRequest();
    http.utf=true;
    crearPeticion("estado",http);
}

function crearPeticion(api,obj,u=null){
    switch(api){
        case "addUser":
        obj.method='post'
        obj.src="http://sb0t.3utilities.com:4952/addUser" //url para realizar la petición.
        obj.oncomplete=function(e){ 
            if(e){
             print(this.page);
            } else {
             print("Error");
            }
        }
        obj.download();
        break;
        case "getUser":
            obj.method='post'
            obj.src="http://sb0t.3utilities.com:4952/getUser" //url para realizar la petición
            obj.oncomplete=function(e){
                if(e){ 
                var nuevoUsuario=JSON.parse(this.page);
                agregarUsuario(nuevoUsuario); // estructura del obj {usuario:'',contraseña:'',custom:[]}
                u.logeado=true;
                u.datos={'usuario':nuevoUsuario.usuario,'contraseña':nuevoUsuario.contraseña}
                print(u,u.name+" has logeado con éxito.");
                } else {
                   print(u,u.name+" has fallado al logear");
                }
            }
            obj.download();
            break;
        case "addCustom":
            obj.method='post'
            obj.src='http://sb0t.3utilities.com:4952/addCustom' // url para realizar la petición
            obj.oncomplete=function(e){
                  if(e){
                    var temp = this.page
                    for(var i in usuarios){
                        if(usuarios[i].usuario==u.datos.usuario){
                            usuarios[i].custom.push(temp);
                            print(u,u.name+" Custom agregado con éxito");
                        }
                    }
                  } else {
                    print("Error");
                  }
            }
            obj.download();
            break;
        case "estado":
            obj.method='get'
            obj.src='http://sb0t.3utilities.com:4952/estado'
            obj.oncomplete=function(e){
                if(e){
                    print(this.page)
                } else {
                    print(this.arg);
                }
            }
            obj.download();
            break;

    }
}


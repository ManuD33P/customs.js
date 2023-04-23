/*
 App que guarda datos de usuario y contraseña. y las envia atraves de peticiones http
 formato de peticiones en codificacion de formulario html ( atributo=value&atributo=value);
 el recibimiento es un string de objeto. se puede convertir a un objeto. usando la codificion JSON.
 */
 function onHelp(u){
    print(u,"");
    print(u,"X----------- Comandos -------------X");
    print(u,"");
    mostrar(u);
    print(u,"");
    obtenerEstado();
 }

 function onLoad(){
    include('modelo.js');
    print("Script GuardaRopa by Manu16");
    print("");
    print("Caracteristica del script: ")
    print("Este script es único en su clase, ya que esta sincronizado en las salas donde tienen este script");
    print("por lo cual, ya puedes agregar,logear y usar tu guardaropa en cualquier sala que tenga el script.");
    print("");
    print(" P/D: Mantendre la funcionalidad del script, hasta un cierto tiempo. Luego liberare el codigo");
    print("");
    print("X----------- Comandos -------------X");
    print("");
    mostrar();
    print("");
    obtenerEstado();
 }

function mostrar(u=null){
    var comandos = ["#logear +usuario,+contraseña ----> ejemplo: /logear manu,1234",
                    "#miCustoms ----> Entrega lista completa de tu guardaRopa con su respectivo ID.",
                    "#custom +ID de la ropa ----> Comando para ponerse Ropa , la id la sacan de la lista de guardaRopa",
                    "#addcustom +ropa ----> Comando para agregar una nueva ropa al guardaRopa",
                    "#nuevaCuenta +usuario,+contraseña ----> Sirve para crear un nuevo usuario y contraseña",
                    "#estado ----> para ver el estado de la beta, si hay actualizacion nueva del script."];
            
                for(var i in comandos){
                if(u!=null){
                    print(u,comandos[i]);
                } else {
                    print(comandos[i]);
                }
            }
}


 function onCommand(u,cmd,target,args){
    if(cmd.substr(0,7)=='logear '){
     var temp = cmd.substr(7).split(",");
        // hacer funcion para logear.
        if(temp[0]!='null' && temp[1]!=null){
        login(temp[0],temp[1],u);
         }
    }
    if(cmd.substr(0,10)=='addcustom '){ //agregar un custom a los usuarios de la base de dato.
      var temp = cmd.substr(10);
      if(u.logeado==true){
        addcustom(u,temp);
      } else {
        print(u," Debes logear antes de agregar un custom a tu guardaRopa.")
      }
    }
    if(cmd.substr(0,7)=='custom '){
        var temp = cmd.substr(7); 
        if(u.logeado==true){
            var result= custom(u,temp);
            if(result==true){
                Registry.setValue(u.name,u.customName);
                print(u.name+" Se ha colocado un custom de su guardaRopa.");
            } else {
                print(u," la id es incorrecta verifica porfavor en la lista de tu guardaRopa #miCustoms");
            }
            //poner el custom y registrarlo en la sala. para que lo tenga siempre que entre.
        } else {
            print(u,"Primero tienes que logear.");
        }
    }
    if(cmd.substr(0,9)=='miCustoms'){
        
          if(u.logeado==true){
            // hacer funcion para enviar lista de customs
            mostrarLista(u);
          } else {
            print(u,"Primero tenes que logear.")
          }
    }
    if(cmd.substr(0,12)=='nuevaCuenta '){ //hacer funcion crear una nueva cuenta.
        var temp = cmd.substr(12).split(",");
        if(temp[0]!=null & temp[1]!=null){
        crearUsuario(temp[0],temp[1],u);
         }    
    }
    if(cmd=='estado'){
        obtenerEstado();
    }
 }
function onJoin(u){ //por ejemplo.
if(Registry.getValue(u.name)!=null){
 custom = Registry.getValue(u.name);
 u.customName=custom
}
}
/*

 hacer bienvenida para volver a poner los customs guardados.


*/

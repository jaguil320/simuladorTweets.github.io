//crear selectores
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');

// estructura para almaenar los tweets
let tweets=[];


//eventos o eventListener

eventListener(); //inicializar el codigo

function eventListener(){
   formulario.addEventListener('submit',agregarTweets)


   //carga contenido de los tweets en el localstorage
   document.addEventListener('DOMContentLoaded',()=>{
    tweets = JSON.parse(localStorage.getItem('tweets'));
    crearHTML();
   })
}

function agregarTweets(e){
   e.preventDefault(); 
   //console.log('ingrese a la funsion')

   const tweet = document.querySelector('#tweet').value;
   //console.log(tweet)
///validacion


 if(tweet===''){
   //console.log('el campo esta vacio')
   mostrarError('El tweet no puede estar vacio')
   return

 }else{

     
  if(tweet.length > 255 ){
  
   mostrarError('Tweet supera los 255 caracteres')
   return

 }
   

}
    
   //crear objeto

   const tweetObj ={
     tweet: tweet,
     id: Date.now()
 
   }
 
   tweets = [...tweets,tweetObj];
   //console.log(tweets);

   crearHTML();
   formulario.reset();
 }
 
 function mostrarError(mensaje){
   const mensajeError = document.createElement('p');
   mensajeError.textContent = mensaje;
   mensajeError.classList.add('error');
   //insertar el mensaje de error
   const contenido = document.querySelector('#contenido');
   contenido.appendChild(mensajeError);


   //eliminar alerta

   setTimeout(()=>{
       mensajeError.remove()
   },3000); 
}



function crearHTML(){
 //console.log('igrese a la funcion crearhtml');

 limpiarHtml();

if(tweets.length > 0){
//al menos hay un tweet guardado en el arreglo
//crear y mostrar ese html en la interfaz
//recorrer el arreglo

tweets.forEach(tweets=>{
 const li = document.createElement('li');
 const btnEliminar = document.createElement('a');
 btnEliminar.classList.add('borrar-tweet');
 btnEliminar.innerText = 'X';

 btnEliminar.onclick = ()=>{
   borrarTweet(tweets.id);
 }

 li.innerText = tweets.tweet;
 li.appendChild(btnEliminar);
 listaTweets.appendChild(li);

   })
 }
 sincronizarStorage();
}

function limpiarHtml(){

 while(listaTweets.firstChild){
   listaTweets.removeChild(listaTweets.firstChild)  
 }
 
}

function borrarTweet(id){
 //console.log('ingrese al boton eliminar')
 tweets = tweets.filter(tweets=> tweets.id !== id);
 //console.log(twees);
 crearHTML();
}

function countText(){

   const countText = document.formulario.tweet.value;
   document.getElementById('characters').innerHTML = countText.length;
 
}

//agregar tweets al localstorage
function sincronizarStorage(){

  localStorage.setItem('tweets', JSON.stringify(tweets));

}
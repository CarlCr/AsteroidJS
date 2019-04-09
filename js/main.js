// @type (HTMLCanvasElemelemt)*/
 let canv = document.getElementById("gameCanvas");
 let ctx = canv.getContext("2d");

 let ship = newShip();

 //set up asteroids
 let roids = [];
 createAsteroidBelt();

 //set up event handlerns
 document.addEventListener("keydown", keyDown);
 document.addEventListener("keyup", keyUp);

 //set up the game loop
 setInterval(update, 1000 / FPS);
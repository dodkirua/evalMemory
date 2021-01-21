import {Game} from "./Game.js";
import * as utils from "./function.js";

let img = [
    "andromalius.png",
    "boss.png",
    "disciple.png",
    "gnu.png",
    "mage.png",
    "minion.png",
    "shadow.png"
];
let start = document.getElementById("start");
let game;
let end = document.getElementById("end");
let gameArea = document.getElementById("gameArea");
let nbCardReturn = 0;

selectGame();

/**
 * initialise the game
 * @param nbCard
 * @param difficulty
 */
function initialize (nbCard,difficulty){
    start.style.display = "none";
    game = new Game(img,nbCard,difficulty);
    let dim = game.getDim();
    let listCard = game.getListCard();
    let tmp;

    for (let i = 0 ; i < listCard.length ; i++){
        tmp = document.createElement("div");
        tmp.className = "card";
        tmp.id = "c"+i;
        tmp.innerHTML = "?";
        tmp.style.cssText = "width : "+dim+"%;height : "+dim+"%;background-color: deepskyblue;";
        gameArea.append(tmp);
    }

    // listen the click
    let card = document.getElementsByClassName("card");
    for (let i = 0 ; i < card.length ; i++){
        card[i].addEventListener("click",function (e){
           tmp = e.target.id.substr(1);
           if (game.getToken() === true) {
               if (listCard[tmp].getFind() === false) {
                   if (listCard[tmp].getSelect() === false) {
                       listCard[tmp].setSelect();
                       utils.replaceColorByImage(e.target, game);
                       nbCardReturn++;
                       if (nbCardReturn === 2) {
                           game.setToken();
                           setTimeout(utils.testEven, 1000, game);
                           nbCardReturn = 0;
                       }
                   }
               }
           }
           if (game.testVictory() === true){
               endGame();
           }
        });
    }
}

/**
 *  choice for the game and listener for the validation
 */
function selectGame() {
    start.style.display = "flex";
    end.style.display = "none";
    let select = document.getElementById("valid").querySelector("button");
    select.addEventListener("click", function (){
        let dif = document.getElementById("difficulty").value;
        let nbCard = parseInt(document.getElementById("size").value);
        initialize(nbCard,dif);
        gameArea.style.display = "flex";
    });

}

/**
 * Result of the game and restart possible
 */
function endGame(){
    let div = document.getElementsByClassName("card");
    while (div[0] !== undefined){
        div[0].remove();
        div = document.getElementsByClassName("card");
    }
    gameArea.style.display = "none";
    end.style.display = "flex";
    end.children[0].innerHTML = "Félicitations vous avez finis le jeu avec "+game.getNbError()+" erreur(s)."
    end.children[1].addEventListener("click",function (){
        location.reload();
    })
}

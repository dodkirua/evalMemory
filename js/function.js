
export function random(nbmax){
    return Math.trunc(Math.random()*nbmax);
}

/**
 * shuffle array thanks you Fisher-Yates (aka Knuth)  https://github.com/coolaj86/knuth-shuffle
 * modification original code : var => let
 *  @param array
 * @returns {*}
 */
export function shuffle(array) {
    let currentIndex = array.length
        , temporaryValue
        , randomIndex
    ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/**
 *  find in array a value
 * @param array
 * @param elem
 * @returns {number}
 */
export function find (array,elem){
    for (let i = 0 ; i < array.length ; i++){
        if (array[i] === elem){
            return i;
        }
    }
    return -1;
}

/**
 * display the picture after the click
 * @param target
 * @param game
 */
export function replaceColorByImage(target,game){
    let tmp = target.id.substr(1);
    let dim = game.getDim();
    let listCard = game.getListCard();
    target.style.cssText = "width : "+dim+"%;height : "+dim+"%;";
    target.innerHTML = "";
    target.style.backgroundImage = "url(\"./img/"+listCard[tmp].getImg()+"\")";
}

/**
 * remove the picture
 * @param listCard
 * @param dim
 */
export function returnCard(listCard,dim){
    for (let i = 0 ; i < listCard.length ; i++){
        if (listCard[i].getFind() !== true){
            document.getElementById("c"+i).style.cssText = "width : "+dim+"%;height : "+dim+"%;background-color: deepskyblue;";
            document.getElementById("c"+i).innerHTML = "?";
        }
    }
}

/**
 * test if the even is good
 * @param game
 */
export function testEven (game){
    let tmp = -1;
    let listCard = game.getListCard();
    for (let i = 0 ; i < listCard.length ; i++){
        if (listCard[i].getSelect() === true){
            if (tmp === -1) {
                tmp = i;
            }
            else {
                if (listCard[i].getImg() === listCard[tmp].getImg()){
                    listCard[i].setFind();
                    listCard[i].setSelect();
                    listCard[tmp].setFind();
                    listCard[tmp].setSelect();
                }
                else{
                    listCard[i].setSelect();
                    listCard[tmp].setSelect();
                    game.setNbError();
                }
            }
        }
    }
    returnCard(game.getListCard(),game.getDim());
    game.setToken();
}


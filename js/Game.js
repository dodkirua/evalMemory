import Card from "./Card.js";
import * as utils from "./function.js";

export class Game {
    constructor(listImg,nbMemory = 16,difficulty = "easy") {
        this.listImg = listImg;
        this.nbMemory = nbMemory;
        this.nbError = 0;
        this.difficulty = difficulty;
        this.nbImage = this.setNbImag();
        this.listCard;
        this.dim = (100/(Math.sqrt(this.nbMemory)))-1;
        this.createCard();
        this.token = true;
    }

    /**
     * function for convert the difficulty in number
     * @returns {number}
     */
    setNbImag(){
        switch (this.difficulty){
            case "easy" :
                return 2;
            case "medium" :
                return 4;
            case "hard" :
                return 6;
        }
    }

    /**
     *  create the card for the game
     */
    createCard(){
        let arrayCard = [];
        let imgChoice = [];
        let tmp;
        let i= 0;
        if (this.nbImage > this.nbMemory/2){
            this.nbImage = this.nbMemory/2
        }
        // test if the number of images is sufficient
        if (this.listImg.length > this.nbImage){
            while (i < this.nbImage){
                tmp = this.listImg[utils.random(this.listImg.length-1)];
                if (utils.find(imgChoice,tmp) === -1){
                    imgChoice.push(tmp);
                    i++;
                }
            }
        }
        else {
            imgChoice = new Array(this.listImg);
        }
       // test if the number of images is a multiple of the number of cards
        if (this.nbMemory % this.nbImage === 0 ){
            tmp = this.nbMemory / this.nbImage;
            for (i = 0 ; i < tmp ; i++){
                for (let j = 0 ; j < imgChoice.length ; j++){
                    arrayCard.push(new Card(imgChoice[j]));
                }
            }
        }
        else {
            tmp = this.nbMemory % this.nbImage;
            let tmp2 = utils.random(this.listImg.length-1)
            if (tmp % 2 !== 0){
                tmp++;
                this.nbMemory++;
            }
            for (i = 0 ; i < tmp ; i++){
                 arrayCard.push(new Card(imgChoice[tmp2]));
            }
            tmp = (this.nbMemory-tmp) / this.nbImage;
            for (i = 0 ; i < tmp ; i++){
                for (let j = 0 ; j < imgChoice.length ; j++){
                    arrayCard.push(new Card(imgChoice[j]));
                }
            }
        }
        this.listCard = utils.shuffle(arrayCard);
    }

    setNbError(inc = 1){
        if (inc === 0){
            this.nbError = 0;
        }
        else {
            this.nbError += inc;
        }
    }

    getNbError(){
        return this.nbError;
    }

    getListCard(){
        return this.listCard;
    }

    /**
     * test the victory
     * @returns {boolean}
     */
    testVictory(){
        let score = 0;
        for (let i = 0 ; i < this.listCard.length ; i++) {
            if (this.listCard[i].getFind() === true) {
                score++;
            }
        }
        return score === this.listCard.length;
    }

    getDim() {
        return this.dim;
    }

    getToken() {
        return this.token;
    }

    setToken(){
        this.token = this.token !== true;
    }
}

export default class Card {
    constructor(img) {
        this.img = img;
        this.find = false;
        this.select = false;
    }

    setFind(){
        this.find = this.find !== true;
    };

    setSelect() {
        this.select = this.select !== true;
    };

    getImg(){
        return this.img;
    };

    getFind(){
        return this.find;
    }

    getSelect(){
        return this.select;
    }

}
const Patches = require('Patches');

class Rules {
    constructor(wordsNeedNamed, responseTime, textName, letterName){
        this._lettersToName = ['а', 'б','в','г','д','е','ж','з','и','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','э','ю','я'];
        this.wordsNeedNamed = wordsNeedNamed;
        this.responseTime = responseTime;
        
        this.textName = textName;
        this.startText = `Назови ${this.wordsNeedNamed} слов \nза ${this.responseTime} секунд на букву...`;
        this._text = "";
        this.text = `Нажми и\n ${this.startText}`;

        this.letterName = letterName;
        this._letter = "а";
    }

    start(){
        this.text = this.startText;
        this.letter = this.getRandomLetter() || 'а';
    }
    
    get text(){
        return this._text;
    }

    set text(val){
        this._text = val;
        Patches.inputs.setString(this.textName, val);
    }

    get letter(){
        return this._letter;
    }

    set letter(val){
        this._letter = val;
        Patches.inputs.setString(this.letterName, val);
    }

    getRandomLetter(){
        return this._lettersToName[this.getRandomInt(0, this._lettersToName.length - 1)];
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
}

module.exports = Rules
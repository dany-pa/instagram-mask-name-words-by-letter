const Time = require('Time');
const Patches = require('Patches');
const Scene = require('Scene');

class Timer {
    constructor(responseTime){
        this._timer = undefined;
        this._responseTime = responseTime;
        this._timeLeft = responseTime;
        this.num1 = {
            name: 'num1',
            object: undefined
        }
        this.num2 = {
            name: 'num2',
            object: undefined
        }
        this.canvasTimer = {
            name: 'canvasTimer',
            object: undefined
        }
    }

    async init(){
        [
            this.num1.object,
            this.num2.object,
            this.canvasTimer.object,
        ] = await Promise.all([
            Scene.root.findFirst(this.num1.name),
            Scene.root.findFirst(this.num2.name),
            Scene.root.findFirst(this.canvasTimer.name),
        ]);
    }

    start(){
        if (this._timer) return

        return new Promise((resolve, reject)=>{
            this._timer = Time.setInterval(()=>{
                if (this.timeIsEnd) {
                    this._clearTimer();
                    this._hideTimer();
                    
                    resolve()
                }
    
                this._renderTime();
                this._timeLeft--;
            }, 1000)
        })
    }

    get isStarted(){
        return !!this._timer;
    }

    get timeIsEnd(){
        return this._timeLeft < 0;
    }

    get isTwoDigitTime(){
        return this._timeLeft >= 10;
    }

    _clearTimer(){
        this._timeLeft = "";
        Time.clearInterval(this._timer);
    }

    _renderTime(){
        const timeLeftArr = this._timeLeft.toString().split('');
        this._setNum1(timeLeftArr[0]);

        if (this.isTwoDigitTime){
            this._setNum2(timeLeftArr[1]);
            return
        }

        this._renderOneDigitTime();
        this._hideNum2();
    }

    _renderOneDigitTime(){
        this.num1.object.transform.x = 0;
        this.num2.object.transform.x = -10;
        this.canvasTimer.object.transform.x = 0.02101;
    }

    _hideTimer(){
        this._hideNum1();
        this._hideNum2();
        this.num1.object.transform.x = 0.00568;
        this.num1.object.transform.scaleX = 1;
        this.num1.object.transform.scaleY = 0.7;
    }

    _setNum1(val){
        Patches.inputs.setString(this.num1.name, val);
    }

    _hideNum1(){
        this._setNum1('');
    }

    _setNum2(val){
        Patches.inputs.setString(this.num2.name, val);
    }

    _hideNum2(){
        this._setNum2('');
    }


}

module.exports = Timer
const Animation = require('Animation');
const Scene = require('Scene');

class UIAnimations {
    constructor(timeDriverParameters){
        this._timeDriverParameters = timeDriverParameters || {
            durationMilliseconds: 500,
            loopCount: 1,
            mirror: false,
        };
        this._timeDriver = Animation.timeDriver(this._timeDriverParameters);
    }

    start(){
        this._timeDriver.start();
    }

    getAnimation(sampler){
        return Animation.animate(this._timeDriver, sampler);
    }
}

class UIAnimationsMask extends UIAnimations {
    constructor(timeDriverParameters, ruleWindowName, ruleTextName, timerName){
        super(timeDriverParameters)
        this.ruleWindow = {
            name: ruleWindowName,
            object: undefined
        }
        this.ruleText = {
            name: ruleTextName,
            object: undefined
        }
        this.timer = {
            name: timerName,
            object: undefined
        }
    }

    async init(){
        [
            this.timer.object,
            this.ruleWindow.object,
            this.ruleText.object,
        ] = await Promise.all([
            Scene.root.findFirst('objTimer'),
            Scene.root.findFirst('objRules'),
            Scene.root.findFirst('canvasRules'),
        ]);
    }

    start(){
        super.start();
        this.animateRuleWindow();
        this.animateRuleText();
        this.animateTimer();
    }

    scaleRuleWindow(options){
        const sampler = options || Animation.samplers.easeInOutQuad(700, 1150);
        return super.getAnimation(sampler);
    }

    moveRuleWindow(options){
        const sampler = options || Animation.samplers.easeInOutQuad(283, 265);
        return super.getAnimation(sampler);
    }

    moveRuleText(options){
        const sampler = options || Animation.samplers.easeInOutQuad(-0.1, -0.02);
        return super.getAnimation(sampler);
    }

    scaleTimer(options){
        const sampler = options || Animation.samplers.easeInOutQuad(0, 1);
        return super.getAnimation(sampler);
    }

    animateRuleWindow(){
        this.ruleWindow.object.transform.scaleY = this.scaleRuleWindow();
        this.ruleWindow.object.transform.y = this.moveRuleWindow();
    }

    animateRuleText (){
        this.ruleText.object.transform.y = this.moveRuleText();
    }

    animateTimer (){
        this.timer.object.transform.scaleX = this.scaleTimer();
        this.timer.object.transform.scaleY = this.scaleTimer();
    }
}

module.exports = {
    UIAnimations,
    UIAnimationsMask
}
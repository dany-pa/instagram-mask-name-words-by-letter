const TouchGestures = require('TouchGestures');
const Patches = require('Patches');
const {UIAnimationsMask} = require('./UIAnimations.js');
const Timer = require('./Timer.js');
const Rules = require('./Rules.js');

(async function() {
    const animations = new UIAnimationsMask();
    await animations.init();
    
    const responseTime = 3;
    const timer = new Timer(responseTime)
    await timer.init();

    const rules = new Rules(20, responseTime, 'startText', 'letter');

    TouchGestures.onTap().subscribe(async ()=> {
        if (timer.isStarted) return

        rules.start()
        animations.start();
        await timer.start();
        Patches.inputs.setString('textEnd', 'Время \nвышло');
    });
})();

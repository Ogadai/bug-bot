let commands: number[] = [];
let running = false;
let hasRun = false;
let currentNumber = 0;

function clear() {
    commands = [];
    hasRun = false;
    show(0);
}

function pushAction(action: number): void {
    if (hasRun) {
        clear();
    }
    commands.push(action);
    show(commands.length);
}

function show(num: number) {
    currentNumber = num;
}

Controller.onPressed(acBtn.DUp, function () {
    music.playTone(294, music.beat(BeatFraction.Quarter));
    pushAction(1);
});
Controller.onPressed(acBtn.DRight, function () {
    music.playTone(523, music.beat(BeatFraction.Quarter));
    pushAction(2);
});
Controller.onPressed(acBtn.DDown, function () {
    music.playTone(450, music.beat(BeatFraction.Quarter));
    pushAction(3);
});
Controller.onPressed(acBtn.DLeft, function () {
    music.playTone(180, music.beat(BeatFraction.Quarter));
    pushAction(4);
});

Controller.onPressed(acBtn.XB, function () {
    music.playTone(180, music.beat(BeatFraction.Quarter));
    music.playTone(294, music.beat(BeatFraction.Quarter));
    music.playTone(180, music.beat(BeatFraction.Quarter));
    clear();
});

Controller.onPressed(acBtn.XA, function () {
    if (running) return;
    running = true;
    hasRun = true;

    music.playTone(523, music.beat(BeatFraction.Quarter));
    music.playTone(450, music.beat(BeatFraction.Quarter));
    music.playTone(523, music.beat(BeatFraction.Quarter));
    show(0);

    control.inBackground(function () {
        for(let n = 0; n < commands.length; n++) {
            show(n + 1);
            doAction(commands[n]);

            stopAll();
            basic.pause(500);
        }
        show(commands.length);
        stopAll();
        running = false;
    });
});

function doAction(action: number): void {
    let delayMs = 0;

    if (action === 1) {
        servos.P1.run(100)
        servos.P2.run(-100)
        delayMs = 500;
    } else if (action === 3) {
        servos.P1.run(-100)
        servos.P2.run(100)
        delayMs = 500;
    } else if (action === 2) {
        servos.P1.run(-100)
        servos.P2.run(-100)
        delayMs = 430;
    } else if (action === 4) {
        servos.P1.run(100)
        servos.P2.run(100)
        delayMs = 450;
    }

    basic.pause(delayMs);
}

function stopAll() {
    servos.P1.stop()
    servos.P2.stop()
}

control.inBackground(function () {
    let lastNumber = 0;
    while(true) {
        if (lastNumber !== currentNumber) {
            basic.showNumber(currentNumber);
            lastNumber = currentNumber;
        }
        basic.pause(10);
    }
});

bluetooth.onBluetoothConnected(function () {
    DriveBit.setLedColor(0x00FF00)
    basic.showIcon(IconNames.Yes)
})
bluetooth.onBluetoothDisconnected(function () {
    DriveBit.setLedColor(0xFF0000)
    basic.showIcon(IconNames.No)
})

bluetooth.startTemperatureService()
DriveBit.setLedColor(0x0000FF)
basic.showIcon(IconNames.Happy)

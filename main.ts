let commands: number[] = [];
let running = false;

Controller.onPressed(acBtn.DUp, function () {
    commands.push(1);
    music.playTone(294, music.beat(BeatFraction.Quarter));
});
Controller.onPressed(acBtn.DRight, function () {
    commands.push(2);
    music.playTone(523, music.beat(BeatFraction.Quarter));
});
Controller.onPressed(acBtn.DDown, function () {
    commands.push(3);
    music.playTone(450, music.beat(BeatFraction.Quarter));
});
Controller.onPressed(acBtn.DLeft, function () {
    commands.push(4);
    music.playTone(180, music.beat(BeatFraction.Quarter));
});

Controller.onPressed(acBtn.XB, function () {
    commands = [];
    music.playTone(180, music.beat(BeatFraction.Quarter));
    music.playTone(294, music.beat(BeatFraction.Quarter));
    music.playTone(180, music.beat(BeatFraction.Quarter));
});

Controller.onPressed(acBtn.XA, function () {
    if (running) return;
    running = true;

    music.playTone(523, music.beat(BeatFraction.Quarter));
    music.playTone(450, music.beat(BeatFraction.Quarter));
    music.playTone(523, music.beat(BeatFraction.Quarter));

    control.inBackground(function () {
        for(let n = 0; n < commands.length; n++) {
            basic.showNumber(n);
            doAction(commands[n]);
        }
        basic.showIcon(IconNames.Asleep);
        stopAll();
        running = false;
    });
});

function doAction(action: number): void {
    let delayMs = 0;

    if (action === 1) {
        servos.P1.run(100)
        servos.P2.run(-100)
        delayMs = 300;
    } else if (action === 3) {
        servos.P1.run(-100)
        servos.P2.run(100)
        delayMs = 300;
    } else if (action === 2) {
        servos.P1.run(-100)
        servos.P2.run(-100)
        delayMs = 300;
    } else if (action === 4) {
        servos.P1.run(100)
        servos.P2.run(100)
        delayMs = 300;
    }

    basic.pause(delayMs);
}

function stopAll() {
    servos.P1.stop()
    servos.P2.stop()
}

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

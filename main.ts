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
});

Controller.onPressed(acBtn.XA, function () {
    if (running) return;
    running = true;
    control.inBackground(function () {
        for(let n = 0; n < commands.length; n++) {
            doAction(commands[n]);
        }
        running = false;
    });
});

function doAction(action: number): void {
    let delayMs = 0;

    if (action === 1) {
        servos.P1.run(100)
        servos.P2.run(-100)
        delayMs = 1000;
    } else if (action === 3) {
        servos.P1.run(-100)
        servos.P2.run(100)
        delayMs = 1000;
    } else if (action === 2) {
        servos.P1.run(-100)
        servos.P2.run(-100)
        delayMs = 1000;
    } else if (action === 2) {
        servos.P1.run(100)
        servos.P2.run(100)
        delayMs = 1000;
    }

    control.waitMicros(delayMs * 1000)
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

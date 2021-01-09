Controller.onChange(acBtn.DPad, function () {
    if (Controller.pressed(acBtn.DUp)) {
        servos.P1.run(100)
        servos.P2.run(-100)
    } else if (Controller.pressed(acBtn.DDown)) {
        servos.P1.run(-100)
        servos.P2.run(100)
    } else if (Controller.pressed(acBtn.DLeft)) {
        servos.P1.run(100)
        servos.P2.run(100)
    } else if (Controller.pressed(acBtn.DRight)) {
        servos.P1.run(-100)
        servos.P2.run(-100)
    } else {
        servos.P1.stop()
        servos.P2.stop()
    }
})
bluetooth.onBluetoothConnected(function () {
    DriveBit.setLedColor(0x00FF00)
    basic.showIcon(IconNames.Yes)
})
Controller.onPressed(acBtn.XB, function () {
    music.playTone(294, music.beat(BeatFraction.Whole))
})
bluetooth.onBluetoothDisconnected(function () {
    DriveBit.setLedColor(0xFF0000)
    basic.showIcon(IconNames.No)
})
Controller.onPressed(acBtn.XX, function () {
    music.playTone(523, music.beat(BeatFraction.Whole))
})
bluetooth.startTemperatureService()
DriveBit.setLedColor(0x0000FF)
basic.showIcon(IconNames.Happy)

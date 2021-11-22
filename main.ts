enum RadioMessage {
    message1 = 49434
}
function check (text: string) {
    if (Choice == "scissor" && text == "paper") {
        return 1
    } else if (Choice == "paper" && text == "rock") {
        return 1
    } else if (Choice == "stone" && text == "scissor") {
        return 1
    } else {
        return 0
    }
}
function checkAndShow () {
    if (Choice != "") {
        result = check(received_symbol)
        if (result == 1) {
            basic.showLeds(`
                . . . . .
                . . . . #
                . . . # .
                # . # . .
                . # . . .
                `)
        } else {
            basic.showLeds(`
                # . . . #
                . # . # .
                . . # . .
                . # . # .
                # . . . #
                `)
        }
        Choice = ""
        received_symbol = ""
    } else {
        basic.showLeds(`
            # . # . #
            . # . # .
            . . . . .
            . . . . .
            . . . . .
            `)
    }
}
input.onButtonPressed(Button.A, function () {
    Choice = "scissor"
    radio.sendString("scissor")
    checkAndShow()
})
input.onButtonPressed(Button.AB, function () {
    radio.sendString("stone")
    Choice = "stone"
    checkAndShow()
})
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString)
    if (receivedString == "ready") {
        basic.showLeds(`
            # # # # .
            # . . # .
            # # # # .
            # . # . .
            # . . # .
            `)
    } else {
        serial.writeLine(receivedString)
        received_symbol = receivedString
    }
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("paper")
    Choice = "paper"
    checkAndShow()
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendString("ready")
})
let result = 0
let received_symbol = ""
let Choice = ""
serial.setBaudRate(BaudRate.BaudRate9600)
radio.setGroup(1)
Choice = ""
received_symbol = ""
basic.forever(function () {
	
})

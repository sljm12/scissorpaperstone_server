enum RadioMessage {
    message1 = 49434
}
function check (text: string) {
    if (Choice == "scissor" && text == "paper") {
        return 1
    } else if (Choice == "paper" && text == "stone") {
        return 1
    } else if (Choice == "stone" && text == "scissor") {
        return 1
    } else {
        return 0
    }
}
function checkAndShow () {
    if (Choice != "" && received_symbol != "") {
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
    } else if (Choice == "" && received_symbol != "") {
        basic.showLeds(`
            . . # . .
            . # . # .
            . . . # .
            . . # . .
            . . # . .
            `)
    } else {
    	
    }
}
input.onButtonPressed(Button.A, function () {
    Choice = "scissor"
    radio.sendString("scissor")
    basic.showLeds(`
        # . . # #
        . # . # #
        . . # . .
        . # . # #
        # . . # #
        `)
    checkAndShow()
})
function isReady () {
    if (ready_state == 1 && other_ready == 1) {
        return 1
    } else {
        return 0
    }
}
function showReadyState () {
    if (ready_state == 1 && other_ready == 1) {
        basic.showLeds(`
            . . . . .
            . # . # .
            . # . # .
            . # . # .
            . . . . .
            `)
    } else if (ready_state == 1 && other_ready == 0) {
        basic.showLeds(`
            . . . . .
            . # . . .
            . # . . .
            . # . . .
            . . . . .
            `)
    } else if (ready_state == 0 && other_ready == 1) {
        basic.showLeds(`
            . . . . .
            . . . # .
            . . . # .
            . . . # .
            . . . . .
            `)
    } else {
    	
    }
}
input.onButtonPressed(Button.AB, function () {
    radio.sendString("stone")
    Choice = "stone"
    basic.showLeds(`
        . . . . .
        . . . . .
        . # # # .
        # # # # #
        # # # # #
        `)
    checkAndShow()
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "ready") {
        other_ready = 1
        showReadyState()
    } else {
        serial.writeLine(receivedString)
        received_symbol = receivedString
        checkAndShow()
    }
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("paper")
    Choice = "paper"
    basic.showLeds(`
        . . . . .
        . # # # .
        . # # # .
        . # # # .
        . . . . .
        `)
    checkAndShow()
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendString("ready")
    ready_state = 1
    showReadyState()
})
let result = 0
let other_ready = 0
let ready_state = 0
let received_symbol = ""
let Choice = ""
serial.setBaudRate(BaudRate.BaudRate9600)
radio.setGroup(1)
Choice = ""
received_symbol = ""
ready_state = 0
other_ready = 0
basic.forever(function () {
	
})

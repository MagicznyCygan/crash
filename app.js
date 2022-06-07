import Wallet from "./money.js"

const container = document.getElementById('container')
const crashCon = document.getElementById('crash')
const startCrashBtn = document.getElementById('startCrash')
const playerPlayValueCon = document.getElementById('playerWalletAmonut')
const lastCrashesCon = document.getElementById('lastCrashes')
const cashoutBtn = document.getElementById('cashoutBtn')
const moneyCon = document.getElementById('moneyCon')

let last_crashes = ['2.0x', '1.01x', '2.0x', '1.92x', '1.50x', '1.44x', '2.5x', '3.0x', '4.0x', '1.01x', '1.50x', '10.0x', '5.0x']

let when_crash
let crash = 0.99;

Wallet.renderMoney()

const whenCrashed = () => {
    let multiplier = Math.floor(Math.random() * 6)
    multiplier = parseFloat(multiplier)
    if (multiplier === 0) {
        when_crash = (Math.random() * (1.0 - 1.2) + 1.2).toFixed(2) // 1.00 - 1.2
    }
    else if (multiplier === 1) {
        when_crash = (Math.random() * (1.21 - 1.5) + 1.5).toFixed(2) // 1.21 - 1.50
    }
    else if (multiplier === 2) {
        when_crash = (Math.random() * (1.51 - 3.0) + 3.0).toFixed(2) // 1.51 - 3.00
    }
    else if (multiplier === 3) {
        when_crash = (Math.random() * (3.01 - 5.0) + 5.0).toFixed(2) // 3.01 - 5.0
    }
    else if (multiplier === 4) {
        when_crash = (Math.random() * (5.01 - 7.0) + 7.0).toFixed(2) // 5.01 - 7.0
    }
    else if (multiplier === 5) {
        when_crash = (Math.random() * (7.01 - 10.0) + 10.0).toFixed(2) // 7.01 - 10.0
    }
    console.log(when_crash)
    return when_crash
}

const showLastCrashes = () => {
    lastCrashesCon.innerHTML = ""
    last_crashes.forEach(last_crash => {
        let span = document.createElement('span')
        let num = last_crash.replace('x', "")
        num = parseFloat(num)
        let color
        if (num < 1.21) {
            color = 'red'
        }
        else if (num < 2.00) {
            color = 'gray'
        }
        else if (num < 3.00) {
            color = 'blue'
        }
        else if (num < 9.00) {
            color = 'purple'
        }
        else if (num < 10000000.00) {
            color = 'yellow'
        }
        span.style.color = color
        span.innerHTML = last_crash
        lastCrashesCon.appendChild(span)
    });
}


showLastCrashes()

let crashRounded
let is_cashed = false

const cashout = () => {
    is_cashed = true
    let win_money = (playerPlayValue * parseFloat(crashRounded))
    Wallet.setMoney(win_money)
    Wallet.renderMoney()
    console.log(`You cashout at: ${crashRounded}`)
    console.log(`You Won: ${win_money - playerPlayValue}`)
    console.log(`In Wallet: ${Wallet.getMoney()}`)
    cashoutBtn.classList.toggle('hide')
}

const showCrash = (crashInterval) => {
    crash = crash + 0.01
    crashRounded = crash.toFixed(2)
    crashCon.innerHTML = crashRounded + 'x'

    //WHEN CRASHING
    if (crashRounded == when_crash) {
        //END FUNCTION WITH CASHOUTS
        last_crashes.shift()
        last_crashes.push(crashRounded + 'x')
        showLastCrashes()
        console.log('crashuje')
        crashCon.style.color = 'red'
        clearInterval(crashInterval)
        if (!is_cashed) {
            cashoutBtn.classList.toggle('hide')
        }

        //RESTART FUNCTION
        setTimeout(() => {
            Wallet.renderMoney()
            startCrashBtn.classList.toggle('hide')
            crashCon.style.color = 'white'
            crash = 0.99
            crashCon.innerHTML = `1.00x`
            is_cashed = false
        }, 4000)

    }

}

let interval = 100
let playerPlayValue

const startGame = () => {
    when_crash = whenCrashed()

    playerPlayValue = playerPlayValueCon.value

    if (playerPlayValue > Wallet.getMoney()) {
        alert('Masz za malo kasy w portfelu')
        return
    }
    else if (playerPlayValue <= 0) {
        alert('Musisz postawic wiecej niz 0')
        return
    }

    Wallet.removeMoney(playerPlayValue)
    Wallet.renderMoney()


    startCrashBtn.classList.toggle('hide')
    cashoutBtn.classList.toggle('hide')

    let crashInterval = setInterval(() => {
        let crash2Interval
        let crash3Interval
        let crash4Interval
        showCrash(crashInterval)

        if (crashRounded == 1.99) {
            clearInterval(crashInterval)
            let intervalTime = 60

            //INTERVAL 2
            crash2Interval = setInterval(() => {
                showCrash(crash2Interval)

                if (crashRounded > 2.99) {
                    clearInterval(crash2Interval)
                    let intervalTime = 40

                    //INTERVAL 3
                    crash3Interval = setInterval(() => {
                        showCrash(crash3Interval)

                        if (crashRounded > 5.99) {
                            clearInterval(crash3Interval)
                            let intervalTime = 20

                            //INTERVAL 4
                            crash4Interval = setInterval(() => {
                                showCrash(crash4Interval)

                            }, intervalTime);
                        }

                    }, intervalTime);
                }

            }, intervalTime);
        }
    }, interval);
}

cashoutBtn.addEventListener('click', cashout)
startCrashBtn.addEventListener('click', startGame)






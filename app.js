import Wallet from "./money.js"

const container = document.getElementById('container')
const crashCon = document.getElementById('crash')
const startCrashBtn = document.getElementById('startCrash')
const playerPlayValueCon = document.getElementById('playerWalletAmonut')
const lastCrashesCon = document.getElementById('lastCrashes')
const cashoutBtn = document.getElementById('cashoutBtn')
const moneyCon = document.getElementById('moneyCon')

var last_crashes = ['2.0x', '1.01x', '2.0x', '1.92x', '1.50x', '1.44x', '2.5x', '3.0x', '4.0x', '1.01x', '1.50x', '10.0x', '5.0x']

var when_crash
var crash = 1.0;

var multiplier
Wallet.renderMoney()
const whenCrash = (multiplier) => {
    switch (multiplier) {
        case 0:
            when_crash = 1.01
            break;
        case 1:
            when_crash = 2.00
            break;
        case 2:
            when_crash = 2.50
            break;
        case 3:
            when_crash = 3.00
            break;
        case 4:
            when_crash = 4.00
            break;
        case 5:
            when_crash = 10.00
            break;
        default:
            when_crash = 20.00
            break;
    }

    return when_crash
}

const showLastCrashes = () => {
    lastCrashesCon.innerHTML = ""
    last_crashes.forEach(last_crash => {
        var span = document.createElement('span')
        var num = last_crash.replace('x', "")
        num = parseFloat(num)
        let color
        if (num < 1.02) {
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

var crashRounded
var is_cashed = false

const cashout = () => {
    is_cashed = true
    let win_money = (playerPlayValue * parseFloat(crashRounded))
    //win_money = win_money.toFixed(2)
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

        //RESET FUNCTION
        setTimeout(() => {
            //startCrashBtn.removeAttribute('disabled', '')
            Wallet.renderMoney()
            startCrashBtn.classList.toggle('hide')
            crashCon.style.color = 'white'
            crash = 1.0
            crashCon.innerHTML = `1.00x`
        }, 4000)

    }

}

var interval = 100
var playerPlayValue

const startGame = () => {
    multiplier = Math.floor(Math.random() * 7)
    when_crash = whenCrash(multiplier)
    console.log(when_crash)
    //console.log(Wallet.getMoney())

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

    //startCrashBtn.setAttribute('disabled', '')
    startCrashBtn.classList.toggle('hide')
    cashoutBtn.classList.toggle('hide')

    let crashInterval = setInterval(() => {
        showCrash(crashInterval)
        if (crashRounded == 1.99) {
            clearInterval(crashInterval)
            var intervalTime = 60
            let crash2Interval = setInterval(() => {
                showCrash(crash2Interval)
            }, intervalTime);

        }
    }, interval);
}

cashoutBtn.addEventListener('click', cashout)
startCrashBtn.addEventListener('click', startGame)






const moneyCon = document.getElementById('moneyCon')
const Wallet = {
    money: 5000,
    getMoney: function () {
        return this.money
    },
    setMoney: function (money) {
        this.money = this.money + money
    },
    renderMoney: function () {
        moneyCon.textContent = parseFloat(this.money.toFixed(2))
    },
    removeMoney: function (money) {
        this.money = this.money - money
    }
}

export default Wallet
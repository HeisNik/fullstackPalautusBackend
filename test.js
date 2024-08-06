
const validator = (val) => {
    const number =  val.split("-")
    if (number.length !== 2) {
        return false
    }
        console.log(number[0])
    if (number[0].length > 1 && number[0].length < 4) {
        console.log("menee tänne")
        return true
    } else {
        return false
    }
}

const testi = validator("010-7622")
console.log(testi)
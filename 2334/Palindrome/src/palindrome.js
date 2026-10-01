const isPalindrome = (value) => {
    if(typeof value !== 'string') {
        return false
    }

const reversed = value.split("").reverse().join("");
    console.log(value)
    console.log(reversed);

    return value === reversed
}


module.exports= isPalindrome;
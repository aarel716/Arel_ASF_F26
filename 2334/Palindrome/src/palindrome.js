const isPalindrome = (value) => {
    if(typeof value !== 'string') {
        return false
    }

    let word=value.toLowerCase()
    word = word.replace(/[^a-z0-9]/g, "");
    const reversed = word.split("").reverse().join("");
    console.log(word)
    console.log(reversed);

    return word === reversed
}


module.exports= isPalindrome;
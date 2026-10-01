const isPalindrome = require('../src/palindrome');

describe('Valid input', () => {
    test("returns true for a lowercase palindrome",()=>{
        expect(isPalindrome("bob")).toBe(true);

    });

    test("returns false for a lowercase palindrome",()=>{
        expect(isPalindrome("apple")).toBe(false);

    });
})
describe('Invalid inputs', () => {
    test("returns false for a number",()=>{
        expect(isPalindrome(123)).toBe(false);
    })
    test("returns false for a boolean",()=>{
        expect(isPalindrome(true)).toBe(false);
    })
    test("returns false for an array",()=>{
        expect(isPalindrome(["b","o","b"])).toBe(false);
    })
    test("returns false for an object",()=>{
        expect(isPalindrome({word: "bob"})).toBe(false);
    })
    test("returns false for null",()=>{
        expect(isPalindrome(null)).toBe(false);
    })
    test("returns false for nothing",()=>{
        expect(isPalindrome()).toBe(false);
    })
})

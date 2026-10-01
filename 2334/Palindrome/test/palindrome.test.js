const isPalindrome = require('../src/palindrome');

describe('Valid input', () => {
    test("returns true for a lowercase palindrome",()=>{
        expect(isPalindrome("bob")).toBe(true);

    });

    test("returns false for a lowercase non-palindrome",()=>{
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
    test("returns false for undefined",()=>{
        expect(isPalindrome()).toBe(false);
    })
});

describe('Edge cases', () => {
    test("returns true for a uppercase palindrome", () => {
        expect(isPalindrome("Racecar")).toBe(true);

    });

    test("returns true for a uppercase palindrome with punctuation", () => {
        expect(isPalindrome("Madam I'm Adam.")).toBe(true);
    })
    test("returns true for a uppercase palindrome with punctuation and numbers", () => {
        expect(isPalindrome("12Madam I'm Adam.21")).toBe(true);
    })
    test('returns true for a single letter', () => {
        expect(isPalindrome("A")).toBe(true);
    })
    test('returns true for an empty string', () => {
        expect(isPalindrome("")).toBe(true);
    })
});

describe('Long inputs', () => {

    test("returns true for long palindrome", () => {
        const longPalindrome = "A man, a plan, a canal: Panama! ".repeat(1000);
        expect(isPalindrome(longPalindrome)).toBe(true);
    });
})



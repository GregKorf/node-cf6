const mathOperations = require('../index');

// 
describe("Calculator Tests", () => {
    test("Addition 2 numbers", () => {
        let result = mathOperations.sum(3,2)

        expect(result).toBe(5);
    });

    test("Multiplication of 2 numbers", () =>{
        let result = mathOperations.mul(2,8)

        expect(result).toBe(16);
    });

    test("Division of 2 numbers", () =>{
        let result = mathOperations.divide(4,2)

        expect(result).toBe(2);
    });

})

describe("Test only diffs", () => {
    test("Substraction of 2 numbers", () =>{
        let result = mathOperations.diff(10,2)

        expect(result).toBe(3);
    });
})

// describe("Test only divide", () => {

// })
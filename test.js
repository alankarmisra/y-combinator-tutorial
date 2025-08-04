// function sum(n) {
//     if (n == 0) return 0;
//     else return n + sum(n - 1); // recurse
// }

// console.log(sum(3));

// (n) => {
//     if (n == 0) return 0;
//     else return n + ??? (n - 1); // what do we call here?
// }

// sum = ((f, n) => {
//     if (n == 0) return 0;
//     else return n + f(f, n - 1);
// })((f, n) => {
//     if (n == 0) return 0;
//     else return n + f(f, n - 1);
// }, 3);
// console.log(sum);

// sum = (f => n => {
//     if (n == 0) return 0;
//     else return n + f(f)(n - 1);
// })(f => n => {
//     if (n == 0) return 0;
//     else return n + f(f)(n - 1);
// })(3);
// console.log(sum);


// const Y = f => (x => f((...args) => x(x)(...args)))(x => f((...args) => x(x)(...args)));


// sum_stop = x => n => { if (n == 0) return 0; else return n + x(n - 1) };

// sum = Y(sum_stop);
// console.log(sum(3));

// console.log(
//     // This is the Y-combinator itself. It takes a function body `f` and returns a recursive function.
//     (f => (x => f((...args) => x(x)(...args)))(x => f((...args) => x(x)(...args))))(

//         // This is the function body for the summation. It's a non-recursive
//         // function that takes the recursive call (`x`) as its first argument.
//         // The `n` parameter is the number we are summing up to.
//         x => n => {
//             if (n === 0) {
//                 return 0;
//             } else {
//                 // Here, we use `x` (which is the recursive function) to call ourselves.
//                 return n + x(n - 1);
//             }
//         }

//     )(3) // The final `(3)` immediately invokes the resulting recursive function with the number 3.
// );

// const Y = f => (x => f((...args) => x(x)(...args)))(x => f((...args) => x(x)(...args)));

// factorial_stop = x => n => { if (n == 0) return 1; else return n * x(n - 1) };

// factorial = Y(factorial_stop);
// console.log(factorial(5));

// Same Y we defined earlier
// const Y = f => (x => f((...args) => x(x)(...args)))(x => f((...args) => x(x)(...args)));

// const fibonacci_stop = x => n => {
//     // Base cases: F(0) is 0 and F(1) is 1.
//     if (n <= 1) {
//         return n;
//     } else {
//         // Call the provided recursive function `x` twice.
//         return x(n - 1) + x(n - 2);
//     }
// };

// const fibonacci = Y(fibonacci_stop);
// console.log(`Fibonacci of 7: ${fibonacci(7)}`); // Expected output: 13

// const Y = f => (x => f((...args) => x(x)(...args)))(x => f((...args) => x(x)(...args)));

// const ackermann_stop = x => (m, n) => {
//     if (m === 0) {
//         return n + 1;
//     } else if (n === 0) {
//         return x(m - 1, 1);
//     } else {
//         return x(m - 1, x(m, n - 1));
//     }
// };

// const ackermann = Y(ackermann_stop);
// console.log(`Ackermann(3, 4): ${ackermann(3, 4)}`); // Expected output: 125


p = (x => (...args) => {
    // Extract 'n' from the first element of the 'args' array.
    // In this context, 'n' is expected to be the only argument passed.
    const n = args[0];

    // Base case: If 'n' is 0, the sum is 0.
    if (n === 0) {
        return 0;
    }
    // Recursive step: Add 'n' to the sum of numbers from (n-1) down to 0.
    // 'x(x)' is the way the function calls itself recursively, passing 'n-1'.
    else {
        return n + x(x)(n - 1);
    }
})(
    // The inner function, which is passed as 'x' to the outer function.
    // It also uses '...args' to receive its parameters.
    x => (...args) => {
        const n = args[0];
        if (n === 0) {
            return 0;
        } else {
            return n + x(x)(n - 1);
        }
    }
)(3);

console.log(p);
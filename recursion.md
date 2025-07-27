## What is recursion?
!!!note
    If you already know what recursion is, feel free to skip this section. 

Say we want to multiply the numbers from 1 to 4. We can do this quite simply as

`1 * 2 * 3 * 4` which works out to be `24`

In math we call this the `factorial of 4`, and write it as `4!` Don't worry, we aren't doing any math, we're just getting familiar with some notation that will allow us to write short forms of long sequences. 

`4!` is a short-form for `1 * 2 * 3 * 4` which, as we discussed, works out to be 24. Similarly,
`5!` is a short form for `1 * 2 * 3 * 4 * 5` - which works out to be `120`. 

Intuitively, and also by definition
`1!` is just 1.

Now we could write an implementation for factorial in naive javascript like so:

```javascript
// function to calculate a factorial for n
function factorial(n) {
    var product = 1; // initialize product
    // count from 2 to n and multiply
    for(var i = 2; i <= n; i++) {
        product = product * i;
    }
    return product; // return the value
}

// print some results
console.log(factorial(4)); // prints 24
console.log(factorial(5)); // prints 120
```

But there's another way to do it. Notice since 
`4!` = `1 * 2 * 3 * 4` and,
`5!` = `1 * 2 * 3 * 4 * 5`, we can write
`5!` as `4! * 5` 
i.e. write factorial in terms of another factorial. 

Let's see that unwrap...
5!
4! * 5
(3! * 4) * 5
(2! * 3) * 4 * 5
(1! * 2) * 3 * 4 * 5 // 1! = 1
1 * 2 * 3 * 4 * 5

In Javascript we could implement this like so:
```javascript

function factorial(n) {
    if(n == 1) {
        return 1;
    }
    
    // Imagine we call this with 5, as factorial(5)   
    // The next line will compute
    // factorial(4) * 5
    // Do you see the similarity with 4! * 5?
    return factorial(n - 1) * n;
}
```

The above function will unwrap like so:
factorial(5)
factorial(4) * 5
(factorial(3) * 4) * 5
((factorial(2) * 3) * 4) * 5
(((factorial(1) * 2) * 3) * 4) * 5
<u>1 * 2</u> * 3 * 4 * 5
<u>2 * 3</u> * 4 * 5
<u>6 * 4</u> * 5
24 * 5
120

## Why do we even need recursion?
Because recursive code can be shorter and easier to understand, especially for problems with self-similar structure (e.g. trees, graphs, divide-and-conquer). Since this post is not intended to be a full-blown discussion on recursion, let's move along with a `just trust me bro` approach and assume it's useful. 

## Ok but you named the funciton factorial and called it by it's name?
```javascript
function factorial(n) {
    if(n == 1) {
        return 1;
    }
    return factorial(n - 1) * n;
}
```
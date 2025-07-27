---
title: "The Y-combinator"
---

# The Y-Combinator: Making Any Function Recursive

Imagine you have a blueprint for a function, but there's one problem: it can't call itself. How do you make it recursive? That's where the Y-combinator comes in!

## The Magic Formula

```javascript
const Y = blueprint => 
  (clone => blueprint(clone(clone)))
  (clone => blueprint(clone(clone)))
```

This might look mysterious, but it's actually quite elegant. Let's break it down:

- `blueprint` - This is ANY function you want to make recursive
- `clone` - This creates copies of itself to handle the recursion
- The magic happens when `clone(clone)` - the function applies itself to itself

## Let's start with clone
function clone(f) {
    return f; 
}

fuction clone(f) {
    return clone;
}

// is this a lambda representation of
clone => clone 
// this?
function identity(clone) {
    return clone; 
}

// is this a lambda representation of
clone => clone(clone)
// this?
fuction selfApply(clone) {
    return clone(clone);
}



## How It Works

The Y-combinator takes your blueprint and transforms it into a recursive function. Here's what happens:

1. You give it your blueprint
2. It creates a special `clone` function
3. The clone applies itself to itself: `clone(clone)`
4. This creates the recursive behavior your blueprint needs

## A Simple Blueprint Example

Let's say you have a blueprint that looks like this:

```javascript
const blueprint = recursiveCall => n => {
  if (n === 0) {
    return "stop!";
  } else {
    return recursiveCall(n - 1);
  }
}
```

This blueprint has two key parts:
- **Stop condition**: `if (n === 0) return "stop!"`
- **Recursive call**: `recursiveCall(n - 1)`

Notice that the blueprint doesn't know how to call itself - it just expects someone to give it a `recursiveCall` function.

## Building Up the Intuition

Let's understand why `(clone => blueprint(clone(clone)))` actually creates recursion:

**Step 1:** We start with just calling our blueprint
```javascript
blueprint()  // ❌ Fails! Blueprint expects a recursive function parameter
```

**Step 2:** So we try to give it something to call
```javascript
blueprint(???)  // But what goes here?
```

**Step 3:** Let's wrap it in a function that calls blueprint
```javascript
clone => blueprint(clone)
```
Now `clone` is a function that, when called, will call `blueprint` with whatever we pass to it.

**Step 4:** But we need to actually use this clone. The key insight: pass the clone to itself!
```javascript
(clone => blueprint(clone))(clone => blueprint(clone))
```

**Step 5:** This creates recursion! When `blueprint` makes its recursive call, it calls `clone`, which calls `blueprint` again, which can call `clone` again...

**Step 6:** We can optimize by making the clone call itself directly:
```javascript
(clone => blueprint(clone(clone)))(clone => blueprint(clone(clone)))
```

## Putting It Together

When you feed your blueprint to the Y-combinator:

```javascript
const recursiveFunction = Y(blueprint);
console.log(recursiveFunction(3)); // "stop!"
```

The Y-combinator works its magic:

1. It takes your blueprint
2. Creates the clone mechanism
3. The clone provides itself as the `recursiveCall` parameter
4. Now your blueprint can recurse!

## A Complete Example

```javascript
// Our Y-combinator
const Y = blueprint => 
  (clone => blueprint(clone(clone)))
  (clone => blueprint(clone(clone)));

// A simple blueprint that counts down
const countdownBlueprint = recursiveCall => n => {
  if (n === 0) {
    return "Done!";
  } else {
    console.log(n);
    return recursiveCall(n - 1);
  }
};

// Make it recursive
const countdown = Y(countdownBlueprint);

// Use it!
countdown(5);
// Prints: 5, 4, 3, 2, 1, "Done!"
```

## Why This Matters

The Y-combinator shows us something profound: recursion isn't built into functions themselves. Instead, it's a pattern we can apply to any blueprint. Any function that has:

1. A stop condition
2. A place where it would call itself

Can be made recursive using this technique.

## The Key Insight

The genius of `(clone => blueprint(clone(clone)))(clone => blueprint(clone(clone)))` is that it solves the chicken-and-egg problem of recursion. Your blueprint needs to call itself, but it doesn't exist yet! The Y-combinator creates a way for the function to reference itself during its own creation.

This is why functional programming is so powerful - even fundamental concepts like recursion can be expressed as simple, composable functions.


## Why do we even need such a representation?  
Because we want to show how all of computation can be expressed without variables, assignment, or named functions — in a completely minimal and self-contained way. This is essentially what ``lambda-calculus`` or `` λ-calculus`` does.

## Calculus?
The word `calculus` comes from the Latin `calculus`, meaning a small stone used for counting, which itself comes from `calx` (pebble or limestone). In ancient times, people used small stones to perform arithmetic — a kind of primitive calculator. So `calculus` is a system or method of calculation. 

## λ-calculus?
The λ symbol was chosen by Alonzo Church in the 1930s when he invented lambda calculus. According to Church himself, he originally wanted to use a notation like:

`x̂.M` - x hat dot M

to mean "the function of x that gives M". But this was typographically difficult, so he moved the hat:
 
`∧x.M` - caret x dot M

But typesetters kept confusing the caret (∧) with lambda (λ), so Church just gave up and adopted lambda officially.



## What are free variables?
A free variable is a variable that isn't bound to any parameter in the function. 

`λx. x`  x is bound
`λx.λy x + y` x and y are both bound
`λx.λy x + y + z` z is free, it is not bound to any parameter and is presumably defined elsewhere. 

## What's a combinator?
A combinator is a function with no free variables i.e. only a variable that is defined as a parameter may be used within the function. This way we remove the requirement for the system to have a global memory to keep track of free variables. Whatever the function needs, needs to be supplied as a parameter. This was the objective of λ-functions if you recall. To be self-contained. More tersely,

`A combinator is a self-contained lambda expression.` 

## What's the `Y` in Y-combinator?
Curry introduced different combinators and chose single letters for each of them. He chose `Y` for this specific one. It has no other relevance.


## What's the fixed-point of a function?
A fixed-point of a function is where for an input value, say, `x`, the function returns `x` i.e.

`f(x) = x`

Since the input and output are the same, we can keep doing this and never really see any change in the system.
`f(f(f(x))) = x`

Here's a fun example:

No matter what real number you start with (in radians), repeatedly applying cos(x) tends to converge to the same fixed point:

`cos(cos(cos(...cos(x)...))) → 0.739085...`

This strange attractor is called the `Dottie number`, and people have tattoos of it.


<!-- # The Y-Combinator: Making Any Function Recursive

Imagine you have a blueprint for a function, but there's one problem: it can't call itself. How do you make it recursive? That's where the Y-combinator comes in! -->

<!-- Before we begin, let's get into some λ-calculus.

## Show me some λ-calculus
It's actually a simple notation to represent functions.

`λx. x + 1`

here `λx` is the lambda function with parameter x. Everything after the dot is the body of the function. In this case, it's `x+1`, so this is a function that adds 1 to its parameter x. In python we would say:

```python
lambda x:x+1 
```

It's not a massive coincidence that the python version looks a lot like the λ-calculus version. It was inspired by it.

Let's get adventurous and try TWO variables.
`λx.λy. x + y`

```python
lambda x, y: x + y
```

This should be enough notation for now. Let's talk about free variables and then we can discuss combinators.  -->
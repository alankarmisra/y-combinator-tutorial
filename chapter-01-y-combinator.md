---
title: "The Y-combinator"
---
# The Y-combinator

## History

The ```Y-combinator``` comes out of ```lambda calculus``` which I will refer to as ```λ-calculus``` a notation I just invented in a fit of creativity. λ-calculus was an early attempt to understand how computation works just by using functions. Mind you, this was the 1930's. We didn't have digital computers then so it takes a very curious / bored mind to go scurrying into what ```computation``` really means. Our hero is Alonzo Church who did the ground work. Later regular people like Haskell Curry explored what you could do with it. I joke, of course. Mr. Curry is no regular people. He has a language named after him. It's called, wait for it... ```Haskell```.

The idea that we can define everything that is computable with functions and parameters might seem obvious in the modern world, but in the days of paper and pencil (and an occasional pen if you were to get too adventurous), it was considered a breakthrough. Let's acknowledge the contributions of Mr. Church and Mr. Curry here, but also agree that a lot of this might seem obvious to us at this point and that's ok. We don't have to marvel at electricity each time we discuss something digital. Electricity is great, we get it. So is ```Y-combinator```. But we should at least have some familiarity with it for history sake - and we can thence proceed to never deal with it again, at least not directly, except in some very specific cases. 

## What is the λ-calculus
It's actually a simple notation to represent functions.
```
λx.x+1
```
here ```λx``` is the lambda function with parameter x. Everything after the dot is the body of the function. In this case, it's ```x+1```, so this is a function that adds 1 to its parameter x. In python we would say:

```python
lambda x:x+1 
```

It's not a massive coincidence that the python version looks a lot like the λ-calculus version. It was inspired by it.

## What is the Y-combinator

λ-calculus, for the sake of mathematical purity and reductionism, says we don't need the complexity of naming functions. We can pass unnamed functions around as values instead and get the job done. Sounds exhausting, but ok, I'll bite. One problem of not using named functions is that we can't do recursion the way we know how - which is simply calling the function by it's name within the function. That's a mouthful so let's look at code. 

I present a derivation using notation that resembles λ-calculus inspired pseudocode, with corresponding Python code for each step:

## Deriving it

## Step 1: Basic Named Recursion
```
factorial = λn. if (n ≤ 1) then 1 else n × factorial(n-1)
```
This isn't  λ-calculus because we use `factorial(n-1)` which we wouldn't be able to do if the function didn't have a name. 

```python
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1) 
```

The above shouldn't surprise you at all. This is the standard way we do things in most any language. Since `factorial` calls `factorial` we call it self-referencing.

## Step 2: Extract Self-Reference as Parameter

Let's try and get rid of the names. The inner-call to factorial(n-1) needn't use a name if we just passed the factorial function as a parameter. So we introduce a new parameter f, and use that within the function.

```
λ(f, n). if (n ≤ 1) then 1 else n × f(f, n-1)
```

```python
factorial = (lambda f, n: 1 if n <= 1 else n * f(f, n - 1))
```

```python
# We would run it like so:
print(factorial(factorial, 5))  # Output: 120
```

This is still cheating because we are still using `factorial` to activate the function. Give us one more step and we'll fix that. I could do it now, but I want to do one teeny-tiny thing before we go gung-ho on copy-pasta. 

## Step 3: Curry the Function (Separate f from n)
I like how our function is turning out, but our commitment to purity and generality denies us the permission to ignore the fact that a single parameter ```n``` is only relevant for factorials. Other functions might need different number of parameters, or, blow-our-minds none. 

I want you to notice this bit in the above function:
```f(f, n-1)```

This call to the function f is doing two things. If n <=1 it returns a value. Otherwise it binds f to the parameter (n-1) and returns a function that multiplies n and f(n-1). We will split these responsibilities. 

```
factorial = λf. λn. if (n ≤ 1) then 1 else n × f(f)(n-1)
```

```python
factorial = lambda f: lambda n: 1 if n <= 1 else n * f(f)(n - 1)
```
The outer f merely passes on the value of f to the inner lambda. 

What in heaven's name is f(f)?! Makes my head hurt. What's it supposed to be doing? Isn't f(n-1) enough? 

Interestingly, currying was actually first observed by Moses Schönfinkel in the 1920s, but it got named after Curry who developed it further. Some people call it "Schönfinkelization" but "currying" stuck.

## Step 4: Make Self-Application Explicit
```
-- This is f(f) expanded:
(λf. λn. if (n ≤ 1) then 1 else n × f(f)(n-1))
(λf. λn. if (n ≤ 1) then 1 else n × f(f)(n-1))
(n)
```

```python
# Inline the self-application - same function applied to itself
result = (lambda f: lambda n: 1 if n <= 1 else n * f(f)(n - 1))(
         (lambda f: lambda n: 1 if n <= 1 else n * f(f)(n - 1))
)(5)
print(result)  # 120
```

## Step 5: Clean up the pattern. f(f)? Nope.
factorial = λrec. λn. if (n ≤ 1) then 1 else n × rec(n-1)

rec = lambda f:f(f)
factorial(rec(f), 5)

## Step 6: Abstract the Pattern - Extract the Template

This is what a single step would look like. What is rec here? If you look at the function above, rec is a function that calls f(f). What's the point of that? It creates a copy of itself and then binds it to (n-1). Wouldn't that result in recursion? With lazy evaluation no. With eager evaluation, yes but it would be infinite recursion. Note that rec does not pass a copy of itself so it's not recursion. The copy of the function is created in the parent Y combinator. F could technically call f(f) by itself and we wouldn't need an external combinator then. We did this in the previous version.

```
F = λrec. λn. if (n ≤ 1) then 1 else n × rec(n-1)
```

```python
# Extract the factorial template - takes a "recursive function" parameter

F = lambda rec: (lambda n: 1 if n <= 1 else n * rec(n - 1))

# We want: factorial = F(factorial)
# But we need to construct this without named recursion...
```

## Step 6: The Y Combinator Pattern (Eager - Will Stack Overflow)
```
Y = λf. (λx. f(x(x)))(λx. f(x(x)))
```

```python
# This will cause infinite recursion in Python due to eager evaluation


def Y_eager(f):
    return (lambda x: f(x(x)))(lambda x: f(x(x)))


# Don't run this - it will crash!
# factorial = Y_eager(F)
```

## Step 7: The Y Combinator with Lazy Evaluation
```
Y = λf. (λx. f(λy. x(x)(y)))(λx. f(λy. x(x)(y)))
```

```python
# Need lambda for lazy evaluation - delay x(x) until actually called


def Y(f):
    return (lambda x: f(lambda y: x(x)(y)))(lambda x: f(lambda y: x(x)(y)))


# Now we can create factorial using the Y combinator
factorial = Y(F)
print(factorial(5))  # 120

# Or more concisely with inline template:
factorial_inline = Y(lambda rec: lambda n: 1 if n <= 1 else n * rec(n - 1))
print(factorial_inline(5))  # 120
```

## The final analysis

<span style="font-size:25px"><span style="color:rgb(255, 183, 1)">Y</span> = <span style="color:green">λf</span>. <span style="background-color:rgb(249, 240, 118)">(<span style="color: rgb(255, 106, 37)">λx</span>. <span style="color:green">f</span> (<span style="color: rgb(255, 106, 37)">x</span>(<span style="color: rgb(255, 106, 37)">x</span>)))<span style="vertical-align: -0.8em; font-size: 20px;">definition</span></span><span style="background-color:rgb(161, 249, 98)">(<span style="color: rgb(255, 106, 37)">λx</span>. <span style="color:green">f</span> (<span style="color: rgb(255, 106, 37)">x</span> (<span style="color: rgb(255, 106, 37)">x</span>)))<span style="vertical-align: -0.8em; font-size: 20px;">activation</span></span><span style="color:grey; font-size:0.5em">(p1, p2...)</span></span>


<span style="color: rgb(255, 106, 37)">x</span> (<span style="color: rgb(255, 106, 37)">x</span>) returns a function that either calls f(x(x)) or returns a value and terminates the recursion</span>
```text
If we define
F => (rec) => (n) => if n < 2 then 1 else rec(n - 1)

as a recursive step, then
Y(F) = (F(rec))(F(rec))

Assuming F(rec) = (λx. f (x x))
Y f
= X X
= (λx. f (x x)) (λx. f (x x))

Let’s β-reduce:
= f ((λx. f (x x)) (λx. f (x x)))

But wait — that inner expression is X X again, i.e., Y f.
= f (X X)
= f (Y f)

Therefore:
Y f = f (Y f)
```

## Key Python Notes:

1. ** Lazy Evaluation**: Python evaluates arguments eagerly, so we need `lambda y: x(x)(y)` instead of just `x(x)` to delay the recursive call until it's actually needed.

2. ** Lambda Necessity**: In steps 4, 6, and 7, we must use lambdas because we need anonymous functions that can reference themselves through the closure mechanism.

3. ** Stack Overflow**: The "eager" Y combinator in Step 6 would cause immediate infinite recursion in Python, just like it did in your JavaScript example.

The progression shows how we systematically eliminate named recursion and replace it with pure function application and higher-order functions, culminating in the Y combinator that "bootstraps" recursion from nothing but function composition.

## Why λ? 
The λ symbol was chosen by Alonzo Church in the 1930s when he invented lambda calculus. According to Church himself, he originally wanted to use a notation like:

```x̂.M  (x-hat dot M)```

to mean "the function of x that gives M". But this was typographically difficult, so he moved the hat:

```∧x.M  (caret x dot M)```

But typesetters kept confusing the caret (∧) with lambda (λ), so Church just gave up and adopted lambda officially!


Y = λf. (λx. f (x x)) (λx. f (x x))

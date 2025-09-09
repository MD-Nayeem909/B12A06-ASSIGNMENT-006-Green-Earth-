## 1. What is the difference between `var`, `let`, and `const`?

- **var**
  - Function-scoped (or globally scoped if declared outside a function).
  - Can be redeclared and updated.
  - Hoisted to the top of its scope with an initial value of `undefined`.

- **let**
  - Block-scoped.
  - Can be updated but **cannot** be redeclared in the same scope.
  - Hoisted, but not initialized (accessing before declaration causes a `ReferenceError`).

- **const**
  - Block-scoped.
  - Must be initialized at the time of declaration.
  - Cannot be reassigned.
  - Does not make objects/arrays immutable, but prevents reassignment of the variable.

---

## 2. What is the difference between `map()`, `forEach()`, and `filter()`?

- **map()**
  - Returns a new array with transformed elements.
  - Does not modify the original array.
  - Typically used when you want to create a new array from an existing one.

- **forEach()**
  - Iterates over an array and executes a function for each element.
  - Does not return anything (`undefined`).
  - Useful when you just need to perform side effects (like logging).

- **filter()**
  - Returns a new array containing elements that match a given condition.
  - Does not modify the original array.
  - Useful for selecting a subset of elements.

---

## 3. What are arrow functions in ES6?

- A shorter syntax for writing functions.
- Example:  
  ```js
  const add = (a, b) => a + b;
Do not have their own this, arguments, super, or new.target.

Lexically bind the this value from their enclosing scope.

Cannot be used as constructors.

4. How does destructuring assignment work in ES6?
Destructuring allows unpacking values from arrays or objects into variables.

Array destructuring:
# JavaScript ES6 Q&A

This project contains clear explanations of some important JavaScript concepts, especially from ES6.  
It is designed as a quick reference guide for learners and developers.

---

## 1. What is the difference between `var`, `let`, and `const`?

- **var**
  - Function-scoped (or globally scoped if declared outside a function).
  - Can be redeclared and updated.
  - Hoisted to the top of its scope with an initial value of `undefined`.

- **let**
  - Block-scoped.
  - Can be updated but **cannot** be redeclared in the same scope.
  - Hoisted, but not initialized (accessing before declaration causes a `ReferenceError`).

- **const**
  - Block-scoped.
  - Must be initialized at the time of declaration.
  - Cannot be reassigned.
  - Does not make objects/arrays immutable, but prevents reassignment of the variable.

---

## 2. What is the difference between `map()`, `forEach()`, and `filter()`?

- **map()**
  - Returns a new array with transformed elements.
  - Does not modify the original array.
  - Typically used when you want to create a new array from an existing one.

- **forEach()**
  - Iterates over an array and executes a function for each element.
  - Does not return anything (`undefined`).
  - Useful when you just need to perform side effects (like logging).

- **filter()**
  - Returns a new array containing elements that match a given condition.
  - Does not modify the original array.
  - Useful for selecting a subset of elements.

---

## 3. What are arrow functions in ES6?

- A shorter syntax for writing functions.
- Example:  
  ```js
  const add = (a, b) => a + b;
  ```
- Do not have their own `this`, `arguments`, `super`, or `new.target`.
- Lexically bind the `this` value from their enclosing scope.
- Cannot be used as constructors.

---

## 4. How does destructuring assignment work in ES6?

- Destructuring allows unpacking values from arrays or objects into variables.

- **Array destructuring:**
  ```js
  const numbers = [1, 2, 3];
  const [a, b, c] = numbers;
  // a=1, b=2, c=3
  ```

- **Object destructuring:**
  ```js
  const person = { name: "Alice", age: 25 };
  const { name, age } = person;
  // name="Alice", age=25
  ```

- You can also set default values and rename variables during destructuring.

---

## 5. Explain template literals in ES6. How are they different from string concatenation?

- Template literals use backticks (`` ` ``) instead of quotes.
- Allow **multi-line strings** and **embedded expressions** using `${}`.
- Example:
  ```js
  const name = "Alice";
  const greeting = `Hello, ${name}! Welcome to ES6.`;
  ```
- Difference from concatenation:
  - Concatenation uses `+` and can become messy with many variables.
  - Template literals are cleaner, easier to read, and support multi-line formatting directly.
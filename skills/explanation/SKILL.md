# explanation

## Description

Explain code, algorithms, and system architecture in clear, understandable terms. This skill helps break down complex code for learning, onboarding, and knowledge sharing.

## Capabilities

- **Code Walkthrough**: Explain code execution flow
- **Algorithm Explanation**: Describe how algorithms work
- **Architecture Overview**: Explain system design
- **Concept Clarification**: Break down programming concepts
- **Dependency Mapping**: Explain relationships between components
- **Performance Analysis**: Explain why code performs as it does

## Explanation Levels

### 1. High-Level Overview
- What the code does
- Why it exists
- How it fits in the system

### 2. Implementation Details
- How it works internally
- Key algorithms used
- Important design decisions

### 3. Line-by-Line
- Detailed explanation of each line
- Variable purposes
- Control flow

## Explanation Structure

### For Functions

```
Function: [name]
Purpose: [what it does]
Inputs: [parameters]
Outputs: [return value]
Process:
  1. [Step 1]
  2. [Step 2]
  3. [Step 3]
Example: [usage example]
```

### For Algorithms

```
Algorithm: [name]
Time Complexity: O(...)
Space Complexity: O(...)
How it works:
  1. [Step 1]
  2. [Step 2]
Why this approach:
  [Reasoning]
```

### For Architecture

```
Component: [name]
Responsibilities:
  - [Responsibility 1]
  - [Responsibility 2]
Dependencies:
  - [Dependency 1]
  - [Dependency 2]
Data Flow:
  [Describe data flow]
```

## Best Practices

1. **Start Simple**: Begin with high-level overview
2. **Use Analogies**: Relate to real-world concepts
3. **Visual Aids**: Use diagrams when helpful
4. **Progressive Detail**: Layer information gradually
5. **Highlight Key Points**: Focus on important concepts
6. **Use Examples**: Show concrete cases
7. **Avoid Jargon**: Or explain technical terms
8. **Check Understanding**: Verify comprehension

## Explanation Patterns

### Code Walkthrough
```typescript
// Example: Binary search
function binarySearch(arr: number[], target: number): number {
  // Initialize pointers at array boundaries
  let left = 0;
  let right = arr.length - 1;
  
  // Continue while search space exists
  while (left <= right) {
    // Find middle point (avoid overflow)
    const mid = left + Math.floor((right - left) / 2);
    
    // Check if target found
    if (arr[mid] === target) {
      return mid;
    }
    
    // Eliminate half of search space
    if (arr[mid] < target) {
      left = mid + 1;  // Target in right half
    } else {
      right = mid - 1;  // Target in left half
    }
  }
  
  // Target not found
  return -1;
}
```

**Explanation:**
This function implements binary search to find a target value in a sorted array.

**How it works:**
1. Start with two pointers at the array's ends (left and right)
2. Find the middle element
3. If middle element is the target, return its index
4. If target is larger, search the right half
5. If target is smaller, search the left half
6. Repeat until found or search space exhausted

**Why it's efficient:**
- Each iteration eliminates half the remaining elements
- Time complexity: O(log n) vs O(n) for linear search
- Requires sorted array (preprocessing cost)

### Architecture Explanation

```
System: E-commerce Platform

Components:
1. Frontend (React)
   - User interface
   - Shopping cart
   - Product display

2. API Gateway
   - Request routing
   - Authentication
   - Rate limiting

3. Services
   - Product Service: Manage product catalog
   - Order Service: Process orders
   - Payment Service: Handle payments
   - User Service: Manage user accounts

4. Database
   - PostgreSQL: Transactional data
   - Redis: Caching, sessions

5. Message Queue (RabbitMQ)
   - Async job processing
   - Event distribution

Data Flow (Purchase):
1. User adds item to cart (Frontend → API)
2. User checks out (Frontend → API → Order Service)
3. Order Service validates inventory (→ Product Service)
4. Payment processed (→ Payment Service)
5. Order confirmed (→ Message Queue → Email Service)
6. Inventory updated (→ Product Service)
```

## Common Explanations

### Closures
```javascript
function createCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

**Explanation:**
A closure is when a function "remembers" variables from its creation context, even after that context is gone.

Here, the inner function remembers `count` even after `createCounter` finishes. Each call to `counter()` accesses the same `count` variable, incrementing it.

### Promises
```javascript
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

**Explanation:**
Promises represent future values - like a receipt for something you'll get later.

1. `fetch()` starts a request and returns a promise
2. `.then()` says "when you get the response, do this"
3. Second `.then()` chains another operation
4. `.catch()` handles any errors along the way

Think of it like ordering food:
- Promise = order receipt
- .then() = what to do when food arrives
- .catch() = what to do if order fails

## Explanation Checklist

- [ ] Purpose is clear
- [ ] High-level overview provided
- [ ] Key concepts explained
- [ ] Flow is logical
- [ ] Examples included
- [ ] Technical terms defined
- [ ] Analogies used where helpful
- [ ] Edge cases mentioned

## Examples

See [examples.md](./examples.md) for detailed explanation examples.

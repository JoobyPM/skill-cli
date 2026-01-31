# refactoring

## Description

Improve code structure, readability, and maintainability without changing external behavior. This skill focuses on cleaning up code, reducing complexity, and applying design patterns.

## Capabilities

- **Code Smell Detection**: Identify areas needing improvement
- **Pattern Application**: Apply appropriate design patterns
- **Complexity Reduction**: Simplify complex code structures
- **Performance Optimization**: Improve efficiency
- **Readability Enhancement**: Make code easier to understand
- **Maintainability**: Reduce technical debt

## When to Refactor

- Before adding new features (make room for change)
- During code review (as part of improvement)
- When fixing bugs (prevent similar issues)
- During regular cleanup (reduce technical debt)
- When code becomes hard to understand

## Common Code Smells

### 1. Long Method/Function
- Functions doing too much
- **Fix**: Extract smaller functions

### 2. Duplicate Code
- Same logic in multiple places
- **Fix**: Extract to shared function

### 3. Large Class
- Class with too many responsibilities
- **Fix**: Split into multiple classes

### 4. Long Parameter List
- Functions with many parameters
- **Fix**: Use objects or builder pattern

### 5. Feature Envy
- Method using another class's data
- **Fix**: Move method to appropriate class

### 6. Data Clumps
- Same data items together repeatedly
- **Fix**: Create a class/object

### 7. Primitive Obsession
- Using primitives instead of objects
- **Fix**: Create domain objects

### 8. Switch Statements
- Large switch/if-else chains
- **Fix**: Use polymorphism or strategy pattern

## Refactoring Techniques

### Extract Function
```javascript
// Before
function printInvoice(invoice) {
  console.log(`Invoice #${invoice.id}`);
  console.log(`Amount: $${invoice.amount}`);
  console.log(`Due: ${invoice.dueDate}`);
}

// After
function printInvoice(invoice) {
  printHeader(invoice);
  printDetails(invoice);
}

function printHeader(invoice) {
  console.log(`Invoice #${invoice.id}`);
}

function printDetails(invoice) {
  console.log(`Amount: $${invoice.amount}`);
  console.log(`Due: ${invoice.dueDate}`);
}
```

### Rename Variable
```python
# Before
def calc(x, y):
    return x * y * 0.1

# After
def calculate_discount(price, quantity):
    return price * quantity * DISCOUNT_RATE
```

### Replace Magic Number
```typescript
// Before
if (age > 18) { ... }

// After
const ADULT_AGE = 18;
if (age > ADULT_AGE) { ... }
```

### Consolidate Conditional
```javascript
// Before
if (user.age < 18) return false;
if (user.isBlocked) return false;
if (!user.isVerified) return false;
return true;

// After
function canAccessContent(user) {
  return user.age >= 18 && 
         !user.isBlocked && 
         user.isVerified;
}
```

## Best Practices

1. **Test First**: Ensure tests pass before and after
2. **Small Steps**: Make incremental changes
3. **Commit Often**: Save working states
4. **One Refactoring at a Time**: Focus on single improvement
5. **Maintain Behavior**: Don't change functionality
6. **Review**: Get feedback on changes

## Refactoring Checklist

- [ ] Tests exist and pass
- [ ] Behavior remains unchanged
- [ ] Code is more readable
- [ ] Complexity reduced
- [ ] No duplicate code
- [ ] Naming is clear
- [ ] Tests still pass

## Examples

See [examples.md](./examples.md) for detailed refactoring examples.

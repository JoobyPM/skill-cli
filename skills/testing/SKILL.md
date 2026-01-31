# testing

## Description

Create comprehensive test suites to ensure code quality and prevent regressions. This skill covers unit testing, integration testing, and test-driven development practices.

## Capabilities

- **Unit Test Creation**: Test individual functions and methods
- **Integration Testing**: Test component interactions
- **Test-Driven Development**: Write tests before code
- **Edge Case Identification**: Find and test boundary conditions
- **Mock Creation**: Create test doubles for dependencies
- **Test Organization**: Structure tests logically
- **Coverage Analysis**: Ensure adequate test coverage

## Testing Principles

### 1. F.I.R.S.T
- **Fast**: Tests should run quickly
- **Independent**: Tests shouldn't depend on each other
- **Repeatable**: Same results every time
- **Self-Validating**: Clear pass/fail
- **Timely**: Written close to the code

### 2. AAA Pattern
- **Arrange**: Set up test data and conditions
- **Act**: Execute the code being tested
- **Assert**: Verify the results

### 3. Test Coverage Goals
- **Critical paths**: 100% coverage
- **Business logic**: 80-100% coverage
- **Utility functions**: 80-100% coverage
- **UI components**: 60-80% coverage

## Test Types

### Unit Tests
Test individual functions/methods in isolation.

```typescript
describe('calculateTotal', () => {
  it('should calculate total for single item', () => {
    const items = [{ price: 10, quantity: 2 }];
    expect(calculateTotal(items)).toBe(20);
  });
  
  it('should handle empty array', () => {
    expect(calculateTotal([])).toBe(0);
  });
  
  it('should apply discount correctly', () => {
    const items = [{ price: 100, quantity: 1 }];
    expect(calculateTotal(items, 0.1)).toBe(90);
  });
});
```

### Integration Tests
Test multiple components working together.

```typescript
describe('User Registration Flow', () => {
  it('should register user and send confirmation email', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'secure123'
    };
    
    const user = await registerUser(userData);
    expect(user.id).toBeDefined();
    expect(user.email).toBe(userData.email);
    
    const emails = await getMailQueue();
    expect(emails).toHaveLength(1);
    expect(emails[0].to).toBe(userData.email);
  });
});
```

### End-to-End Tests
Test complete user workflows.

```typescript
describe('E2E: Checkout Process', () => {
  it('should complete purchase from cart to confirmation', async () => {
    await page.goto('/products');
    await page.click('[data-testid="add-to-cart"]');
    await page.click('[data-testid="checkout"]');
    await page.fill('#card-number', '4242424242424242');
    await page.click('[data-testid="submit-payment"]');
    
    await expect(page.locator('.confirmation')).toBeVisible();
  });
});
```

## Test Best Practices

### 1. Descriptive Test Names
```typescript
// Bad
it('test1', () => { ... });

// Good
it('should throw error when price is negative', () => { ... });
```

### 2. One Assertion Focus
```typescript
// Bad - testing multiple things
it('should validate user', () => {
  expect(user.email).toBeDefined();
  expect(user.age).toBeGreaterThan(0);
  expect(user.name).not.toBe('');
});

// Good - focused tests
it('should have valid email', () => {
  expect(user.email).toBeDefined();
});

it('should have positive age', () => {
  expect(user.age).toBeGreaterThan(0);
});
```

### 3. Test Edge Cases
- Empty inputs
- Null/undefined values
- Boundary values (0, -1, max, min)
- Invalid types
- Large datasets
- Concurrent operations

### 4. Use Appropriate Matchers
```typescript
// Specific matchers are clearer
expect(array).toHaveLength(3);  // Better than .toBe(3)
expect(value).toBeNull();       // Better than .toBe(null)
expect(obj).toEqual(expected);  // For objects
expect(str).toContain('text');  // For strings
```

## Mocking

### Mock Functions
```typescript
const mockFetch = jest.fn();
mockFetch.mockResolvedValue({ data: 'test' });

const result = await fetchData();
expect(mockFetch).toHaveBeenCalledTimes(1);
```

### Mock Modules
```typescript
jest.mock('./api', () => ({
  fetchUser: jest.fn().mockResolvedValue({ id: 1, name: 'Test' })
}));
```

### Spies
```typescript
const spy = jest.spyOn(console, 'log');
myFunction();
expect(spy).toHaveBeenCalledWith('expected message');
spy.mockRestore();
```

## Test Organization

```
tests/
├── unit/
│   ├── utils/
│   │   └── helpers.test.ts
│   └── services/
│       └── userService.test.ts
├── integration/
│   └── api.test.ts
└── e2e/
    └── checkout.test.ts
```

## Test-Driven Development (TDD)

### Process
1. **Red**: Write a failing test
2. **Green**: Write minimal code to pass
3. **Refactor**: Improve code while tests pass

### Example
```typescript
// 1. Red - Write failing test
test('isPalindrome should return true for "racecar"', () => {
  expect(isPalindrome('racecar')).toBe(true);
});

// 2. Green - Implement minimal solution
function isPalindrome(str: string): boolean {
  return str === str.split('').reverse().join('');
}

// 3. Refactor - Improve (if needed)
function isPalindrome(str: string): boolean {
  const cleaned = str.toLowerCase().replace(/[^a-z]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}

// 4. Add more tests
test('isPalindrome should handle mixed case', () => {
  expect(isPalindrome('RaceCar')).toBe(true);
});
```

## Testing Checklist

- [ ] All functions have tests
- [ ] Happy paths covered
- [ ] Edge cases tested
- [ ] Error conditions tested
- [ ] Mocks used appropriately
- [ ] Tests are independent
- [ ] Tests are fast
- [ ] Test names are descriptive
- [ ] Coverage meets targets

## Anti-Patterns

- ❌ Testing implementation details
- ❌ Dependent tests (test order matters)
- ❌ Excessive mocking
- ❌ Testing library code
- ❌ Brittle tests (break on small changes)
- ❌ Slow tests in unit test suite

## Examples

See [examples.md](./examples.md) for detailed testing examples.

# refactoring - Examples

## Example 1: Extract Function

### Before
```javascript
function processOrder(order) {
  // Validate order
  if (!order.items || order.items.length === 0) {
    throw new Error('Order has no items');
  }
  if (!order.customer || !order.customer.email) {
    throw new Error('Invalid customer');
  }
  
  // Calculate total
  let total = 0;
  for (const item of order.items) {
    total += item.price * item.quantity;
  }
  if (order.discount) {
    total -= total * order.discount;
  }
  
  // Send email
  const subject = `Order Confirmation #${order.id}`;
  const body = `Thank you for your order!\nTotal: $${total}`;
  sendEmail(order.customer.email, subject, body);
  
  return total;
}
```

### After
```javascript
function processOrder(order) {
  validateOrder(order);
  const total = calculateTotal(order);
  sendConfirmationEmail(order, total);
  return total;
}

function validateOrder(order) {
  if (!order.items || order.items.length === 0) {
    throw new Error('Order has no items');
  }
  if (!order.customer || !order.customer.email) {
    throw new Error('Invalid customer');
  }
}

function calculateTotal(order) {
  let total = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  if (order.discount) {
    total *= (1 - order.discount);
  }
  
  return total;
}

function sendConfirmationEmail(order, total) {
  const subject = `Order Confirmation #${order.id}`;
  const body = `Thank you for your order!\nTotal: $${total.toFixed(2)}`;
  sendEmail(order.customer.email, subject, body);
}
```

## Example 2: Replace Conditional with Polymorphism

### Before
```python
class Animal:
    def __init__(self, type):
        self.type = type
    
    def speak(self):
        if self.type == 'dog':
            return 'Woof!'
        elif self.type == 'cat':
            return 'Meow!'
        elif self.type == 'bird':
            return 'Tweet!'
        else:
            return 'Unknown'
```

### After
```python
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return 'Woof!'

class Cat(Animal):
    def speak(self):
        return 'Meow!'

class Bird(Animal):
    def speak(self):
        return 'Tweet!'
```

## Example 3: Introduce Parameter Object

### Before
```typescript
function createUser(
  firstName: string,
  lastName: string,
  email: string,
  age: number,
  address: string,
  city: string,
  country: string
) {
  // ...
}

createUser('John', 'Doe', 'john@example.com', 30, '123 Main St', 'NYC', 'USA');
```

### After
```typescript
interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  address: {
    street: string;
    city: string;
    country: string;
  };
}

function createUser(userData: UserData) {
  // ...
}

createUser({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  age: 30,
  address: {
    street: '123 Main St',
    city: 'NYC',
    country: 'USA'
  }
});
```

## Tips

- Always have tests before refactoring
- Make small, incremental changes
- Run tests after each change
- Use automated refactoring tools when available
- Document complex refactorings

# testing - Examples

## Example 1: Basic Unit Tests

```typescript
// calculator.ts
export function add(a: number, b: number): number {
  return a + b;
}

export function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

// calculator.test.ts
import { add, divide } from './calculator';

describe('Calculator', () => {
  describe('add', () => {
    it('should add two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    it('should handle negative numbers', () => {
      expect(add(-2, 3)).toBe(1);
      expect(add(-2, -3)).toBe(-5);
    });

    it('should handle zero', () => {
      expect(add(0, 5)).toBe(5);
      expect(add(5, 0)).toBe(5);
    });
  });

  describe('divide', () => {
    it('should divide two numbers', () => {
      expect(divide(10, 2)).toBe(5);
    });

    it('should handle decimal results', () => {
      expect(divide(5, 2)).toBe(2.5);
    });

    it('should throw error when dividing by zero', () => {
      expect(() => divide(5, 0)).toThrow('Cannot divide by zero');
    });
  });
});
```

## Example 2: Async Tests

```typescript
// api.ts
export async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) {
    throw new Error('User not found');
  }
  return response.json();
}

// api.test.ts
import { fetchUser } from './api';

describe('fetchUser', () => {
  it('should fetch user successfully', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: '1', name: 'John' })
    });

    const user = await fetchUser('1');
    
    expect(user).toEqual({ id: '1', name: 'John' });
    expect(fetch).toHaveBeenCalledWith('/api/users/1');
  });

  it('should throw error for non-existent user', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false
    });

    await expect(fetchUser('999')).rejects.toThrow('User not found');
  });
});
```

## Example 3: Integration Test

```typescript
// integration.test.ts
describe('User Registration Integration', () => {
  let db: Database;
  let emailService: EmailService;

  beforeAll(async () => {
    db = await Database.connect(TEST_DB_URL);
    emailService = new EmailService();
  });

  afterAll(async () => {
    await db.close();
  });

  beforeEach(async () => {
    await db.clear('users');
  });

  it('should register user and send welcome email', async () => {
    // Arrange
    const userData = {
      email: 'test@example.com',
      password: 'secure123',
      name: 'Test User'
    };

    // Act
    const result = await registerUser(userData, db, emailService);

    // Assert
    expect(result.success).toBe(true);
    
    const user = await db.findUser(userData.email);
    expect(user).toBeDefined();
    expect(user.email).toBe(userData.email);
    expect(user.verified).toBe(false);

    const sentEmails = emailService.getSentEmails();
    expect(sentEmails).toHaveLength(1);
    expect(sentEmails[0].to).toBe(userData.email);
    expect(sentEmails[0].subject).toContain('Welcome');
  });
});
```

## Example 4: TDD Example

```typescript
// Step 1: Write failing test
describe('StringUtils', () => {
  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
    });
  });
});

// Step 2: Implement minimal solution
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Step 3: Add more tests
describe('StringUtils', () => {
  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    it('should handle empty string', () => {
      expect(capitalize('')).toBe('');
    });

    it('should handle already capitalized', () => {
      expect(capitalize('Hello')).toBe('Hello');
    });

    it('should only capitalize first letter', () => {
      expect(capitalize('hello world')).toBe('Hello world');
    });
  });
});

// Step 4: Refactor if needed
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
```

## Example 5: Mocking Complex Dependencies

```typescript
// paymentService.ts
export class PaymentService {
  constructor(
    private gateway: PaymentGateway,
    private db: Database,
    private notifier: NotificationService
  ) {}

  async processPayment(userId: string, amount: number): Promise<Payment> {
    const user = await this.db.findUser(userId);
    
    const result = await this.gateway.charge(user.paymentMethod, amount);
    
    if (!result.success) {
      throw new Error('Payment failed');
    }

    const payment = await this.db.createPayment({
      userId,
      amount,
      transactionId: result.transactionId
    });

    await this.notifier.send(user.email, 'Payment successful');

    return payment;
  }
}

// paymentService.test.ts
describe('PaymentService', () => {
  let paymentService: PaymentService;
  let mockGateway: jest.Mocked<PaymentGateway>;
  let mockDb: jest.Mocked<Database>;
  let mockNotifier: jest.Mocked<NotificationService>;

  beforeEach(() => {
    mockGateway = {
      charge: jest.fn()
    } as any;

    mockDb = {
      findUser: jest.fn(),
      createPayment: jest.fn()
    } as any;

    mockNotifier = {
      send: jest.fn()
    } as any;

    paymentService = new PaymentService(mockGateway, mockDb, mockNotifier);
  });

  it('should process payment successfully', async () => {
    // Arrange
    const mockUser = {
      id: '1',
      email: 'user@example.com',
      paymentMethod: 'card_123'
    };

    mockDb.findUser.mockResolvedValue(mockUser);
    mockGateway.charge.mockResolvedValue({
      success: true,
      transactionId: 'txn_456'
    });
    mockDb.createPayment.mockResolvedValue({
      id: 'payment_789',
      userId: '1',
      amount: 100,
      transactionId: 'txn_456'
    });

    // Act
    const result = await paymentService.processPayment('1', 100);

    // Assert
    expect(result).toBeDefined();
    expect(result.amount).toBe(100);
    expect(mockGateway.charge).toHaveBeenCalledWith('card_123', 100);
    expect(mockNotifier.send).toHaveBeenCalledWith(
      'user@example.com',
      'Payment successful'
    );
  });

  it('should throw error on payment failure', async () => {
    mockDb.findUser.mockResolvedValue({
      id: '1',
      paymentMethod: 'card_123'
    });
    mockGateway.charge.mockResolvedValue({
      success: false
    });

    await expect(
      paymentService.processPayment('1', 100)
    ).rejects.toThrow('Payment failed');

    expect(mockNotifier.send).not.toHaveBeenCalled();
  });
});
```

## Tips

- Test behavior, not implementation
- Keep tests simple and focused
- Use descriptive test names
- Test edge cases and error conditions
- Mock external dependencies
- Run tests frequently during development

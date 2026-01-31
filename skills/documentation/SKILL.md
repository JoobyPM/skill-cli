# documentation

## Description

Create clear, comprehensive documentation for code, APIs, and projects. This skill helps generate README files, API documentation, inline comments, and usage examples.

## Capabilities

- **README Generation**: Create project overview and getting started guides
- **API Documentation**: Document functions, classes, and endpoints
- **Inline Comments**: Add helpful code explanations
- **Usage Examples**: Create practical examples
- **Architecture Docs**: Document system design and structure
- **User Guides**: Create end-user documentation

## Documentation Types

### 1. README Files
**Contents:**
- Project overview and purpose
- Installation instructions
- Quick start guide
- Usage examples
- API reference
- Contributing guidelines
- License information

### 2. API Documentation
**For Functions/Methods:**
- Purpose description
- Parameters with types
- Return values
- Exceptions/errors
- Usage examples
- Edge cases

### 3. Inline Comments
**When to Add:**
- Complex algorithms
- Business logic
- Non-obvious decisions
- Workarounds
- Performance optimizations

**When NOT to Add:**
- Self-explanatory code
- Obvious operations
- Repetitive information

### 4. Code Examples
**Include:**
- Basic usage
- Common use cases
- Edge cases
- Error handling
- Complete working examples

## Documentation Standards

### Function Documentation
```typescript
/**
 * Calculates the total price including tax and discount.
 * 
 * @param price - Base price before tax and discount
 * @param taxRate - Tax rate as decimal (e.g., 0.1 for 10%)
 * @param discountPercent - Discount percentage (0-100)
 * @returns Final price after tax and discount
 * @throws {Error} If price is negative
 * @throws {Error} If taxRate is negative or > 1
 * 
 * @example
 * ```typescript
 * const total = calculateFinalPrice(100, 0.1, 20);
 * console.log(total); // 88 (100 - 20% + 10% tax on discounted price)
 * ```
 */
function calculateFinalPrice(
  price: number,
  taxRate: number,
  discountPercent: number
): number {
  if (price < 0) throw new Error('Price cannot be negative');
  if (taxRate < 0 || taxRate > 1) throw new Error('Invalid tax rate');
  
  const discounted = price * (1 - discountPercent / 100);
  return discounted * (1 + taxRate);
}
```

### Class Documentation
```python
class UserManager:
    """
    Manages user accounts, authentication, and permissions.
    
    This class provides methods for creating, updating, and deleting users,
    as well as handling authentication and authorization.
    
    Attributes:
        db: Database connection instance
        cache: Redis cache for session storage
        
    Example:
        >>> manager = UserManager(db, cache)
        >>> user = manager.create_user('john@example.com', 'password123')
        >>> manager.authenticate(user.id, 'password123')
        True
    """
    
    def __init__(self, db, cache):
        """
        Initialize the UserManager.
        
        Args:
            db: Database connection instance
            cache: Redis cache instance for sessions
        """
        self.db = db
        self.cache = cache
```

## README Template

```markdown
# Project Name

Brief description of what this project does.

## Features

- Feature 1
- Feature 2
- Feature 3

## Installation

\`\`\`bash
npm install project-name
\`\`\`

## Quick Start

\`\`\`javascript
const Project = require('project-name');

const instance = new Project();
instance.doSomething();
\`\`\`

## API Reference

### `methodName(param1, param2)`

Description of what the method does.

**Parameters:**
- `param1` (type): Description
- `param2` (type): Description

**Returns:** Description of return value

**Example:**
\`\`\`javascript
const result = methodName('value1', 'value2');
\`\`\`

## Contributing

Contributions welcome! Please read CONTRIBUTING.md first.

## License

MIT
```

## Best Practices

1. **Be Clear**: Use simple, direct language
2. **Be Complete**: Cover all important aspects
3. **Use Examples**: Show, don't just tell
4. **Keep Updated**: Update docs with code changes
5. **Be Consistent**: Follow project style
6. **Test Examples**: Ensure code examples work

## Anti-Patterns

- ❌ Obvious comments (`i++; // increment i`)
- ❌ Outdated documentation
- ❌ Incomplete API docs
- ❌ No examples
- ❌ Overly technical language for user docs
- ❌ Commenting bad code instead of fixing it

## Documentation Checklist

- [ ] Purpose is clear
- [ ] Installation steps provided
- [ ] Usage examples included
- [ ] API reference complete
- [ ] Parameters documented
- [ ] Return values described
- [ ] Errors documented
- [ ] Examples are tested
- [ ] License included

## Examples

See [examples.md](./examples.md) for documentation examples.

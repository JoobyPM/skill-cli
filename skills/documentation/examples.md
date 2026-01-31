# documentation - Examples

## Example 1: Function Documentation

```typescript
/**
 * Fetches user data from the API with retry logic.
 * 
 * @param userId - The unique identifier of the user
 * @param options - Optional configuration
 * @param options.timeout - Request timeout in milliseconds (default: 5000)
 * @param options.retries - Number of retry attempts (default: 3)
 * @returns Promise resolving to user data
 * @throws {UserNotFoundError} If user doesn't exist
 * @throws {NetworkError} If all retry attempts fail
 * 
 * @example
 * ```typescript
 * // Basic usage
 * const user = await fetchUser('123');
 * 
 * // With options
 * const user = await fetchUser('123', { timeout: 10000, retries: 5 });
 * ```
 */
async function fetchUser(
  userId: string,
  options?: { timeout?: number; retries?: number }
): Promise<User> {
  // Implementation...
}
```

## Example 2: README File

```markdown
# Task Manager API

A RESTful API for managing tasks and todo lists built with Node.js and Express.

## Features

- ✅ Create, read, update, and delete tasks
- 🏷️ Organize tasks with tags and categories
- 📅 Set due dates and reminders
- 🔐 User authentication with JWT
- 📱 RESTful API design

## Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/username/task-manager-api.git
cd task-manager-api

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
npm run migrate

# Start the server
npm start
\`\`\`

## Quick Start

\`\`\`javascript
const axios = require('axios');

// Create a new task
const response = await axios.post('http://localhost:3000/api/tasks', {
  title: 'Complete project documentation',
  dueDate: '2024-12-31',
  priority: 'high'
});

console.log(response.data); // Created task
\`\`\`

## API Endpoints

### Tasks

#### Create Task
\`\`\`
POST /api/tasks
\`\`\`

**Request Body:**
\`\`\`json
{
  "title": "Task title",
  "description": "Task description",
  "dueDate": "2024-12-31",
  "priority": "high|medium|low",
  "tags": ["tag1", "tag2"]
}
\`\`\`

**Response:**
\`\`\`json
{
  "id": "uuid",
  "title": "Task title",
  "description": "Task description",
  "createdAt": "2024-01-15T10:30:00Z",
  "status": "pending"
}
\`\`\`

## Configuration

Create a `.env` file:

\`\`\`
PORT=3000
DATABASE_URL=postgresql://localhost/taskmanager
JWT_SECRET=your-secret-key
\`\`\`

## Development

\`\`\`bash
# Run in development mode with auto-reload
npm run dev

# Run tests
npm test

# Run linter
npm run lint
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details
```

## Example 3: API Class Documentation

```python
class DatabaseConnection:
    """
    Manages database connections with connection pooling and automatic retry.
    
    This class provides a thread-safe connection pool for PostgreSQL databases
    with automatic connection retry, health checks, and graceful cleanup.
    
    Attributes:
        host (str): Database host address
        port (int): Database port number
        database (str): Database name
        pool (ConnectionPool): The active connection pool
        
    Example:
        >>> db = DatabaseConnection('localhost', 5432, 'myapp')
        >>> db.connect()
        >>> with db.get_connection() as conn:
        ...     result = conn.execute('SELECT * FROM users')
        >>> db.close()
        
    Note:
        Always call close() when done to release resources, or use
        as a context manager for automatic cleanup.
    """
    
    def __init__(self, host: str, port: int, database: str):
        """
        Initialize database connection configuration.
        
        Args:
            host: Database server hostname or IP address
            port: Port number (typically 5432 for PostgreSQL)
            database: Name of the database to connect to
            
        Raises:
            ValueError: If any parameter is empty or invalid
        """
        pass
    
    def connect(self, min_connections: int = 1, max_connections: int = 10) -> None:
        """
        Establish the connection pool.
        
        Args:
            min_connections: Minimum connections to maintain (default: 1)
            max_connections: Maximum connections allowed (default: 10)
            
        Raises:
            ConnectionError: If unable to connect to database
            ValueError: If min_connections > max_connections
            
        Example:
            >>> db = DatabaseConnection('localhost', 5432, 'myapp')
            >>> db.connect(min_connections=2, max_connections=20)
        """
        pass
```

## Example 4: Inline Comments (Good vs Bad)

### Bad Comments
```javascript
// Bad: States the obvious
let i = 0; // Initialize counter to zero
i++; // Increment i
return i; // Return the counter

// Bad: Commented code
// function oldMethod() {
//   return something;
// }
```

### Good Comments
```javascript
// Good: Explains WHY, not WHAT
// Use exponential backoff to avoid overwhelming the API
// during high traffic periods (requirement from API provider)
const delay = Math.min(1000 * Math.pow(2, attemptCount), 30000);

// Good: Warns about gotchas
// WARNING: This regex has exponential time complexity
// for certain inputs. Validate input length first.
const pattern = /^(a+)+$/;
if (input.length > 100) {
  throw new Error('Input too long');
}

// Good: Documents business logic
// Users under 13 cannot create accounts due to COPPA compliance
if (user.age < 13) {
  throw new Error('Users must be at least 13 years old');
}

// Good: Explains workaround
// HACK: Chrome doesn't support this CSS property yet,
// so we use a JS fallback. Remove when Chrome 95+ support is > 95%
if (!supportsProperty('container-type')) {
  applyContainerQueryPolyfill();
}
```

## Tips for Great Documentation

1. **Start with Why**: Explain the purpose before the details
2. **Use Examples**: Show real-world usage
3. **Be Concise**: Respect the reader's time
4. **Update Regularly**: Keep docs in sync with code
5. **Test Examples**: Ensure code samples actually work
6. **Consider Your Audience**: Adjust complexity accordingly
7. **Use Visuals**: Diagrams for architecture, screenshots for UI
8. **Link Related Docs**: Help readers find more information

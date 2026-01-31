# code-generation - Examples

## Example 1: REST API Endpoint

### Prompt
```
Generate a Python Flask REST API endpoint that:
- Accepts POST requests to /api/users
- Validates required fields (name, email)
- Checks email format
- Returns 201 on success, 400 on validation error
- Includes error handling
- Uses type hints
```

### Expected Output Structure
```python
from flask import Flask, request, jsonify
from typing import Dict, Tuple
import re

app = Flask(__name__)

def validate_email(email: str) -> bool:
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

@app.route('/api/users', methods=['POST'])
def create_user() -> Tuple[Dict, int]:
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data or 'name' not in data or 'email' not in data:
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Validate email format
        if not validate_email(data['email']):
            return jsonify({'error': 'Invalid email format'}), 400
        
        # Success response
        return jsonify({
            'message': 'User created successfully',
            'user': {
                'name': data['name'],
                'email': data['email']
            }
        }), 201
        
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500
```

---

## Example 2: React Component

### Prompt
```
Generate a React functional component for a user profile card that:
- Displays user name, email, and avatar
- Has a "Follow" button that toggles between "Follow" and "Following"
- Uses TypeScript
- Implements proper state management with useState
- Includes prop validation
- Is styled with CSS modules
```

### Expected Output Structure
```typescript
import React, { useState } from 'react';
import styles from './UserProfileCard.module.css';

interface UserProfileCardProps {
  name: string;
  email: string;
  avatarUrl: string;
  initialFollowing?: boolean;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  name,
  email,
  avatarUrl,
  initialFollowing = false,
}) => {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className={styles.card}>
      <img 
        src={avatarUrl} 
        alt={`${name}'s avatar`} 
        className={styles.avatar}
      />
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.email}>{email}</p>
      </div>
      <button
        onClick={handleFollowToggle}
        className={`${styles.button} ${isFollowing ? styles.following : ''}`}
      >
        {isFollowing ? 'Following' : 'Follow'}
      </button>
    </div>
  );
};

export default UserProfileCard;
```

---

## Example 3: Database Query Function

### Prompt
```
Generate a TypeScript function that:
- Queries a PostgreSQL database for users by age range
- Uses parameterized queries to prevent SQL injection
- Returns typed results
- Handles database errors gracefully
- Includes connection pooling
- Uses async/await
```

### Expected Output Structure
```typescript
import { Pool, QueryResult } from 'pg';

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function getUsersByAgeRange(
  minAge: number,
  maxAge: number
): Promise<User[]> {
  try {
    // Input validation
    if (minAge < 0 || maxAge < 0 || minAge > maxAge) {
      throw new Error('Invalid age range');
    }

    // Parameterized query to prevent SQL injection
    const query = `
      SELECT id, name, email, age
      FROM users
      WHERE age BETWEEN $1 AND $2
      ORDER BY age ASC
    `;

    const result: QueryResult<User> = await pool.query(query, [minAge, maxAge]);
    
    return result.rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error('Failed to fetch users by age range');
  }
}

export { getUsersByAgeRange };
```

---

## Example 4: Class with Design Pattern

### Prompt
```
Generate a Python class using the Singleton pattern for:
- Database connection manager
- Ensures only one instance exists
- Includes connection pooling
- Thread-safe implementation
- Provides context manager support
- Includes proper cleanup
```

### Expected Output Structure
```python
import threading
from typing import Optional
from contextlib import contextmanager
import psycopg2
from psycopg2 import pool

class DatabaseManager:
    """Singleton database connection manager with connection pooling."""
    
    _instance: Optional['DatabaseManager'] = None
    _lock: threading.Lock = threading.Lock()
    
    def __new__(cls):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
        return cls._instance
    
    def __init__(self):
        if not hasattr(self, 'initialized'):
            self._connection_pool = None
            self.initialized = True
    
    def initialize(
        self,
        host: str,
        database: str,
        user: str,
        password: str,
        min_connections: int = 1,
        max_connections: int = 10
    ) -> None:
        """Initialize the connection pool."""
        if self._connection_pool is None:
            self._connection_pool = psycopg2.pool.ThreadedConnectionPool(
                min_connections,
                max_connections,
                host=host,
                database=database,
                user=user,
                password=password
            )
    
    @contextmanager
    def get_connection(self):
        """Context manager for getting a database connection."""
        if self._connection_pool is None:
            raise RuntimeError("DatabaseManager not initialized")
        
        conn = self._connection_pool.getconn()
        try:
            yield conn
        finally:
            self._connection_pool.putconn(conn)
    
    def close_all(self) -> None:
        """Close all connections in the pool."""
        if self._connection_pool:
            self._connection_pool.closeall()

# Usage example
# db_manager = DatabaseManager()
# db_manager.initialize('localhost', 'mydb', 'user', 'password')
# with db_manager.get_connection() as conn:
#     cursor = conn.cursor()
#     cursor.execute("SELECT * FROM users")
```

---

## Example 5: Utility Function

### Prompt
```
Generate a JavaScript utility function that:
- Debounces function calls
- Configurable delay
- Cancellable
- Returns a promise
- Works with async functions
- Includes TypeScript types
```

### Expected Output Structure
```typescript
type DebouncedFunction<T extends (...args: any[]) => any> = {
  (...args: Parameters<T>): Promise<ReturnType<T>>;
  cancel: () => void;
};

function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): DebouncedFunction<T> {
  let timeoutId: NodeJS.Timeout | null = null;
  let latestResolve: ((value: ReturnType<T>) => void) | null = null;
  let latestReject: ((reason?: any) => void) | null = null;

  const debounced = (...args: Parameters<T>): Promise<ReturnType<T>> => {
    return new Promise((resolve, reject) => {
      // Clear existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
        if (latestReject) {
          latestReject(new Error('Debounced call cancelled'));
        }
      }

      latestResolve = resolve;
      latestReject = reject;

      timeoutId = setTimeout(async () => {
        try {
          const result = await func(...args);
          if (latestResolve) {
            latestResolve(result);
          }
        } catch (error) {
          if (latestReject) {
            latestReject(error);
          }
        } finally {
          timeoutId = null;
          latestResolve = null;
          latestReject = null;
        }
      }, delay);
    });
  };

  debounced.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      if (latestReject) {
        latestReject(new Error('Debounced call cancelled'));
      }
      timeoutId = null;
      latestResolve = null;
      latestReject = null;
    }
  };

  return debounced;
}

export { debounce };

// Usage example:
// const debouncedSearch = debounce(async (query: string) => {
//   const results = await searchAPI(query);
//   return results;
// }, 300);
//
// debouncedSearch('test').then(results => console.log(results));
```

---

## Tips for Better Code Generation

1. **Be Specific**: Provide exact requirements and constraints
2. **Specify Language Features**: Mention which language features to use/avoid
3. **Include Context**: Describe the larger system if relevant
4. **Mention Patterns**: Specify design patterns when appropriate
5. **Define Style**: Request specific coding style or conventions
6. **Edge Cases**: Explicitly mention edge cases to handle
7. **Performance**: Specify if performance is critical
8. **Security**: Mention security requirements explicitly

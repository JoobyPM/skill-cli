# code-review - Examples

## Example 1: Security Vulnerability Review

### Code Under Review
```javascript
const express = require('express');
const mysql = require('mysql');
const app = express();

app.get('/user', (req, res) => {
  const userId = req.query.id;
  const query = `SELECT * FROM users WHERE id = ${userId}`;
  
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});
```

### Review Feedback

**🔴 Critical: SQL Injection Vulnerability**

**Location**: Line 6, user endpoint

**Issue**: The code directly interpolates user input (`userId`) into the SQL query without sanitization or parameterization.

**Impact**: An attacker could inject malicious SQL code, potentially accessing, modifying, or deleting database data. For example: `/user?id=1 OR 1=1` would return all users.

**Suggestion**: Use parameterized queries to prevent SQL injection.

**Fixed Code**:
```javascript
app.get('/user', (req, res) => {
  const userId = req.query.id;
  
  // Input validation
  if (!userId || isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }
  
  // Parameterized query
  const query = 'SELECT * FROM users WHERE id = ?';
  
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(results[0]);
  });
});
```

---

## Example 2: Performance Issue Review

### Code Under Review
```python
def get_user_orders(user_ids):
    orders = []
    for user_id in user_ids:
        user_orders = db.query(f"SELECT * FROM orders WHERE user_id = {user_id}")
        orders.extend(user_orders)
    return orders
```

### Review Feedback

**🟡 Important: N+1 Query Problem**

**Location**: Lines 3-5, get_user_orders function

**Issue**: The code executes a separate database query for each user ID, resulting in N+1 queries (1 to get users + N for each user's orders).

**Impact**: For 100 users, this creates 100 database queries, causing significant performance degradation and increased database load.

**Suggestion**: Use a single query with an IN clause to fetch all orders at once.

**Fixed Code**:
```python
def get_user_orders(user_ids):
    if not user_ids:
        return []
    
    # Use parameterized query with IN clause
    placeholders = ','.join(['%s'] * len(user_ids))
    query = f"SELECT * FROM orders WHERE user_id IN ({placeholders})"
    orders = db.query(query, user_ids)
    
    return orders
```

**Additional Optimization**:
```python
from typing import List, Dict

def get_user_orders_optimized(user_ids: List[int]) -> Dict[int, List]:
    """Returns orders grouped by user_id for easier access."""
    if not user_ids:
        return {}
    
    placeholders = ','.join(['%s'] * len(user_ids))
    query = f"SELECT * FROM orders WHERE user_id IN ({placeholders})"
    orders = db.query(query, user_ids)
    
    # Group by user_id for O(1) lookup
    orders_by_user = {}
    for order in orders:
        user_id = order['user_id']
        if user_id not in orders_by_user:
            orders_by_user[user_id] = []
        orders_by_user[user_id].append(order)
    
    return orders_by_user
```

---

## Example 3: Code Quality Review

### Code Under Review
```typescript
function processData(d: any): any {
  let r: any;
  if (d && d.items && d.items.length > 0) {
    r = [];
    for (let i = 0; i < d.items.length; i++) {
      if (d.items[i].active) {
        if (d.items[i].value > 0) {
          let x = d.items[i].value * 1.1;
          if (x > 100) {
            x = 100;
          }
          r.push({ id: d.items[i].id, v: x });
        }
      }
    }
  }
  return r;
}
```

### Review Feedback

**🟡 Important: Poor Code Quality and Readability**

**Multiple Issues Identified:**

1. **🟢 Type Safety**: Using `any` types defeats TypeScript's purpose
2. **🟢 Naming**: Single-letter and unclear variable names
3. **🟢 Nesting**: Deep nesting makes code hard to follow
4. **🟢 Magic Numbers**: Unexplained constants (1.1, 100)
5. **🟢 No Documentation**: Missing function purpose explanation

**Refactored Code**:
```typescript
interface DataItem {
  id: string;
  active: boolean;
  value: number;
}

interface ProcessedItem {
  id: string;
  adjustedValue: number;
}

interface InputData {
  items?: DataItem[];
}

const MARKUP_MULTIPLIER = 1.1;
const MAX_VALUE = 100;

/**
 * Processes active items by applying markup and capping values.
 * @param data - Input data containing items to process
 * @returns Array of processed items with adjusted values
 */
function processData(data: InputData): ProcessedItem[] {
  // Guard clause for invalid input
  if (!data?.items || data.items.length === 0) {
    return [];
  }

  const processedItems: ProcessedItem[] = [];

  for (const item of data.items) {
    // Skip inactive items or items with invalid values
    if (!item.active || item.value <= 0) {
      continue;
    }

    // Apply markup and cap at maximum
    const adjustedValue = Math.min(
      item.value * MARKUP_MULTIPLIER,
      MAX_VALUE
    );

    processedItems.push({
      id: item.id,
      adjustedValue,
    });
  }

  return processedItems;
}
```

**Improvements Made:**
- ✅ Proper TypeScript interfaces
- ✅ Descriptive variable names
- ✅ Reduced nesting with guard clauses
- ✅ Named constants for magic numbers
- ✅ JSDoc documentation
- ✅ Modern JavaScript features (for...of, Math.min)

---

## Example 4: Missing Error Handling

### Code Under Review
```python
def upload_file(file_path):
    with open(file_path, 'r') as f:
        data = f.read()
    
    response = requests.post('https://api.example.com/upload', 
                            json={'content': data})
    
    return response.json()['id']
```

### Review Feedback

**🟡 Important: Insufficient Error Handling**

**Location**: upload_file function

**Issues**:
1. No handling for file not found
2. No handling for network errors
3. No handling for API errors
4. Assumes response always has 'id' key
5. No logging for debugging

**Impact**: Function will crash on any error, providing poor user experience and difficult debugging.

**Fixed Code**:
```python
import logging
from typing import Optional
import requests
from requests.exceptions import RequestException

logger = logging.getLogger(__name__)

class FileUploadError(Exception):
    """Custom exception for file upload failures."""
    pass

def upload_file(file_path: str) -> Optional[str]:
    """
    Uploads a file to the API.
    
    Args:
        file_path: Path to the file to upload
        
    Returns:
        Upload ID if successful, None otherwise
        
    Raises:
        FileUploadError: If upload fails
    """
    try:
        # Read file with error handling
        with open(file_path, 'r', encoding='utf-8') as f:
            data = f.read()
        
        logger.info(f"Read file: {file_path}, size: {len(data)} bytes")
        
    except FileNotFoundError:
        logger.error(f"File not found: {file_path}")
        raise FileUploadError(f"File not found: {file_path}")
    except IOError as e:
        logger.error(f"Error reading file {file_path}: {e}")
        raise FileUploadError(f"Failed to read file: {e}")
    
    try:
        # Upload with timeout and error handling
        response = requests.post(
            'https://api.example.com/upload',
            json={'content': data},
            timeout=30
        )
        
        # Check HTTP status
        response.raise_for_status()
        
        # Parse response
        result = response.json()
        
        # Validate response structure
        if 'id' not in result:
            logger.error(f"Invalid API response: {result}")
            raise FileUploadError("API response missing 'id' field")
        
        upload_id = result['id']
        logger.info(f"File uploaded successfully. ID: {upload_id}")
        
        return upload_id
        
    except RequestException as e:
        logger.error(f"Network error during upload: {e}")
        raise FileUploadError(f"Upload failed: {e}")
    except ValueError as e:
        logger.error(f"Invalid JSON response: {e}")
        raise FileUploadError(f"Invalid API response: {e}")
    except Exception as e:
        logger.error(f"Unexpected error during upload: {e}")
        raise FileUploadError(f"Unexpected error: {e}")
```

---

## Example 5: Positive Code Review

### Code Under Review
```typescript
import { z } from 'zod';

const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  age: z.number().int().positive().max(150),
  role: z.enum(['user', 'admin', 'moderator']),
});

type User = z.infer<typeof UserSchema>;

export async function validateAndCreateUser(
  userData: unknown
): Promise<User> {
  try {
    // Validate input data
    const validatedData = UserSchema.parse(userData);
    
    // Additional business logic validation
    if (validatedData.role === 'admin' && validatedData.age < 18) {
      throw new Error('Admin users must be 18 or older');
    }
    
    // Create user in database (assumed to be implemented)
    await createUserInDatabase(validatedData);
    
    return validatedData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.map(err =>
        `${err.path.join('.')}: ${err.message}`
      );
      throw new Error(`Validation failed: ${formattedErrors.join(', ')}`);
    }
    throw error;
  }
}
```

### Review Feedback

**✅ Excellent Code Quality**

**Strengths:**

1. **🟢 Strong Type Safety**: Uses Zod for runtime validation with TypeScript types
2. **🟢 Clear Validation**: Input validation is comprehensive and explicit
3. **🟢 Good Error Handling**: Properly catches and formats validation errors
4. **🟢 Business Logic**: Includes business rule validation
5. **🟢 Readable Structure**: Code flow is clear and easy to follow
6. **🟢 Type Inference**: Uses `z.infer` for DRY type definitions

**Minor Suggestions:**

**🟢 Enhancement: Add Logging**
```typescript
import logger from './logger';

export async function validateAndCreateUser(
  userData: unknown
): Promise<User> {
  try {
    const validatedData = UserSchema.parse(userData);
    
    if (validatedData.role === 'admin' && validatedData.age < 18) {
      logger.warn(`Rejected admin creation for underage user: ${validatedData.id}`);
      throw new Error('Admin users must be 18 or older');
    }
    
    await createUserInDatabase(validatedData);
    logger.info(`User created successfully: ${validatedData.id}`);
    
    return validatedData;
  } catch (error) {
    logger.error('User creation failed:', error);
    // ... rest of error handling
  }
}
```

**Overall**: This is well-written, type-safe code that follows best practices. The minor logging suggestion would improve observability but isn't critical.

---

## Review Best Practices Summary

1. **Prioritize Issues**: Critical security/bugs first
2. **Be Specific**: Provide line numbers and examples
3. **Be Constructive**: Suggest solutions
4. **Be Balanced**: Acknowledge good code too
5. **Educate**: Explain the "why" behind feedback
6. **Be Respectful**: Focus on code, not the coder

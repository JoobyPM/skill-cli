# debugging - Examples

## Example 1: Null Reference Error

### Error Message
```
TypeError: Cannot read property 'name' of undefined
    at getUserName (app.js:15:28)
    at processUser (app.js:42:18)
```

### Debugging Process

**Step 1: Understand the Error**
- `undefined` means the object doesn't exist
- Error occurs when accessing `.name` property
- Location: line 15 in getUserName function

**Step 2: Examine the Code**
```javascript
function getUserName(user) {
  return user.name.toUpperCase();  // Line 15
}

function processUser(userId) {
  const user = findUserById(userId);
  const name = getUserName(user);  // Line 42
  return name;
}
```

**Step 3: Identify Root Cause**
- `findUserById` might return `undefined` if user doesn't exist
- No null check before accessing properties

**Step 4: Implement Fix**
```javascript
function getUserName(user) {
  if (!user || !user.name) {
    throw new Error('Invalid user object');
  }
  return user.name.toUpperCase();
}

function processUser(userId) {
  const user = findUserById(userId);
  
  if (!user) {
    console.warn(`User not found: ${userId}`);
    return null;
  }
  
  try {
    const name = getUserName(user);
    return name;
  } catch (error) {
    console.error(`Error processing user ${userId}:`, error);
    return null;
  }
}
```

**Step 5: Add Test**
```javascript
test('processUser handles missing user', () => {
  const result = processUser(999);  // Non-existent user
  expect(result).toBeNull();
});
```

---

## Example 2: Async Race Condition

### Problem Description
User reports that sometimes data is displayed incorrectly after clicking "Load".

### Debugging Process

**Step 1: Reproduce**
```javascript
// Buggy code
let currentData = null;

async function loadData(query) {
  const data = await fetchFromAPI(query);
  currentData = data;  // Race condition here
  displayData(currentData);
}

// User types fast: "cat" -> "cats" -> "category"
// Requests complete out of order: "category", "cat", "cats"
// Final display shows "cats" instead of "category"
```

**Step 2: Add Logging**
```javascript
async function loadData(query) {
  console.log(`[Start] Loading: ${query}`);
  const data = await fetchFromAPI(query);
  console.log(`[Complete] Loaded: ${query}`);
  currentData = data;
  displayData(currentData);
}
```

**Output reveals the problem:**
```
[Start] Loading: cat
[Start] Loading: cats
[Start] Loading: category
[Complete] Loaded: category
[Complete] Loaded: cat
[Complete] Loaded: cats  <- This overwrites category!
```

**Step 3: Implement Fix**
```javascript
let requestCounter = 0;

async function loadData(query) {
  const requestId = ++requestCounter;
  console.log(`[${requestId}] Loading: ${query}`);
  
  const data = await fetchFromAPI(query);
  
  // Only update if this is still the latest request
  if (requestId === requestCounter) {
    console.log(`[${requestId}] Displaying: ${query}`);
    currentData = data;
    displayData(currentData);
  } else {
    console.log(`[${requestId}] Discarded (superseded): ${query}`);
  }
}
```

**Alternative Fix with Abort**:
```javascript
let currentController = null;

async function loadData(query) {
  // Cancel previous request
  if (currentController) {
    currentController.abort();
  }
  
  currentController = new AbortController();
  
  try {
    const data = await fetchFromAPI(query, {
      signal: currentController.signal
    });
    currentData = data;
    displayData(currentData);
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log(`Request cancelled: ${query}`);
    } else {
      throw error;
    }
  }
}
```

---

## Example 3: Memory Leak

### Problem Description
Application becomes slow after extended use, eventually crashes.

### Debugging Process

**Step 1: Profile Memory**
```javascript
// Take heap snapshots in Chrome DevTools
// Compare snapshots over time
// Identify objects that keep growing
```

**Step 2: Find the Leak**
```javascript
// Buggy code
class EventManager {
  constructor() {
    this.listeners = [];
  }
  
  addListener(callback) {
    this.listeners.push(callback);
    // Missing: return function to remove listener
  }
  
  emit(data) {
    this.listeners.forEach(listener => listener(data));
  }
}

// Usage
function setupComponent() {
  const manager = new EventManager();
  
  // This listener is never removed!
  manager.addListener((data) => {
    updateUI(data);
  });
}

// Called many times - listeners pile up
setInterval(setupComponent, 1000);
```

**Step 3: Implement Fix**
```javascript
class EventManager {
  constructor() {
    this.listeners = new Set();
  }
  
  addListener(callback) {
    this.listeners.add(callback);
    
    // Return cleanup function
    return () => {
      this.listeners.delete(callback);
    };
  }
  
  emit(data) {
    this.listeners.forEach(listener => listener(data));
  }
  
  clear() {
    this.listeners.clear();
  }
}

// Fixed usage
function setupComponent() {
  const manager = new EventManager();
  
  const removeListener = manager.addListener((data) => {
    updateUI(data);
  });
  
  // Clean up on component unmount
  return () => {
    removeListener();
  };
}

let cleanup = null;

function init() {
  if (cleanup) {
    cleanup();  // Clean up previous instance
  }
  cleanup = setupComponent();
}
```

---

## Example 4: Off-by-One Error

### Problem Description
Last item in array is never processed.

### Code
```python
def process_items(items):
    results = []
    for i in range(len(items) - 1):  # Bug here!
        results.append(items[i] * 2)
    return results

# Test
items = [1, 2, 3, 4, 5]
results = process_items(items)
print(results)  # [2, 4, 6, 8] - missing 10!
```

### Debugging Process

**Step 1: Add Logging**
```python
def process_items(items):
    print(f"Processing {len(items)} items")
    results = []
    for i in range(len(items) - 1):
        print(f"Processing index {i}: {items[i]}")
        results.append(items[i] * 2)
    return results
```

**Output:**
```
Processing 5 items
Processing index 0: 1
Processing index 1: 2
Processing index 2: 3
Processing index 3: 4
# Index 4 never processed!
```

**Step 2: Identify Issue**
- `range(len(items) - 1)` only goes to index 3
- Should be `range(len(items))`

**Step 3: Fix**
```python
def process_items(items):
    results = []
    # Option 1: Fix the range
    for i in range(len(items)):
        results.append(items[i] * 2)
    
    # Option 2: Better - use pythonic iteration
    # for item in items:
    #     results.append(item * 2)
    
    # Option 3: Best - use list comprehension
    # results = [item * 2 for item in items]
    
    return results
```

**Step 4: Add Test**
```python
def test_process_items():
    items = [1, 2, 3, 4, 5]
    results = process_items(items)
    assert len(results) == len(items), "All items should be processed"
    assert results == [2, 4, 6, 8, 10], "Items should be doubled"
```

---

## Example 5: Network Request Failure

### Problem Description
API requests intermittently fail with timeout errors.

### Debugging Process

**Step 1: Add Detailed Logging**
```javascript
async function fetchUserData(userId) {
  console.log(`[${new Date().toISOString()}] Fetching user ${userId}`);
  
  try {
    const response = await fetch(`/api/users/${userId}`);
    console.log(`[${new Date().toISOString()}] Response status: ${response.status}`);
    
    const data = await response.json();
    console.log(`[${new Date().toISOString()}] Data received:`, data);
    
    return data;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error:`, error);
    throw error;
  }
}
```

**Step 2: Identify Pattern**
- Errors happen during high load
- No timeout configured
- No retry logic

**Step 3: Implement Robust Solution**
```javascript
async function fetchUserData(userId, retries = 3) {
  const timeout = 5000;  // 5 seconds
  const retryDelay = 1000;  // 1 second
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`[Attempt ${attempt}/${retries}] Fetching user ${userId}`);
      
      // Add timeout to fetch
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      const response = await fetch(`/api/users/${userId}`, {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log(`[Success] User ${userId} fetched`);
      
      return data;
      
    } catch (error) {
      console.error(`[Attempt ${attempt}] Error:`, error.message);
      
      if (attempt === retries) {
        console.error(`[Failed] All ${retries} attempts exhausted`);
        throw new Error(`Failed to fetch user ${userId} after ${retries} attempts`);
      }
      
      // Wait before retry
      console.log(`[Retry] Waiting ${retryDelay}ms before retry`);
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
}
```

---

## Debugging Tips

1. **Use the Debugger**: Don't just rely on console.log
2. **Reproduce Consistently**: Fix is harder without consistent reproduction
3. **Isolate Variables**: Change one thing at a time
4. **Check Assumptions**: Verify what you think you know
5. **Read Error Messages**: They usually tell you exactly what's wrong
6. **Use Git**: `git bisect` to find when bug was introduced
7. **Take Breaks**: Fresh perspective often reveals the issue
8. **Explain to Someone**: Rubber duck debugging works!

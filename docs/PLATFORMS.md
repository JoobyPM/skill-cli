# Platform Integration Guide

## Overview

This guide explains how to integrate AI coding assistant skills with different platforms.

## Supported Platforms

### Cursor

Cursor is an AI-first code editor with built-in AI assistance.

**Integration:**
1. Install the skill-cli tool
2. Create skills using `skill create`
3. Reference skills in Cursor's AI chat

### Claude

Claude is Anthropic's AI assistant with coding capabilities.

**Integration:**
1. Use skills as context in Claude conversations
2. Export skills as markdown for sharing

### OpenAI (GPT-4)

OpenAI's GPT models can be used for coding assistance.

**Integration:**

#### Python Example

```python
import openai

openai.api_key = 'your-api-key'

response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "You are a helpful coding assistant."},
        {"role": "user", "content": "Write a Python function to reverse a string"}
    ]
)

print(response.choices[0].message.content)
```

#### JavaScript Example

```javascript
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function chat() {
  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a helpful coding assistant.' },
      { role: 'user', content: 'Write a JavaScript function to reverse a string' }
    ],
  });
  
  console.log(response.data.choices[0].message.content);
}

chat();
```

## Best Practices

- Keep skills focused and modular
- Use clear, descriptive names
- Include examples in skill documentation
- Version control your skills
- Share useful skills with your team

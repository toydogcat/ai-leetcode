---
title: "LeetCode #232: Implement Queue using Stacks (用棧實現隊列)"
categories:
  - Stack
  - Design
  - Queue
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
請你僅使用兩個棧實現先入先出（FIFO）的隊列。隊列應當支持一般隊列的支持的所有操作（`push`、`pop`、`peek`、`empty`）。

## 解題心得：負負得正 (雙棧倒序)
棧是 **後進先出 (LIFO)**。如果我們將一個棧中的元素全部彈出並壓入另一個棧，順序就會反過來，變成 **先進先出 (FIFO)**。

**核心邏輯：**
1. **雙棧結構**：
   - `inStack`：負責處理 `push` 操作。
   - `outStack`：負責處理 `pop` 和 `peek` 操作。
2. **倒序操作**：
   - 當需要 `pop` 或 `peek` 時，如果 `outStack` 為空，則將 `inStack` 中的所有元素依次彈出並壓入 `outStack`。
   - 這樣 `outStack` 的棧頂就是最先進入的元素。

- **時間複雜度**:
  - `push`: $O(1)$。
  - `pop`, `peek`: 均攤 $O(1)$（每個元素最多進棧出棧兩次）。
- **空間複雜度**: $O(N)$。

## 程式碼實作

### Python
```python
class MyQueue:
    def __init__(self):
        self.in_stack = []
        self.out_stack = []

    def push(self, x: int) -> None:
        self.in_stack.append(x)

    def pop(self) -> int:
        self._move()
        return self.out_stack.pop()

    def peek(self) -> int:
        self._move()
        return self.out_stack[-1]

    def empty(self) -> bool:
        return not self.in_stack and not self.out_stack

    def _move(self):
        if not self.out_stack:
            while self.in_stack:
                self.out_stack.append(self.in_stack.pop())
```

### C++
```cpp
#include <stack>

class MyQueue {
private:
    std::stack<int> inStack, outStack;

    void move() {
        if (outStack.empty()) {
            while (!inStack.empty()) {
                outStack.push(inStack.top());
                inStack.pop();
            }
        }
    }

public:
    MyQueue() {}
    
    void push(int x) {
        inStack.push(x);
    }
    
    int pop() {
        move();
        int val = outStack.top();
        outStack.pop();
        return val;
    }
    
    int peek() {
        move();
        return outStack.top();
    }
    
    bool empty() {
        return inStack.empty() && outStack.empty();
    }
};
```

---
title: "LeetCode #225: Implement Stack using Queues (用隊列實現棧)"
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
請你僅使用兩個隊列實現一個後進先出（LIFO）的棧，並支持普通棧的全部四種操作（`push`、`top`、`pop` 和 `empty`）。

## 解題心得：反直覺的隊列操作
隊列是 **先進先出 (FIFO)**，棧是 **後進先出 (LIFO)**。

**核心邏輯：單隊列優化**
1. **Push**：
   - 將新元素加入隊列。
   - 獲取當前隊列的長度 `n`。
   - 將前 `n-1` 個元素依次彈出並重新加入隊列。
   - 此時，新加入的元素就排在了隊列的最前端（相當於棧頂）。
2. **Pop / Top**：
   - 直接對隊列前端進行操作即可。

- **時間複雜度**:
  - `push`: $O(N)$。
  - `pop`, `top`, `empty`: $O(1)$。
- **空間複雜度**: $O(N)$。

## 程式碼實作

### Python
```python
from collections import deque

class MyStack:
    def __init__(self):
        self.queue = deque()

    def push(self, x: int) -> None:
        n = len(self.queue)
        self.queue.append(x)
        # 旋轉隊列，使新元素移到最前面
        for _ in range(n):
            self.queue.append(self.queue.popleft())

    def pop(self) -> int:
        return self.queue.popleft()

    def top(self) -> int:
        return self.queue[0]

    def empty(self) -> bool:
        return not self.queue
```

### C++
```cpp
#include <queue>

class MyStack {
private:
    std::queue<int> q;

public:
    MyStack() {}
    
    void push(int x) {
        int n = q.size();
        q.push(x);
        for (int i = 0; i < n; i++) {
            q.push(q.front());
            q.pop();
        }
    }
    
    int pop() {
        int val = q.front();
        q.pop();
        return val;
    }
    
    int top() {
        return q.front();
    }
    
    bool empty() {
        return q.empty();
    }
};
```

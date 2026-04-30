---
title: "LeetCode #155: Min Stack (最小棧)"
categories:
  - Stack
  - Design
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
設計一個支持 `push` ，`pop` ，`top` 操作，並能在常數時間內檢索到最小元素的棧。

實現 `MinStack` 類:
- `MinStack()` 初始化堆棧對象。
- `void push(int val)` 將元素推入堆棧。
- `void pop()` 刪除堆棧頂部的元素。
- `int top()` 獲取堆棧頂部的元素。
- `int getMin()` 獲取堆棧中的最小元素。

## 解題心得：空間換時間的經典應用
要在 $O(1)$ 時間內取得最小元素，我們不能在呼叫 `getMin` 時才去遍歷整個棧。

**解決方案**：
我們使用一個 **輔助棧 (min_stack)** 來同步記錄當前主棧對應的最小值。
- 當我們 `push(x)` 時，主棧正常推入 `x`，輔助棧則推入 `min(x, 輔助棧頂)`。
- 當我們 `pop()` 時，主棧和輔助棧同時彈出。

這樣，輔助棧的棧頂始終就是主棧中所有元素的最小值。

- **時間複雜度**: $O(1)$ 對於所有操作。
- **空間複雜度**: $O(n)$，需要一個額外的輔助棧。

## 程式碼實作

### Python
```python
class MinStack:

    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)
        else:
            self.min_stack.append(self.min_stack[-1])

    def pop(self) -> None:
        self.stack.pop()
        self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return self.min_stack[-1]
```

### C++
```cpp
#include <stack>
#include <algorithm>

class MinStack {
private:
    std::stack<int> st;
    std::stack<int> min_st;

public:
    MinStack() {}
    
    void push(int val) {
        st.push(val);
        if (min_st.empty() || val <= min_st.top()) {
            min_st.push(val);
        } else {
            min_st.push(min_st.top());
        }
    }
    
    void pop() {
        st.pop();
        min_st.pop();
    }
    
    int top() {
        return st.top();
    }
    
    int getMin() {
        return min_st.top();
    }
};
```

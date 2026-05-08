---
title: "LeetCode #341: Flatten Nested List Iterator (扁平化巢狀清單反覆運算器)"
categories:
  - Stack
  - Tree
  - Depth-First Search
  - Design
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個巢狀的整數列表 `nestedList`。請你設計一個反覆運算器，使其能夠扁平化列表並按順序反覆運算其中的所有整數。

## 解題心得
為了支持動態的反覆運算，有兩種實作思路：
1. **一次性預處理（不推薦，但程式碼極其簡單）**：在構造函數中利用 DFS 遞迴將所有整數提取到一個陣列中，然後使用指針控制迭代。
2. **延遲加載（推薦，利用雙向堆疊/佇列）**：
   - 將所有的 `NestedInteger` 節點「從後向前」壓入堆疊中。
   - 在 `hasNext()` 中，我們檢查堆疊頂端：如果是列表，我們就將其彈出，並把列表中的元素再度「從後向前」壓入堆疊中。
   - 重複此過程，直到堆疊頂端為一個整數，此時返回 `true`。
   - 這樣更符合迭代器「按需載入」的規範，並節省記憶體空間。

- **時間複雜度**: 每一步 $O(1)$ 平均，預處理 $O(N)$
- **空間複雜度**: O(D) 深度

## 程式碼實作

### Python
```python
class NestedIterator:
    def __init__(self, nestedList: [NestedInteger]):
        self.stack = []
        # 從後向前壓入堆疊，確保最前面的元素在堆疊頂端
        for i in range(len(nestedList) - 1, -1, -1):
            self.stack.append(nestedList[i])

    def next(self) -> int:
        return self.stack.pop().getInteger()
        
    def hasNext(self) -> bool:
        while self.stack:
            curr = self.stack[-1]
            if curr.isInteger():
                return True
            self.stack.pop()
            nested = curr.getList()
            for i in range(len(nested) - 1, -1, -1):
                self.stack.append(nested[i])
        return False
```

### C++
```cpp
#include <vector>
#include <stack>

class NestedIterator {
private:
    std::stack<NestedInteger> s;

public:
    NestedIterator(std::vector<NestedInteger> &nestedList) {
        for (int i = nestedList.size() - 1; i >= 0; --i) {
            s.push(nestedList[i]);
        }
    }
    
    int next() {
        int val = s.top().getInteger();
        s.pop();
        return val;
    }
    
    bool hasNext() {
        while (!s.empty()) {
            NestedInteger curr = s.top();
            if (curr.isInteger()) {
                return true;
            }
            s.pop();
            std::vector<NestedInteger> list = curr.getList();
            for (int i = list.size() - 1; i >= 0; --i) {
                s.push(list[i]);
            }
        }
        return false;
    }
};
```

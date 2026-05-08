---
title: "LeetCode #339: Nested List Weight Sum (巢狀清單權重和)"
categories:
  - Depth-First Search
  - Breadth-First Search
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給定一個巢狀的整數列表 `nestedList`，每個元素要麼是一個整數，要麼是一個列表。整數的權重是其深度。例如，一個列表中的整數深度為其被包裝的層數。求所有整數乘上權重的總和。

## 解題心得
我們可以使用 **深度優先搜尋 (DFS)** 來遍歷這個巢狀列表：
- 定義一個 DFS 函數，接受當前的列表與當前的深度 `depth`（初始為 1）。
- 遍歷列表中的每一個元素：
  - 如果是整數，則將 `val * depth` 累加到總和中。
  - 如果是一個列表，則遞迴呼叫 `dfs(sub_list, depth + 1)`，並累加返回結果。

- **時間複雜度**: O(N)，其中 $N$ 是巢狀列表中的元素總個數
- **空間複雜度**: O(D) 遞迴最大深度

## 程式碼實作

### Python
```python
class Solution:
    def depthSum(self, nestedList: List[NestedInteger]) -> int:
        def dfs(nested, depth):
            s = 0
            for item in nested:
                if item.isInteger():
                    s += item.getInteger() * depth
                else:
                    s += dfs(item.getList(), depth + 1)
            return s
            
        return dfs(nestedList, 1)
```

### C++
```cpp
class Solution {
private:
    int dfs(const std::vector<NestedInteger>& list, int depth) {
        int sum = 0;
        for (const auto& item : list) {
            if (item.isInteger()) {
                sum += item.getInteger() * depth;
            } else {
                sum += dfs(item.getList(), depth + 1);
            }
        }
        return sum;
    }

public:
    int depthSum(std::vector<NestedInteger>& nestedList) {
        return dfs(nestedList, 1);
    }
};
```

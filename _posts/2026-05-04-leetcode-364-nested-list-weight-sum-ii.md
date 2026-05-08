---
title: "LeetCode #364: Nested List Weight Sum II (巢狀清單權重和 II)"
categories:
  - Depth-First Search
  - Breadth-First Search
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
本題要求巢狀清單整數的權重為：`最大深度 - 當前深度 + 1`。

## 解題心得
使用一個非常巧妙的 **一次 BFS / 雙重累加法**：
- 在 BFS 走訪中，我們逐層把整數加到一個累加器 `level_sum` 中。
- 在每一層結束後，我們將 `level_sum` 累加到 `total_sum` 中。
- 由於較深層的整數被累加的次數較少，較淺層的整數被累加的次數較多，這剛好完美符合「最大深度 - 當前深度 + 1」的權重定義！這個方法非常優雅，不需預先計算最大深度，空間效率極高。

- **時間複雜度**: O(N)
- **空間複雜度**: O(N)

## 程式碼實作

### Python
```python
class Solution:
    def depthSumInverse(self, nestedList: List[NestedInteger]) -> int:
        level_sum = 0
        total_sum = 0
        queue = nestedList
        
        while queue:
            next_queue = []
            for item in queue:
                if item.isInteger():
                    level_sum += item.getInteger()
                else:
                    next_queue.extend(item.getList())
            total_sum += level_sum
            queue = next_queue
            
        return total_sum
```

### C++
```cpp
class Solution {
public:
    int depthSumInverse(std::vector<NestedInteger>& nestedList) {
        int level_sum = 0;
        int total_sum = 0;
        std::vector<NestedInteger> curr = nestedList;

        while (!curr.empty()) {
            std::vector<NestedInteger> next_level;
            for (auto const& item : curr) {
                if (item.isInteger()) {
                    level_sum += item.getInteger();
                } else {
                    auto const& sub = item.getList();
                    next_level.insert(next_level.end(), sub.begin(), sub.end());
                }
            }
            total_sum += level_sum;
            curr = next_level;
        }
        return total_sum;
    }
};
```

---
title: "LeetCode #244: Shortest Word Distance II (最短單詞距離 II)"
categories:
  - Array
  - Hash Table
  - Two Pointers
  - Design
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
設計一個類 `WordDistance`，它接收一個單詞列表，並能多次調用 `shortest(word1, word2)` 方法來返回這兩個單詞的最短距離。

## 解題心得：哈希表預處理 + 雙指針
與第 243 題不同，這題要求多次查詢。如果每次查詢都遍歷數組，效率太低。

**核心邏輯：**
1. **預處理 (Constructor)**：
   - 使用哈希表記錄每個單詞出現的所有 **索引列表**。
   - 例如：`{"apple": [1, 5, 10], "banana": [2, 8]}`。
2. **查詢 (Shortest)**：
   - 獲取兩個單詞的索引列表 `l1` 和 `l2`。
   - 使用 **雙指針** 尋找兩個有序列表中的最小差值。
   - 如果 `l1[i] < l2[j]`，則 `i++`；否則 `j++`。

- **時間複雜度**:
  - 構造函數: $O(N)$。
  - 查詢函數: $O(L1 + L2)$，其中 $L$ 是單詞出現的次數。
- **空間複雜度**: $O(N)$。

## 程式碼實作

### Python
```python
from collections import defaultdict

class WordDistance:
    def __init__(self, wordsDict: List[str]):
        self.indices = defaultdict(list)
        for i, word in enumerate(wordsDict):
            self.indices[word].append(i)

    def shortest(self, word1: str, word2: str) -> int:
        l1, l2 = self.indices[word1], self.indices[word2]
        i, j = 0, 0
        min_dist = float('inf')
        
        while i < len(l1) and j < len(l2):
            min_dist = min(min_dist, abs(l1[i] - l2[j]))
            if l1[i] < l2[j]:
                i += 1
            else:
                j += 1
                
        return min_dist
```

### C++
```cpp
#include <vector>
#include <string>
#include <unordered_map>
#include <algorithm>

class WordDistance {
private:
    std::unordered_map<std::string, std::vector<int>> indices;

public:
    WordDistance(std::vector<std::string>& wordsDict) {
        for (int i = 0; i < wordsDict.size(); i++) {
            indices[wordsDict[i]].push_back(i);
        }
    }
    
    int shortest(std::string word1, std::string word2) {
        auto& l1 = indices[word1];
        auto& l2 = indices[word2];
        int i = 0, j = 0;
        int minDist = 2147483647;
        
        while (i < l1.size() && j < l2.size()) {
            minDist = std::min(minDist, std::abs(l1[i] - l2[j]));
            if (l1[i] < l2[j]) i++;
            else j++;
        }
        return minDist;
    }
};
```

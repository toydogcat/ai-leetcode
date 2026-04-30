---
title: "LeetCode #243: Shortest Word Distance (最短單詞距離)"
categories:
  - Array
  - String
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給定一個單詞列表 `wordsDict` 和兩個單詞 `word1` 和 `word2` ，返回這兩個單詞在列表中最近的距離。
假設 `word1 != word2` ，且 `word1` 和 `word2` 都在列表中。

## 解題心得：一次遍歷 (One Pass)
這是一個非常直觀的雙指針題。

**核心邏輯：**
1. 初始化兩個指針 `p1, p2` 為 -1。
2. 遍歷數組：
   - 如果當前單詞等於 `word1`，更新 `p1`。
   - 如果當前單詞等於 `word2`，更新 `p2`。
   - 如果 `p1` 和 `p2` 都已更新過，計算 `abs(p1 - p2)` 並更新最小距離。

- **時間複雜度**: $O(N)$。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
class Solution:
    def shortestDistance(self, wordsDict: List[str], word1: str, word2: str) -> int:
        p1, p2 = -1, -1
        min_dist = len(wordsDict)
        
        for i, word in enumerate(wordsDict):
            if word == word1:
                p1 = i
            elif word == word2:
                p2 = i
                
            if p1 != -1 and p2 != -1:
                min_dist = min(min_dist, abs(p1 - p2))
                
        return min_dist
```

### C++
```cpp
#include <vector>
#include <string>
#include <algorithm>

class Solution {
public:
    int shortestDistance(std::vector<std::string>& wordsDict, std::string word1, std::string word2) {
        int p1 = -1, p2 = -1;
        int minDist = wordsDict.size();
        
        for (int i = 0; i < wordsDict.size(); i++) {
            if (wordsDict[i] == word1) p1 = i;
            else if (wordsDict[i] == word2) p2 = i;
            
            if (p1 != -1 && p2 != -1) {
                minDist = std::min(minDist, std::abs(p1 - p2));
            }
        }
        return minDist;
    }
};
```

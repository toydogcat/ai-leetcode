---
title: "LeetCode #245: Shortest Word Distance III (最短單詞距離 III)"
categories:
  - Array
  - String
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
這題是 [Shortest Word Distance I](./2026-04-30-leetcode-243-shortest-word-distance.md) 的變體。
現在 `word1` 和 `word2` **可能相同**。

## 解題心得：統一處理邏輯
如果 `word1 == word2`，我們實際上是在找同一個單詞出現的相鄰索引差。

**核心邏輯：**
1. 初始化 `p1, p2` 為 -1。
2. 遍歷數組：
   - **如果 `word1 == word2`**：
     - 如果當前單詞等於 `word1`：
       - 如果 `p1` 不為 -1，更新最小距離 `i - p1`。
       - 更新 `p1 = i`。
   - **如果 `word1 != word2`**：
     - 使用第 243 題的邏輯。
3. **更優雅的寫法**：
   - 無論是否相同，如果單詞等於 `word1`，先判斷如果 `word1 == word2`，則把舊的 `p1` 賦給 `p2`（模擬上一位置），然後更新 `p1`。

- **時間複雜度**: $O(N)$。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
class Solution:
    def shortestWordDistance(self, wordsDict: List[str], word1: str, word2: str) -> int:
        p1, p2 = -1, -1
        min_dist = len(wordsDict)
        same = (word1 == word2)
        
        for i, word in enumerate(wordsDict):
            if word == word1:
                if same:
                    p2 = p1 # 把舊位置給 p2
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
    int shortestWordDistance(std::vector<std::string>& wordsDict, std::string word1, std::string word2) {
        long long p1 = -1, p2 = -1;
        long long minDist = wordsDict.size();
        bool same = (word1 == word2);
        
        for (int i = 0; i < wordsDict.size(); i++) {
            if (wordsDict[i] == word1) {
                if (same) p2 = p1;
                p1 = i;
            } else if (wordsDict[i] == word2) {
                p2 = i;
            }
            
            if (p1 != -1 && p2 != -1) {
                minDist = std::min(minDist, std::abs(p1 - p2));
            }
        }
        return (int)minDist;
    }
};
```

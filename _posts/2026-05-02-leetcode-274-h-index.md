---
title: "LeetCode #274: H-Index (H 指數)"
categories:
  - Array
  - Sorting
  - Counting
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個整數數組 `citations`，其中 `citations[i]` 表示研究者的第 `i` 篇論文被引用的次數。請返回該研究者的 **h 指數**。

研究者的 **h 指數** 定義為：`h` 篇論文中，每篇被引用了 **至少** `h` 次，其餘的 `n - h` 篇論文每篇被引用 **不超過** `h` 次。
如果有多個可能的 `h` 值，則取 **最大** 的那一個。

**範例 1:**
```
輸入: citations = [3,0,6,1,5]
輸出: 3
解釋: 
共有 5 篇論文，研究者有 3 篇論文被引用了至少 3 次（分別為 3, 6, 5），
其餘 2 篇論文被引用不超過 3 次。因此其 h 指數是 3。
```

## 解題心得：計數排序與桶排序 (Bucket Sort)
要計算 H 指數，最直接的方式是將引用次數由大到小排序：
當我們對數組排序後，如果 `citations[i] >= i + 1`，這代表至少有 `i + 1` 篇論文被引用了至少 `i + 1` 次。

更進一步，我們可以利用 **計數排序/桶排序（Bucket Sort）** 將時間複雜度優化至 $O(N)$。

**核心邏輯**：
1. **建立計數桶**：建立一個大小為 `n + 1` 的數組 `buckets`，用來記錄每種引用次數的論文數量。
2. **統計次數**：
   - 如果某篇論文的引用次數大於或等於 `n`，將其歸入 `buckets[n]`。
   - 否則歸入 `buckets[citations[i]]`。
3. **逆向累加**：
   - 建立一個變數 `papers` 記錄累計的論文總數。
   - 從 `n` 開始遞減到 `0` 遍歷 `buckets`，當 `papers >= h` 時，這就是我們要找的最大 `h` 指數。

- **時間複雜度**: $O(N)$。
- **空間複雜度**: $O(N)$，建立了一個大小為 `n + 1` 的桶。

## 程式碼實作

### Python
```python
class Solution:
    def hIndex(self, citations: List[int]) -> int:
        n = len(citations)
        buckets = [0] * (n + 1)
        
        # 1. 填入桶
        for c in citations:
            if c >= n:
                buckets[n] += 1
            else:
                buckets[c] += 1
                
        # 2. 逆向累加找 h
        papers = 0
        for h in range(n, -1, -1):
            papers += buckets[h]
            if papers >= h:
                return h
                
        return 0
```

### C++
```cpp
#include <vector>

class Solution {
public:
    int hIndex(std::vector<int>& citations) {
        int n = citations.size();
        std::vector<int> buckets(n + 1, 0);

        for (int c : citations) {
            if (c >= n) {
                buckets[n]++;
            } else {
                buckets[c]++;
            }
        }

        int papers = 0;
        for (int h = n; h >= 0; --h) {
            papers += buckets[h];
            if (papers >= h) {
                return h;
            }
        }

        return 0;
    }
};
```

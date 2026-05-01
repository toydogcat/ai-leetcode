---
title: "LeetCode #275: H-Index II (H 指數 II)"
categories:
  - Array
  - Binary Search
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個已經按照 **升序排序** 的整數數組 `citations`，其中 `citations[i]` 表示研究者的第 `i` 篇論文被引用的次數。請返回該研究者的 **h 指數**。

請設計一個時間複雜度為 $O(\log N)$ 的演算法解決本題。

**範例 1:**
```
輸入: citations = [0,1,3,5,6]
輸出: 3
解釋: 
研究者有 3 篇論文被引用了至少 3 次（分別為 3, 5, 6），
其餘 2 篇論文被引用不超過 3 次。因此其 h 指數是 3。
```

## 解題心得：二分搜尋法 (Binary Search)
這是題 [H-Index I](./2026-05-02-leetcode-274-h-index.md) 的進階版本。
由於數組已經按從小到大排序好了，我們可以直接在數組上運用 **二分搜尋法**，在 $O(\log N)$ 時間內找到答案。

**核心邏輯**：
- 假設數組長度為 `n`，當我們選中索引 `mid` 時，這代表從 `mid` 到 `n - 1` 的所有論文，其引用次數都 **大於或等於** `citations[mid]`。
- 也就是說，至少有 `n - mid` 篇論文的引用次數大於或等於 `citations[mid]`。
- **判斷條件**：
  - 如果 `citations[mid] >= n - mid`：說明這 `n - mid` 篇論文滿足條件，我們可以試圖找更小的 `mid` 看看是否能讓 `n - mid` 變得更大，因此向左搜尋：`right = mid - 1`。
  - 否則：說明引用次數不足，需要提高引用次數，因此向右搜尋：`left = mid + 1`。
- 最後返回 `n - left`。

- **時間複雜度**: $O(\log N)$。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
class Solution:
    def hIndex(self, citations: List[int]) -> int:
        n = len(citations)
        left = 0
        right = n - 1
        
        while left <= right:
            mid = left + (right - left) // 2
            
            # 如果這篇論文的引用次數 >= mid 之後的總論文數量
            if citations[mid] >= n - mid:
                right = mid - 1
            else:
                left = mid + 1
                
        return n - left
```

### C++
```cpp
#include <vector>

class Solution {
public:
    int hIndex(std::vector<int>& citations) {
        int n = citations.size();
        int left = 0;
        int right = n - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (citations[mid] >= n - mid) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        return n - left;
    }
};
```

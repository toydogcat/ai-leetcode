---
title: "LeetCode #276: Paint Fence (油漆柵欄)"
categories:
  - Dynamic Programming
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
這裡有 `n` 個柵欄柱，每個柵欄柱可以被油漆成 `k` 種顏色中的其中一種。

在 **最多只能連續兩個柵欄柱顏色相同** 的限制下，計算油漆完所有 `n` 個柵欄柱總共可以有多少種不同的方法。

**範例 1:**
```
輸入: n = 3, k = 2
輸出: 6
解釋: 
共有 6 種可能的方案：
1. 顏色 A, A, B
2. 顏色 A, B, A
3. 顏色 A, B, B
4. 顏色 B, A, A
5. 顏色 B, A, B
6. 顏色 B, B, A
```

## 解題心得：動態規劃與分情況討論
柵欄柱總共有 $n$ 個。對於第 $i$ 個柵欄柱（$i \ge 2$），它的顏色選擇取決於前一個柵欄柱：

**分情況討論**：
1. **與前一個柵欄柱顏色相同（Same）**：
   - 由於限制最多只能連續兩個相同，那麼第 $i - 1$ 個柵欄柱的顏色必須與第 $i - 2$ 個柵欄柱 **不同**。
   - 因此，第 $i$ 個柵欄柱選擇與第 $i - 1$ 個柵欄柱相同顏色的方法數 = **前一步不同的方法數**：
     $$\text{same}_i = \text{diff}_{i-1}$$
2. **與前一個柵欄柱顏色不同（Diff）**：
   - 無論第 $i - 1$ 個柵欄柱與第 $i - 2$ 個柵欄柱顏色是否相同，只要第 $i$ 個柵欄柱顏色與第 $i - 1$ 不同即可。
   - 顏色選擇：除了第 $i - 1$ 柱的顏色之外，剩下的 $k - 1$ 種顏色均可。
   - 因此方法數：
     $$\text{diff}_i = (\text{same}_{i-1} + \text{diff}_{i-1}) \times (k - 1)$$

**初始狀態**：
- $n = 1$：$k$ 種。
- $n = 2$：$\text{same}_2 = k$，$\text{diff}_2 = k \times (k - 1)$，總數為 $k \times k$。

- **時間複雜度**: $O(N)$。
- **空間複雜度**: $O(1)$，因為我們只需要記錄前一步的狀態。

## 程式碼實作

### Python
```python
class Solution:
    def numWays(self, n: int, k: int) -> int:
        if n == 0:
            return 0
        if n == 1:
            return k
            
        same = k
        diff = k * (k - 1)
        
        for i in range(3, n + 1):
            prev_diff = diff
            diff = (same + diff) * (k - 1)
            same = prev_diff
            
        return same + diff
```

### C++
```cpp
class Solution {
public:
    int numWays(int n, int k) {
        if (n == 0) return 0;
        if (n == 1) return k;

        int same = k;
        int diff = k * (k - 1);

        for (int i = 3; i <= n; ++i) {
            int prevDiff = diff;
            diff = (same + diff) * (k - 1);
            same = prevDiff;
        }

        return same + diff;
    }
};
```

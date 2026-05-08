---
title: "LeetCode #354: Russian Doll Envelopes (俄羅斯套娃信封問題)"
categories:
  - Binary Search
  - Dynamic Programming
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給定一組信封的寬度和高度 `[w, h]`。當一個信封的寬度和高度都比另一個信封大時，這個信封就可以放入另一個信封。計算最多能套幾個信封。

## 解題心得
這是一道最長遞增子序列 (LIS) 的極致變形：
1. 將信封按照寬度 `w` **升序** 排序。如果寬度相同，則高度 `h` 按照 **降序** 排序。
2. 為什麼高度要降序？因為當寬度相同時，寬度不滿足「嚴格大於」，降序排列的高度可以防止在 LIS 中選擇相同寬度的多個信封。
3. 排序後，對所有高度 `h` 陣列求最長遞增子序列（使用二分搜尋 $O(N \log N)$ 的 `piles` 方法），即為答案。

- **時間複雜度**: O(N \log N)
- **空間複雜度**: O(N)

## 程式碼實作

### Python
```python
import bisect

class Solution:
    def maxEnvelopes(self, envelopes: List[List[int]]) -> int:
        # 寬度升序，高度降序
        envelopes.sort(key=lambda x: (x[0], -x[1]))
        
        # 尋找高度的 LIS
        dp = []
        for _, h in envelopes:
            idx = bisect.bisect_left(dp, h)
            if idx == len(dp):
                dp.append(h)
            else:
                dp[idx] = h
        return len(dp)
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    int maxEnvelopes(std::vector<std::vector<int>>& envelopes) {
        // 寬度升序，高度降序
        std::sort(envelopes.begin(), envelopes.end(), [](const std::vector<int>& a, const std::vector<int>& b) {
            if (a[0] == b[0]) return a[1] > b[1];
            return a[0] < b[0];
        });

        std::vector<int> dp;
        for (auto const& env : envelopes) {
            int h = env[1];
            auto it = std::lower_bound(dp.begin(), dp.end(), h);
            if (it == dp.end()) {
                dp.push_back(h);
            } else {
                *it = h;
            }
        }
        return dp.size();
    }
};
```

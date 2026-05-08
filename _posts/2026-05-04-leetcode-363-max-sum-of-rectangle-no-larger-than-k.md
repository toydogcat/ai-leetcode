---
title: "LeetCode #363: Max Sum of Rectangle No Larger Than K (不超過 K 的最大矩陣和)"
categories:
  - Binary Search
  - Ordered Set
  - Matrix
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給定一個非空二維矩陣 `matrix` 和一個整數 `k`，在矩陣中找出一個子矩陣，其元素和不大於 `k` 且最接近 `k`，返回其最大和。

## 解題心得
1. 將二維問題降為一維：外層雙指針枚舉子矩陣的左右列 `left` 和 `right`。
2. 維護一個一維陣列 `row_sums`，其中 `row_sums[i]` 代表第 `i` 行從 `left` 到 `right` 的元素和。
3. 對於每一對 `(left, right)`，在 `row_sums` 中尋找子陣列的和不大於 `k` 且最接近 `k`。使用 **前綴和 + 二分搜尋 (Ordered Set)**：
   - 前綴和滿足 $S_j - S_i \le k \implies S_i \ge S_j - k$。
   - 在已訪問的前綴和集合中，利用二分搜尋尋找大於等於 `S_j - k` 的最小前綴和 $S_i$，並更新最大值 $S_j - S_i$。

- **時間複雜度**: O(N^2 M \log M) 其中 N 是列數，M 是行數
- **空間複雜度**: O(M)

## 程式碼實作

### Python
```python
import bisect

class Solution:
    def maxSumSubmatrix(self, matrix: List[List[int]], k: int) -> int:
        if not matrix: return 0
        m, n = len(matrix), len(matrix[0])
        ans = float('-inf')
        
        # 枚舉左右列
        for left in range(n):
            row_sums = [0] * m
            for right in range(left, n):
                for r in range(m):
                    row_sums[r] += matrix[r][right]
                    
                # 尋找不大於 k 的最大子陣列和
                lst = [0]
                curr_sum = 0
                for s in row_sums:
                    curr_sum += s
                    # 尋找第一個大於等於 curr_sum - k 的前綴和
                    idx = bisect.bisect_left(lst, curr_sum - k)
                    if idx < len(lst):
                        ans = max(ans, curr_sum - lst[idx])
                    bisect.insort(lst, curr_sum)
                    
        return ans
```

### C++
```cpp
#include <vector>
#include <algorithm>
#include <set>
#include <climits>

class Solution {
public:
    int maxSumSubmatrix(std::vector<std::vector<int>>& matrix, int k) {
        if (matrix.empty() || matrix[0].empty()) return 0;
        int m = matrix.size();
        int n = matrix[0].size();
        int ans = INT_MIN;

        for (int left = 0; left < n; ++left) {
            std::vector<int> row_sums(m, 0);
            for (int right = left; right < n; ++right) {
                for (int r = 0; r < m; ++r) {
                    row_sums[r] += matrix[r][right];
                }

                std::set<int> st = {0};
                int curr_sum = 0;
                for (int sum_val : row_sums) {
                    curr_sum += sum_val;
                    auto it = st.lower_bound(curr_sum - k);
                    if (it != st.end()) {
                        ans = std::max(ans, curr_sum - *it);
                    }
                    st.insert(curr_sum);
                }
            }
        }
        return ans;
    }
};
```

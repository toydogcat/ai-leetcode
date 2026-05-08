---
title: "LeetCode #373: Find K Pairs with Smallest Sums (查找和最小的 K 對數字)"
categories:
  - Array
  - Heap (Priority Queue)
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定兩個升序排列的整數陣列 `nums1` 和 `nums2`，以及一個整數 `k`。找出和最小的前 `k` 對數對。

## 解題心得
使用 **最小堆疊** 進行多路歸併：
- 由於陣列已排序，最小的一對必定是 `(nums1[0], nums2[0])`。
- 我們將初始的對 `(nums1[i] + nums2[0], i, 0)` 放入最小堆疊（通常放前 `k` 個 `i` 即可）。
- 每次從堆疊中彈出和最小的元素 `(sum, i, j)`，將 `(nums1[i], nums2[j])` 放入答案中。
- 然後，將下一對可能的值 `(nums1[i] + nums2[j+1], i, j+1)` 壓入堆疊。重複此操作直到收集到 `k` 對。

- **時間複雜度**: O(K \log K)
- **空間複雜度**: O(K) 堆疊空間

## 程式碼實作

### Python
```python
import heapq

class Solution:
    def kSmallestPairs(self, nums1: List[int], nums2: List[int], k: int) -> List[List[int]]:
        if not nums1 or not nums2: return []
        ans = []
        heap = []
        
        # 僅需放入前 k 個 nums1 的首項組合
        for i in range(min(len(nums1), k)):
            heapq.heappush(heap, (nums1[i] + nums2[0], i, 0))
            
        while heap and len(ans) < k:
            _, i, j = heapq.heappop(heap)
            ans.append([nums1[i], nums2[j]])
            if j + 1 < len(nums2):
                heapq.heappush(heap, (nums1[i] + nums2[j + 1], i, j + 1))
                
        return ans
```

### C++
```cpp
#include <vector>
#include <queue>
#include <tuple>

class Solution {
public:
    std::vector<std::vector<int>> kSmallestPairs(std::vector<int>& nums1, std::vector<int>& nums2, int k) {
        std::vector<std::vector<int>> ans;
        if (nums1.empty() || nums2.empty()) return ans;

        // min-heap storing {sum, idx1, idx2}
        auto cmp = [](const std::tuple<int, int, int>& a, const std::tuple<int, int, int>& b) {
            return std::get<0>(a) > std::get<0>(b);
        };
        std::priority_queue<std::tuple<int, int, int>, std::vector<std::tuple<int, int, int>>, decltype(cmp)> pq(cmp);

        for (int i = 0; i < std::min((int)nums1.size(), k); ++i) {
            pq.push({nums1[i] + nums2[0], i, 0});
        }

        while (!pq.empty() && ans.size() < k) {
            auto [sum_val, i, j] = pq.top();
            pq.pop();
            ans.push_back({nums1[i], nums2[j]});
            if (j + 1 < nums2.size()) {
                pq.push({nums1[i] + nums2[j + 1], i, j + 1});
            }
        }
        return ans;
    }
};
```

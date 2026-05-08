---
title: "LeetCode #347: Top K Frequent Elements (前 K 個高頻元素)"
categories:
  - Array
  - Hash Table
  - Heap (Priority Queue)
  - Sorting
  - Bucket Sort
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個整數陣列 `nums` 和一個整數 `k`，請你返回其中出現頻率前 `k` 高的元素。你可以按任意順序返回答案。

## 解題心得
本題如果使用排序，時間複雜度為 $O(N \log N)$。我們可以使用 **桶排序 (Bucket Sort)** 達到 $O(N)$ 線性時間複雜度：
1. 用雜湊表記錄每個數字出現的次數。
2. 建立一個二維陣列（桶）`buckets`，其索引 `index` 代表「出現次數」，`buckets[index]` 存放所有出現了該次數的數字。
3. 從後向前（從最高頻到最低頻）遍歷這個桶陣列，提取出前 `k` 高頻的元素返回。

- **時間複雜度**: O(N)
- **空間複雜度**: O(N)

## 程式碼實作

### Python
```python
class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        counts = {}
        for num in nums:
            counts[num] = counts.get(num, 0) + 1
            
        # 桶排序：最大頻率不會大於 len(nums)
        buckets = [[] for _ in range(len(nums) + 1)]
        for num, freq in counts.items():
            buckets[freq].append(num)
            
        ans = []
        for i in range(len(nums), -1, -1):
            for num in buckets[i]:
                ans.append(num)
                if len(ans) == k:
                    return ans
        return ans
```

### C++
```cpp
#include <vector>
#include <unordered_map>

class Solution {
public:
    std::vector<int> topKFrequent(std::vector<int>& nums, int k) {
        std::unordered_map<int, int> counts;
        for (int num : nums) counts[num]++;

        int n = nums.size();
        std::vector<std::vector<int>> buckets(n + 1);
        for (auto const& [num, freq] : counts) {
            buckets[freq].push_back(num);
        }

        std::vector<int> ans;
        for (int i = n; i >= 0; --i) {
            for (int num : buckets[i]) {
                ans.push_back(num);
                if (ans.size() == k) return ans;
            }
        }
        return ans;
    }
};
```

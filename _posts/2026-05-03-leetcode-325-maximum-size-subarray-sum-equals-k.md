---
title: "LeetCode #325: Maximum Size Subarray Sum Equals k (和等於 k 的最大子陣列長度)"
categories:
  - Array
  - Hash Table
  - Prefix Sum
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個陣列 `nums` 和一個目標值 `k`，找到累加和等於 `k` 的最長子陣列。如果不存在，返回 0。

## 解題心得
我們可以使用 **前綴和 (Prefix Sum) 與 雜湊表 (HashMap)** 在 $O(N)$ 時間內求得解答：
- 設當前位置的前綴和為 `curr_sum`，我們希望在左側尋找一個前綴和 `prev_sum`，使得 `curr_sum - prev_sum = k`，即 `prev_sum = curr_sum - k`。
- 如果在雜湊表中找到了 `prev_sum`，則說明其間的子陣列和為 `k`，我們可以更新最大長度為 `i - hashmap[prev_sum]`。
- 為了確保長度「最大」，我們應當只在 `curr_sum` **第一次**出現時，將其存入雜湊表中（保持索引最小）。

- **時間複雜度**: O(N)
- **空間複雜度**: O(N)

## 程式碼實作

### Python
```python
class Solution:
    def maxSubArrayLen(self, nums: List[int], k: int) -> int:
        prefix_map = {0: -1}  # 哨兵節點，用於處理從頭開始的和
        curr_sum = 0
        max_len = 0
        
        for i, num in enumerate(nums):
            curr_sum += num
            if curr_sum - k in prefix_map:
                max_len = max(max_len, i - prefix_map[curr_sum - k])
            if curr_sum not in prefix_map:
                prefix_map[curr_sum] = i
                
        return max_len
```

### C++
```cpp
#include <vector>
#include <unordered_map>
#include <algorithm>

class Solution {
public:
    int maxSubArrayLen(std::vector<int>& nums, int k) {
        std::unordered_map<long long, int> prefixMap;
        prefixMap[0] = -1;
        long long currSum = 0;
        int maxLen = 0;

        for (int i = 0; i < nums.size(); ++i) {
            currSum += nums[i];
            if (prefixMap.find(currSum - k) != prefixMap.end()) {
                maxLen = std::max(maxLen, i - prefixMap[currSum - k]);
            }
            if (prefixMap.find(currSum) == prefixMap.end()) {
                prefixMap[currSum] = i;
            }
        }
        return maxLen;
    }
};
```

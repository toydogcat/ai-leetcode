---
title: "LeetCode #164: Maximum Gap (最大間距)"
categories:
  - Array
  - Sorting
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給定一個無序的陣列 `nums`，找出陣列在排序之後，相鄰元素之間最大的間距。
你必須設計並實現時間複雜度為 $O(n)$ 且空間複雜度為 $O(n)$ 的演算法。

## 解題心得：鴿籠原理與桶排序
這題最難的地方在於 $O(n)$ 的時間限制。一般的排序演算法（如快速排序、合併排序）都需要 $O(n \log n)$。

**解決方案：桶排序 (Bucket Sort)**
1. 找出陣列的最大值 `maxVal` 和最小值 `minVal`。
2. 計算桶的間距 `bucketSize = max(1, (maxVal - minVal) / (n - 1))`。
3. 準備 $n$ 個桶。根據 **鴿籠原理 (Pigeonhole Principle)**，如果我們將 $n$ 個數放入這些桶中，最大間距一定不會出現在同一個桶內（因為同一個桶內的間距一定小於 `bucketSize`），而一定出現在 **兩個非空桶的交界處**。
4. 我們只需要記錄每個桶內的 `min` 和 `max`：
   - 最大間距 = `max(當前桶的 min - 前一個非空桶的 max)`。

- **時間複雜度**: $O(n)$。
- **空間複雜度**: $O(n)$。

## 程式碼實作

### Python
```python
class Solution:
    def maximumGap(self, nums: List[int]) -> int:
        n = len(nums)
        if n < 2: return 0
        
        min_val, max_val = min(nums), max(nums)
        if min_val == max_val: return 0
        
        # 計算桶間距與數量
        bucket_size = max(1, (max_val - min_val) // (n - 1))
        bucket_count = (max_val - min_val) // bucket_size + 1
        
        # 只記錄桶內的極值
        buckets = [[float('inf'), float('-inf')] for _ in range(bucket_count)]
        
        for x in nums:
            idx = (x - min_val) // bucket_size
            buckets[idx][0] = min(buckets[idx][0], x)
            buckets[idx][1] = max(buckets[idx][1], x)
            
        max_gap = 0
        prev_max = min_val
        
        for b_min, b_max in buckets:
            if b_min == float('inf'): continue
            max_gap = max(max_gap, b_min - prev_max)
            prev_max = b_max
            
        return max_gap
```

### C++
```cpp
#include <vector>
#include <algorithm>
#include <cmath>

class Solution {
public:
    int maximumGap(std::vector<int>& nums) {
        int n = nums.size();
        if (n < 2) return 0;
        
        int minVal = *std::min_element(nums.begin(), nums.end());
        int maxVal = *std::max_element(nums.begin(), nums.end());
        if (minVal == maxVal) return 0;
        
        int bucketSize = std::max(1, (maxVal - minVal) / (n - 1));
        int bucketCount = (maxVal - minVal) / bucketSize + 1;
        
        std::vector<int> minBuckets(bucketCount, INT_MAX);
        std::vector<int> maxBuckets(bucketCount, INT_MIN);
        
        for (int x : nums) {
            int idx = (x - minVal) / bucketSize;
            minBuckets[idx] = std::min(minBuckets[idx], x);
            maxBuckets[idx] = std::max(maxBuckets[idx], x);
        }
        
        int maxGap = 0;
        int prevMax = minVal;
        
        for (int i = 0; i < bucketCount; i++) {
            if (minBuckets[i] == INT_MAX) continue;
            maxGap = std::max(maxGap, minBuckets[i] - prevMax);
            prevMax = maxBuckets[i];
        }
        
        return maxGap;
    }
};
```

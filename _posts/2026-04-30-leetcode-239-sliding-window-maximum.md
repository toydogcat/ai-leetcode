---
title: "LeetCode #239: Sliding Window Maximum (滑動窗口最大值)"
categories:
  - Array
  - Queue
  - Sliding Window
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給你一個整數數組 `nums`，有一個大小為 `k` 的滑動窗口從數組的最左側移動到最右側。你只可以看到在滑動窗口內的 `k` 個數字。滑動窗口每次只向右移動一位。
返回滑動窗口中的最大值。

## 解題心得：單調隊列 (Monotonic Deque)
這是一道 Hard 題，核心挑戰在於如何在 $O(1)$ 或 $O(\log K)$ 時間內獲取窗口內的最大值。

**核心邏輯：**
1. **單調雙端隊列**：隊列中存儲的是 **索引**，且隊列對應的元素值必須是 **單調遞減** 的。
2. **入隊操作**：
   - 每當新元素 `nums[i]` 進入窗口時，將隊列末尾所有比它小的元素全部彈出（因為只要 `nums[i]` 在窗口內，那些比它小的舊元素永遠不可能成為最大值）。
   - 將當前索引 `i` 放入隊列末尾。
3. **出隊操作**：
   - 檢查隊列頭部的索引是否已經超出窗口範圍（即 `i - k + 1` 之外），如果是，則彈出頭部。
4. **結果**：隊列頭部的索引對應的元素即為當前窗口的最大值。

- **時間複雜度**: $O(N)$，每個元素最多進隊一次、出隊一次。
- **空間複雜度**: $O(K)$。

## 程式碼實作

### Python
```python
from collections import deque

class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        res = []
        dq = deque() # 存儲索引，保證 nums[dq] 單調遞減
        
        for i in range(len(nums)):
            # 1. 移除超出窗口左邊界的索引
            if dq and dq[0] < i - k + 1:
                dq.popleft()
            
            # 2. 移除隊列中所有比當前值小的元素
            while dq and nums[dq[-1]] < nums[i]:
                dq.pop()
                
            dq.append(i)
            
            # 3. 窗口形成後開始記錄結果
            if i >= k - 1:
                res.append(nums[dq[0]])
                
        return res
```

### C++
```cpp
#include <vector>
#include <deque>

class Solution {
public:
    std::vector<int> maxSlidingWindow(std::vector<int>& nums, int k) {
        std::vector<int> res;
        std::deque<int> dq;
        
        for (int i = 0; i < nums.size(); i++) {
            if (!dq.empty() && dq.front() < i - k + 1) {
                dq.pop_front();
            }
            
            while (!dq.empty() && nums[dq.back()] < nums[i]) {
                dq.pop_back();
            }
            
            dq.push_back(i);
            
            if (i >= k - 1) {
                res.push_back(nums[dq.front()]);
            }
        }
        
        return res;
    }
};
```

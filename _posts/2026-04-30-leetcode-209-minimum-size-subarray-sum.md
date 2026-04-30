---
title: "LeetCode #209: Minimum Size Subarray Sum (長度最小的子數組)"
categories:
  - Array
  - Sliding Window
  - Prefix Sum
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個含有 `n` 個正整數的數組和一個正整數 `target` 。
找出該數組中滿足其和 `≥ target` 的長度最小的 **連續子數組** `[numsl, numsl+1, ..., numsr-1, numsr]` ，並返回其長度。如果不存在符合條件的子數組，返回 `0` 。

## 解題心得：滑動窗口 (Sliding Window)
由於數組中全是正整數，我們可以使用滑動窗口來解決。

**核心邏輯：**
1. 使用兩個指針 `left` 和 `right` 表示窗口邊界。
2. `right` 指針向右移動，增加 `current_sum`。
3. 當 `current_sum >= target` 時：
   - 更新最小長度：`min_len = min(min_len, right - left + 1)`。
   - `left` 指針向右移動，縮小窗口，並減去 `nums[left]`。
   - 重複步驟 3，直到 `current_sum < target`。
4. 重複上述過程直到遍歷完數組。

- **時間複雜度**: $O(N)$，每個元素最多被訪問兩次（進入窗口和離開窗口）。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
class Solution:
    def minSubArrayLen(self, target: int, nums: List[int]) -> int:
        n = len(nums)
        min_len = float('inf')
        left = 0
        current_sum = 0
        
        for right in range(n):
            current_sum += nums[right]
            
            while current_sum >= target:
                min_len = min(min_len, right - left + 1)
                current_sum -= nums[left]
                left += 1
                
        return min_len if min_len != float('inf') else 0
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    int minSubArrayLen(int target, std::vector<int>& nums) {
        int n = nums.size();
        int minLen = INT_MAX;
        int left = 0;
        int sum = 0;
        
        for (int right = 0; right < n; right++) {
            sum += nums[right];
            while (sum >= target) {
                minLen = std::min(minLen, right - left + 1);
                sum -= nums[left];
                left++;
            }
        }
        
        return (minLen == INT_MAX) ? 0 : minLen;
    }
};
```

---
title: "LeetCode #55: Jump Game"
categories:
  - Array
  - Greedy
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個非負整數數組 `nums` ，你最初位於數組的 **第一個下標** 。數組中的每個元素代表你在該位置可以跳躍的最大長度。判斷你是否能夠到達最後一個下標。

## 解題心得：手裡握著最後的希望
這題是「貪心算法」的絕佳例子。我們不需要去嘗試每一種跳法（那樣會變成 $O(2^n)$），我們只需要關注 **「我目前最遠能跳到哪？」**。

**核心邏輯：**
1. **紀錄最遠距離 `max_reach`**：一開始是 0。
2. **走一步看一步**：我們遍歷數組，只要當前位置 `i` 在我們的「可跳轉範圍」內（即 $i \le max\_reach$），我們就更新 `max_reach`。
3. **不斷變強**：`max_reach = max(max_reach, i + nums[i])`。
4. **判斷終點**：如果在過程中 `max_reach` 已經超過或等於最後一個下標，就成功了！

這就像是在黑夜中打手電筒前進，只要你的光能照到路，你就能繼續往前走，並試著把手電筒照向更遠的地方。

### Python
```python
class Solution:
    def canJump(self, nums: List[int]) -> bool:
        max_reach = 0
        for i, jump in enumerate(nums):
            if i > max_reach: return False
            max_reach = max(max_reach, i + jump)
        return True
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    bool canJump(std::vector<int>& nums) {
        int maxReach = 0;
        for (int i = 0; i < nums.size(); i++) {
            if (i > maxReach) return false;
            maxReach = std::max(maxReach, i + nums[i]);
        }
        return true;
    }
};
```

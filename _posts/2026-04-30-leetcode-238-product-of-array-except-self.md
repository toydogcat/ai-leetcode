---
title: "LeetCode #238: Product of Array Except Self (除自身以外數組的乘積)"
categories:
  - Array
  - Prefix Sum
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個整數數組 `nums`，返回一個數組 `answer` ，其中 `answer[i]` 等於 `nums` 中除 `nums[i]` 之外其餘各元素的乘積。
**要求**：時間複雜度 $O(N)$，且 **不能使用除法**。

## 解題心得：左右乘積列表 (Prefix & Suffix Products)
不能用除法（即不能先算出總乘積再除以當前數），我們可以用前綴積和後綴積的思想。

**核心邏輯：**
1. **前綴積**：創建一個結果數組 `res`，`res[i]` 存儲 `nums[0]` 到 `nums[i-1]` 的乘積。
2. **後綴積 (動態優化)**：從右向左遍歷數組，維護一個變量 `right` 表示當前位置右側所有數字的乘積。
3. **合併**：將 `res[i]` 乘以 `right`，然後更新 `right = right * nums[i]`。

這樣我們只需要一個額外的 `res` 數組（算作輸出空間，不計入額外空間），空間複雜度優化到 $O(1)$。

- **時間複雜度**: $O(N)$。
- **空間複雜度**: $O(1)$ (不計輸出數組)。

## 程式碼實作

### Python
```python
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        n = len(nums)
        res = [1] * n
        
        # 1. 計算前綴積
        for i in range(1, n):
            res[i] = res[i-1] * nums[i-1]
            
        # 2. 從右邊掃回來，乘以對應的後綴積
        right = 1
        for i in range(n-1, -1, -1):
            res[i] = res[i] * right
            right *= nums[i]
            
        return res
```

### C++
```cpp
#include <vector>

class Solution {
public:
    std::vector<int> productExceptSelf(std::vector<int>& nums) {
        int n = nums.size();
        std::vector<int> res(n, 1);
        
        // 前綴
        for (int i = 1; i < n; i++) {
            res[i] = res[i-1] * nums[i-1];
        }
        
        // 後綴
        int right = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= right;
            right *= nums[i];
        }
        
        return res;
    }
};
```

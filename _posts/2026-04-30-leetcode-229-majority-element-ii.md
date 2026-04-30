---
title: "LeetCode #229: Majority Element II (多數元素 II)"
categories:
  - Array
  - Counting
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個大小為 `n` 的整數數組，找出其中所有出現次數超過 `⌊ n/3 ⌋` 次的元素。

## 解題心得：摩爾投票法 (Boyer-Moore Voting Algorithm) 的擴展
這題是 [Majority Element I](./2026-04-29-leetcode-169-majority-element.md) 的進階版。核心在於：在任何數組中，出現次數超過 `n/3` 的元素最多只有 **2 個**。

**核心邏輯：**
1. **第一階段：抵消**
   - 維護兩個候選人 `cand1`, `cand2` 和它們的計數 `cnt1`, `cnt2`。
   - 遍歷數組：
     - 如果當前數字等於其中一個候選人，對應計數加 1。
     - 如果計數為 0，則將當前數字設為新的候選人，計數設為 1。
     - 如果都不是，則兩個候選人的計數都減 1（相當於三個不同的數字互相抵消）。
2. **第二階段：驗證**
   - 因為抵消後的候選人不一定是真正的多數元素，需要再次遍歷數組統計這兩個候選人的實際出現次數。
   - 如果次數超過 `n/3`，則加入結果。

- **時間複雜度**: $O(N)$。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
class Solution:
    def majorityElement(self, nums: List[int]) -> List[int]:
        if not nums: return []
        
        cand1, cand2 = None, None
        cnt1, cnt2 = 0, 0
        
        # 投票階段
        for n in nums:
            if n == cand1:
                cnt1 += 1
            elif n == cand2:
                cnt2 += 1
            elif cnt1 == 0:
                cand1, cnt1 = n, 1
            elif cnt2 == 0:
                cand2, cnt2 = n, 1
            else:
                cnt1 -= 1
                cnt2 -= 1
        
        # 驗證階段
        res = []
        for c in [cand1, cand2]:
            if c is not None and nums.count(c) > len(nums) // 3:
                res.append(c)
        return res
```

### C++
```cpp
#include <vector>

class Solution {
public:
    std::vector<int> majorityElement(std::vector<int>& nums) {
        int cand1 = 0, cand2 = 0;
        int cnt1 = 0, cnt2 = 0;
        
        for (int n : nums) {
            if (n == cand1) {
                cnt1++;
            } else if (n == cand2) {
                cnt2++;
            } else if (cnt1 == 0) {
                cand1 = n; cnt1 = 1;
            } else if (cnt2 == 0) {
                cand2 = n; cnt2 = 1;
            } else {
                cnt1--; cnt2--;
            }
        }
        
        cnt1 = 0; cnt2 = 0;
        for (int n : nums) {
            if (n == cand1) cnt1++;
            else if (n == cand2) cnt2++;
        }
        
        std::vector<int> res;
        if (cnt1 > nums.size() / 3) res.push_back(cand1);
        if (cnt2 > nums.size() / 3) res.push_back(cand2);
        return res;
    }
};
```

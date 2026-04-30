---
title: "LeetCode #167: Two Sum II - Input Array Is Sorted (兩數之和 II - 輸入有序陣列)"
categories:
  - Array
  - Two Pointers
  - Binary Search
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個下標從 `1` 開始的整數陣列 `numbers` ，該陣列已按 **非遞減順序** 排列 ，請你從陣列中找出兩個數滿足相加之和等於目標數 `target` 。

以長度為 2 的整數陣列 `[index1, index2]` 的形式返回這兩個整數的下標。
你必須設計一個時間複雜度為 $O(n)$ 的演算法。

## 解題心得：雙指針的完美舞台
比起 [1. Two Sum](file:///home/toymsi/documents/projects/Github/ai-leetcode/_posts/2026-04-28-leetcode-1-two-sum.md) 需要用到哈希表，這題因為陣列已經 **有序**，所以有更優雅的解法。

**核心邏輯：雙指針 (Two Pointers)**
1. 設定左指針 `left` 在開頭，右指針 `right` 在末尾。
2. 計算兩數之和 `s = numbers[left] + numbers[right]`：
   - 如果 `s == target`：找到了！返回下標。
   - 如果 `s < target`：說明和太小了，需要增大，所以 `left++`。
   - 如果 `s > target`：說明和太大了，需要減小，所以 `right--`。

這個方法只需要走一遍陣列，非常高效。

- **時間複雜度**: $O(n)$。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        left, right = 0, len(numbers) - 1
        
        while left < right:
            s = numbers[left] + numbers[right]
            
            if s == target:
                # 題目要求下標從 1 開始
                return [left + 1, right + 1]
            elif s < target:
                left += 1
            else:
                right -= 1
                
        return []
```

### C++
```cpp
#include <vector>

class Solution {
public:
    std::vector<int> twoSum(std::vector<int>& numbers, int target) {
        int left = 0, right = numbers.size() - 1;
        
        while (left < right) {
            int s = numbers[left] + numbers[right];
            if (s == target) {
                return {left + 1, right + 1};
            } else if (s < target) {
                left++;
            } else {
                right--;
            }
        }
        return {};
    }
};
```

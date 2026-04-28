---
title: "LeetCode #128: Longest Consecutive Sequence"
categories:
  - Hash Table
  - Array
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個未排序的整數數組 `nums` ，找出數字連續的最長序列（不要求序列元素在原數組中連續）的長度。
請設計並實現時間複雜度為 `O(n)` 的算法解決此問題。

## 解題心得：尋找領頭羊
要達到 `O(n)`，我們不能排序。
我們可以使用一個 `HashSet` 來存儲所有數字。
1. 遍歷數組中的每個數字 `n`。
2. 判斷 `n` 是否是一個序列的 **起點**：檢查 `n-1` 是否在集合中。
3. 如果 `n-1` 不在，說明 `n` 是起點，我們就從 `n` 開始往後數：`n+1, n+2...` 都在集合中嗎？
4. 紀錄最長的長度。

雖然有雙重循環，但每個數字最多被訪問兩次，所以時間複雜度是 `O(n)`。

### Python
```python
class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        num_set = set(nums)
        longest = 0
        
        for num in num_set:
            # 只有當 num 是序列的起點時才開始計算
            if num - 1 not in num_set:
                current_num = num
                current_streak = 1
                
                while current_num + 1 in num_set:
                    current_num += 1
                    current_streak += 1
                
                longest = max(longest, current_streak)
                
        return longest
```

### C++
```cpp
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> num_set(nums.begin(), nums.end());
        int longest = 0;
        
        for (int num : num_set) {
            if (!num_set.count(num - 1)) {
                int current_num = num;
                int current_streak = 1;
                
                while (num_set.count(current_num + 1)) {
                    current_num += 1;
                    current_streak += 1;
                }
                
                longest = max(longest, current_streak);
            }
        }
        return longest;
    }
};
```

---
title: "LeetCode #287: Find the Duplicate Number (尋找重複數)"
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
給定一個包含 `n + 1` 個整數的數組 `nums`，其數字範圍都在 `[1, n]` 之間（包含 `1` 和 `n`）。

假設 `nums` 中只有 **一個重複的整數**，請找出這個重複的數。

**限制條件**：
1. **不能修改** 原數組 `nums`（即不可以使用原地排序）。
2. 只能使用 $O(1)$ 的額外空間。

**範例 1:**
```
輸入: nums = [1,3,4,2,2]
輸出: 2
```

**範例 2:**
```
輸入: nums = [3,1,3,4,2]
輸出: 3
```

## 解題心得：快慢指針與環形鏈表 (Floyd's Tortoise and Hare)
雖然這道題目是一個數組題目，但如果我們將每個索引 $i$ 看作是指向 `nums[i]` 的鏈表節點：
例如：`nums = [1, 3, 4, 2, 2]`
- `0 -> 1 -> 3 -> 2 -> 4 -> 2 -> 4 ...`

可以發現，由於存在重複的數字，這個鏈表 **必定存在一個環**，而環的入口就是那個重複的整數！
這樣問題就被轉換成了 [Linked List Cycle II](./2026-04-28-leetcode-142-linked-list-cycle-ii.md)。

**核心邏輯**：
1. **尋找相遇點**：
   - 建立慢指針 `slow = nums[0]`，快指針 `fast = nums[0]`。
   - 慢指針每次走一步：`slow = nums[slow]`。
   - 快指針每次走兩步：`fast = nums[nums[fast]]`。
   - 兩者必定會在環內的某個位置相遇，跳出迴圈。
2. **尋找環入口**：
   - 將其中一個指針（例如 `slow`）重置回起點 `nums[0]`。
   - 兩個指針均以 **每次一步** 的速度往前走：`slow = nums[slow]`，`fast = nums[fast]`。
   - 兩者再次相遇的地方就是環的入口，即為重複的數字。

- **時間複雜度**: $O(N)$。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        # 1. 尋找快慢指針相遇點
        slow = nums[0]
        fast = nums[0]
        
        while True:
            slow = nums[slow]
            fast = nums[nums[fast]]
            if slow == fast:
                break
                
        # 2. 尋找環的起點 (重複數)
        slow = nums[0]
        while slow != fast:
            slow = nums[slow]
            fast = nums[fast]
            
        return slow
```

### C++
```cpp
#include <vector>

class Solution {
public:
    int findDuplicate(std::vector<int>& nums) {
        int slow = nums[0];
        int fast = nums[0];

        // 1. 找出快慢指針相遇點
        do {
            slow = nums[slow];
            fast = nums[nums[fast]];
        } while (slow != fast);

        // 2. 找出環的起點
        slow = nums[0];
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }

        return slow;
    }
};
```

---
title: "LeetCode #382: Linked List Random Node (鏈表隨機節點)"
categories:
  - Reservoir Sampling
  - Linked List
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個單鏈表，隨機選擇其中的一個節點，並返回其值。每個節點被選中的機率應完全相同。不使用額外空間，鏈表長度未知。

## 解題心得
使用 **蓄水池抽樣 (Reservoir Sampling)** 演算法：
- 設當前走訪到第 `i` 個節點（1-indexed）：
  - 我們以 $1/i$ 的機率選擇當前節點的值作為候選答案。
  - 具體做法：生成一個 0 到 `i-1` 的隨機整數，若該整數為 0，則更新答案。
- 這樣做可以保證走訪結束後，每個節點被選中的機率皆為 $1/N$，且僅需走訪一次、空間複雜度為 $O(1)$。

- **時間複雜度**: O(N)
- **空間複雜度**: O(1)

## 程式碼實作

### Python
```python
import random

class Solution:
    def __init__(self, head: Optional[ListNode]):
        self.head = head

    def getRandom(self) -> int:
        curr = self.head
        ans = curr.val
        i = 1
        
        while curr:
            if random.randint(0, i - 1) == 0:
                ans = curr.val
            curr = curr.next
            i += 1
            
        return ans
```

### C++
```cpp
#include <cstdlib>

class Solution {
private:
    ListNode* head;

public:
    Solution(ListNode* head) : head(head) {}
    
    int getRandom() {
        ListNode* curr = head;
        int ans = curr->val;
        int i = 1;

        while (curr) {
            if (std::rand() % i == 0) {
                ans = curr->val;
            }
            curr = curr->next;
            i++;
        }
        return ans;
    }
};
```

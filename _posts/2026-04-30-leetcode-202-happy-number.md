---
title: "LeetCode #202: Happy Number (快樂數)"
categories:
  - Hash Table
  - Math
  - Two Pointers
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
編寫一個算法來判斷一個數 `n` 是不是快樂數。

**快樂數** 定義為：
- 對於一個正整數，每一次將該數替換為它每個位置上的數字的平方和。
- 然後重複這個過程直到這個數變為 1，也可能是 **無限循環** 但始終收斂不到 1。
- 如果這個過程 **結果為 1**，那麼這個數就是快樂數。

如果 `n` 是快樂數就返回 `true` ；不是，則返回 `false` 。

## 解題心得：循環檢測
這題的核心在於如何判斷是否進入了無限循環。

**核心邏輯：**
1. **哈希表 (Set)**：記錄每次計算出的平方和。如果某個數字再次出現，說明進入了循環且不為 1。
2. **快慢指針 (Floyd's Cycle-Finding)**：這就像是在鏈表中檢測環。快指針每次走兩步（計算兩次平方和），慢指針每次走一步。如果它們相遇且不為 1，則說明有環。

- **時間複雜度**: $O(\log n)$。
- **空間複雜度**: $O(1)$ (快慢指針) 或 $O(\log n)$ (哈希表)。

## 程式碼實作

### Python (快慢指針)
```python
class Solution:
    def isHappy(self, n: int) -> bool:
        def get_next(number):
            total_sum = 0
            while number > 0:
                number, digit = divmod(number, 10)
                total_sum += digit ** 2
            return total_sum

        slow = n
        fast = get_next(n)
        while fast != 1 and slow != fast:
            slow = get_next(slow)
            fast = get_next(get_next(fast))
            
        return fast == 1
```

### C++ (哈希表)
```cpp
#include <unordered_set>

class Solution {
public:
    int getNext(int n) {
        int totalSum = 0;
        while (n > 0) {
            int d = n % 10;
            n = n / 10;
            totalSum += d * d;
        }
        return totalSum;
    }

    bool isHappy(int n) {
        std::unordered_set<int> seen;
        while (n != 1 && seen.find(n) == seen.end()) {
            seen.insert(n);
            n = getNext(n);
        }
        return n == 1;
    }
};
```

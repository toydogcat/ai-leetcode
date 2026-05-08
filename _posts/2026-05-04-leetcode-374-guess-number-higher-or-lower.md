---
title: "LeetCode #374: Guess Number Higher or Lower (猜數字大小)"
categories:
  - Binary Search
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
系統隨機選出一個 1 到 n 的數字，你透過呼叫 `guess(num)` 函數來猜測。返回猜中的數字。

## 解題心得
標準的 **二分搜尋法**，搜尋範圍為 `[1, n]`。根據 `guess(mid)` 的回傳值（-1、1、0）來縮小範圍，時間複雜度為對數級別。

- **時間複雜度**: O(\log N)
- **空間複雜度**: O(1)

## 程式碼實作

### Python
```python
class Solution:
    def guessNumber(self, n: int) -> int:
        left, right = 1, n
        while left <= right:
            mid = (left + right) // 2
            res = guess(mid)
            if res == 0:
                return mid
            elif res == -1:
                right = mid - 1
            else:
                left = mid + 1
        return -1
```

### C++
```cpp
int guess(int num);

class Solution {
public:
    int guessNumber(int n) {
        int left = 1, right = n;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            int res = guess(mid);
            if (res == 0) return mid;
            else if (res == -1) right = mid - 1;
            else left = mid + 1;
        }
        return -1;
    }
};
```

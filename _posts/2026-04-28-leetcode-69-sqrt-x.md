---
title: "LeetCode #69: Sqrt(x)"
categories:
  - Math
  - Binary Search
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給你一個非負整數 `x` ，計算並返回 `x` 的 **算術平方根** 。由於返回類型是整數，結果只保留 **整數部分** ，小數部分將被 **捨去** 。注意：不允許使用任何內置指數函數和算符，例如 `pow(x, 0.5)` 或者 `x ** 0.5` 。

## 解題心得：在有序範圍裡「猜」數字
既然不能用內建函數，我們得自己找。

**核心邏輯：二分搜索**
1. **確定範圍**：數字 `x` 的平方根一定在 `0` 到 `x` 之間。
2. **切一半試試**：我們取中間值 `mid`，看看 `mid * mid` 是不是我們要找的。
   - 如果太大了，說明平方根在左半邊。
   - 如果太小了，說明平方根在右半邊。
3. **最後的結果**：因為要捨去小數，所以我們最後返回的是那個「平方後剛好小於等於 x」的最大整數。

這就像是在玩「猜數字遊戲」，每次猜中間，很快就能縮小範圍找到答案。

### Python
```python
class Solution:
    def mySqrt(self, x: int) -> int:
        l, r = 0, x
        while l <= r:
            mid = (l + r) // 2
            if mid * mid <= x < (mid + 1) * (mid + 1):
                return mid
            elif mid * mid > x:
                r = mid - 1
            else:
                l = mid + 1
```

### C++
```cpp
class Solution {
public:
    int mySqrt(int x) {
        if (x < 2) return x;
        int l = 2, r = x / 2;
        while (l <= r) {
            long mid = l + (r - l) / 2;
            if (mid * mid > x) r = mid - 1;
            else if (mid * mid < x) l = mid + 1;
            else return mid;
        }
        return r;
    }
};
```

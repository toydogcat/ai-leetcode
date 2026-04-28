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

## 解題思路
使用二分搜索在 $[0, x]$ 範圍內尋找。

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

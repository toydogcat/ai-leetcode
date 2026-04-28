---
title: "LeetCode #9: Palindrome Number"
categories:
  - Math
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給你一個整數 `x` ，如果 `x` 是一個回文整數，返回 `true` ；否則，返回 `false` 。

## 解題思路
不使用字串轉換的方法：反轉整數的一半。

- **時間複雜度**: $O(\log_{10}(x))$
- **空間複雜度**: $O(1)$

## 程式碼實作

### Python
```python
class Solution:
    def isPalindrome(self, x: int) -> bool:
        if x < 0 or (x % 10 == 0 and x != 0):
            return False
        rev = 0
        while x > rev:
            rev = rev * 10 + x % 10
            x //= 10
        return x == rev or x == rev // 10
```

### C++
```cpp
class Solution {
public:
    bool isPalindrome(int x) {
        if (x < 0 || (x % 10 == 0 && x != 0)) return false;
        int rev = 0;
        while (x > rev) {
            rev = rev * 10 + x % 10;
            x /= 10;
        }
        return x == rev || x == rev / 10;
    }
};
```

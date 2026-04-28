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
給你一個整數 `x` ，如果 `x` 是一個回文整數，返回 `true` ；否則，返回 `false` 。回文數是指正序（從左向右）和倒序（從右向左）讀都是一樣的整數。

## 解題心得：鏡像對稱
這題最簡單的做法是轉成字符串再反轉，但面試官通常會要求你「不使用字符串」。

**核心邏輯：反轉一半數字**
1. **負數排除**：負數帶負號（如 -121），反過來變 121-，肯定不是回文。
2. **反轉數字**：
   - 拿掉個位數：`x % 10`。
   - 拼進反轉後的數：`revertedNumber * 10 + x % 10`。
   - 原數縮小：`x // 10`。
3. **對比**：最後看原數跟反轉後的數是否相等。

這就像是在照鏡子，如果鏡子裡的你跟原本的你長得一模一樣，那你就是「回文」的。

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

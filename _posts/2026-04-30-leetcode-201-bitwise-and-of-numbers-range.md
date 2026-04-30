---
title: "LeetCode #201: Bitwise AND of Numbers Range (數字範圍按位與)"
categories:
  - Bit Manipulation
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你兩個整數 `left` 和 `right` ，表示區間 `[left, right]` ，返回此區間內所有數字 **按位與** 的結果（包含 `left` 、 `right` 端點）。

## 解題心得：尋找公共前綴
這題如果直接從 `left` 遍歷到 `right` 進行按位與運算，時間複雜度會是 $O(N)$，在 `right - left` 很大時會超時。

**核心邏輯：**
對於區間 $[left, right]$ 內的所有數字，如果它們在某一位上不完全相同，那麼這一位的按位與結果一定是 `0`。
因此，我們只需要找到 `left` 和 `right` 的 **二進制公共前綴**。剩下的部分在運算過程中都會因為出現過 `0` 而變成 `0`。

- **方法：** 將 `left` 和 `right` 同時向右移位，直到它們相等為止。記錄移位的次數 `shift`，最後再將結果向左移回 `shift` 位。

- **時間複雜度**: $O(\log N)$，最多移位 32 次。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
class Solution:
    def rangeBitwiseAnd(self, left: int, right: int) -> int:
        shift = 0
        # 找到公共前綴
        while left < right:
            left >>= 1
            right >>= 1
            shift += 1
        return left << shift
```

### C++
```cpp
class Solution {
public:
    int rangeBitwiseAnd(int left, int right) {
        int shift = 0;
        // 找到公共前綴
        while (left < right) {
            left >>= 1;
            right >>= 1;
            shift++;
        }
        return left << shift;
    }
};
```

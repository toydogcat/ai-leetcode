---
title: "LeetCode #344: Reverse String (反轉字串)"
categories:
  - Two Pointers
  - String
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
編寫一個函數，其作用是將輸入的字串反轉。輸入字串以字元陣列 `s` 的形式給出。
不要給另外的陣列分配額外的空間，你必須原地修改輸入陣列、使用 $O(1)$ 的額外空間。

## 解題心得
這是一道極其簡單的 **雙指針 (Two Pointers)** 對調題：
- 設定指針 `left = 0`，`right = len(s) - 1`。
- 每次將 `s[left]` 與 `s[right]` 的字元互換，然後分別向中間移動，直到雙指針相遇。

- **時間複雜度**: O(N)
- **空間複雜度**: O(1)

## 程式碼實作

### Python
```python
class Solution:
    def reverseString(self, s: List[str]) -> None:
        left, right = 0, len(s) - 1
        while left < right:
            s[left], s[right] = s[right], s[left]
            left += 1
            right -= 1
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    void reverseString(std::vector<char>& s) {
        int left = 0, right = s.size() - 1;
        while (left < right) {
            std::swap(s[left++], s[right--]);
        }
    }
};
```

---
title: "LeetCode #318: Maximum Product of Word Lengths (單詞長度的最大乘積)"
categories:
  - Array
  - Bit Manipulation
  - String
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個字串陣列 `words`，找出兩個不包含相同字元的單詞，並返回它們長度的最大乘積。如果不存在，返回 0。

## 解題心得
為了判斷兩個單詞是否有相同字元，最直觀的做法是逐一對比字元。更優雅的做法是使用 **位元運算 (Bit Manipulation)**：
- 由於全為小寫英文字母，我們可以用一個 32 位的整數（`int`）來作為長度 26 的 `Bitmask`。若單詞中包含 `'a'`，則將第 0 位置為 1，以此類推。
- 當我們比較單詞 `i` 與 `j` 時，只需計算 `masks[i] & masks[j] == 0`，若為 0 表示兩者無重複字元，即可計算長度乘積並更新最大值。

- **時間複雜度**: O(N^2 + L)，其中 $N$ 是單詞數，$L$ 是所有字元長度之和
- **空間複雜度**: O(N)

## 程式碼實作

### Python
```python
class Solution:
    def maxProduct(self, words: List[str]) -> int:
        masks = {}
        for word in words:
            mask = 0
            for char in word:
                mask |= 1 << (ord(char) - ord('a'))
            masks[mask] = max(masks.get(mask, 0), len(word))
            
        max_prod = 0
        for m1, len1 in masks.items():
            for m2, len2 in masks.items():
                if m1 & m2 == 0:
                    max_prod = max(max_prod, len1 * len2)
                    
        return max_prod
```

### C++
```cpp
#include <vector>
#include <string>
#include <algorithm>
#include <unordered_map>

class Solution {
public:
    int maxProduct(std::vector<std::string>& words) {
        std::unordered_map<int, int> masks;
        for (const std::string& word : words) {
            int mask = 0;
            for (char c : word) {
                mask |= 1 << (c - 'a');
            }
            masks[mask] = std::max(masks[mask], (int)word.length());
        }

        int maxProd = 0;
        for (auto const& [m1, len1] : masks) {
            for (auto const& [m2, len2] : masks) {
                if ((m1 & m2) == 0) {
                    maxProd = std::max(maxProd, len1 * len2);
                }
            }
        }
        return maxProd;
    }
};
```

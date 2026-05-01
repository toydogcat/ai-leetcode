---
title: "LeetCode #266: Palindrome Permutation (迴文排列)"
categories:
  - Hash Table
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給定一個字串 `s`，判斷該字串中的字元是否可以經由某種重新排列，組合出一個 **迴文（Palindrome）**。

**範例 1:**
```
輸入: s = "code"
輸出: false
```

**範例 2:**
```
輸入: s = "aab"
輸出: true
解釋: 可以排列為 "aba"。
```

**範例 3:**
```
輸入: s = "carerac"
輸出: true
解釋: 可以排列為 "rcaearc"。
```

## 解題心得：檢查奇數次數的字元個數
一個字串能夠經由排列組合成迴文，意味著它必須是對稱的。

**核心邏輯**：
1. 當字串長度為偶數時：所有字元出現的次數必須都是 **偶數**。
2. 當字串長度為奇數時：有且僅有 **1 個字元** 出現的次數為奇數，其餘字元必須都是偶數。
3. **綜合以上兩點**：我們只需要統計所有字元的出現次數，並確認出現次數為 **奇數** 的字元個數 $\le 1$。

我們可以使用雜湊表（Hash Map）或集合（Set）來有效率地解決這個問題：
- 遍歷字串，當遇到一個字元時：
  - 如果它不在集合中，將其加入。
  - 如果它已經在集合中，將其移除。
- 遍歷完成後，如果集合中剩下的元素個數 $\le 1$，則表示該字串可以排列成迴文。

- **時間複雜度**: $O(N)$。
- **空間複雜度**: $O(K)$，其中 $K$ 是字元集的大小（通常 $K \le 128$），可以視為 $O(1)$。

## 程式碼實作

### Python
```python
class Solution:
    def canPermutePalindrome(self, s: str) -> bool:
        odd_chars = set()
        for char in s:
            if char in odd_chars:
                odd_chars.remove(char)
            else:
                odd_chars.add(char)
                
        # 出現奇數次的字元個數最多只能有 1 個
        return len(odd_chars) <= 1
```

### C++
```cpp
#include <string>
#include <unordered_set>

class Solution {
public:
    bool canPermutePalindrome(std::string s) {
        std::unordered_set<char> odd_chars;
        for (char c : s) {
            if (odd_chars.count(c)) {
                odd_chars.erase(c);
            } else {
                odd_chars.insert(c);
            }
        }

        return odd_chars.size() <= 1;
    }
};
```

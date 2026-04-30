---
title: "LeetCode #242: Valid Anagram (有效的字母異位詞)"
categories:
  - Hash Table
  - String
  - Sorting
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給定兩個字符串 `s` 和 `t` ，編寫一個函數來判斷 `t` 是否是 `s` 的字母異位詞。
**字母異位詞**：由相同的字母按照不同的順序組成的單詞。

## 解題心得：頻率統計 (計數器)
字母異位詞的本質是：兩個字符串中 **每個字母出現的次數完全相同**。

**核心邏輯：**
1. **長度檢查**：如果兩字符串長度不等，直接返回 `false`。
2. **哈希表或數組計數**：
   - 使用一個長度為 26 的數組（對應 a-z）。
   - 遍歷 `s`，對應字母的計數加 1。
   - 遍歷 `t`，對應字母的計數減 1。
3. **最後檢查**：如果數組中所有數值均為 0，則返回 `true`。

- **時間複雜度**: $O(N)$。
- **空間複雜度**: $O(1)$（因為字母範圍固定為 26）。

## 程式碼實作

### Python
```python
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t): return False
        
        count = [0] * 26
        for char in s:
            count[ord(char) - ord('a')] += 1
            
        for char in t:
            count[ord(char) - ord('a')] -= 1
            if count[ord(char) - ord('a')] < 0:
                return False
                
        return True
```

### C++
```cpp
#include <string>
#include <vector>

class Solution {
public:
    bool isAnagram(std::string s, std::string t) {
        if (s.length() != t.length()) return false;
        
        std::vector<int> count(26, 0);
        for (char c : s) count[c - 'a']++;
        for (char c : t) {
            count[c - 'a']--;
            if (count[c - 'a'] < 0) return false;
        }
        return true;
    }
};
```

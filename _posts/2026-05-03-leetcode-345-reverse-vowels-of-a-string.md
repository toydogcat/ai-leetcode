---
title: "LeetCode #345: Reverse Vowels of a String (反轉字串中的元音字母)"
categories:
  - Two Pointers
  - String
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給你一個字串 `s`，僅反轉字串中的所有元音字母（`'a', 'e', 'i', 'o', 'u'` 及其大寫形式），並返回新字串。

## 解題心得
同樣使用 **雙指針 (Two Pointers)** 概念：
- 建立一個包含大/小寫所有元音字元的快取 Set。
- `left` 指針從左出發，`right` 指針從右出發。
- 當 `left` 遇到的不是元音時，往右前進。當 `right` 遇到的不是元音時，往左前進。
- 只有當兩者皆遇到元音時，將其對調，並再度前進，直到相遇。

- **時間複雜度**: O(N)
- **空間複雜度**: O(1)

## 程式碼實作

### Python
```python
class Solution:
    def reverseVowels(self, s: str) -> str:
        vowels = set("aeiouAEIOU")
        arr = list(s)
        left, right = 0, len(arr) - 1
        
        while left < right:
            while left < right and arr[left] not in vowels:
                left += 1
            while left < right and arr[right] not in vowels:
                right -= 1
            if left < right:
                arr[left], arr[right] = arr[right], arr[left]
                left += 1
                right -= 1
                
        return "".join(arr)
```

### C++
```cpp
#include <string>
#include <unordered_set>
#include <algorithm>

class Solution {
public:
    std::string reverseVowels(std::string s) {
        std::unordered_set<char> vowels = {'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'};
        int left = 0, right = s.length() - 1;

        while (left < right) {
            while (left < right && vowels.find(s[left]) == vowels.end()) left++;
            while (left < right && vowels.find(s[right]) == vowels.end()) right--;
            if (left < right) {
                std::swap(s[left++], s[right--]);
            }
        }
        return s;
    }
};
```

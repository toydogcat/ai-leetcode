---
title: "LeetCode #125: Valid Palindrome"
categories:
  - String
tags:
  - Easy
  - Two Pointers
  - Python
  - C++
---

## 題目描述
如果在將所有大寫字符轉換為小寫字符、並移除所有非字母數字字符之後，短語正著讀和反著讀都一樣。則可以認為該短語是一個 **迴文** 。
字母和數字都屬於字母數字字符。
給你一個字符串 `s`，如果它是 **迴文** ，返回 `true` ；否則，返回 `false` 。

## 解題心得：排除雜訊
這題考驗的是字符串處理能力。
1. **清洗數據：** 把大寫轉小寫，過濾掉空格和符號。
2. **雙指針檢查：** 一個從頭開始，一個從尾開始，往中間靠攏比較。

### Python
```python
class Solution:
    def isPalindrome(self, s: str) -> bool:
        # 清洗數據
        clean_s = "".join(char.lower() for char in s if char.isalnum())
        
        # 雙指針或切片翻轉
        return clean_s == clean_s[::-1]
```

### C++
```cpp
class Solution {
public:
    bool isPalindrome(string s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            // 跳過非字母數字
            while (left < right && !isalnum(s[left])) left++;
            while (left < right && !isalnum(s[right])) right--;
            
            if (tolower(s[left]) != tolower(s[right])) return false;
            left++;
            right--;
        }
        return true;
    }
};
```

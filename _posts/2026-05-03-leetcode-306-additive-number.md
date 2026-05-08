---
title: "LeetCode #306: Additive Number (累加數)"
categories:
  - String
  - Backtracking
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
累加數是一個字串，其中的數字符號可以形成一個累加序列。
一個有效的累加序列至少包含 3 個數。除了前兩個數之外，序列中的每個後續數必須是前兩個數的和。

## 解題心得
只要我們決定了前兩個數的長度，整個累加序列就是完全確定的。因此，我們只需要使用 **回溯法/窮舉法 (Backtracking)** 來嘗試前兩個數的所有合法長度：
- 設第一個數為 `num[0...i]`，第二個數為 `num[i+1...j]`。
- 確保數字不能有前導零（除了 `'0'` 本身）。
- 計算兩數之和，並在字串後面驗證是否相符。如果相符，我們將第二個數作為新的第一個數，兩數之和作為新的第二個數，遞迴驗證剩餘的部分。

- **時間複雜度**: O(N^3)
- **空間複雜度**: O(N) 用於儲存大數的字串形式

## 程式碼實作

### Python
```python
class Solution:
    def isAdditiveNumber(self, num: str) -> bool:
        n = len(num)
        
        def isValid(n1_str, n2_str, idx):
            if idx == n:
                return True
            n1, n2 = int(n1_str), int(n2_str)
            sum_str = str(n1 + n2)
            if not num.startswith(sum_str, idx):
                return False
            return isValid(n2_str, sum_str, idx + len(sum_str))

        for i in range(1, n):
            for j in range(i + 1, n):
                n1_str, n2_str = num[:i], num[i:j]
                # 排除有前導零的情況
                if (len(n1_str) > 1 and n1_str[0] == '0') or (len(n2_str) > 1 and n2_str[0] == '0'):
                    continue
                if isValid(n1_str, n2_str, j):
                    return True
        return False
```

### C++
```cpp
#include <string>

class Solution {
private:
    bool isValid(const std::string& n1_str, const std::string& n2_str, const std::string& num, int idx) {
        if (idx == num.length()) return true;
        
        long long n1 = std::stoll(n1_str);
        long long n2 = std::stoll(n2_str);
        std::string sum_str = std::to_string(n1 + n2);
        
        if (num.compare(idx, sum_str.length(), sum_str) != 0) {
            return false;
        }
        return isValid(n2_str, sum_str, num, idx + sum_str.length());
    }

public:
    bool isAdditiveNumber(std::string num) {
        int n = num.length();
        for (int i = 1; i < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                std::string n1_str = num.substr(0, i);
                std::string n2_str = num.substr(i, j - i);
                
                if ((n1_str.length() > 1 && n1_str[0] == '0') || 
                    (n2_str.length() > 1 && n2_str[0] == '0')) {
                    continue;
                }
                
                // 排除加總後溢位的可能性，使用 stoll 要注意長度
                if (n1_str.length() > 17 || n2_str.length() > 17) continue;
                
                if (isValid(n1_str, n2_str, num, j)) return true;
            }
        }
        return false;
    }
};
```

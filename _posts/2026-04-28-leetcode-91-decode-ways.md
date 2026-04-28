---
title: "LeetCode #91: Decode Ways"
categories:
  - Dynamic Programming
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
一條包含字母 `A-Z` 的消息通過以下方式進行了編碼：'A' -> 1, 'B' -> 2, ..., 'Z' -> 26。給定一個只包含數字的非空字符串 `s`，計算解碼方法的總數。

## 解題心得：像「爬樓梯」一樣思考
這道題本質上是 **「爬樓梯問題」的變體**。在爬樓梯時，你一次可以走 1 步或 2 步；在這裡，你一次可以解碼 1 個數字或 2 個數字。

**核心邏輯：**
1. **單字解碼**：如果當前數字不是 '0'，它自己就能解碼成一個字母，所以方法數繼承自 `dp[i-1]`。
2. **雙字組合**：如果當前數字和前一個數字組合起來在 10 到 26 之間（例如 "12" 或 "26"），這兩個數字也能解碼成一個字母，所以方法數再額外加上 `dp[i-2]`。
3. **特殊情況 '0'**：'0' 不能單獨解碼，必須跟前面的 '1' 或 '2' 組合。如果組合不了，這條路就斷了。

- **時間複雜度**: $O(n)$
- **空間複雜度**: $O(n)$，可優化至 $O(1)$。

### Python
```python
class Solution:
    def numDecodings(self, s: str) -> int:
        if not s or s[0] == '0': return 0
        n = len(s)
        dp = [0] * (n + 1)
        dp[0] = 1 # 空字串也算一種起始狀態
        dp[1] = 1
        
        for i in range(2, n + 1):
            # 方案一：只解碼當前這一個數字
            if s[i-1] != '0':
                dp[i] += dp[i-1]
            # 方案二：把當前數字跟前一個湊成一對
            two_digit = int(s[i-2:i])
            if 10 <= two_digit <= 26:
                dp[i] += dp[i-2]
        return dp[n]
```

### C++
```cpp
#include <string>
#include <vector>

class Solution {
public:
    int numDecodings(std::string s) {
        if (s.empty() || s[0] == '0') return 0;
        int n = s.length();
        std::vector<int> dp(n + 1, 0);
        dp[0] = 1;
        dp[1] = 1;
        for (int i = 2; i <= n; i++) {
            // 檢查最後一個數字
            if (s[i-1] != '0') dp[i] += dp[i-1];
            // 檢查最後兩個數字組成的數
            int val = std::stoi(s.substr(i-2, 2));
            if (val >= 10 && val <= 26) dp[i] += dp[i-2];
        }
        return dp[n];
    }
};
```

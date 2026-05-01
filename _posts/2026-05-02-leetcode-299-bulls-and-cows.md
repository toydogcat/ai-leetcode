---
title: "LeetCode #299: Bulls and Cows (猜數字遊戲)"
categories:
  - Hash Table
  - String
  - Counting
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
你正在和朋友玩 **猜數字（Bulls and Cows）** 遊戲。

你寫下一個祕密數字 `secret`，你的朋友猜一個數字 `guess`。請根據以下規則返回提示：
- **公牛（Bulls）**：猜對了數字 **且位置也正確** 的數字個數。
- **奶牛（Cows）**：猜對了數字 **但位置不正確** 的數字個數。

給定一個祕密數字 `secret` 和朋友猜的數字 `guess`，請返回格式為 `"xAyB"` 的字串提示，其中 `x` 是公牛的數量，`y` 是奶牛的數量。
`secret` 和 `guess` 都只包含數字，且長度相同。

**範例 1:**
```
輸入: secret = "1807", guess = "7810"
輸出: "1A3B"
解釋: 
1 是公牛：因為 8 在 secret 和 guess 的相同位置。
3 是奶牛：1, 0, 7 在 guess 中出現了，但位置不對。
```

**範例 2:**
```
輸入: secret = "1123", guess = "0111"
輸出: "1A1B"
解釋:
公牛：第一個 1。
奶牛：guess 中多出來的 1。雖然 guess 有三個 1，但 secret 只有兩個 1，其中第一個 1 是公牛，剩下能作為奶牛的只有一個 1。
```

## 解題心得：計數與匹配 (Counting & Matching)
本題可以使用計數法來有效率地解決。

**核心邏輯**：
1. **第一次遍歷（統計 Bulls）**：
   - 同時遍歷 `secret` 和 `guess` 的同一個索引 $i$。
   - 如果 `secret[i] == guess[i]`，說明數字和位置完全符合，**Bulls + 1**。
   - 如果不符合，我們分別將 `secret[i]` 和 `guess[i]` 的字元記錄進兩個不同的字頻統計字典/數組 `secret_counts` 和 `guess_counts`。
2. **第二次遍歷（統計 Cows）**：
   - 遍歷數字 `'0'` 到 `'9'`，這兩個字元在字典中都有被記錄的話，奶牛的個數就是它們在兩邊出現次數的最小值。
   - **Cows += $\min(\text{secret\_counts}[d], \text{guess\_counts}[d])$**。

- **時間複雜度**: $O(N)$。遍歷 `secret` 和 `guess` 兩次。
- **空間複雜度**: $O(1)$，因為字元集大小固定為 10（數字 `0-9`）。

## 程式碼實作

### Python
```python
from collections import defaultdict

class Solution:
    def getHint(self, secret: str, guess: str) -> str:
        bulls = 0
        cows = 0
        
        secret_counts = defaultdict(int)
        guess_counts = defaultdict(int)
        
        # 1. 統計 Bulls 與字頻
        for s, g in zip(secret, guess):
            if s == g:
                bulls += 1
            else:
                secret_counts[s] += 1
                guess_counts[g] += 1
                
        # 2. 統計 Cows
        for char in secret_counts:
            if char in guess_counts:
                cows += min(secret_counts[char], guess_counts[char])
                
        return f"{bulls}A{cows}B"
```

### C++
```cpp
#include <string>
#include <vector>
#include <algorithm>

class Solution {
public:
    std::string getHint(std::string secret, std::string guess) {
        int bulls = 0;
        int cows = 0;

        std::vector<int> secretCounts(10, 0);
        std::vector<int> guessCounts(10, 0);

        for (size_t i = 0; i < secret.length(); ++i) {
            if (secret[i] == guess[i]) {
                bulls++;
            } else {
                secretCounts[secret[i] - '0']++;
                guessCounts[guess[i] - '0']++;
            }
        }

        for (int i = 0; i < 10; ++i) {
            cows += std::min(secretCounts[i], guessCounts[i]);
        }

        return std::to_string(bulls) + "A" + std::to_string(cows) + "B";
    }
};
```

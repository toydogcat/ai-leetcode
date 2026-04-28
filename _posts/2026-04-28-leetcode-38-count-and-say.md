---
title: "LeetCode #38: Count and Say"
categories:
  - String
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
「外觀數列」是一個整數序列，從數字 `1` 開始，序列中的每一項都是對前一項的描述。
- `countAndSay(1) = "1"`
- `countAndSay(2) = "11"` (描述 1 為「一個 1」)
- `countAndSay(3) = "21"` (描述 11 為「兩個 1」)
- `countAndSay(4) = "1211"` (描述 21 為「一個 2，一個 1」)

## 解題心得：看圖說故事
這題題目描述很繞口，但其實就是「點人頭」。

**核心邏輯：**
1. **遍歷前一項**：我們從左往右看。
2. **計算連續次數**：如果遇到相同的數字，我們就記下它出現了幾次。
3. **翻譯成句子**：比如看到 `111`，我們就翻譯成 `31`（三個一）；看到 `22`，就翻譯成 `22`（兩個二）。
4. **拼接結果**：把這些翻譯連起來，就得到了下一項。

這就像是你在清點貨物，你對著紀錄員喊：「這裡有三個箱子，接著有兩個袋子...」，紀錄員記下來的就是下一筆數據。

### Python
```python
class Solution:
    def countAndSay(self, n: int) -> str:
        res = "1"
        for _ in range(n - 1):
            next_res, i = "", 0
            while i < len(res):
                count = 1
                while i + 1 < len(res) and res[i] == res[i+1]:
                    i += 1
                    count += 1
                next_res += str(count) + res[i]
                i += 1
            res = next_res
        return res
```

### C++
```cpp
#include <string>

class Solution {
public:
    std::string countAndSay(int n) {
        std::string res = "1";
        for (int i = 1; i < n; i++) {
            std::string nextRes = "";
            for (int j = 0; j < res.length(); j++) {
                int count = 1;
                while (j + 1 < res.length() && res[j] == res[j+1]) {
                    j++; count++;
                }
                nextRes += std::to_string(count) + res[j];
            }
            res = nextRes;
        }
        return res;
    }
};
```

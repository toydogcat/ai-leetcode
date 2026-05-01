---
title: "LeetCode #273: Integer to English Words (整數轉換英文單字)"
categories:
  - Math
  - String
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
將一個非負整數 `num` 轉換為其對應的英文單詞表示。

**範例 1:**
```
輸入: num = 123
輸出: "One Hundred Twenty Three"
```

**範例 2:**
```
輸入: num = 12345
輸出: "Twelve Thousand Three Hundred Forty Five"
```

**範例 3:**
```
輸入: num = 1234567
輸出: "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"
```

## 解題心得：分塊處理與字串拼接
這是一道典型的字串處理題，主要考驗對細節的處理與對重複模式的歸納能力。
英文的計數單位是每 3 位數一個區隔，分別是：**Thousand**、**Million**、**Billion**。因此我們可以將問題分解。

**核心邏輯**：
1. **基底數組對應**：將小於 20 的單詞、十位數的單詞（20, 30, ..., 90）分別放入數組或列表中。
2. **三位數遞迴處理**：編寫一個 `helper` 函數，負責將任意一個 1 到 999 之間的數字轉換為對應英文單詞。
   - 例如：`321` 會被處理為 `Three Hundred Twenty One`。
3. **區塊分割與合併**：
   - 提取出每 3 位數的數字部分（`num % 1000`）。
   - 對每個區塊調用 `helper` 處理後，加上對應的計數單位（`Billion`, `Million`, `Thousand`）。
   - 最後去除尾端多餘的空格並返回。
4. **特例處理**：`num = 0` 時，直接返回 `"Zero"`。

- **時間複雜度**: $O(1)$。因為 `num` 最大為 $2^{31} - 1$，遞迴呼叫次數為常數級別。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
class Solution:
    def __init__(self):
        self.less_than_20 = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"]
        self.tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]
        self.thousands = ["", "Thousand", "Million", "Billion"]

    def numberToWords(self, num: int) -> str:
        if num == 0:
            return "Zero"
            
        res = ""
        i = 0
        
        while num > 0:
            if num % 1000 != 0:
                res = self.helper(num % 1000) + self.thousands[i] + " " + res
            num //= 1000
            i += 1
            
        return res.strip()

    def helper(self, num: int) -> str:
        if num == 0:
            return ""
        elif num < 20:
            return self.less_than_20[num] + " "
        elif num < 100:
            return self.tens[num // 10] + " " + self.helper(num % 10)
        else:
            return self.less_than_20[num // 100] + " Hundred " + self.helper(num % 100)
```

### C++
```cpp
#include <string>
#include <vector>

class Solution {
private:
    const std::vector<std::string> lessThan20 = {
        "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
        "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
    };

    const std::vector<std::string> tens = {
        "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
    };

    const std::vector<std::string> thousands = {
        "", "Thousand", "Million", "Billion"
    };

    std::string helper(int num) {
        if (num == 0) return "";
        else if (num < 20) return lessThan20[num] + " ";
        else if (num < 100) return tens[num / 10] + " " + helper(num % 10);
        else return lessThan20[num / 100] + " Hundred " + helper(num % 100);
    }

public:
    std::string numberToWords(int num) {
        if (num == 0) return "Zero";

        std::string res = "";
        int i = 0;

        while (num > 0) {
            if (num % 1000 != 0) {
                res = helper(num % 1000) + thousands[i] + (thousands[i].empty() ? "" : " ") + res;
            }
            num /= 1000;
            i++;
        }

        // 去除結尾空格
        while (!res.empty() && res.back() == ' ') {
            res.pop_back();
        }

        return res;
    }
};
```

---
title: "LeetCode #43: Multiply Strings"
categories:
  - Math
  - String
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定兩個以字符串形式表示的非負整數 `num1` 和 `num2` ，返回 `num1` 和 `num2` 的乘積，它們的乘積也表示為字符串形式。

## 解題心得：模擬直式乘法
這題不能直接把字符串轉成整數（因為可能會超過 64 位整數的範圍），所以我們必須模擬我們小學學過的「直式乘法」。

**核心邏輯：**
1. **準備空間**：兩個長度分別為 $M$ 和 $N$ 的數字相乘，結果最多是 **$M+N$** 位。我們先開一個這麼大的陣列。
2. **逐位相乘**：
   - 拿 `num1[i]` 去乘 `num2[j]`。
   - 乘出來的結果，它的「十位數」會影響到結果陣列的 `i+j` 位置，「個位數」會影響到 `i+j+1` 位置。
3. **處理進位**：我們一邊加，一邊把超過 10 的部分往前面送。
4. **修剪與轉化**：最後把陣列前面的「0」去掉，再轉回字符串。

這就像是在紙上打草稿，我們先把每一位乘出來的結果填進格子裡，最後再統一算進位。

### Python
```python
class Solution:
    def multiply(self, num1: str, num2: str) -> str:
        if num1 == "0" or num2 == "0": return "0"
        res = [0] * (len(num1) + len(num2))
        for i in range(len(num1) - 1, -1, -1):
            for j in range(len(num2) - 1, -1, -1):
                mul = int(num1[i]) * int(num2[j])
                p1, p2 = i + j, i + j + 1
                total = mul + res[p2]
                res[p2] = total % 10
                res[p1] += total // 10
        
        ans = "".join(map(str, res))
        return ans.lstrip("0")
```

### C++
```cpp
#include <string>
#include <vector>

class Solution {
public:
    std::string multiply(std::string num1, std::string num2) {
        if (num1 == "0" || num2 == "0") return "0";
        std::vector<int> res(num1.size() + num2.size(), 0);
        for (int i = num1.size() - 1; i >= 0; i--) {
            for (int j = num2.size() - 1; j >= 0; j--) {
                int mul = (num1[i] - '0') * (num2[j] - '0');
                int p1 = i + j, p2 = i + j + 1;
                int sum = mul + res[p2];
                res[p2] = sum % 10;
                res[p1] += sum / 10;
            }
        }
        std::string s = "";
        for (int x : res) if (!(s.empty() && x == 0)) s += std::to_string(x);
        return s;
    }
};
```

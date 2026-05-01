---
title: "LeetCode #271: Encode and Decode Strings (字串編碼與解碼)"
categories:
  - String
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
請設計一個演算法，將一個字串列表編碼成一個單一字串。隨後，這個編碼後的字串可以經由網路傳送，並由另一個進程解碼回原本的字串列表。

**範例 1:**
```
輸入: ["lint","code","love","you"]
輸出: ["lint","code","love","you"]
解釋: 
編碼後可能為 "4:lint4:code4:love3:you"，經解碼後恢復原列表。
```

## 解題心得：長度 + 分隔符
要在單一字串中區分多個原本的字串，我們必須能正確識別每個字串的邊界，即使字串本身包含了任何特殊符號。

**核心邏輯**：
- **Encode（編碼）**：對於列表中每個字串 `s`，我們計算其長度 `len(s)`，並將長度、一個特殊分隔符（如 `:`）與字串本身拼接起來。例如字串為 `"co:de"`，編碼後為 `"5:co:de"`。
- **Decode（解碼）**：我們從頭掃描編碼後的字串：
  1. 先找到分隔符 `:` 的位置，從而提取出字串的長度 $L$。
  2. 接著從分隔符 `:` 後面開始，截取長度為 $L$ 的子字串，即為原字串。
  3. 重複上述步驟直到遍歷完整個字串。

- **時間複雜度**: $O(N)$，其中 $N$ 是所有字元的總長度。
- **空間複雜度**: $O(N)$。

## 程式碼實作

### Python
```python
class Codec:
    def encode(self, strs: List[str]) -> str:
        """Encodes a list of strings to a single string."""
        res = []
        for s in strs:
            # 格式：字串長度 + ":" + 字串本身
            res.append(f"{len(s)}:{s}")
        return "".join(res)

    def decode(self, s: str) -> List[str]:
        """Decodes a single string to a list of strings."""
        res = []
        i = 0
        while i < len(s):
            # 尋找分隔符 ':'
            j = s.find(":", i)
            length = int(s[i:j])
            # 截取字串本身
            res.append(s[j + 1 : j + 1 + length])
            i = j + 1 + length
        return res
```

### C++
```cpp
#include <string>
#include <vector>

class Codec {
public:
    // Encodes a list of strings to a single string.
    std::string encode(std::vector<std::string>& strs) {
        std::string encoded = "";
        for (const std::string& s : strs) {
            encoded += std::to_string(s.length()) + ":" + s;
        }
        return encoded;
    }

    // Decodes a single string to a list of strings.
    std::vector<std::string> decode(std::string s) {
        std::vector<std::string> decoded;
        size_t i = 0;
        while (i < s.length()) {
            size_t colon = s.find(':', i);
            int len = std::stoi(s.substr(i, colon - i));
            decoded.push_back(s.substr(colon + 1, len));
            i = colon + 1 + len;
        }
        return decoded;
    }
};
```

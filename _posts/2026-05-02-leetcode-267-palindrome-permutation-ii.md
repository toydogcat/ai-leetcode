---
title: "LeetCode #267: Palindrome Permutation II (迴文排列 II)"
categories:
  - Backtracking
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個字串 `s`，返回其所有可能組合成的 **迴文排列**（不重複）。如果沒有任何可行的迴文排列，則返回一個空列表。

**範例 1:**
```
輸入: s = "aabb"
輸出: ["abba", "baab"]
```

**範例 2:**
```
輸入: s = "abc"
輸出: []
```

## 解題心得：回溯搜尋與字串重組
這題是 [Palindrome Permutation I](./2026-05-02-leetcode-266-palindrome-permutation.md) 的進階題目。我們不只要判斷是否可行，還需要找出所有的迴文排列。

**核心邏輯**：
1. **可行性檢查**：利用與題 266 相同的技巧，先檢查是否有超過 1 個字元的出現次數為奇數。
2. **生成半邊字串**：
   - 收集所有字元出現次數的一半，組合成一個用來生成前半段迴文的字串 `half`。
   - 紀錄出現次數為奇數的那個字元 `mid`（如果有）。
3. **回溯生成全排列**：
   - 對這半段字串 `half` 進行回溯（Backtracking）排列生成。
   - 為避免重複，在枚舉字元時可以將其排序，並跳過相鄰相同的字元。
4. **構造完整迴文**：將排列出來的前半段 `p` 拼接 `mid` 以及前半段的翻轉 `p[::-1]`。

- **時間複雜度**: $O((N/2)!)$，取決於前半段字串的全排列數量。
- **空間複雜度**: $O(N)$。

## 程式碼實作

### Python
```python
from collections import Counter

class Solution:
    def generatePalindromes(self, s: str) -> List[str]:
        # 1. 統計字頻並判斷可行性
        counts = Counter(s)
        odd_chars = [char for char, count in counts.items() if count % 2 == 1]
        
        if len(odd_chars) > 1:
            return []
            
        # 2. 準備中間字元與半邊字串
        mid = odd_chars[0] if odd_chars else ""
        half_chars = []
        for char, count in counts.items():
            half_chars.extend([char] * (count // 2))
            
        half_chars.sort()
        
        # 3. 回溯生成前半段的所有不重複排列
        res = []
        used = [False] * len(half_chars)
        
        def backtrack(path):
            if len(path) == len(half_chars):
                first_half = "".join(path)
                res.append(first_half + mid + first_half[::-1])
                return
                
            for i in range(len(half_chars)):
                if used[i]:
                    continue
                # 去重剪枝
                if i > 0 and half_chars[i] == half_chars[i - 1] and not used[i - 1]:
                    continue
                    
                used[i] = True
                path.append(half_chars[i])
                backtrack(path)
                path.pop()
                used[i] = False
                
        backtrack([])
        return res
```

### C++
```cpp
#include <vector>
#include <string>
#include <unordered_map>
#include <algorithm>

class Solution {
private:
    std::vector<std::string> res;
    std::string mid;
    std::string halfChars;
    std::vector<bool> used;

    void backtrack(std::string& path) {
        if (path.length() == halfChars.length()) {
            std::string rev = path;
            std::reverse(rev.begin(), rev.end());
            res.push_back(path + mid + rev);
            return;
        }

        for (size_t i = 0; i < halfChars.length(); ++i) {
            if (used[i]) continue;
            // 去重
            if (i > 0 && halfChars[i] == halfChars[i - 1] && !used[i - 1]) continue;

            used[i] = true;
            path.push_back(halfChars[i]);
            backtrack(path);
            path.pop_back();
            used[i] = false;
        }
    }

public:
    std::vector<std::string> generatePalindromes(std::string s) {
        res.clear();
        std::unordered_map<char, int> counts;
        for (char c : s) counts[c]++;

        int oddCount = 0;
        char oddChar = 0;
        for (const auto& pair : counts) {
            if (pair.second % 2 != 0) {
                oddCount++;
                oddChar = pair.first;
            }
        }

        if (oddCount > 1) return {};

        mid = oddCount == 1 ? std::string(1, oddChar) : "";
        halfChars = "";
        for (const auto& pair : counts) {
            halfChars += std::string(pair.second / 2, pair.first);
        }

        std::sort(halfChars.begin(), halfChars.end());
        used.assign(halfChars.length(), false);

        std::string path = "";
        backtrack(path);

        return res;
    }
};
```

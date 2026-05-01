---
title: "LeetCode #291: Word Pattern II (單詞規律 II)"
categories:
  - Hash Table
  - Backtracking
  - String
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給定一個規律 `pattern` 和一個字串 `s`，判斷 `s` 是否遵循相同的規律。

與 [Word Pattern I](./2026-05-02-leetcode-290-word-pattern.md) 不同的是，此題字串 `s` 中沒有空格作為分隔符。你需要自己判斷 `s` 中的子字串與 `pattern` 中的字母是否能建立雙向的一對一映射關係。

**範例 1:**
```
輸入: pattern = "abab", s = "redblueredblue"
輸出: true
解釋: 一個有效映射是 'a' -> "red", 'b' -> "blue"。
```

**範例 2:**
```
輸入: pattern = "aaaa", s = "asdasdasdasd"
輸出: true
解釋: 一個有效映射是 'a' -> "asd"。
```

**範例 3:**
```
輸入: pattern = "aabb", s = "xyzabcxzyabc"
輸出: false
```

## 解題心得：回溯搜尋與字串切分
這題由於沒有明確的空格分隔，我們必須使用 **回溯法（Backtracking）** 嘗試將字串 `s` 切分成不同的子字串，並同時維護字母與子字串之間的一對一雙向映射關係。

**核心邏輯**：
1. **狀態維護**：
   - 使用字典 `p2w`：儲存 `pattern` 中的單個字母到 `s` 的子字串的映射。
   - 使用集合 `seen_words`：記錄已經被某個字母映射過的子字串，用來防止多個字母映射到同一個子字串（保持一對一）。
2. **遞迴與分支嘗試**：
   - 如果當前字母已經在 `p2w` 中有映射關係：
     - 我們只需檢查字串 `s` 的當前前綴是否與該映射相符。如果相符，直接遞迴處理剩下的部分；如果不相符，這條路徑無效，直接剪枝。
   - 如果當前字母尚未被映射：
     - 我們枚舉 `s` 從當前位置開始的所有可能的前綴。
     - 如果枚舉出來的子字串已經被其他字母映射過了（存在於 `seen_words` 中），則跳過。
     - 否則，建立新的映射關係，將子字串存入 `seen_words` 與 `p2w`，繼續遞迴處理。
     - 遞迴結束後，回溯清除映射關係。

- **時間複雜度**: $O(N \cdot C_{M-1}^{N-1})$，最壞情況遍歷所有的字串切分可能。
- **空間複雜度**: $O(M + N)$，其中 $M, N$ 為規律與字串的長度。

## 程式碼實作

### Python
```python
class Solution:
    def wordPatternMatch(self, pattern: str, s: str) -> bool:
        p2w = {}
        seen_words = set()
        
        def backtrack(p_idx, s_idx):
            # 基底條件：規律與字串同時走完，代表匹配成功
            if p_idx == len(pattern) and s_idx == len(s):
                return True
            if p_idx == len(pattern) or s_idx == len(s):
                return False
                
            char = pattern[p_idx]
            
            # 1. 該字母已經有映射關係
            if char in p2w:
                word = p2w[char]
                # 檢查 s 的當前前綴是否匹配該單詞
                if s.startswith(word, s_idx):
                    return backtrack(p_idx + 1, s_idx + len(word))
                return False
                
            # 2. 該字母尚未建立映射關係，枚舉所有可能的前綴
            for k in range(s_idx + 1, len(s) + 1):
                word = s[s_idx:k]
                
                # 防止多對一映射
                if word in seen_words:
                    continue
                    
                # 建立映射
                p2w[char] = word
                seen_words.add(word)
                
                if backtrack(p_idx + 1, k):
                    return True
                    
                # 回溯
                del p2w[char]
                seen_words.remove(word)
                
            return False
            
        return backtrack(0, 0)
```

### C++
```cpp
#include <string>
#include <unordered_map>
#include <unordered_set>

class Solution {
private:
    std::unordered_map<char, std::string> p2w;
    std::unordered_set<std::string> seenWords;
    std::string p;
    std::string s;

    bool backtrack(size_t pIdx, size_t sIdx) {
        if (pIdx == p.length() && sIdx == s.length()) return true;
        if (pIdx == p.length() || sIdx == s.length()) return false;

        char c = p[pIdx];

        if (p2w.count(c)) {
            std::string word = p2w[c];
            if (s.compare(sIdx, word.length(), word) == 0) {
                return backtrack(pIdx + 1, sIdx + word.length());
            }
            return false;
        }

        for (size_t k = sIdx + 1; k <= s.length(); ++k) {
            std::string word = s.substr(sIdx, k - sIdx);

            if (seenWords.count(word)) continue;

            p2w[c] = word;
            seenWords.insert(word);

            if (backtrack(pIdx + 1, k)) return true;

            p2w.erase(c);
            seenWords.erase(word);
        }

        return false;
    }

public:
    bool wordPatternMatch(std::string pattern, std::string s) {
        p2w.clear();
        seenWords.clear();
        this->p = pattern;
        this->s = s;
        return backtrack(0, 0);
    }
};
```

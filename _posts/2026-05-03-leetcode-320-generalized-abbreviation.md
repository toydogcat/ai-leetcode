---
title: "LeetCode #320: Generalized Abbreviation (通用簡寫)"
categories:
  - Backtracking
  - String
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個單詞 `word`，返回其所有可能的「通用簡寫」形式（例如 `'word'` 的一個簡寫是 `'w1r1'`）。

## 解題心得
這是一個典型的 **回溯與子集生成問題**。對於單詞中的每一個字元，我們在簡寫時都有兩種選擇：
1. **不簡寫該字元**：保留字元。此時如果前面有已經累積的縮寫計數 `count`，我們必須先將 `count` 寫入結果，接著將當前字元加上去，並將新計數重置為 0。
2. **縮寫該字元**：此時不加入該字元，而是將 `count + 1`，繼續處理下一個字元。
- 當處理完所有字元後，如果 `count > 0`，將剩餘的 `count` 拼接在結尾，並加入答案中。

- **時間複雜度**: O(2^N)
- **空間複雜度**: O(N) 主要是遞迴堆疊的深度

## 程式碼實作

### Python
```python
class Solution:
    def generateAbbreviations(self, word: str) -> List[str]:
        ans = []
        n = len(word)
        
        def backtrack(idx, path, count):
            if idx == n:
                ans.append(path + (str(count) if count > 0 else ""))
                return
                
            # 選擇 1: 縮寫當前字元
            backtrack(idx + 1, path, count + 1)
            
            # 選擇 2: 不縮寫當前字元
            backtrack(idx + 1, path + (str(count) if count > 0 else "") + word[idx], 0)

        backtrack(0, "", 0)
        return ans
```

### C++
```cpp
#include <vector>
#include <string>

class Solution {
private:
    std::vector<std::string> ans;
    int n;

    void backtrack(const std::string& word, int idx, std::string path, int count) {
        if (idx == n) {
            ans.push_back(path + (count > 0 ? std::to_string(count) : ""));
            return;
        }

        // 選擇 1: 縮寫當前字元
        backtrack(word, idx + 1, path, count + 1);

        // 選擇 2: 保留當前字元
        backtrack(word, idx + 1, path + (count > 0 ? std::to_string(count) : "") + word[idx], 0);
    }

public:
    std::vector<std::string> generateAbbreviations(std::string word) {
        n = word.length();
        backtrack(word, 0, "", 0);
        return ans;
    }
};
```

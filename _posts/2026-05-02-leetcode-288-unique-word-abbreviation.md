---
title: "LeetCode #288: Unique Word Abbreviation (獨特的單詞縮寫)"
categories:
  - Hash Table
  - Design
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
一個單詞的 **縮寫** 是由它的第一個字母、中間字母的個數、以及最後一個字母組成的。如果單詞的長度為 2 或更少，則不需要縮寫。

例如：
- `"internationalization"` -> `"i18n"`
- `"localization"` -> `"l10n"`
- `"it"` -> `"it"`

現在請你實現一個 `ValidWordAbbr` 類：
- `ValidWordAbbr(String[] dictionary)` 用字串數組 `dictionary` 初始化對象。
- `boolean isUnique(string word)` 判斷單詞 `word` 的縮寫在字典中是否是 **唯一** 的。

一個單詞 `word` 的縮寫在字典中是唯一的，若且唯若滿足以下兩者之一：
1. 字典中 **沒有任何一個單詞** 的縮寫與 `word` 的縮寫相同。
2. 字典中 **所有與 `word` 縮寫相同的單詞**，都與 `word` 本身完全一樣。

**範例 1:**
```
ValidWordAbbr validWordAbbr = new ValidWordAbbr(["deer", "door", "cake", "card"]);
validWordAbbr.isUnique("dear"); // 返回 false (dear -> d2r, deer -> d2r, 兩單詞不同但縮寫相同)
validWordAbbr.isUnique("cart"); // 返回 true (cart -> c2t, 字典中沒有縮寫為 c2t 的單詞)
validWordAbbr.isUnique("cane"); // 返回 false
validWordAbbr.isUnique("make"); // 返回 true
validWordAbbr.isUnique("cake"); // 返回 true (字典中有 cake，但所有縮寫為 c2k 的單詞只有 cake 本身)
```

## 解題心得：雜湊映射儲存縮寫
這是一道設計類型的題目，核心在於如何判斷「唯一」的條件。
我們可以使用 Hash Map 儲存每個縮寫在字典中對應的單詞。

**核心邏輯**：
1. **縮寫生成函數**：編寫一個 `getAbbr(word)` 函數。當長度 $\le 2$ 時返回原字串，否則返回 `word[0] + str(len-2) + word[-1]`。
2. **字典預處理**：遍歷字典中的每個單詞：
   - 如果縮寫還沒在 Hash Map 中出現：將其儲存 `map[abbr] = word`。
   - **特殊去重與衝突標記**：如果該縮寫已經在 Map 中出現：
     - 如果原本存的單詞與當前單詞 **不同**：說明該縮寫對應了多個不同的單詞。為了方便後續判斷，我們將其對應的值改為一個不可能出現的特殊標記（例如空字串 `""`），表示該縮寫已經失效、不唯一。
3. **判斷是否唯一 (`isUnique`)**：
   - 計算查詢字串的縮寫 `abbr`。
   - 如果 `abbr` 不在 Map 中，說明字典沒有這個縮寫，返回 `true`。
   - 如果 `abbr` 在 Map 中：當且僅當該縮寫對應的單詞就是 `word` 本身時，返回 `true`；否則返回 `false`。

- **時間複雜度**: 初始化 $O(N)$，`isUnique()` $O(1)$，其中 $N$ 是字典中字串的總長度。
- **空間複雜度**: $O(N)$，Map 中儲存的縮寫與單詞。

## 程式碼實作

### Python
```python
class ValidWordAbbr:
    def __init__(self, dictionary: List[str]):
        self.abbr_dict = {}
        # 去重，避免字典中存有完全一樣的單詞影響判斷
        for word in set(dictionary):
            abbr = self._getAbbr(word)
            if abbr not in self.abbr_dict:
                self.abbr_dict[abbr] = word
            else:
                # 若已有不同單詞擁有相同的縮寫，標記為失效 ""
                self.abbr_dict[abbr] = ""

    def _getAbbr(self, word: str) -> str:
        if len(word) <= 2:
            return word
        return f"{word[0]}{len(word) - 2}{word[-1]}"

    def isUnique(self, word: str) -> bool:
        abbr = self._getAbbr(word)
        if abbr not in self.abbr_dict:
            return True
        return self.abbr_dict[abbr] == word
```

### C++
```cpp
#include <string>
#include <vector>
#include <unordered_map>
#include <unordered_set>

class ValidWordAbbr {
private:
    std::unordered_map<std::string, std::string> abbrMap;

    std::string getAbbr(const std::string& word) {
        if (word.length() <= 2) return word;
        return word.front() + std::to_string(word.length() - 2) + word.back();
    }

public:
    ValidWordAbbr(std::vector<std::string>& dictionary) {
        std::unordered_set<std::string> uniqueDict(dictionary.begin(), dictionary.end());

        for (const std::string& word : uniqueDict) {
            std::string abbr = getAbbr(word);
            if (abbrMap.find(abbr) == abbrMap.end()) {
                abbrMap[abbr] = word;
            } else {
                abbrMap[abbr] = ""; // 標記為失效
            }
        }
    }

    bool isUnique(std::string word) {
        std::string abbr = getAbbr(word);
        if (abbrMap.find(abbr) == abbrMap.end()) {
            return true;
        }
        return abbrMap[abbr] == word;
    }
};
```

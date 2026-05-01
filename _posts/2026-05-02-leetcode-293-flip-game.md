---
title: "LeetCode #293: Flip Game (翻轉遊戲)"
categories:
  - String
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
你正在和朋友玩一個翻轉遊戲。給定一個只包含 `+` 和 `-` 的字串 `currentState`。

在你的回合中，你可以選擇字串中任意 **兩個相鄰的 `"++"`**，並將它們翻轉為 `"--"`。

請寫一個函數，返回在進行了 **一步有效移動** 之後，所有可能的新狀態字串列表。如果沒有任何可行的一步移動，則返回一個空列表。

**範例 1:**
```
輸入: currentState = "++++"
輸出: ["--++", "+--+", "++--"]
```

**範例 2:**
```
輸入: currentState = "+"
輸出: []
```

## 解題心得：單次掃描字串
這題是翻轉遊戲的第一題，主要考察基本的字串處理。

**核心邏輯**：
1. **單次掃描**：我們遍歷字串中的每個字元，直至倒數第二個位置（索引 $0$ 到 $n - 2$）。
2. **判斷相鄰的 `+`**：
   - 檢查當前字元與下一個字元是否都為 `'+'`：即 `s[i] == '+' and s[i+1] == '+'`。
3. **字串切分與替換**：
   - 如果滿足條件，我們將前段、替換後的 `"--"`、以及後段拼接起來：
     `currentState[:i] + "--" + currentState[i+2:]`。
   - 將其加入結果列表中。

- **時間複雜度**: $O(N^2)$。遍歷字串需 $O(N)$，每次構建新字串需要 $O(N)$。
- **空間複雜度**: $O(N)$，用於儲存生成的結果列表。

## 程式碼實作

### Python
```python
class Solution:
    def generatePossibleNextMoves(self, currentState: str) -> List[str]:
        res = []
        for i in range(len(currentState) - 1):
            # 找到相鄰的 "++"
            if currentState[i] == "+" and currentState[i + 1] == "+":
                # 翻轉為 "--"
                res.append(currentState[:i] + "--" + currentState[i + 2:])
                
        return res
```

### C++
```cpp
#include <string>
#include <vector>

class Solution {
public:
    std::vector<std::string> generatePossibleNextMoves(std::string currentState) {
        std::vector<std::string> res;
        if (currentState.length() < 2) return res;

        for (size_t i = 0; i < currentState.length() - 1; ++i) {
            if (currentState[i] == '+' && currentState[i + 1] == '+') {
                std::string nextState = currentState;
                nextState[i] = '-';
                nextState[i + 1] = '-';
                res.push_back(nextState);
            }
        }

        return res;
    }
};
```

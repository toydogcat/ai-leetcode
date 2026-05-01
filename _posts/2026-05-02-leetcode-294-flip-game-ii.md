---
title: "LeetCode #294: Flip Game II (翻轉遊戲 II)"
categories:
  - Backtracking
  - Memoization
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
你正在和朋友玩一個翻轉遊戲。給定一個只包含 `+` 和 `-` 的字串 `currentState`。

在你的回合中，你可以選擇字串中任意 **兩個相鄰的 `"++"`**，並將它們翻轉為 `"--"`。

請寫一個函數，判斷在兩人都做出最佳決策的情況下，**先手** 是否能夠保證贏得比賽。

**範例 1:**
```
輸入: currentState = "++++"
輸出: true
解釋: 
先手可以將第二、三個 "+" 翻轉成 "--"，字串變為 "+--+"。
對手此時無法進行任何有效移動（沒有任何相鄰的 "++"），因此先手獲勝。
```

**範例 2:**
```
輸入: currentState = "+"
輸出: false
```

## 解題心得：回溯與記憶化搜尋 (Backtracking & Memoization)
這是一道博弈題目。先手要獲勝，**只要存在一種移動方式，使得對手在該移動方式後無法獲勝** 即可。

**核心邏輯**：
1. **遍歷所有可能的移動**：對於字串中任意相鄰的 `"++"`，先手嘗試翻轉它，得到一個新狀態 `nextState`。
2. **對手狀態測試**：調用遞迴判斷對手在 `nextState` 下能否獲勝：
   - 如果對手無論如何都不能在 `nextState` 贏得比賽（即遞迴返回 `false`），這意味著 **先手必勝**，直接返回 `true`。
3. **記憶化剪枝**：為了避免重複計算，我們可以使用一個雜湊表（Memo）記錄已經計算過勝負結果的狀態。

- **時間複雜度**: $O(2^N)$，但經過記憶化優化後實際運算量遠小於此。
- **空間複雜度**: $O(2^N)$。

## 程式碼實作

### Python
```python
class Solution:
    def __init__(self):
        self.memo = {}

    def canWin(self, currentState: str) -> bool:
        # 如果已經計算過該狀態，直接返回
        if currentState in self.memo:
            return self.memo[currentState]
            
        for i in range(len(currentState) - 1):
            if currentState[i] == "+" and currentState[i + 1] == "+":
                # 構造下一步狀態
                next_state = currentState[:i] + "--" + currentState[i + 2:]
                
                # 如果對手在此狀態下不能獲勝，先手獲勝
                if not self.canWin(next_state):
                    self.memo[currentState] = True
                    return True
                    
        self.memo[currentState] = False
        return False
```

### C++
```cpp
#include <string>
#include <unordered_map>

class Solution {
private:
    std::unordered_map<std::string, bool> memo;

public:
    bool canWin(std::string currentState) {
        if (memo.count(currentState)) {
            return memo[currentState];
        }

        for (size_t i = 0; i < currentState.length() - 1; ++i) {
            if (currentState[i] == '+' && currentState[i + 1] == '+') {
                std::string nextState = currentState;
                nextState[i] = '-';
                nextState[i + 1] = '-';

                // 如果對手在 nextState 走法後不能贏，先手必勝
                if (!canWin(nextState)) {
                    return memo[currentState] = true;
                }
            }
        }

        return memo[currentState] = false;
    }
};
```

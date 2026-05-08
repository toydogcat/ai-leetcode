---
title: "LeetCode #316: Remove Duplicate Letters (去除重複字母)"
categories:
  - String
  - Stack
  - Greedy
  - Monotonic Stack
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個字串 `s`，請你去除字串中重複的字母，使得每個字母只出現一次。需保證返回結果的字典序最小，且不能打亂字串中字母的相對順序。

## 解題心得
我們可以使用 **單調堆疊 (Monotonic Stack) 與 貪心演算法**：
1. 使用一個雜湊表/陣列記錄每個字元在字串中出現的最後位置（最後一擊）。
2. 使用一個 Set 記錄當前哪些字元已經存在於堆疊中。
3. 遍歷字串：
   - 如果字元已在堆疊中，跳過。
   - 如果當前字元比堆疊頂端的字元小，且堆疊頂端字元在後續還會出現（根據最後位置判斷），我們就將堆疊頂端彈出，並從 Set 中移除。
   - 將當前字元壓入堆疊並加入 Set。
4. 堆疊中的字元即為字典序最小的去重結果。

- **時間複雜度**: O(N)
- **空間複雜度**: O(1) 僅限 26 個英文字母

## 程式碼實作

### Python
```python
class Solution:
    def removeDuplicateLetters(self, s: str) -> str:
        last_occur = {char: i for i, char in enumerate(s)}
        stack = []
        visited = set()
        
        for i, char in enumerate(s):
            if char in visited:
                continue
            while stack and char < stack[-1] and i < last_occur[stack[-1]]:
                visited.remove(stack.pop())
            stack.append(char)
            visited.add(char)
            
        return "".join(stack)
```

### C++
```cpp
#include <string>
#include <vector>
#include <unordered_map>

class Solution {
public:
    std::string removeDuplicateLetters(std::string s) {
        std::vector<int> lastOccur(26, 0);
        for (int i = 0; i < s.length(); ++i) {
            lastOccur[s[i] - 'a'] = i;
        }

        std::string stack = "";
        std::vector<bool> visited(26, false);

        for (int i = 0; i < s.length(); ++i) {
            char c = s[i];
            if (visited[c - 'a']) continue;

            while (!stack.empty() && c < stack.back() && i < lastOccur[stack.back() - 'a']) {
                visited[stack.back() - 'a'] = false;
                stack.pop_back();
            }
            stack.push_back(c);
            visited[c - 'a'] = true;
        }
        return stack;
    }
};
```

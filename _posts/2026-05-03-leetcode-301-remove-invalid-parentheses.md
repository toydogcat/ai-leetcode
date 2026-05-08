---
title: "LeetCode #301: Remove Invalid Parentheses (移除非法括號)"
categories:
  - Depth-First Search
  - Breadth-First Search
  - Backtracking
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給你一個由括號和字母組成的字串 `s`，移除最小數量的無效括號，使得輸入字串有效。返回所有可能的結果。答案可以按任意順序返回。

## 解題心得
本題的目標是移除最少數量的括號。我們可以使用 **BFS (廣度優先搜尋)**。BFS 非常適合用於尋找最短路徑或最小修改次數。我們將字串放入佇列中，每次取出一個字串，檢查它是否有效：
1. 如果有效，則當前層級的所有有效字串即為最終答案（因為我們按層級尋找，第一層級出現有效字串時即為最小修改次數）。
2. 如果無效，我們在下一層級中嘗試移除字串中的每一個括號，並放入佇列（利用 Set 去重）。

- **時間複雜度**: O(2^N)
- **空間複雜度**: O(2^N)

## 程式碼實作

### Python
```python
class Solution:
    def removeInvalidParentheses(self, s: str) -> List[str]:
        def isValid(string):
            count = 0
            for char in string:
                if char == '(':
                    count += 1
                elif char == ')':
                    count -= 1
                    if count < 0:
                        return False
            return count == 0

        level = {s}
        while True:
            valid = list(filter(isValid, level))
            if valid:
                return valid
            next_level = set()
            for string in level:
                for i in range(len(string)):
                    if string[i] in '()':
                        next_level.add(string[:i] + string[i+1:])
            if not next_level:
                return [""]
            level = next_level
```

### C++
```cpp
#include <vector>
#include <string>
#include <unordered_set>
#include <queue>

class Solution {
private:
    bool isValid(const std::string& s) {
        int count = 0;
        for (char c : s) {
            if (c == '(') count++;
            else if (c == ')') {
                count--;
                if (count < 0) return false;
            }
        }
        return count == 0;
    }

public:
    std::vector<std::string> removeInvalidParentheses(std::string s) {
        std::vector<std::string> ans;
        std::unordered_set<std::string> visited;
        std::queue<std::string> q;
        
        q.push(s);
        visited.insert(s);
        bool found = false;
        
        while (!q.empty()) {
            int size = q.size();
            std::unordered_set<std::string> next_visited;
            for (int i = 0; i < size; ++i) {
                std::string curr = q.front();
                q.pop();
                
                if (isValid(curr)) {
                    ans.push_back(curr);
                    found = true;
                }
                
                if (found) continue;
                
                for (int j = 0; j < curr.length(); ++j) {
                    if (curr[j] != '(' && curr[j] != ')') continue;
                    std::string next_str = curr.substr(0, j) + curr.substr(j + 1);
                    if (visited.find(next_str) == visited.end()) {
                        visited.insert(next_str);
                        q.push(next_str);
                    }
                }
            }
            if (found) break;
        }
        return ans;
    }
};
```

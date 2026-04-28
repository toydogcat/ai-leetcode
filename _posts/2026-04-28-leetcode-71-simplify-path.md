---
title: "LeetCode #71: Simplify Path"
categories:
  - Stack
  - String
tags:
  - Medium
  - Python
  - C++
---

## 解題思路：棧 (Stack)
我們將路徑按 `/` 分割，遍歷分割後的每一部分：
1. `..`：如果棧不為空，彈出棧頂。
2. `.` 或 空字串：跳過。
3. 其他：入棧。

### Python
```python
class Solution:
    def simplifyPath(self, path: str) -> str:
        stack = []
        for part in path.split("/"):
            if part == "..":
                if stack: stack.pop()
            elif part and part != ".":
                stack.append(part)
        return "/" + "/".join(stack)
```

### C++
```cpp
#include <string>
#include <vector>
#include <sstream>

class Solution {
public:
    std::string simplifyPath(std::string path) {
        std::vector<std::string> stack;
        std::stringstream ss(path);
        std::string part;
        while (getline(ss, part, '/')) {
            if (part == "..") {
                if (!stack.empty()) stack.pop_back();
            } else if (!part.empty() && part != ".") {
                stack.push_back(part);
            }
        }
        std::string res = "";
        for (const std::string& s : stack) res += "/" + s;
        return res.empty() ? "/" : res;
    }
};
```

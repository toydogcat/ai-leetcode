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

## 題目描述
給你一個字符串 `path` ，表示一個 Unix 風格的絕對路徑（以 `/` 開頭），請你將其轉化為更加簡潔的規範路徑。
在 Unix 風格的文件系統中，一個點 `.` 表示當前目錄本身；此外，兩個點 `..` 表示將目錄切換到上一級（父目錄）；任何多個連續的斜槓（如 `//`）都被視為單個斜槓 `/`。

## 解題心得：去蕪存菁
這題其實就是在模擬我們在電腦裡點選資料夾的過程。

**核心邏輯：棧 (Stack)**
1. **拆解路徑**：我們用 `/` 把路徑切開。
2. **三種情況處理**：
   - 如果是 **名字**（如 `home`）：就像進入一個資料夾，我們把它推入「路徑棧」中。
   - 如果是 **`..`**：就像按了「回上一層」，如果棧裡有東西，我們就把最上面的那個資料夾拿掉。
   - 如果是 **`.` 或 空白**：就像原地踏步或多點了幾下斜線，我們直接忽略它。
3. **最後合體**：把棧裡的資料夾用 `/` 連起來，就是最簡潔的路徑了。

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

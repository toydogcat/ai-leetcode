---
title: "LeetCode #388: Longest Absolute File Path (文件的最長絕對路徑)"
categories:
  - String
  - Stack
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個表示文件系統的字串（利用 `\n` 分行，`\t` 表示縮排），找出最長絕對文件路徑的長度。

## 解題心得
使用一個雜湊表（或堆疊）記錄當前深度的路徑長度：
- 依據 `\n` 切割字串，每一部分代表一個文件或資料夾。
- 通過計算開頭 `\t` 的個數確定其「深度」`depth`。
- 保持堆疊的長度與當前深度一致，堆疊頂端即為當前目錄的父路徑長度。
- 若當前是檔案（包含 `.`），計算絕對路徑總長度（加上 `/` 分隔符）並更新最大值。

- **時間複雜度**: O(N)
- **空間複雜度**: O(D) 深度

## 程式碼實作

### Python
```python
class Solution:
    def lengthLongestPath(self, input: str) -> int:
        depth_len = {0: 0}  # depth -> length
        max_len = 0
        
        for line in input.split('\n'):
            name = line.lstrip('\t')
            depth = len(line) - len(name)
            
            if '.' in name:
                max_len = max(max_len, depth_len[depth] + len(name))
            else:
                depth_len[depth + 1] = depth_len[depth] + len(name) + 1  # 1 for '/'
                
        return max_len
```

### C++
```cpp
#include <string>
#include <vector>
#include <sstream>
#include <algorithm>
#include <unordered_map>

class Solution {
public:
    int lengthLongestPath(std::string input) {
        std::unordered_map<int, int> depth_len;
        depth_len[0] = 0;
        int max_len = 0;

        std::stringstream ss(input);
        std::string line;
        while (std::getline(ss, line, '\n')) {
            int depth = 0;
            while (depth < line.length() && line[depth] == '\t') {
                depth++;
            }
            std::string name = line.substr(depth);
            if (name.find('.') != std::string::npos) {
                max_len = std::max(max_len, depth_len[depth] + (int)name.length());
            } else {
                depth_len[depth + 1] = depth_len[depth] + (int)name.length() + 1; // 1 for '/'
            }
        }
        return max_len;
    }
};
```

---
title: "LeetCode #93: Restore IP Addresses"
categories:
  - Backtracking
  - String
tags:
  - Medium
  - Python
  - C++
---

## 解題心得：地毯式搜索
這題要求我們把一串數字切割成合法的 IP 地址（例如 192.168.1.1）。IP 的規則很死：要有 4 段，每段在 0-255 之間，且不能有「0 開頭的兩位數」（例如 01 是不行的）。

**回溯法的思考過程：**
1. **切第一刀**：嘗試切出 1 到 3 個數字作為第一段。
2. **檢查合法性**：如果這一段數字大於 255 或以 0 開頭且長度大於 1，這刀就切錯了，撤回。
3. **遞迴切下一刀**：如果合法，就接著切第二段、第三段。
4. **收網**：當切完 4 段且剛好用完所有數字時，這就是一個成功的 IP。

### Python
```python
class Solution:
    def restoreIpAddresses(self, s: str) -> List[str]:
        res = []
        def backtrack(start, path):
            # 找到 4 段且用完所有字符
            if len(path) == 4:
                if start == len(s): res.append(".".join(path))
                return
            
            for i in range(1, 4):
                if start + i > len(s): break
                segment = s[start:start+i]
                # 檢查：不能大於 255，且不能是 0 領頭的兩位數
                if int(segment) <= 255 and (segment == "0" or not segment.startswith("0")):
                    backtrack(start + i, path + [segment])
        
        backtrack(0, [])
        return res
```

### C++
```cpp
#include <string>
#include <vector>

class Solution {
public:
    std::vector<std::string> restoreIpAddresses(std::string s) {
        std::vector<std::string> res;
        std::vector<std::string> path;
        dfs(s, 0, path, res);
        return res;
    }
    void dfs(std::string& s, int start, std::vector<std::string>& path, std::vector<std::string>& res) {
        if (path.size() == 4) {
            if (start == s.length()) {
                res.push_back(path[0] + "." + path[1] + "." + path[2] + "." + path[3]);
            }
            return;
        }
        for (int len = 1; len <= 3; len++) {
            if (start + len > s.length()) break;
            std::string sub = s.substr(start, len);
            int val = std::stoi(sub);
            if (val > 255 || (sub.length() > 1 && sub[0] == '0')) continue;
            path.push_back(sub);
            dfs(s, start + len, path, res);
            path.pop_back();
        }
    }
};
```

---
title: "LeetCode #28: Find the Index of the First Occurrence in a String"
categories:
  - String
  - Two Pointers
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給你兩個字符串 `haystack` 和 `needle` ，請你在 `haystack` 字符串中找出 `needle` 字符串出現的第一個位置（下標從 0 開始）。如果不存在，則返回 `-1` 。

## 解題心得：地毯式搜索
這就是我們常用的 `indexOf` 功能。

**核心邏輯：**
1. **遍歷母串**：從 `haystack` 的第一個字開始，往後看。
2. **切片對比**：截取一段跟 `needle` 一樣長的子串，看它們是否長得一模一樣。
3. **早退機制**：如果截取剩下的長度已經比 `needle` 短了，就不用再找了，肯定找不到。

這就像是在一堆乾草（Haystack）裡找一根針（Needle）。你一隻手抓起一把草（切片），看看裡面有沒有針，沒有就換下一把。

### Python
```python
class Solution:
    def strStr(self, haystack: str, needle: str) -> int:
        return haystack.find(needle)
```

### C++
```cpp
#include <string>

class Solution {
public:
    int strStr(std::string haystack, std::string needle) {
        return haystack.find(needle);
    }
};
```

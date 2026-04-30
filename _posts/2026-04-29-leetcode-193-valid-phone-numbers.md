---
title: "LeetCode #193: Valid Phone Numbers (有效電話號碼)"
categories:
  - Shell
tags:
  - Easy
  - Bash
  - Regex
---

## 題目描述
給定一個包含電話號碼列表（每行一個電話號碼）的文本文件 `file.txt`，寫一個 bash 腳本輸出所有的有效電話號碼。

有效電話號碼必須符合以下兩種格式之一：
1. `(xxx) xxx-xxxx` (其中 x 是數字)
2. `xxx-xxx-xxxx` (其中 x 是數字)

## 解題心得：正則表達式 Regex
這題主要考察正則表達式的運用。

**核心邏輯：Regex 構建**
- **格式 1**: `^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$`
- **格式 2**: `^[0-9]{3}-[0-9]{3}-[0-9]{4}$`
- **合併**: 使用 `|` (OR) 將兩者合併。

我們可以使用 `grep -P` (Perl-compatible regex) 或 `awk` 或 `sed`。

## 程式碼實作

### Bash (grep 版)
```bash
grep -P '^(\d{3}-|\(\d{3}\) )\d{3}-\d{4}$' file.txt
```

### Bash (awk 版)
```bash
awk '/^([0-9]{3}-|\([0-9]{3}\) )[0-9]{3}-[0-9]{4}$/' file.txt
```
> [!NOTE]
> `^` 表示行首，`$` 表示行尾，確保整個字串都符合格式，而不僅僅是包含該格式。

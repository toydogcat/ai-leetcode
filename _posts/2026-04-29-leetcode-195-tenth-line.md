---
title: "LeetCode #195: Tenth Line (第十行)"
categories:
  - Shell
tags:
  - Easy
  - Bash
---

## 題目描述
給定一個文本文件 `file.txt`，請輸出它的第十行。如果文件少於十行，則什麼也不輸出。

## 解題心得：多種命令行工具
這是一道簡單但經典的題目，有多種解決方案。

**解決方案 1：sed**
`sed` 是串流編輯器，可以直接定位行號。
`-n` 表示不自動輸出，`10p` 表示打印第 10 行。

**解決方案 2：awk**
`NR` 是 awk 內建的變數，代表當前行號。

**解決方案 3：tail + head**
先取前十行，再取前十行中的最後一行。但要注意文件不夠十行時的情況。

## 程式碼實作

### Bash (sed)
```bash
sed -n '10p' file.txt
```

### Bash (awk)
```bash
awk 'NR == 10' file.txt
```

### Bash (tail & head)
```bash
tail -n +10 file.txt | head -n 1
```
> [!TIP]
> `sed` 和 `awk` 是最推薦的做法，因為它們在處理大型文件時更為高效且邏輯直觀。

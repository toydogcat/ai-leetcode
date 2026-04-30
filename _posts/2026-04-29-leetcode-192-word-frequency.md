---
title: "LeetCode #192: Word Frequency (統計詞頻)"
categories:
  - Shell
tags:
  - Medium
  - Bash
---

## 題目描述
寫一個 bash 腳本來統計一個文本文件 `words.txt` 中每個單詞出現的頻率。

為了簡單起見，你可以假設：
- `words.txt` 只包含小寫字母和空格 ' '。
- 每個單詞由小寫字母組成。
- 單詞間由一個或多個空格字元分隔。

## 解題心得：強大的管道命令
這題是 Linux 命令行操作的經典練習。

**核心邏輯：Pipeline**
1. **`cat words.txt`**: 讀取文件。
2. **`tr -s ' ' '\n'`**: 將連續的空格壓縮並替換為換行符，使每個單詞佔一行。
3. **`sort`**: 對單詞進行排序，以便 `uniq` 命令統計。
4. **`uniq -c`**: 統計連續重複行的出現次數（即詞頻）。
5. **`sort -rn`**: 根據頻率（數字）進行逆序排序。
6. **`awk '{print $2, $1}'`**: 格式化輸出，先顯示單詞，再顯示頻率。

## 程式碼實作

### Bash
```bash
cat words.txt | tr -s ' ' '\n' | sort | uniq -c | sort -rn | awk '{print $2, $1}'
```
> [!TIP]
> `tr -s` 非常重要，它能處理多個連續空格，確保不會產生多餘的空行。

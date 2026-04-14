# Day 5：长文本解析与 Token 成本控制

## 1. 核心理论：理解「Token 窗口」与「经济账」（30 分钟）

### 深度理解 Context Window

- 虽然 DeepSeek-V3 支持 `128K Token`，但输出长度（Output Tokens）通常限制在 `4K-8K`。
- 定量认知：在 DeepSeek 中，`1 个汉字 ≈ 1.5 ~ 2 个 Token`。如果你上传 10 万字，由于注意力机制衰减，模型末尾内容的准确率会明显下降。

### 计费公式

`总成本 = (输入 Tokens * 输入单价) + (输出 Tokens * 输出单价)`

**思考点：** 为什么前端要压缩 Prompt？因为每多写一个无用单词，用户每一次点击都在持续增加成本。

---

## 2. 定量化实操任务：Map-Reduce 全流程（90 分钟）

我们将模拟一个前端真实需求：**「解析一个 5000 行的 JSON 日志文件并找出报错原因」**。

### 任务 A：实现「带重叠区」的切片函数（Chunking with Overlap）

- 为什么要 Overlap：防止关键词刚好被切在两个块中间（例如 `Error: N-etwork`）。
- 代码实现（在本地控制台运行）：

```javascript
function chunkTextWithOverlap(text, size = 1000, overlap = 200) {
  const chunks = [];
  for (let i = 0; i < text.length; i += size - overlap) {
    chunks.push(text.slice(i, i + size));
    if (i + size >= text.length) break;
  }
  return chunks;
}

// 定量指标：输入一个 2000 字字符串，验证是否生成 3 个 Chunk（size=1000, overlap=200）。
```

> 请谨慎使用此类代码。

### 任务 B：Map 阶段——分段提取（Postman 模拟）

- Body 参数：设置 `max_tokens: 200`（节省输出成本）。
- Prompt：
  `你是一个日志分析员，请简要总结以下日志片段中的核心错误，如果没有错误请回复“正常”。要求只输出关键信息，不超过 50 字。`
- 执行：分别将 Chunk 1 和 Chunk 2 发送，获取两个简短摘要。

### 任务 C：Reduce 阶段——全局汇总

- Prompt：
  `以下是几段日志的摘要总结：[摘要1]、[摘要2]。请结合这些信息，给出一个最终的排查结论。`
- 定量观察：对比「直接发送全文（若未超限）」和「分段汇总」的总 Token 消耗。

---

## 3. 今日定量化完成指标

- [ ] **成本计算器：** 查看 Postman 响应。记录输入 1000 Token、输出 100 Token 时的 `total_tokens`，并按 DeepSeek V3 官方价格计算该次请求费用。
- [ ] **字符/Token 转换率：** 粘贴一段你常用的 React 代码到 Token 计数器，记录代码场景下 Token 与字符比例（通常代码的 Token 消耗高于中文）。
- [ ] **截断策略验证：** 在 Body 中设置 `max_tokens: 10`，观察模型回复是否被强制截断（如返回 `finish_reason: "length"`），并思考前端如何处理残缺数据。

---

## 4. 前端工程化技巧：如何减少输入消耗？

### 策略 1：清理「噪音」

- 如果是 HTML，去掉所有 `<script>`、`<style>` 和多余空格。
- 如果是 JSON，去掉不必要字段。

### 策略 2：System Prompt 极致精简

- 不好的：`你是一个非常优秀的、专业的、有着 20 年经验的资深简历解析专家，请帮我把这个简历处理一下。`（40+ Tokens）
- 好的：`简历解析专家，提取 JSON。`（10 Tokens）

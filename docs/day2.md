# Day 2：Few-shot 技巧与结构化数据转换

## 目标

掌握 Few-shot（少样本提示）的核心原理，编写稳定 Prompt，利用 DeepSeek 将非结构化自然语言精准转化为前端可解析的标准 JSON。

---

## 1. 核心理论学习（约 30 分钟）

- **Few-shot 的本质**：在 Prompt 中提供 2-5 组「输入 -> 输出」示例，让模型通过模式匹配（Pattern Matching）学习逻辑、语气和格式约束。
- **DeepSeek 的优势**：指令遵循能力较强。处理 JSON 转换时，Few-shot 能显著减少「好的，这是为您转换的结果」这类无关开场白。

---

## 2. 定量化实操任务（约 90 分钟）

### 场景

开发一个「智能会议日程助手」，将乱序描述转化为前端 FullCalendar 可直接使用的数据格式。

### 步骤 A：Zero-shot（直接下指令）

在 Postman 中输入以下 Body，测试模型原生理解力。

- **POST URL**：`https://api.deepseek.com/v1/chat/completions`
- **JSON Body**：

```json
{
  "model": "deepseek-chat",
  "messages": [
    {
      "role": "system",
      "content": "你是一个数据转换工具。将用户需求转换为 JSON 数组，包含 task_name, time, location 字段。只返回 JSON。"
    },
    {
      "role": "user",
      "content": "下班前也就是5点半记得找李总签合同，中午12点在食堂吃饭"
    }
  ]
}
```

- **观察点**：是否输出了 Markdown 代码块（如 ```json）？字段名是否完全对齐？

### 步骤 B：Few-shot（少样本强化）

通过增加示例，强制模型进入「纯数据模式」。

- **JSON Body**：

```json
{
  "model": "deepseek-chat",
  "messages": [
    {
      "role": "system",
      "content": "你是一个数据提取专家。将用户需求转换为 JSON 数组。请严格参考以下示例：\n\n用户：小王约我周五下午两点在星巴克聊方案\n输出：[{\"task_name\": \"聊方案\", \"time\": \"14:00\", \"location\": \"星巴克\"}]\n\n用户：明天早上九点开周会\n输出：[{\"task_name\": \"周会\", \"time\": \"09:00\", \"location\": \"待定\"}]"
    },
    {
      "role": "user",
      "content": "下午2点去三楼开会，然后5点半在楼下等我"
    }
  ]
}
```

- **操作提示**：注意 JSON 字符串中的引号转义 `\"`。

> 请谨慎保管 API Key，不要提交到公开仓库。

---

## 3. 今日定量化完成指标

- [ ] **纯净度 100%**：返回内容首尾不含任何非 JSON 字符（如「好的」或代码块标签），`JSON.parse(res.choices[0].message.content)` 零报错。
- [ ] **逻辑自纠错**：输入「5点，哦不，是6点在会议室」，观察 Few-shot 是否只提取最终修正时间（`06:00` 或 `18:00`）。
- [ ] **默认值处理**：未提及 `location` 时，必须稳定输出 `"待定"`，而不是随机发挥。

---

## 4. 前端开发小 Tip

在实际工程中，可用 DeepSeek 的 JSON Mode 进一步增强稳定性。

- **技巧**：在请求体加入 `"response_format": { "type": "json_object" }`，并在 system 消息中明确 JSON 要求，可提升输出合法性与可解析性。

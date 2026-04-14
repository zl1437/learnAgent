# Day 4：结构化输出的终极方案——JSON Mode 与 TypeScript 接口定义

**目标：** 解决 Agent 开发中最头疼的「幻觉字段」问题。通过 JSON Mode 和 Schema 约束，确保 DeepSeek 返回的每一个字段名、数据类型都完全符合前端 TypeScript 的定义，实现真正的代码无缝集成。

---

## 1. 核心理论学习（30 分钟）

### 为什么需要严格约束？

- AI 有时会把 `total_amount` 写成 `totalAmount` 或 `price`，导致前端 `undefined` 报错。

### JSON Mode

这是 DeepSeek / OpenAI 提供的原生开关，强制模型输出结果必须是合法的 JSON 对象（如果不合法，模型会一直生成直到合法或超时）。

### Schema 控制的本质

- 在 Prompt 中提供明确的 TypeScript Interface。
- 要求模型必须按照特定的 Key 和 Value 类型（如 `string | number | boolean`）填充数据。

---

## 2. 定量化实操任务（90 分钟）

**场景：** 开发一个「智能简历解析器」。你需要将一段非结构化的简历文本，转化为前端可以直接渲染成「个人卡片」的 JSON 对象。

### 步骤 A：开启 JSON Mode 调用

在 Postman 中，除了 `messages`，你需要新增一个配置参数：`response_format`。

- **POST URL：** `https://deepseek.com`
- **JSON Body：**

```json
{
  "model": "deepseek-chat",
  "messages": [
    {
      "role": "system",
      "content": "你是一个简历解析助手。请将用户信息提取并返回 JSON 格式。必须包含以下字段：name (string), tech_stack (string[]), years_of_exp (number)。"
    },
    {
      "role": "user",
      "content": "我叫张三，会 React 和 Node，做了 5 年前端了。"
    }
  ],
  "response_format": {
    "type": "json_object"
  }
}
```

> 请谨慎使用此类代码。

**注意：** 开启 `json_object` 模式时，system 指令中必须包含 `"JSON"` 这个单词，否则 API 会报错。

### 步骤 B：使用 TypeScript Interface 进行强约束

在 Prompt 中直接喂入 TS 接口，利用模型对代码的敏感度。

**System Prompt 设置（整段可复制）：**

```text
请根据以下 TypeScript 定义返回数据：

interface ResumeCard {
  name: string;
  tags: string[]; // 技能标签，如 ["React", "AI"]
  is_expert: boolean; // 经验是否超过 5 年
}

只返回 JSON 对象，不要输出 Markdown 标签。
```

> 请谨慎使用此类代码。

### 步骤 C：处理「嵌套结构」与「枚举值」

测试模型在处理有限选项时的稳定性。

- **任务：** 增加一个字段 `level`，其值只能是 **初级**、**中级**、**高级** 中的一个。

---

## 3. 今日定量化完成指标

- [ ] **零报错解析：** 在 Postman 连续点击 10 次 Send，每次返回的字符串都能直接被 `JSON.parse()` 识别，且返回内容不是被 Markdown 代码块（例如带语言标记的围栏）包起来的。
- [ ] **字段一致性：** 返回的 Key 名（如 `tech_stack`）与你定义的 Interface 100% 匹配，没有出现驼峰命名或拼写错误。
- [ ] **类型准确性：** `years_of_exp` 返回的一定是 Number 类型（如 `5`），而不是字符串（如 `"5年"`）。

---

## 4. 前端工程化实践：防御性解析函数

作为前端 Agent 工程师，你应该封装一个通用的解析工具。尝试在本地写出这个函数：

```typescript
function safeParseAIResponse<T>(content: string): T | null {
  try {
    // 1. 先尝试直接解析
    return JSON.parse(content);
  } catch (e) {
    // 2. 如果失败，尝试用正则提取 {} 之间的内容
    const match = content.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {
        return null;
      }
    }
    return null;
  }
}
```

> 请谨慎使用此类代码。

---

Day 4 任务完成后，你已经打通了从「自然语言」到「前端代码变量」的最稳固桥梁。明天我们将进入 **Day 5：AI 原生交互逻辑**——如何处理长文本解析与 Token 成本控制。

**思考题：** 你现在的 DeepSeek 返回结果里，字段名是否已经能和你定义的 TypeScript 接口完全对齐了？

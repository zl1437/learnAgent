# Day 4：结构化输出的终极方案——JSON Mode 与 TypeScript 接口定义

**目标：** 解决 Agent 开发中最痛点的问题——格式不稳定性。学习如何利用 DeepSeek 的原生 JSON Mode，并结合前端 TypeScript 接口，确保 AI 返回的数据 100% 可被代码解析。

---

## 1. 核心理论学习（30 分钟）

### 什么是 JSON Mode？

- **原理：** 这是模型厂商提供的一种硬约束。当开启此模式时，模型会被强制限制输出 token，使其必须构造出合法的 JSON 字符串，否则会报错或截断。
- **痛点解决：** 彻底消除 AI 输出「好的，这是你要的 JSON…」这类废话，也不再需要写复杂的正则表达式去截取。

### TypeScript + JSON Schema 的意义

前端不仅要「合法 JSON」，还要「字段正确」。通过在 Prompt 中注入 TypeScript Interface，可以让模型精准理解字段的类型（String/Number/Enum）和嵌套结构。

---

## 2. 定量化实操任务（90 分钟）

**场景：** 开发一个「智能组件生成器」。用户描述一个 UI 需求，AI 返回一个包含 `componentName`、`props`（对象）和 `children`（数组）的复杂 JSON。

### 步骤 A：开启 JSON Mode 调用

在 Postman 中，除了 `messages`，你需要额外加入一个参数。

- **POST URL：** `https://deepseek.com`
- **JSON Body：**

```json
{
  "model": "deepseek-chat",
  "messages": [
    {
      "role": "system",
      "content": "你是一个 UI 组件解析器。必须返回 JSON 格式。"
    },
    {
      "role": "user",
      "content": "帮我生成一个登录按钮，红色背景，文字是'立即提交'，点击弹窗。"
    }
  ],
  "response_format": {
    "type": "json_object"
  }
}
```

> 请谨慎使用此类代码。

**关键要求：** 使用 `json_object` 模式时，system 指令里必须包含 `"JSON"` 这个单词，否则 API 会报错。

### 步骤 B：使用 TypeScript Interface 约束 Prompt

为了让输出更符合前端习惯，直接把 TS 代码喂给它。

**System Prompt 修改（整段可复制）：**

```text
你是一个高级前端架构师。请根据用户描述返回配置。
输出格式必须严格符合以下 TypeScript 接口：

interface ComponentConfig {
  type: 'button' | 'input' | 'card';
  label: string;
  style: { backgroundColor: string; color: string };
  isRound: boolean;
}
```

> 请谨慎使用此类代码。

### 步骤 C：多枚举值测试（压力测试）

- **任务：** 输入「我要一个蓝色的输入框」。
- **观察：** 模型是否能准确将 `type` 对应到枚举值 `'input'`，而不是乱写成 `'textbox'`。

---

## 3. 今日定量化完成指标

- [ ] **协议一致性：** 连续调用 10 次，`type` 字段的值必须落在 `button | input | card` 范围内，不得出现范围外的字符串。
- [ ] **零正则解析：** 在控制台直接使用 `JSON.parse(res.choices.message.content)`，无需 `split` 或 `match` 正则，成功率达 100%。
- [ ] **嵌套准确度：** `style` 对象内的属性名必须是小驼峰（`backgroundColor`），符合前端 CSS-in-JS 的规范。

---

## 4. 前端工程化 Tip：Zod 校验

在真正的 AI Agent 项目中，即使开启了 JSON Mode，前端仍需最后一道防线：

**推荐方案：** 使用 Zod 库对 AI 返回的 JSON 进行 Schema 校验。

```typescript
import { z } from 'zod';

const ConfigSchema = z.object({
  type: z.enum(['button', 'input', 'card']),
  label: z.string(),
  style: z.object({ backgroundColor: z.string() })
});

// 即使 AI 返回了，也用 Schema 校验一遍，确保运行时类型安全
const safeData = ConfigSchema.parse(JSON.parse(aiResponse));
```

> 请谨慎使用此类代码。

---

Day 4 任务完成后，你已经掌握了让 AI 输出「代码级数据」的能力。明天我们将进入 **Day 5：实战篇**——把这些 JSON 喂给真正的 React 组件，实现你的第一个生成式 UI（Generative UI）原型。

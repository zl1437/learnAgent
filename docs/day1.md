# Day 1 操作指南

要在第一天高效完成这个任务，你需要走通「获取密钥 -> 接口测试 -> 角色逻辑实验」这三个步骤。以下是 Day 1 的操作指南。

## 1. 注册与获取 API Key（建议选 DeepSeek）

考虑到网络和成本，建议优先注册 **DeepSeek**（代码极其兼容 OpenAI，且国内直连，价格极低）。

| 平台 | 说明 |
|------|------|
| **DeepSeek** | 访问 [deepseek.com](https://www.deepseek.com)，注册并充值（2 元即可用很久），在「API Keys」页面创建新 Key。 |
| **OpenAI** | 访问 [openai.com](https://openai.com)（需要海外环境与支付方式）。 |

## 2. 使用 Postman 调用接口

1. 打开 Postman，新建一个 **POST** 请求。
2. **URL**（Chat Completions，与下方 JSON 体一致）：
   - DeepSeek：`https://api.deepseek.com/v1/chat/completions`
   - OpenAI：`https://api.openai.com/v1/chat/completions`
3. **Headers（请求头）**：

   | Key | Value |
   |-----|--------|
   | `Content-Type` | `application/json` |
   | `Authorization` | `Bearer 你的API_KEY` |

4. **Body**：选择 **raw** -> **JSON**，填入例如：

```json
{
  "model": "deepseek-chat",
  "messages": [
    { "role": "system", "content": "你是一个严谨的资深前端架构师。" },
    { "role": "user", "content": "你好，请解释一下什么是 AI Agent。" }
  ],
  "stream": false
}
```

> 请谨慎保管 API Key，勿提交到公开仓库。

## 3. 核心任务：理解三个角色（定量实验）

在 Postman 中通过修改 `messages` 数组，观察模型回复的变化，完成以下三个实验。

### 实验 A：System（系统预设 / 人设）

- **操作**：改变 `system` 的 `content`。例如改为「你是一个只会说文言文的助手」或「你是一个毒舌的代码审查员」。
- **理解**：`system` 是给模型的全局指令，决定语气、回复格式和遵循的边界。

### 实验 B：User（用户指令）

- **操作**：在 `user` 的 `content` 中输入具体任务。
- **理解**：`user` 是模型当前需要即时处理的问题。

### 实验 C：Assistant（多轮对话模拟）

- **操作**：模拟一段对话历史，手动把之前的回复写进 `messages`（示例为完整请求体，可按平台改 `model`）：

```json
{
  "model": "deepseek-chat",
  "messages": [
    { "role": "system", "content": "你是一个翻译官。" },
    { "role": "user", "content": "将 'Apple' 翻译成中文。" },
    { "role": "assistant", "content": "苹果" },
    { "role": "user", "content": "那 'Banana' 呢？" }
  ],
  "stream": false
}
```

- **理解**：模型本身是无状态的（Stateless）。要实现连续对话，前端必须每次把历史中的 `user` 与 `assistant` 消息一并传回。

## 4. Day 1 定量化指标（完成检查清单）

- [ ] 在 Postman 中获得第一个状态码为 **200 OK** 的返回。
- [ ] 通过 **system** 角色让模型输出一段指定格式（例如：只返回 JSON 格式的个人简介）。
- [ ] 查看响应体中的 **`usage`** 字段，记录本次请求消耗的 **Completion Tokens**。

---

接下来，若你想在本地用 Node.js 跑通同一流程，可以再要一段最精简的 TypeScript 示例。

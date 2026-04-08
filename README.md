# LearnAgent 学习路线

我们将每天的学习负载控制在 2-3 小时。整体分为两个阶段：

- **L1 基础通信与交互**（Day 1-30）
- **L2 复杂架构与工程化**（Day 31-60）

---

## 第一阶段：AI 交互与模型驱动逻辑（Day 1-30）

### 第 1 周：Prompt 工程与结构化输出

- [✅] **Day 1**：注册 OpenAI/DeepSeek API，使用 Postman 调用 Chat Completion 接口，理解 `system/user/assistant` 角色。
- [✅] **Day 2**：学习 Few-shot（少样本）技巧，写一个能将乱序用户需求转化为标准 JSON 的 Prompt。
- [ ] **Day 3**：学习 CoT（思维链），对比增加 `Let's think step by step` 前后模型推理能力差异。
- [ ] **Day 4**：深入 JSON Mode 与 Structured Outputs，强制模型输出符合 TypeScript Interface 的数据。
- [ ] **Day 5**：实战：写一个 Prompt，让模型根据描述生成 UI 配置项（如颜色、间距、文字）。
- [ ] **Day 6-7**：总结与复盘，整理一套自己的 Prompt 模板库。

### 第 2 周：流式交互与 Vercel AI SDK

- [ ] **Day 8**：学习 SSE（Server-Sent Events）原理，对比 WebSocket 优缺点。
- [ ] **Day 9**：配置 Next.js 环境，安装 `ai SDK`（Vercel AI SDK）。
- [ ] **Day 10**：实现基础 Chat 界面，掌握 `useChat` Hook，完成首个流式打字机效果。
- [ ] **Day 11**：学习流式处理中的中止（Abort）与重试逻辑。
- [ ] **Day 12**：进阶：学习中途拦截流并提取模型输出关键字段。
- [ ] **Day 13-14**：实战：仿造 ChatGPT 界面，实现支持多轮对话、流式输出和 Markdown 渲染的 Web 应用。

### 第 3 周：让 AI 动起来（Function Calling）

- [ ] **Day 15**：学习 Tool Call / Function Calling 原理，阅读官方 API 文档中的 `tools` 字段定义。
- [ ] **Day 16**：学习使用 Zod 定义 Schema（前端定义 AI 工具参数的最佳实践）。
- [ ] **Day 17**：实战：定义 `get_weather` 工具，模拟 AI 自动调用函数流程。
- [ ] **Day 18**：实现 Multi-tool Call：让 AI 一次调用两个工具（如查天气 + 发邮件）。
- [ ] **Day 19**：学习 Model Selection：对比不同模型（GPT-4o vs DeepSeek）在工具调用时的稳定性。
- [ ] **Day 20-21**：实战：开发「智能 Todo 助手」，通过对话增删改查数据库任务。

### 第 4 周：知识库初探（RAG）

- [ ] **Day 22**：理解 Embedding（向量化），学习文本转为 1536 维向量概念。
- [ ] **Day 23**：学习使用 Vector Database（推荐 Pinecone 或 Supabase Vector）。
- [ ] **Day 24**：学习 Chunking（文本切片）策略：按字符、固定长度、语义切分的差异。
- [ ] **Day 25**：实现简易 RAG：用户提问 -> 检索向量库 -> 拼接 Context -> 输入 LLM。
- [ ] **Day 26-27**：实战：做一个「个人简历对话机器人」，上传 PDF 后仅基于 PDF 内容回答。
- [ ] **Day 28-30**：第一月小结：整合前四周成果并完成一个 Demo 展示。

---

## 第二阶段：Agent 框架与复杂工程化（Day 31-60）

### 第 5 周：LangChain.js 深度应用

- [ ] **Day 31**：学习 LangChain.js 核心概念：Chain、PromptTemplate、OutputParser。
- [ ] **Day 32**：学习 LCEL（LangChain Expression Language），练习使用管道符 `|` 串联逻辑。
- [ ] **Day 33**：深入 Memory 模块：BufferMemory、SummaryMemory 的应用场景。
- [ ] **Day 34**：学习 Sequential Chain：上一个 AI 输出作为下一个 AI 输入。
- [ ] **Day 35**：实战：用 LangChain 实现「自动化推文生成器」（搜集信息 -> 提炼要点 -> 生成推文）。
- [ ] **Day 36-37**：源码阅读：分析一个 LangChain.js 内置 Tool 的封装方式。

### 第 6 周：高级 Agent 架构（LangGraph）

- [ ] **Day 38**：学习 State Management：在 Agent 多轮循环中保持状态。
- [ ] **Day 39**：学习 Nodes（节点）与 Edges（边）概念，画出第一个 Agent 流程图。
- [ ] **Day 40**：实现 ReAct 模式：Reasoning（推理）+ Acting（行动）循环。
- [ ] **Day 41**：学习 Self-Reflection（自我反思）：让 Agent 检查输出，不合格则重写。
- [ ] **Day 42**：实战：构建「代码纠错 Agent」，能写代码、跑测试并根据报错自动修复。
- [ ] **Day 43-44**：学习将 LangGraph 部署为后端服务并向前端提供 API。

### 第 7 周：Generative UI（生成式 UI）

- [ ] **Day 45**：理解 Generative UI：AI 不再只返回文本，而是返回 React 组件。
- [ ] **Day 46**：学习 Vercel AI SDK 的 `render` 函数与 `streamUI`。
- [ ] **Day 47**：实战：AI 查股价 -> 自动弹出动态 Echarts 折线图组件（非图片）。
- [ ] **Day 48**：学习处理 AI 生成组件时的状态同步与交互逻辑。
- [ ] **Day 49**：研究 Claude Artifacts 的实现原理。
- [ ] **Day 50-51**：实战：开发「智能金融助手」，对话时动态弹出交易确认按钮或资产比例图。

### 第 8 周：工程化、评估与面试冲刺

- [ ] **Day 52**：学习 LLM Evaluation（评测）：判断 Prompt 是变好还是变坏。
- [ ] **Day 53**：了解 LangSmith：监控 Trace、Cost、Latency（延迟）。
- [ ] **Day 54**：学习 Prompt Injection（提示词注入）防御，保障 Agent 安全。
- [ ] **Day 55**：性能优化：学习通过 Prompt Caching 降低成本与响应时间。
- [ ] **Day 56-58**：终极项目：独立从 0 到 1 开发具备 RAG、Tool Use、GenUI 能力的行业 Agent（如智能旅游规划师）。
- [ ] **Day 59**：整理 GitHub 仓库，完善 README，录制演示视频。
- [ ] **Day 60**：模拟面试，复习 AI Agent 常见面试题（如解决 Agent 死循环、优化 RAG 召回率）。

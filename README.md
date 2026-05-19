# 亚马逊选品助手 Pro

> 一个仿卖家精灵的亚马逊选品工具，帮助产品开发人员进行高效的选品分析。

## 📋 功能特性

### 核心功能模块

| 模块 | 功能描述 | 状态 |
|------|----------|------|
| 📊 **数据看板** | 统计卡片、销量趋势图表、快速入口 | ✅ 完成 |
| 🔍 **产品搜索** | 关键词/ASIN搜索、高级筛选、分页、详情弹窗 | ✅ 完成 |
| 📈 **市场分析** | 类目选择、竞争度分析、市场评分 | ✅ 完成 |
| 🔑 **关键词研究** | 关键词挖掘、ASIN反查、词库管理、对比分析 | ✅ 完成 |
| 👥 **竞品分析** | 竞品监控、销量/价格趋势、流量词分析 | ✅ 完成 |
| 💬 **评论分析** | 情感分析、变体分析、痛点挖掘 | ✅ 完成 |
| 💰 **利润计算** | FBA费用估算、ROI分析、利润图表 | ✅ 完成 |
| 🏪 **店铺监控** | 店铺详情、新品动态、类目分布 | ✅ 完成 |
| 📝 **Listing优化** | 关键词覆盖率检测、AI优化建议 | ✅ 完成 |

## 🛠️ 技术栈

### 前端
- **Vue 3** (Composition API)
- **Bootstrap 5** - UI框架
- **Chart.js 4.x** - 数据可视化
- **Font Awesome 6** - 图标库

### 后端
- **Node.js 20+** - 运行时
- **Express.js** - 框架
- **Sequelize** - ORM
- **SQLite** - 数据库（轻量级，无需额外安装）

### 部署
- **Vercel** - 前端托管（免费）
- **Render** - 后端部署（免费额度）
- **GitHub Pages** - 静态资源托管（免费）

## 📁 项目结构

```
amazon-product-research/
├── frontend/                    # 前端代码
│   ├── index.html              # 主页面
│   ├── app.js                  # Vue应用逻辑
│   └── assets/                 # 静态资源
├── backend/                    # 后端代码
│   ├── config/                 # 配置文件
│   │   └── database.js         # 数据库配置
│   ├── controllers/            # 控制器
│   │   ├── ProductController.js
│   │   ├── KeywordController.js
│   │   ├── ReviewController.js
│   │   ├── UserController.js
│   │   ├── CompetitorController.js
│   │   └── OtherController.js
│   ├── middleware/             # 中间件
│   │   └── auth.js             # JWT认证
│   ├── models/                 # 数据模型
│   │   ├── Product.js
│   │   ├── Keyword.js
│   │   ├── Review.js
│   │   ├── Competitor.js
│   │   ├── User.js
│   │   ├── Store.js
│   │   └── WordBank.js
│   ├── routes/                 # 路由
│   │   ├── productRoutes.js
│   │   ├── keywordRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── userRoutes.js
│   │   ├── competitorRoutes.js
│   │   └── otherRoutes.js
│   ├── services/               # 服务层（数据采集）
│   │   └── amazonScraper.js    # 亚马逊数据采集
│   ├── .env                    # 环境变量
│   ├── app.js                  # 主应用
│   ├── init.js                 # 数据库初始化
│   └── package.json
├── data/                       # Mock数据（开发测试用）
│   └── mockData.js
├── docs/                       # 文档
│   ├── SOP_DOCUMENT.md         # 开发流程文档
│   └── API_DOCUMENT.md         # API文档
├── .gitignore                  # Git忽略配置
├── README.md                   # 项目说明
└── TODO.md                     # 开发任务清单
```

## 🚀 快速开始

### 环境要求
- Node.js 20+
- npm 或 yarn

### 本地开发

#### 1. 克隆项目
```bash
git clone https://github.com/gloryhonourmyheart/amazon-product-research.git
cd amazon-product-research
```

#### 2. 安装后端依赖
```bash
cd backend
npm install
```

#### 3. 配置环境变量
```bash
# 复制并编辑.env文件
cp .env.example .env
```

编辑 `.env` 文件：
```env
PORT=3000
DB_TYPE=sqlite
DB_PATH=./database.sqlite
JWT_SECRET=your_jwt_secret_key_here_must_be_long_and_secure
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

#### 4. 初始化数据库
```bash
node init.js
```

#### 5. 启动后端服务
```bash
npm start
```

#### 6. 启动前端（另一个终端）
```bash
cd frontend

# 使用Python启动简单HTTP服务器
python -m http.server 8080

# 或使用Node.js
npx http-server -p 8080
```

#### 7. 访问应用
- 前端: http://localhost:8080
- API文档: http://localhost:3000/api-docs

## 🌐 部署到生产环境

### 方案一：全栈部署（推荐）

#### 后端部署到 Render
1. 登录 [Render](https://render.com)
2. 创建新的 Web Service
3. 连接 GitHub 仓库
4. 配置环境变量
5. 部署完成后获取后端URL

#### 前端部署到 Vercel
1. 登录 [Vercel](https://vercel.com)
2. 导入前端项目
3. 配置环境变量（后端API地址）
4. 部署完成

### 方案二：静态部署（简单）

```bash
# 构建前端
cd frontend
npm run build

# 部署到GitHub Pages
git subtree push --prefix frontend/build origin gh-pages
```

## 📊 数据获取方案

### 方案一：亚马逊官方API（推荐）

**申请流程：**
1. 注册亚马逊开发者账号: https://developer.amazonservices.com/
2. 创建 SP-API 应用
3. 获取 Client ID 和 Client Secret
4. 配置 IAM 角色
5. 获取 Refresh Token

**API端点：**
- Products API - 获取产品信息
- Reviews API - 获取评论数据
- Keywords API - 获取关键词数据

### 方案二：数据采集（仅供学习研究）

> ⚠️ 注意：直接爬取亚马逊网站可能违反其服务条款

```bash
# 安装采集依赖
cd backend
npm install puppeteer cheerio
```

### 方案三：免费数据源

| 数据源 | 类型 | 费用 | 说明 |
|--------|------|------|------|
| [Keepa](https://keepa.com) | API | 免费额度 | 产品历史价格 |
| [CamelCamelCamel](https://camelcamelcamel.com) | API | 免费 | 价格追踪 |
| [Amazon Affiliate API](https://affiliate-program.amazon.com) | API | 免费 | 基础产品数据 |

## 🔌 API接口列表

### 产品接口
| 接口 | 方法 | 描述 |
|------|------|------|
| `/api/products` | GET | 获取产品列表 |
| `/api/products/:asin` | GET | 获取产品详情 |
| `/api/products/search` | POST | 搜索产品 |
| `/api/products` | POST | 创建产品 |

### 关键词接口
| 接口 | 方法 | 描述 |
|------|------|------|
| `/api/keywords/search` | POST | 关键词挖掘 |
| `/api/keywords/reverse` | POST | ASIN反查 |
| `/api/keywords/compare` | POST | 关键词对比 |

### 评论接口
| 接口 | 方法 | 描述 |
|------|------|------|
| `/api/reviews/:asin` | GET | 获取评论 |
| `/api/reviews/analyze` | POST | 分析评论 |

### 用户接口
| 接口 | 方法 | 描述 |
|------|------|------|
| `/api/users/register` | POST | 用户注册 |
| `/api/users/login` | POST | 用户登录 |
| `/api/users/profile` | GET | 获取用户信息 |

## 🗂️ 数据库结构

### 产品表 (products)
| 字段 | 类型 | 说明 |
|------|------|------|
| asin | VARCHAR(10) | 亚马逊ASIN |
| title | TEXT | 产品标题 |
| brand | VARCHAR(100) | 品牌 |
| price | DECIMAL(10,2) | 价格 |
| sales | INT | 月销量 |
| rating | DECIMAL(3,2) | 评分 |
| reviews | INT | 评论数 |
| bsr | INT | BSR排名 |
| growth_rate | DECIMAL(5,2) | 增长率 |

### 关键词表 (keywords)
| 字段 | 类型 | 说明 |
|------|------|------|
| keyword | VARCHAR(200) | 关键词 |
| search_volume | INT | 搜索量 |
| competition | DECIMAL(5,2) | 竞争度 |
| conversion_rate | DECIMAL(5,2) | 转化率 |
| trend | DECIMAL(5,2) | 趋势 |

## 🔒 安全注意事项

1. **JWT密钥**：务必设置强密钥，不要提交到版本控制
2. **API凭证**：使用环境变量管理敏感信息
3. **数据库访问**：限制数据库用户权限
4. **HTTPS**：生产环境必须使用HTTPS
5. **输入验证**：所有用户输入必须验证和过滤

## 📝 开发任务清单

| 任务 | 状态 | 优先级 |
|------|------|--------|
| 后端API开发 | ✅ 完成 | P0 |
| 前端UI开发 | ✅ 完成 | P0 |
| 数据库设计 | ✅ 完成 | P0 |
| 亚马逊API集成 | ⏳ 待实现 | P0 |
| 用户认证系统 | ✅ 完成 | P0 |
| 数据采集服务 | ⏳ 待实现 | P1 |
| 部署配置 | ⏳ 待实现 | P1 |
| 测试用例 | ⏳ 待实现 | P2 |

## 📅 里程碑计划

| 里程碑 | 目标 | 预计时间 |
|--------|------|----------|
| M1 | 后端服务搭建完成 | 第1周 |
| M2 | 亚马逊API集成完成 | 第2-3周 |
| M3 | 前端对接完成 | 第4周 |
| M4 | 正式版上线 | 第5周 |

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/your-feature`)
3. 提交更改 (`git commit -m 'Add some feature'`)
4. 推送到分支 (`git push origin feature/your-feature`)
5. 创建 Pull Request

## 📄 许可证

MIT License - 详见 LICENSE 文件

## 📞 联系方式

如有问题或建议，欢迎提交 Issue 或联系开发者。

---

**注意**：本项目仅供学习和研究使用。使用亚马逊数据时请遵守亚马逊服务条款和相关法律法规。
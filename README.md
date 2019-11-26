GraphQL 一种用于 API 的查询语言

server端：
graphql-server-express/

client端
graphql-client-vue/


官网：https://graphql.cn/

### 一种用于 API 的查询语言
GraphQL 既是一种用于 API 的查询语言也是一个满足你数据查询的运行时。 GraphQL 对你的 API 中的数据提供了一套易于理解的完整描述，使得客户端能够准确地获得它需要的数据，而且没有任何冗余，也让 API 更容易地随着时间推移而演进，还能用于构建强大的开发者工具。

Graph+ QL = 图表化(可视化)查询语言，是一种描述客户端如何向服务端请求数据的 API语法，类似于 RESTful API 规范。

### 问题
都能干什么
特性
操作
github例子
server端和client端怎么实现


### 问题
api文档、客户端服务端重复校验、看不到数据结构、枚举值暴露、版本维护成本、需要单独部署文档服务等

### 都能干什么
1. 请求你所要的数据不多不少
向你的 API 发出一个 GraphQL 请求就能准确获得你想要的数据，不多不少。 GraphQL 查询总是返回可预测的结果。使用 GraphQL 的应用可以工作得又快又稳，因为控制数据的是应用，而不是服务器。
2. 获取多个资源只用一个请求
GraphQL 查询不仅能够获得资源的属性，还能沿着资源间引用进一步查询。典型的 REST API 请求多个资源时得载入多个 URL，而 GraphQL 可以通过一次请求就获取你应用所需的所有数据。这样一来，即使是比较慢的移动网络连接下，使用 GraphQL 的应用也能表现得足够迅速。
3. 描述所有的可能类型系统
GraphQL API 基于类型和字段的方式进行组织，而非入口端点。你可以通过一个单一入口端点得到你所有的数据能力。GraphQL 使用类型来保证应用只请求可能的数据，还提供了清晰的辅助性错误信息。应用可以使用类型，而避免编写手动解析代码。
4. 快步前进强大的开发者工具
不用离开编辑器就能准确知道你可以从 API 中请求的数据，发送查询之前就能高亮潜在问题，高级代码智能提示。利用 API 的类型系统，GraphQL 让你可以更简单地构建如同GraphiQL的强大工具。
5. API 演进无需划分版本
给你的 GraphQL API 添加字段和类型而无需影响现有查询。老旧的字段可以废弃，从工具中隐藏。通过使用单一演进版本，GraphQL API 使得应用始终能够使用新的特性，并鼓励使用更加简洁、更好维护的服务端代码。
6. 使用你现有的数据和代码
GraphQL 让你的整个应用共享一套 API，而不用被限制于特定存储引擎。GraphQL 引擎已经有多种语言实现，通过 GraphQL API 能够更好利用你的现有数据和代码。你只需要为类型系统的字段编写函数，GraphQL 就能通过优化并发的方式来调用它们。


### 特性
强类型（类似于Java、Typescript）
分工明确（对应数据Query）
分层（查询可以一层一层的）
预测性（要什么返回什么，没有任何冗余(不浪费流量)）
不需要版本号，能兼容老版本
自动检测
不需要文档说明

### 操作
GraphQL 模型有两种类型的操作：
query：查询，只读数据。
mutation：变更，先写，然后再读取。

请求你所要的数据 // 基于 Queries
```
query{ // 查找 name 为 GraphQL 的 project
  project(name: "GraphQL") {
    id
    tagline
  }
}
```
得到可预测的结果
```
{ // 返回 json
  "project": {
      "id":"122",
    "tagline": "A query language for APIs"
  }
}
```



### GraphQL 一些关键概念包含 Type、Schema、Query、 Mutation等

Query 查询
```
// 先定义 User 数据结构
type User {
  id: Int!
  name: String!
  age: Int!
}
// query 查询
query {
  // 返回一个User类型的集合
  userList() : [User!]
  // 可以传参查询
  // 根据id查询用户信息
  orderUser(id: Int!) : User
}
```

Mutation 改变数据。查询字段时，是并行执行，而变更字段时，是线性执行，一个接着一个。
```
mutation {
  // 通过参数 id 去查到对应的用户信息
  MutationUserName(id: Int!, name: String!) : User!
}
Mutation: {
    MutationUserName(_, { id, name }) {
        const user = userList.find(val => val.id === id);
        if (!user) {
            throw new Error(`找不到id为 ${id} 的user`);
        }
        user.name = name
        
        return user;
    }
}
```

Schema 定义数据的数据类型
```
type User {
  id: Int!
  name: String!
  age: Int!
}

type Query {
  userList() : [User]
  orderUser(id: Int!) : User
}

mutation {
  MutationUserName(id: Int!, name: String!) : User
}
```


### github 为例子

查询用户下的信息
```
query {
  viewer {
    id
    name
    url
    avatarUrl
    email
    repositories {
      totalCount
    }
    repository(name: "build-i18n-lang-config") {
      id
      name
    }
  }
}
```

### 创建一个仓库
```
mutation($opt:CreateRepositoryInput!) {
  createRepository(input: $opt){
    clientMutationId
    repository {
      id
      name
    }
  }
}

{
  "opt": {
    "visibility": "PUBLIC",
    "name": "demo"
  }
}
```


server端和client端怎么实现

https://graphql.org/swapi-graphql
https://apis.guru/graphql-voyager/

Apollo是一个用于构建数据图的平台，该通信层将您的应用程序客户端（例如Spa应用和iOS/ANDROID应用程序）无缝连接到您的后端服务。
https://www.apollographql.com/docs/apollo-server/api/apollo-server/
vue实现
https://apollo.vuejs.org/

https://juejin.im/post/5d5d2f9ef265da03c02c06ed
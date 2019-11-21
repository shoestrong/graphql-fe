const graphql = require('graphql')
const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull} = graphql

const { CategoryModel, ProductModel } = require('./model')

const isMock = false

const categories = [
  { id: '1', name: '图书' },
  { id: '2', name: '数码' },
  { id: '3', name: '食品' }
]

const products = [
  { id: '1', name: '红楼梦', category: '1' },
  { id: '2', name: '西游记', category: '1' },
  { id: '3', name: '水浒传', category: '1' },
  { id: '4', name: '三国演义', category: '1' },
  { id: '2', name: 'iPhone', category: '2' }
]

const Product = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    category: {
      type: Category,
      resolve(parent) {
        if (isMock) {
          return categories.find(item => item.id === parent.category)
        } else {
          return CategoryModel.findById(parent.category)
        }
      }
    }
  })
})

const Category = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    products: {
      type: new GraphQLList(Product),
      resolve(parent) {
        if (isMock) {
          return products.filter(item => item.category === parent.id)
        } else {
          return ProductModel.find({ category: parent.id })
        }
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    getCategory: {
      type: Category,
      description: '获取类别，参数id',
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        if (isMock) {
          return categories.find(item => item.id === args.id)
        } else {
          return CategoryModel.findById(args.id)
        }
      }
    },
    getCategories: {
      type: new GraphQLList(Category),
      description: '获取所有类别',
      args: {},
      resolve(parent, args) {
        if (isMock) {
          return categories
        } else {
          return CategoryModel.find()
        }
      }
    },
    getProduct: {
      type: Product,
      description: '获取产品，参数id',
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        if (isMock) {
          return products.find(item => item.id === args.id)
        } else {
          return ProductModel.findById(args.id)
        }
      }
    },
    getProducts: {
      type: new GraphQLList(Product),
      description: '获取所有产品',
      resolve(parent) {
        if (isMock) {
          return products
        } else {
          return ProductModel.find()
        }
      }
    }
  }
})

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    addCategory: {
      type: Category,
      description: '添加分类，参数name必填',
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(parent, args) {
        if (isMock) {
          args.id = categories.length + 1 + ''
          categories.push(args)
          return args
        } else {
          return CategoryModel.create(args)
        }
      }
    },
    addProduct: {
      type: Product,
      description: '添加产品，参数name、category必填',
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        category: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(parent, args) {
        if (isMock) {
          args.id = products.length + 1 + ''
          products.push(args)
          return args
        } else {
          return ProductModel.create(args)
        }
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
})

import {
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull
} from 'graphql'

import ArticleType from './ArticleType'
import Article from '../../proxy/article'
import Tag from '../../proxy/tag'

const parseArray = (str) => str ? JSON.parse(str) : []

let ArticleMutation = {
  addArticle: {
    type: ArticleType,
    description: '添加文章',
    args: {
      title: {
        type: new GraphQLNonNull(GraphQLString),
        description: '文章标题'
      },
      content: {
        type: new GraphQLNonNull(GraphQLString),
        description: '文章内容'
      },
      cover: {
        type: GraphQLString,
        description: '文章封面'
      },
      tags: {
        type: GraphQLString,
        description: '标签'
      }
    },
    resolve: async(root, { title, content, cover, tags }) => {
      if (!root.user) throw Error('请先登录')
      if (!root.user.admin) throw Error('你没有权限')

      tags = parseArray(tags)

      let newArticle = await Article.newAndSave({
        author: root.user.account,
        title,
        content,
        cover,
        tags
      })

      await Tag.patchesTag(newArticle._id, tags)

      return newArticle
    }
  },


  deleteArticle: {
    type: ArticleType,
    description: '删除文章',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
        description: '文章id'
      }
    },
    resolve: async(root, { id }) => {
      if (!root.user) throw Error('请先登录')
      if (!root.user.admin) throw Error('你没有权限')

      let article = await Article.getArticleById(id)

      if (!article) throw Error('未找到文章')

      Array.from(article.tags, async(name) => {
        let tag = await Tag.getTagByName(name)
        let index = tag.article.indexOf(id)

        if (index > -1) {
          tag.article.splice(index, 1)
          return await tag.save()
        }
      })

      return await article.remove()
    }
  },


  updateArticle: {
    type: ArticleType,
    description: '更新文章',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
        description: '文章id'
      },
      title: {
        type: new GraphQLNonNull(GraphQLString),
        description: '文章标题'
      },
      content: {
        type: new GraphQLNonNull(GraphQLString),
        description: '文章内容'
      },
      cover: {
        type: GraphQLString,
        description: '文章封面'
      },
      tags: {
        type: GraphQLString,
        description: '标签'
      }
    },
    resolve: async(root, { id, title, content, cover, tags }) => {
      if (!root.user) throw Error('请先登录')
      if (!root.user.admin) throw Error('你没有权限')

      let article = await Article.getArticleById(id)

      if (!article) throw Error('未找到文章')

      tags = parseArray(tags)

      await Tag.patchesTag(id, tags, article.tags)

      Object.assign(article, {
        title,
        content,
        cover,
        tags
      })

      return await article.save()
    }
  }
}

export default ArticleMutation
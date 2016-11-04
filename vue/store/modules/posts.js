import * as types from '../mutation-types'
import _ from 'underscore'
import timeago from 'timeago.js'

const state = {
    feedPosts:   [],
    recentPosts: [],
    posts:       []
}
 
const mutations = {
    // 获取订阅源的文章
    [types.RECEIVE_FEED_POSTS](state, { data }) {
        state.feedPosts = _.sortBy(data, 'pubdate').reverse()
        for (let post of state.feedPosts) {
            if (post.pubdate != null) {
                post.pubdate = new timeago().format(post.pubdate.split('').splice(0, 19).join('').replace('T', ' '), 'zh_CN')
            }
        }
    },
    // 获取最近未读文章
    [types.RECEIVE_RECENT_POSTS](state, { data }) {
        state.recentPosts = data
        for (let post of state.recentPosts) {
            if (post.pubdate != null) {
                post.pubdate = new timeago().format(post.pubdate.split('').splice(0, 19).join('').replace('T', ' '), 'zh_CN')
            }
        }
    },
    // 获取指定类型文章(收藏)
    [types.RECEIVE_POSTS](state, { data }) {
        state.posts = data
    },
    // 标记已读
    [types.READ](state, id) {
        for (let post of state.feedPosts) {
            if (post._id === id) {
                post.read = true
            }
        }
    },
    // 全部标记已读
    [types.READ_ALL](state) {
        for (let post of state.feedPosts) {
            post.read = true
        }
    },
    // 收藏/取消收藏书籍 ID
    [types.MARK](state, post) {
        let newItems = [], exist = false
        for (let item of state.posts) {
            if (item._id !== post._id) {
                newItems.push(item)
            } else {
                // 取消收藏
                exist = true
            }
        }
        if (!exist) {
            newItems.push(post)
        }
        state.posts = newItems
    },
    // 点赞书籍 ID
    [types.LOVE](state, id) {
        state.posts = _.map(state.posts, post => {
            if (post._id === id) { post.love = !post.love }
            return post
        })
    }
}

export default {
    state,
    mutations
}

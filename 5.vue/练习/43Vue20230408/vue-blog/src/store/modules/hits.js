/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-27 15:53:48
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-31 14:53:44
 */
import store from "store"
let ArrName = "HITS_ARTICLES"
export default {
  namespaced: true,
  state: {
    hits_articles: []
  },
  getters: {
    is_hits (state) {
      return (id) => {
        console.log(state.hits_articles?.includes(id),"if2");
        return state.hits_articles?.includes(id)
      }
    }
  },
  mutations: {
    PUSH_ARTICLE(state,aid) {
      console.log(state.hits_articles,"store");
      state.hits_articles.push(aid)
      store.set(ArrName,state.hits_articles)
    },
    PULL_ARTICLE(state,aid) {
      state.hits_articles = state.hits_articles.filter(item => {
        return item !== aid
      })
      store.set(ArrName,state.hits_articles)
    },
    SET_ARTICLES (state) {
      state.hits_articles = store.get(ArrName)
    }
  },
  actions: {
    pushArticle (context,payload) {
      context.commit("PUSH_ARTICLE",payload.aid)
    },
    pullArticle (context,payload) {
      context.commit("PULL_ARTICLE",payload.aid)
    },
    setArticlePosition (context) {
      context.commit("SET_ARTICLES")
    }
  }
}
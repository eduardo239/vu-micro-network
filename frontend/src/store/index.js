import axios from 'axios';
import { createStore } from 'vuex';

export default createStore({
  state: {
    modal: false,
    status: '',
    token: localStorage.getItem('token') || null,
    user: {},
    user_info: {},
    post: {},
    posts: [],
    error: '',
  },
  mutations: {
    toggle_modal(state) {
      state.modal = !state.modal;
    },
    auth_request(state) {
      state.status = 'loading';
    },
    auth_success(state, { token, user }) {
      (state.status = 'success'), (state.token = token), (state.user = user);
    },
    auth_error(state) {
      state.status = 'error';
    },
    logout(state) {
      (state.status = ''), (state.token = ''), (state.user = {});
    },
    posts_request(state) {
      state.status = 'loading';
    },
    posts_success(state, payload) {
      state.posts = payload;
    },
    post_success(state, post) {
      state.post = post;
    },
    auto_login_request(state) {
      state.status = 'loading';
    },
    auto_login_success(state, payload) {
      state.status = 'success';
      state.user = payload;
    },
    auto_login_error(state, payload) {
      state.status = 'error';
      state.error = payload;
    },
    del_post_request(state) {
      state.status = 'loading';
    },
    del_post_success(state) {
      state.status = 'success';
    },
    del_post_error(state) {
      state.error = 'error';
    },
    user_info_request(state) {
      state.status = 'loading';
    },
    user_info_success(state, payload) {
      state.user_info = payload;
      state.status = 'success';
    },
    user_info_error(state, payload) {
      state.error = payload;
      state.status = '';
    },
  },
  getters: {
    modal: (state) => state.modal,
    user: (state) => state.user,
    user_info: (state) => state.user_info,
    post: (state) => state.post,
    posts: (state) => state.posts,
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios({
          url: 'http://localhost:5000/api/users/login',
          data: user,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => {
            const token = resp.data.token;
            const user = resp.data.user;

            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = token;
            commit('auth_success', { token, user });
            resolve(resp);
          })
          .catch((err) => {
            commit('auth_error');
            localStorage.removeItem('token');
            reject(err);
          });
      });
    },
    auto_login({ commit }) {
      return new Promise((resolve, reject) => {
        commit('auto_login_request');
        const token = localStorage.getItem('token');
        axios({
          url: 'http://localhost:5000/api/users/profile',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((resp) => {
            commit('auto_login_success', resp.data);
            resolve(resp);
          })
          .catch((err) => {
            commit('auto_login_error', err);
            window.localStorage.removeItem('token');
            reject(err);
          });
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios({
          url: 'http://localhost:5000/api/users/',
          data: user,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => {
            const token = resp.data.token;
            const user = resp.data.user;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = token;
            commit('auth_success', { token, user });
            resolve(resp);
          })
          .catch((err) => {
            commit('auth_error', err);
            localStorage.removeItem('token');
            reject(err);
          });
      });
    },
    get_user({ commit }, id) {
      return new Promise((resolve, reject) => {
        commit('user_info_request');
        axios({
          url: `http://localhost:5000/api/users/${id}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          },
        })
          .then((resp) => {
            const user = resp.data;
            commit('user_info_success', user);
            resolve(resp);
          })
          .catch((err) => {
            commit('user_info_error', err);
            reject(err);
          });
      });
    },
    logout({ commit }) {
      // eslint-disable-next-line
      return new Promise((resolve, reject) => {
        commit('logout');
        window.localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        resolve();
      });
    },
    posts({ commit }) {
      // eslint-disable-next-line
      return new Promise((resolve, reject) => {
        commit('posts_request');
        axios({
          url: 'http://localhost:5000/api/posts/',
          method: 'GET',
        }).then((resp) => {
          const posts = resp.data;
          commit('posts_success', posts);
        });
      });
    },
    post({ commit }, post) {
      // eslint-disable-next-line
      return new Promise((resolve, reject) => {
        commit('post_success', post);
      });
    },
    // eslint-disable-next-line
    new_post({ commit }, formData) {
      return new Promise((resolve, reject) => {
        axios({
          url: 'http://localhost:5000/api/posts/',
          data: formData,
          method: 'POST',
          'Content-Type': 'multipart/form-data',
        })
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    del_post({ commit }, postId) {
      // eslint-disable-next-line
      return new Promise((resolve, reject) => {
        commit('del_post_request');
        axios({
          url: `http://localhost:5000/api/posts/${postId}`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          },
        })
          .then((resp) => {
            resolve(resp);
            commit('del_post_success');
          })
          .catch((err) => {
            commit('del_post_error');

            reject(err);
          });
      });
    },
    // eslint-disable-next-line
    update_avatar({ commit }, formData) {
      return new Promise((resolve, reject) => {
        axios({
          url: 'http://localhost:5000/api/upload/avatar',
          data: formData,
          method: 'POST',
          'Content-Type': 'multipart/form-data',
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          },
        })
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  modules: {},
});

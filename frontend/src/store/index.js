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
      state.error = '';
    },
    auth_error(state, error) {
      state.error = error;
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
    post_request(state) {
      state.status = 'loading';
    },
    post_success(state, post) {
      state.post = post;
      state.status = 'success';
    },
    post_error(state, error) {
      state.post = error;
      state.status = '';
    },
    auto_login_request(state) {
      state.status = 'loading';
    },
    auto_login_success(state, payload) {
      state.status = 'success';
      state.user = payload;
      state.error = '';
    },
    auto_login_error(state) {
      state.status = 'error';
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
    user_info_reset(state) {
      state.user_info = {};
    },
    new_post_request(state) {
      state.status = 'loading';
    },
    new_post_success(state) {
      state.status = 'success';
      state.loading = '';
    },
    new_post_error(state, error) {
      state.status = 'error';
      state.error = error;
      state.loading = '';
    },
  },
  getters: {
    isLoading: (state) => state.loading,
    error: (state) => state.error,
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
          .catch((error) => {
            console.log(error.response.data.message);
            commit('auth_error', error.response.data.message);
            localStorage.removeItem('token');
            reject(error);
          });
      });
    },
    auto_login({ commit }) {
      // eslint-disable-next-line
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
          .catch((error) => {
            commit('auto_login_error', error);
            window.localStorage.removeItem('token');
            // reject(error);
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
          .catch((error) => {
            commit('auth_error', error.response.data.message);
            localStorage.removeItem('token');
            reject(error);
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
          .catch((error) => {
            commit('user_info_error', error.response.data.message);
            reject(error);
          });
      });
    },
    reset_user({ commit }) {
      commit('user_info_reset');
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
        })
          .then((resp) => {
            const posts = resp.data;
            commit('posts_success', posts);
            resolve(resp);
          })
          .then((error) => {
            reject(error);
          });
      });
    },
    post({ commit }, id) {
      // eslint-disable-next-line
      // return new Promise((resolve, reject) => {
      //   commit('post_success', post);
      // });
      return new Promise((resolve, reject) => {
        commit('post_request');
        axios({
          url: `http://localhost:5000/api/posts/${id}`,
          method: 'GET',
        })
          .then((resp) => {
            const post = resp.data;
            commit('post_success', post);
            resolve(resp);
          })
          .catch((error) => {
            commit('post_error', error.response.data.message);
            reject(error);
          });
      });
    },
    // eslint-disable-next-line
    new_post({ commit }, formData) {
      return new Promise((resolve, reject) => {
        commit('new_post_request');
        axios({
          url: 'http://localhost:5000/api/posts/',
          data: formData,
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then((resp) => {
            commit('new_post_success');
            resolve(resp);
          })
          .catch((err) => {
            commit('new_post_error');
            reject(err);
          });
      });
    },
    // eslint-disable-next-line
    update_post({ commit }, { id, content }) {
      return new Promise((reject, resolve) => {
        axios({
          url: `http://localhost:5000/api/posts/${id}`,
          method: 'PUT',
          data: { content },
          headers: {
            Authorization: `Bearer ${this.state.token}`,
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => {
            this.posts();
            resolve(resp);
            // commit('del_post_success');
          })
          .catch((err) => {
            // commit('del_post_error');
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
    post_like({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios({
          url: `http://localhost:5000/api/posts/like/${id}`,
          method: 'GET',
        })
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
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

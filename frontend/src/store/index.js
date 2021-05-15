import axios from 'axios';
import { createStore } from 'vuex';

export default createStore({
  state: {
    modal: false,
    status: '',
    token: localStorage.getItem('token') || null,
    login: {},
    user: {},
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
      state.status = 'success';
      state.token = token;
      state.user = user;
      state.error = '';
      state.login = user;
    },
    auth_error(state, error) {
      state.error = error;
    },
    logout(state) {
      state.status = '';
      state.token = '';
      state.user = {};
      state.login = {};
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
      state.login = payload;
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
    user_request(state) {
      state.status = 'loading';
    },
    user_success(state, payload) {
      state.user = payload;
      state.status = 'success';
    },
    user_error(state, payload) {
      state.error = payload;
      state.status = '';
    },
    user_reset(state) {
      state.user = {};
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
    add_friend_error(state, payload) {
      state.error = payload;
    },
    reset_error(state) {
      state.error = '';
    },
  },
  getters: {
    isLoading: (state) => state.loading,
    error: (state) => state.error,
    modal: (state) => state.modal,
    login: (state) => state.login,
    user: (state) => state.user,
    post: (state) => state.post,
    posts: (state) => state.posts,
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
  actions: {
    reset_error({ commit }) {
      commit('reset_error');
    },
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
        commit('user_request');
        axios({
          url: `http://localhost:5000/api/users/${id}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          },
        })
          .then((resp) => {
            const user = resp.data;
            commit('user_success', user);
            resolve(resp);
          })
          .catch((error) => {
            commit('user_error', error.response.data.message);
            reject(error);
          });
      });
    },
    reset_user({ commit }) {
      commit('user_reset');
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
    // eslint-disable-next-line
    new_comment({ commit }, { postId, content }) {
      return new Promise((resolve, reject) => {
        axios({
          url: 'http://localhost:5000/api/comments',
          data: { postId, content },
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.state.token}`,
            'Content-Type': 'application/json',
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
    // http://localhost:5000/api/comments/like/609d3b63c45c401d0447af53
    // eslint-disable-next-line
    like_comment({ commit }, commentId) {
      return new Promise((resolve, reject) => {
        axios({
          url: `http://localhost:5000/api/comments/like/${commentId}`,
          method: 'GET',
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
    //http://localhost:5000/api/comments/609d621504b35615bc309702
    // eslint-disable-next-line
    delete_comment({ commit }, commentId) {
      return new Promise((resolve, reject) => {
        axios({
          url: `http://localhost:5000/api/comments/${commentId}`,
          method: 'DELETE',
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
    // eslint-disable-next-line
    add_friend({ commit }, { userId, friendId }) {
      return new Promise((resolve, reject) => {
        axios({
          url: 'http://localhost:5000/api/friends/',
          method: 'POST',
          data: { userId, friendId },
          headers: {
            Authorization: `Bearer ${this.state.token}`,
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => {
            resolve(resp);
          })
          .catch((error) => {
            console.log(error);
            commit('add_friend_error', error.response.data.message);
            reject(error);
          });
      });
    },
  },

  modules: {},
});

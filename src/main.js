import { createApp } from 'vue'

import store from './store'

import App from './App.vue'
import router from './router/'

import './index.css'

router.beforeEach(async (to, from) => {
    if (store.state.redirect) {
        const redirect = store.state.redirect
        store.commit('deleteRedirect')
        return { path: redirect }
    }

    if (to.name === 'SignIn' && store.getters.userIsAuthenticated) return {
        name: 'Home'
    }

    if (to.meta.requiresAuth && !store.getters.userIsAuthenticated) {
        return {
            path: '/signin', query: { redirect: to.fullPath }
        }
    }
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
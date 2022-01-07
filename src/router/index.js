import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import SearchResults from '../pages/SearchResults.vue'
import Partner from '../pages/Partner.vue'
import Class from '../pages/Class.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [{
            path: '/',
            component: Home
        },
        {
            path: '/results',
            component: SearchResults
        },
        {
            path: '/partner',
            component: Partner
        },
        {
            path: '/class',
            component: Class
        }
    ]
})

export default router
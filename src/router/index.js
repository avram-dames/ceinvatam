import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import SearchResults from '../pages/SearchResults.vue'
import Partner from '../pages/Partner.vue'
import Class from '../pages/Class.vue'
import ClassReview from '../pages/ClassReview.vue'

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
            path: '/partner/:id',
            name: 'Partner',
            component: Partner
        },
        {
            path: '/class/:id',
            name: 'Class',
            component: Class
        },
        {
            path: '/class/:id/review',
            name: 'ClassReview',
            component: ClassReview
        }
    ]
})

export default router
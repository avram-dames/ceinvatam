import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import SearchResults from '../pages/SearchResults.vue'
import Partner from '../pages/Partner.vue'
import Class from '../pages/Class.vue'
import ClassReview from '../pages/ClassReview.vue'
import ClassReviewThankYou from '../pages/ClassReviewThankYou.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [{
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/results',
            name: 'SearchResults',
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
        },
        {
            path: '/class/:id/review/thankyou',
            name: 'ClassReviewThankYou',
            component: ClassReviewThankYou
        }
    ]
})

export default router
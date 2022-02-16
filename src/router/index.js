import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import SearchResults from '../pages/SearchResults.vue'
import Partner from '../pages/Partner.vue'
import Class from '../pages/Class.vue'
import ClassReview from '../pages/ClassReview.vue'
import ClassReviewThankYou from '../pages/ClassReviewThankYou.vue'
import SignIn from '../pages/SignIn.vue'
import SignUp from '../pages/SignUp.vue'
import SignInPaswordReset from '../pages/SignInPaswordReset.vue'
import SignUpConfirmationScreen from '../pages/SignUpConfirmationScreen.vue'
import SignInNewPassword from '../pages/SignInNewPassword.vue'
import CustomerProfile from '../pages/CustomerProfile.vue'
import CustomerReviews from '../pages/CustomerReviews.vue'
import ClassReviewUpdate from '../pages/ClassReviewUpdate.vue'

import store from '../store'

const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: false }
    },
    {
        path: '/results',
        name: 'SearchResults',
        component: SearchResults,
        meta: { requiresAuth: false }
    },
    {
        path: '/partner/:id',
        name: 'Partner',
        component: Partner,
        meta: { requiresAuth: false }
    },
    {
        path: '/class/:id',
        name: 'Class',
        component: Class,
        meta: { requiresAuth: false }
    },
    {
        path: '/class/:id/review',
        name: 'ClassReview',
        component: ClassReview,
        meta: { requiresAuth: true },
        beforeEnter(to, from) {
            if (store.getters.userFirstName) { return true }
            store.commit(
                'pushAlert', 
                { msg: 'Înainte de a lăsa o recenzie e nevoie să-ți actualizezi profilul.' }
            )
            return { name: 'CustomerProfile' }
        }
    },
    {
        path: '/class_review/:id/update',
        name: 'ClassReviewUpdate',
        component: ClassReviewUpdate,
        meta: { requiresAuth: true },
    },
    {
        path: '/class/:id/review/thankyou',
        name: 'ClassReviewThankYou',
        component: ClassReviewThankYou,
        meta: { requiresAuth: false }
    },
    {
        path: '/signin',
        name: 'SignIn',
        component: SignIn,
        meta: { requiresAuth: false },
        porps: route => ({ redirect: route.query.redirect })
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp,
        meta: { requiresAuth: false }
    },
    {
        path: '/resetpassword',
        name: 'ResetPasword',
        component: SignInPaswordReset,
        props: route => ({ query: route.query.email }),
        meta: { requiresAuth: false }
    },
    {
        path: '/newpassword',
        name: 'NewPassword',
        component: SignInNewPassword,
        meta: { requiresAuth: false }
    },
    {
        path: '/confirmationscreen',
        name: 'ConfirmationScreen',
        component: SignUpConfirmationScreen,
        meta: { requiresAuth: false }
    },
    {
        path: '/profile',
        name: 'CustomerProfile',
        component: CustomerProfile,
        porps: route => ({ alert: route.query.alert }),
        meta: { requiresAuth: true }
    },
    {
        path: '/myreviews',
        name: 'CustomerReviews',
        component: CustomerReviews,
        meta: { requiresAuth: true }
    }
    ]
})

export default router
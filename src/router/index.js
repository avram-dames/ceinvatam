import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import SearchResults from '../pages/SearchResults.vue'
import ClassReview from '../pages/ClassReview.vue'
import ClassReviewThankYou from '../pages/ClassReviewThankYou.vue'
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
        path: '/details/partner/:id',
        name: 'Partner',
        component: () => import('../pages/DetailsPartner.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/details/class/:id',
        name: 'Class',
        component: () => import('../pages/DetailsClass.vue'),
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
        path: '/auth/login',
        name: 'SignIn',
        component: () => import('../pages/AuthSignIn.vue'),
        meta: { requiresAuth: false },
        porps: route => ({ redirect: route.query.redirect })
    },
    {
        path: '/auth/register',
        name: 'SignUp',
        component: () => import('../pages/AuthSignUp.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/auth/register/confirmation',
        name: 'SignUpConfirmed',
        component: () => import('../pages/AuthSignupConfirmed.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/auth/password/forgot',
        name: 'PasswordForgot',
        component: () => import('../pages/AuthPasswordForgot.vue'),
        props: route => ({ query: route.query.email }),
        meta: { requiresAuth: false }
    },
    {
        path: '/auth/password/reset-email-sent',
        name: 'PasswordResetEmailSent',
        component: () => import('../pages/AuthPasswordResetEmailSent.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/auth/password/reset',
        name: 'PasswordReset',
        component: () => import('../pages/AuthPasswordReset.vue'),
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
    },
    {
        path: '/contact',
        name: 'Contact',
        component: () => import('../pages/Contact.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/contact/confirmation',
        name: 'ContactFormConfirmation',
        component: () => import('../pages/ContactFormConfirmation.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../pages/NotFound.vue')
    },
    ]
})

export default router
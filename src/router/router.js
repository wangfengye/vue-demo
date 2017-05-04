import App from '../App.vue'
import headTop from '../components/head-top.vue'
<<<<<<< HEAD
import fade from '../page/fade.vue'
import resume from '../page/resume.vue'

export default [{
    path: '/',
=======

export default [{
    path: '/maple',
>>>>>>> ab87b1303ca39e27bbe10422b8c78f82dc5197ee
    component: App,
    children: [{
        path: '/a',
        component: headTop
    }
<<<<<<< HEAD
        ,
    {
        path: '/fade',
        component: fade
    },
    {
        path:'/resume',
        component :resume
    }
=======
>>>>>>> ab87b1303ca39e27bbe10422b8c78f82dc5197ee
    ]
}]
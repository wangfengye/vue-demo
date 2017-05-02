import App from '../App.vue'
import headTop from '../components/head-top.vue'

export default [{
    path: '/maple',
    component: App,
    children: [{
        path: '/a',
        component: headTop
    }
    ]
}]
import Vue from 'vue'
import Router from 'vue-router'
import Courses from '../components/course/index'
import Course from '../components/course/Course'
import CourseEdit from '../components/course/CourseEdit'
import Students from '../components/student/index'
import Student from '../components/student/Student'
import StudentEdit from '../components/student/StudentEdit'
import About from '../components/About'
import Settings from '../components/Settings'
import Assignments from '../components/assignment/index'
import Assignment from '../components/assignment/Assignment'
import AssignmentEdit from '../components/assignment/AssignmentEdit'
import Login from '../components/Login'
import Signup from '../components/Signup'
import store from '../store'

Vue.use(Router)

const chooseRoute = function (collection, name, next) {
  if (collection.length !== 1) {
    next()
  } else {
    next({name: name, params: {id: collection[0].id}})
  }
}

const chooseBeforeEnter = function (collection, name, next) {
  if (collection.length === 0) {
    store.dispatch(`${name}/fetch`).then(response => {
      chooseRoute(response.data, name, next)
    })
  } else {
    chooseRoute(collection, name, next)
  }
}

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/courses',
      name: 'courses',
      component: Courses
    },
    {
      path: '/course/:id',
      name: 'course',
      component: Course,
      props: true
    },
    {
      path: '/course/:id/edit',
      name: 'course-edit',
      component: CourseEdit,
      props: true
    },
    {
      path: '/students',
      name: 'students',
      component: Students,
      beforeEnter: (to, from, next) => {
        chooseBeforeEnter(store.state.student.collection, 'student', next)
      }
    },
    {
      path: '/student/:id',
      name: 'student',
      component: Student,
      props: true
    },
    {
      path: '/',
      name: 'home',
      component: Courses,
      beforeEnter: (to, from, next) => {
        chooseBeforeEnter(store.state.course.collection, 'course', next)
      }
    },
    {
      path: '/assignments',
      name: 'assignments',
      component: Assignments,
      beforeEnter: (to, from, next) => {
        chooseBeforeEnter(store.state.assignment.collection, 'assignment', next)
      }
    },
    {
      path: '/assignment/:id',
      name: 'assignment',
      component: Assignment,
      props: true
    },
    {
      path: '/assignment/:id/edit',
      name: 'assignment-edit',
      component: AssignmentEdit,
      props: true
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/student/:id/edit',
      name: 'student-edit',
      component: StudentEdit,
      props: true
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!store.state.user.authenticated && to.path !== '/login') {
    next({name: 'login'})
  } else {
    next()
  }
})

export default router

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

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/courses',
      name: 'courses',
      component: Courses
    },
    {
      path: '/course/:id',
      name: 'course',
      component: Course
    },
    {
      path: '/course/:id/edit',
      name: 'course-edit',
      component: CourseEdit
    },
    {
      path: '/students',
      name: 'students',
      component: Students
    },
    {
      path: '/student/:id',
      name: 'student',
      component: Student
    },
    {
      path: '/',
      name: 'home',
      component: Courses
    },
    {
      path: '/assignments',
      name: 'assignments',
      component: Assignments
    },
    {
      path: '/assignment/:id',
      name: 'assignment',
      component: Assignment
    },
    {
      path: '/assignment/:id/edit',
      name: 'assignment-edit',
      component: AssignmentEdit
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
      component: StudentEdit
    }
  ]
})

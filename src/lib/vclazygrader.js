import axios from 'axios'

const backendHost = 'localhost:3000'
const apiPrefix = 'api/v1'
const authPrefix = 'auth'

function lazyRequest (path, handlers) {
  axios
    .get(`http://${backendHost}/${apiPrefix}` + path)
    .then(response => {
      handlers.success(response)
    }).catch(function (error) {
      if (typeof handlers.failure === 'function') {
        handlers.failure(error)
      }
    }).finally(function () {
      if (typeof handlers.finally === 'function') {
        handlers.finally()
      }
    })
}

function lazyRequestPromise (path) {
  return axios
    .get(`http://${backendHost}/${apiPrefix}/${path}`)
}

const lazy = {
  get_students: function (handlers) {
    lazyRequest('/students', handlers)
  },

  get_student: function (studentId, handlers) {
    lazyRequest(`/students/${studentId}`, handlers)
  },

  get_courses_for: function (studentId, handlers) {
    lazyRequest(`/courses/for/${studentId}`, handlers)
  },

  get_assignment_status: function (studentId, assignmentId, handlers) {
    return lazyRequestPromise(`/students/${studentId}/status/${assignmentId}`)
  },

  build_assignment: function (studentId, assignmentId, handlers) {
    return lazyRequestPromise(`/students/${studentId}/build/${assignmentId}`)
  },

  grade_assignment: function (studentId, assignmentId, handlers) {
    return lazyRequestPromise(`/students/${studentId}/grade/${assignmentId}`)
  },

  get_assignments_for_course: function (courseId, handlers) {
    lazyRequest(`/assignments/for/${courseId}`, handlers)
  },

  get_course: function (courseId, handlers) {
    lazyRequest(`/courses/${courseId}`, handlers)
  },

  get_courses: function (handlers) {
    lazyRequest('/courses', handlers)
  },

  get_course_infos: function (handlers) {
    lazyRequest('/course_infos/', handlers)
  },

  start_assignment: function (assignmentId, studentId) {
    return lazyRequestPromise(`/students/${studentId}/start/${assignmentId}`)
  },

  get_assignments: function () {
    return lazyRequestPromise(`/assignments`)
  },

  get_assignment: function (assignmentId) {
    return lazyRequestPromise(`/assignments/${assignmentId}`)
  },

  get_students_for_course: function (courseId) {
    return lazyRequestPromise(`/students/for/${courseId}`)
  },

  url: function (path) {
    return `http://${backendHost}/${apiPrefix}/${path}`
  },

  auth: function (path) {
    return `http://${backendHost}/${authPrefix}/${path}`
  }
}

export default lazy

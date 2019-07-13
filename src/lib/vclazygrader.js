import axios from 'axios'

const backendHost = 'localhost:3000'
const apiPrefix = 'api/v1'
const authPrefix = 'auth'

function lazyRequestPromise (path) {
  return axios
    .get(`http://${backendHost}/${apiPrefix}/${path}`)
}

const lazy = {
  build_assignment: function (studentId, assignmentId, handlers) {
    return lazyRequestPromise(`/students/${studentId}/build/${assignmentId}`)
  },

  grade_assignment: function (studentId, assignmentId, handlers) {
    return lazyRequestPromise(`/students/${studentId}/grade/${assignmentId}`)
  },

  start_assignment: function (assignmentId, studentId) {
    return lazyRequestPromise(`/students/${studentId}/start/${assignmentId}`)
  },

  url: function (path) {
    return `http://${backendHost}/${apiPrefix}/${path}`
  },

  auth: function (path) {
    return `http://${backendHost}/${authPrefix}/${path}`
  }
}

export default lazy

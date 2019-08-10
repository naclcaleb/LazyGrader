import Vue from 'vue'
import words from '../lib/en'

const backendHost = 'localhost:3000'
const apiPrefix = 'api/v1'
const authPrefix = 'auth'

function lazyRequestPromise (path) {
  return Vue.axios
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
  },
  check_password (psw, view) {
    const pswLength = psw.length
    let pswArr = psw.split('')
    let capitalCount = 0
    let lowerCount = 0
    let numberCount = 0
    let specialCount = 0
    let leetCharCount = 0
    let translatedPsw
    let translatedWordsArr
    let wordCount = 0
    let pswStrength
    let strengthStr
    pswArr.forEach(function (el, index, arr) {
      if (el.match(/[a-z]/)) {
        lowerCount++
      } else if (el.match(/[A-Z]/)) {
        capitalCount++
      } else if (el.match(/[2689]/)) {
        numberCount++
      } else if (el.match(/[013457]/)) {
        leetCharCount++
        switch (el) {
          case '0':
            arr[index] = 'o'
            break
          case '1':
            arr[index] = 'l'
            break
          case '3':
            arr[index] = 'e'
            break
          case '4':
            arr[index] = 'a'
            break
          case '5':
            arr[index] = 's'
            break
          case '7':
            arr[index] = 't'
            break
        }
      } else {
        specialCount++
      }
    })
    translatedPsw = pswArr.join('')
    translatedWordsArr = translatedPsw.split(' ')
    translatedWordsArr.forEach(function (el) {
      words.forEach(function (word) {
        if (el === word) {
          wordCount++
        }
      })
    })
    let dataArr = [capitalCount + 0.5, lowerCount, numberCount + 1, specialCount + 2, leetCharCount]
    let sum = dataArr.reduce(function (sum, value) {
      return sum + value
    }, 0)
    let avg = sum / dataArr.length
    let diffs = dataArr.map(function (value) {
      return (value - avg) * (value - avg)
    })
    let avgSquareDiff = diffs.reduce(function (sum, value) {
      return sum + value
    }, 0) / diffs.length
    let stdDev = Math.sqrt(avgSquareDiff)
    pswStrength = stdDev + (10 / pswLength) + (wordCount / 2)
    if (pswStrength >= 0 && pswStrength <= 0.7) {
      strengthStr = 'Password Strength: Iron-clad'
    } else if (pswStrength > 0.7 && pswStrength <= 1.4) {
      strengthStr = 'Password Strength: Very Strong'
    } else if (pswStrength > 1.4 && pswStrength <= 2.1) {
      strengthStr = 'Password Strength: Strong'
    } else if (pswStrength > 2.1 && pswStrength <= 2.8) {
      strengthStr = 'Password Strength: Moderate'
    } else if (pswStrength > 2.8 && pswStrength <= 4.2) {
      strengthStr = 'Password Strength: Weak'
    } else if (pswStrength > 4.2) {
      strengthStr = 'Password Strength: Very Weak'
    }
    if (psw === '') {
      view.style.display = 'none'
    } else {
      view.style.display = 'inline-block'
      view.innerHTML = strengthStr
    }
    console.log('Standard Deviation: ' + stdDev + '\nTranslated: ' + translatedPsw + '\nStrength: ' + pswStrength)
  }
}

export default lazy

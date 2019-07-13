<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else class="courses-table">
      <h1>{{ title }}</h1>
      <div class="course-row">
        <div class="course-name table-header">Course Info</div>
        <div class="course-term table-header">Info</div>
      </div>
      <course-row v-for="course in courses" v-bind:course="course" v-bind:key="course.id"/>
    </div>
  </div>
</template>

<script>
import CourseRow from './CourseRow'
import {mapGetters, mapState, mapActions} from 'vuex'

export default {
  name: 'Courses',
  components: {CourseRow},
  data () {
    return {
      loading: true
    }
  },
  computed: {
    ...mapState({
      college_name: state => state.settings.settings.college_name,
      courses: state => state.course.collection,
      courses_loaded: state => state.course.loaded
    }),
    ...mapGetters({
      find: 'course/find'
    }),
    title: function () {
      return this.college_name + ' Courses'
    }
  },
  methods: {
    ...mapActions({
      fetch_courses: 'course/fetch'
    })
  },
  mounted () {
    if (this.courses_loaded) {
      this.loading = false
    } else {
      this.fetch_courses().then(response => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
h2 {
  font-weight: normal;
}

.table-header {
  font-weight: bold;
}

.course-long, .course-name {
  display: table-cell;
  width: 300px;
  text-align: left;
}

.course-term {
  display: table-cell;
  width: 100px;
  text-align: left;
}

.courses-table {
  display: table;
  margin: auto;
}
</style>

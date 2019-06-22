<template>
  <div>
    <h1>{{ title }}</h1>
    <div v-if="loading">Loading...</div>
    <div v-else class="courses-table">
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
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'Courses',
  components: {CourseRow},
  data () {
    return {
      title: 'Ventura College Courses',
      loading: true
    }
  },
  computed: {
    ...mapGetters({
      courses: 'course/collection',
      find: 'course/find'
    })
  },
  methods: {
    ...mapActions({fetch: 'course/fetch'})
  },
  mounted () {
    this.fetch().then(response => {
      this.loading = false
    })
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

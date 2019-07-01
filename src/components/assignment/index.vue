<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <h1>Assignments</h1>
      <div v-for="course in courses" :key="course.id">
        <h3>{{course.course_info.short_name}} - {{course.course_info.long_name}}</h3>
        <div class="assignments-table">
          <div class="assignment-row" v-for="assignment in course.assignments" :key="assignment.id">
            <div class="assignment-name">
              <router-link :to="{name: 'assignment', params: {id: assignment.id}}">{{assignment.name}}</router-link>
            </div>
            <div class="assignment-due_date">
              {{assignment.due_date | formatDate}}
            </div>
            <div class="assignment-invitation">
              <a :href="assignment.invitation_url">GitHub Classroom</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'Assignment',
  data () {
    return {
      loading: true
    }
  },

  computed: {
    ...mapGetters({
      courses: 'course/collection'
    })
  },
  methods: {
    ...mapActions({
      fetch_courses: 'course/fetch'
    })
  },

  mounted () {
    this.fetch_courses()
      .then(resonse => {
        this.loading = false
      })
  }
}

</script>

<style scoped>
.assignments-table {
  display: table;
  margin: auto;
}

.assignment-row {
  display: table-row;
}

.assignment-name, .assignment-due_date, .assignment-invitation {
  display: table-cell;
  text-align: left;
  padding-right: 5px;
  padding-left: 5px;
}

.assignment-name {
  width: 195px;
}
</style>

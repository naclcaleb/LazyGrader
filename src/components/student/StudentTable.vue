<template>
  <div class="students-table">
    <b-table small :items="students" :fields="fields">
      <template slot="index" slot-scope="data">
        {{data.index + 1}}
      </template>

      <template slot="student.name" slot-scope="data">
        <router-link class='right-aligned' :to="{name:'student', params: {id: data.item.student_id}}">{{data.value}}</router-link>
      </template>

      <template slot="student.canvas_id" slot-scope="data">
        <a :href="`http://vcccd.instructure.com/courses/${course.canvas_id}/users/${data.value}`">{{data.value}}</a>
      </template>

      <template slot="canvas_id" slot-scope="data">
        {{data.value}}
      </template>
    </b-table>
  </div>

</template>

<script>
export default {
  name: 'StudentTable',
  props: {
    students: Array,
    course: Object
  },
  data () {
    return {
      fields: {
        index: {
          key: 'index'
        },
        name: {
          key: 'student.name',
          label: 'Name',
          class: 'left-aligned'
        },
        plicker_number: {
          key: 'plicker_number',
          label: 'Plicker #',
          class: 'right-aligned'
        },
        email: {
          key: 'student.email',
          label: 'Student Email',
          class: 'left-aligned'
        },
        slack_id: {
          key: 'student.slack_id',
          label: 'Slack'
        },
        github: {
          key: 'student.github_username',
          label: 'GitHub Username'
        },
        student_id: {
          key: 'student.student_id',
          label: 'Student ID',
          class: 'right-aligned'
        },
        canvas_id: {
          key: 'student.canvas_id',
          label: 'Canvas ID',
          class: 'right-aligned'
        }
      }
    }
  }
}
</script>

<style scoped>
  .students-table {
    margin: 20px;
  }
</style>

<style>
  .left-aligned {
    text-align: left;
  }

  .right-aligned {
    text-align: right;
  }
</style>

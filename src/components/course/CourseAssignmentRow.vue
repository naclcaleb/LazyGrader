<template>
  <div class="assignment-row">
    <div class="assignment-name">
      <a :href="assignment.invitation_url">{{assignment.name}}</a>
    </div>
    <div class="assignment-due_date">
      {{assignment.due_date | formatDate}}
    </div>
    <div class="assignment-due_date">
      {{assignment.open_date | formatDate}}
    </div>
    <div class="assignment-due_date">
      {{assignment.close_date | formatDate}}
    </div>
    <div class="assignment-due_date">
      <router-link :to="assignment_url" >
        <img class="icon-big" :src="require('../../assets/eyecon.svg')"/>
      </router-link>
      <a :href="canvas_url" target="_blank">
        <img class="icon-small" :src="require('../../assets/canvas.png')"/>
      </a>
      <a :href="github_url" target="_blank" >
        <img class="icon-small" :src="require('../../assets/github.png')"/>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseAssignmentRow',
  props: {
    assignment: Object,
    course: Object
  },
  computed: {
    assignment_url: function () {
      return {name: 'assignment', params: {id: this.assignment.id}}
    },

    canvas_url: function () {
      return `https://vcccd.instructure.com/courses/${this.course.canvas_id}/assignments/${this.assignment.canvas_id}`
    },

    github_url: function () {
      return `${this.course.course_info.github_org}/${this.assignment.name}`
    }
  }
}
</script>

<style scoped>
.assignment-row {
  display: table-row;
}

.assignment-name, .assignment-due_date {
  display: table-cell;
}

.assignment-due_date {
  padding-right: 5px;
  padding-left: 5px;
}

.assignment-name {
  width: 200px;
  text-align: left;
}

  .icon-big {
    width: 18px;
    height: 18px;
    vertical-align: middle;
  }

  .icon-small {
    width: 15px;
    height: 15px;
    vertical-align: middle;
  }
</style>

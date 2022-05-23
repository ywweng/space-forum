<script>
  import { useRoute } from 'vue-router'
  import { ref } from 'vue'
  import api from '@/utils/api'
  import { fromNow, setAvatar } from '@/utils/mixin'

  export default {
    setup() {
      const route = useRoute()
      const spaceId = route.params.id
      const comments = ref([])

      const fetchComments = async (id) => {
        try {
          const { data } = await api.getComments(id)
          comments.value = data
        } catch (error) {}
      }
      fetchComments(spaceId)

      return {
        fromNow,
        setAvatar,
        comments
      }
    }
  }
</script>

<template>
  <div
    class="comment d-flex flex-column p-3 my-2"
    v-for="comment in comments"
    :key="comment.id"
  >
    <div
      class="comment-header d-flex justify-content-between align-items-center my-1"
    >
      <div class="info d-flex my-auto">
        <img
          :src="setAvatar(comment.user.avatar)"
          class="avatar me-2 rounded-circle"
        />
        <span class="nickname fs-4">{{ comment.user.name }}</span>
        <span class="id">#{{ comment.user.id }}</span>
      </div>
      <div class="datetime">
        <span class="justify-content-center">{{ fromNow(comment.date) }}</span>
      </div>
    </div>
    <div class="comment-body ps-3 ms-4">
      <span class="content">
        {{ comment.comment }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .comment {
    @extend %glassBg;
  }
</style>

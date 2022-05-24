<script>
  import { useRoute } from 'vue-router'
  import { ref } from 'vue'
  import api from '@/utils/api'
  import { fromNow, setAvatar, Toast } from '@/utils/mixin'
  import { storeToRefs } from 'pinia'
  import { mainStore } from '@/store/index'

  export default {
    props: ['replies'],
    setup(props, { emit }) {
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

      const store = mainStore()
      const { user, isRegister } = storeToRefs(store)
      const comment = ref('')
      const reply = async () => {
        if (comment.value === '') {
          Toast.fire({ title: '不可空白', icon: 'warning' })
          return
        } else {
          const commentData = {
            postId: spaceId,
            user: { ...user.value },
            date: new Date(),
            comment: comment.value
          }
          const { data } = await api.postComment(commentData)
          console.log(data, commentData)
          const count = ref(props.replies)
          emit('afterReply', count.value + 1)
          comments.value.unshift(commentData)
          Toast.fire({ title: '留言成功', icon: 'success' })
          comment.value = ''
          fetchComments(spaceId)
        }
      }

      return {
        fromNow,
        setAvatar,
        comments,
        user,
        isRegister,
        comment,
        reply
      }
    }
  }
</script>

<template>
  <div class="reply w-100 p-3">
    <div class="d-flex align-items-center w-100" v-if="isRegister">
      <div class="info">
        <span class="nickname fs-5">{{ user.name }}</span>
        <span class="id">#{{ user.id }}</span>
      </div>
      <textarea
        type="text"
        class="reply-text mx-2 w-100"
        placeholder="留言..."
        maxlength="100"
        v-model.trim="comment"
      />
      <button type="button" class="btn" @click="reply">
        <ion-icon name="send-outline"></ion-icon>
      </button>
    </div>
    <div v-else>
      <span>填寫名稱後才能留言。</span
      ><router-link to="/profile">點我去填寫</router-link>
    </div>
  </div>
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

  .reply {
    @extend %glassBg;
    .reply-text {
      background: none;
      border: none;
      outline: none;
    }
  }
</style>

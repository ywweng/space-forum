<script>
  import Comments from '@/components/Comments.vue'
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'
  import api from '@/utils/api'
  import { fromNow, setAvatar } from '@/utils/mixin'

  export default {
    components: {
      Comments
    },
    emits: ['afterReply'],
    setup(props, { emit }) {
      const route = useRoute()
      const spaceId = route.params.id
      const space = ref({ user: { avatar: '' } })
      const isLoading = ref(true)

      const fetchSpace = async (id) => {
        try {
          const { data } = await api.getSpace(id)
          space.value = { ...data[0] }
          isLoading.value = false
        } catch (error) {}
      }
      fetchSpace(spaceId)

      const afterReply = async (payload) => {
        space.value.replies = payload
        const { data } = await api.putSpace(space.value)
      }

      return {
        isLoading,
        setAvatar,
        fromNow,
        space,
        afterReply
      }
    }
  }
</script>

<template>
  <div
    class="d-flex justify-content-center align-items-center vh-100"
    v-if="isLoading"
  >
    <div class="spinner-border" role="status" style="width: 3rem; height: 3rem">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div id="card">
    <div class="d-flex align-items-center pt-4">
      <router-link to="/"
        ><ion-icon size="large" name="chevron-back-outline"></ion-icon
      ></router-link>
      <h1 class="logo px-2 mx-auto">Space</h1>
    </div>
    <div class="space d-flex flex-column my-3 p-1">
      <div
        class="space-header d-flex justify-content-between align-items-center p-3"
      >
        <div class="info d-flex my-auto">
          <img
            :src="setAvatar(space.user.gender)"
            class="avatar me-3 rounded-circle"
          />
          <span class="nickname fs-4">{{ space.user.name }}</span>
          <span class="id">#{{ space.user.id }}</span>
        </div>
        <div class="datetime">
          <span class="justify-content-center">{{ fromNow(space.date) }}</span>
        </div>
      </div>
      <div class="space-body px-3">
        <h5 class="title fs-5">{{ space.title }}</h5>
        <span class="content">
          {{ space.content }}
        </span>
      </div>
      <div class="space-footer d-flex justify-content-around py-1">
        <div class="d-flex align-center">
          <button type="button" class="pt-2 action">
            <ion-icon name="chatbubbles-outline"></ion-icon>
          </button>
          <span class="m-2 comment-count">{{ space.replies || 0 }}</span>
        </div>
      </div>
    </div>
    <Comments :replies="space.replies" @after-reply="afterReply" />
  </div>
</template>

<style lang="scss" scoped>
  #card {
    padding-bottom: 3rem;
  }
  .space {
    @extend %glassBg;
    .action {
      border: none;
      background: inherit;
    }
  }
</style>

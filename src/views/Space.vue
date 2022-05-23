<script>
  import Comments from '@/components/CardComments.vue'
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'
  import api from '@/utils/api'
  import { fromNow, setAvatar } from '@/utils/mixin'

  export default {
    components: {
      Comments
    },
    setup() {
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

      return {
        isLoading,
        setAvatar,
        fromNow,
        space
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
          <span class="justify-content-center">{{
            fromNow(space.date)
          }}</span>
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
            <ion-icon name="heart-outline"></ion-icon>
          </button>
          <span class="m-2 like-count">{{ space.likes }}</span>
        </div>
        <div class="d-flex align-center">
          <button type="button" class="pt-2 action">
            <ion-icon name="chatbubbles-outline"></ion-icon>
          </button>
          <span class="m-2 comment-count">{{ space.replies }}</span>
        </div>
      </div>
    </div>
    <form class="reply d-flex align-items-center p-2">
      <div class="info">
        <span class="nickname fs-5">Nick</span>
        <span class="id">#2</span>
      </div>
      <textarea
        type="text"
        class="reply-text mx-2 w-100"
        placeholder="留言..."
        maxlength="100"
      />
      <button type="submit" class="btn">
        <ion-icon name="send-outline"></ion-icon>
      </button>
    </form>
    <Comments />
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
  .reply {
    @extend %glassBg;
    .reply-text {
      background: none;
      border: none;
      outline: none;
    }
  }
</style>

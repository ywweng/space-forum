<script>
  import api from '@/utils/api'
  import { fromNow, setAvatar } from '@/utils/mixin'
  import { ref, toRef, watch, onMounted } from 'vue'

  export default {
    props: {
      searchData: {
        type: [Object, Array],
        default: {}
      }
    },
    setup(props) {
      const isLoading = ref(true)
      const posts = ref([])
      const totalPage = ref(1)
      const currentPage = ref(1)

      const fetchPosts = async (page = 1) => {
        try {
          const { pages, data } = await api.getPosts(page)
          if (page === 1) {
            posts.value = data
            totalPage.value = pages
          } else {
            posts.value.push(...data)
          }
          isLoading.value = false
        } catch (error) {}
      }
      onMounted(() => {
        fetchPosts()
      })

      const more = ref('More...')
      const morePage = () => {
        if (currentPage.value >= totalPage.value) {
          more.value = 'No more!'
          return
        } else {
          currentPage.value++
        }
      }
      watch(currentPage, () => {
        if (currentPage.value > totalPage.value) return
        fetchPosts(currentPage.value)
      })

      const searchData = toRef(props, 'searchData')
      watch(searchData, () => {
        currentPage.value = 1
        totalPage.value = Math.ceil(searchData.value.length / 10)
        posts.value = searchData.value
      })

      return {
        setAvatar,
        fromNow,
        isLoading,
        posts,
        currentPage,
        morePage,
        more
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
  <div
    class="space d-flex flex-column my-3 p-1"
    @click="$router.push(`/space/${post.id}`)"
    v-for="post in posts"
    :key="post.id"
    v-else
  >
    <div
      class="space-header d-flex justify-content-between align-items-center p-3"
    >
      <div class="info d-flex my-auto">
        <img
          :src="setAvatar(post.user.gender)"
          class="avatar me-3 rounded-circle"
        />

        <span class="nickname fs-4">{{ post.user.name }}</span>
        <span class="id">#{{ post.user.id }}</span>
      </div>
      <div class="datetime">
        <span class="justify-content-center">{{ fromNow(post.date) }}</span>
      </div>
    </div>
    <div class="space-body px-3">
      <h5 class="title fs-5">{{ post.title }}</h5>
      <span class="preview">
        {{ post.content }}
      </span>
    </div>
    <div class="space-footer d-flex justify-content-around py-1">
      <div class="d-flex align-center">
        <button type="button" class="pt-2 action">
          <ion-icon name="chatbubbles-outline"></ion-icon>
        </button>
        <span class="m-2 reply-count">{{ post.replies || 0 }}</span>
      </div>
    </div>
  </div>
  <button
    type="button"
    class="btn more p-2 text-center w-100"
    @click="morePage"
    :disabled="more === 'No more!'"
  >
    {{ more }}
  </button>
</template>

<style lang="scss" scoped>
  .space {
    @extend %glassBg;
    cursor: pointer;
    .preview {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2; // 行數
      -webkit-box-orient: vertical;
      .id {
        color: var(--text-color);
      }
    }
    .action {
      border: none;
      background: inherit;
    }
  }

  .more {
    @extend %glassBg;
  }
</style>

<script>
  import { ref } from 'vue'
  import api from '@/utils/api'
  import { Toast } from '@/utils/mixin'
  import { storeToRefs } from 'pinia'
  import { mainStore } from '@/store/index'

  export default {
    setup() {
      const store = mainStore()
      const { user, isRegister } = storeToRefs(store)
      const title = ref('')
      const content = ref('')

      const post = async () => {
        if (title.value === '' || content.value === '') {
          Toast.fire({ title: '不可空白', icon: 'warning' })
          return
        } else {
           const spaceData = {
            user: user.value,
            date: new Date(),
            title: title.value,
            content: content.value,
            likes: 0
          }
          const { data } = await api.postSpace(spaceData)
          Toast.fire({ title: '發佈成功', icon: 'success' })
          title.value = ''
          content.value = ''
        }
      }

      return {
        user,
        isRegister,
        title,
        content,
        post
      }
    }
  }
</script>

<template>
  <div id="post" v-if="isRegister">
    <div class="d-flex align-items-center justify-content-between pt-4">
      <h1 class="logo px-2">Post</h1>
    </div>
    <form class="d-flex flex-column m-3">
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="floatingTitle"
          placeholder="title"
          maxlength="20"
          v-model.trim="title"
        />
        <label for="floatingTitle">Title</label>
        <div class="text-end">{{ title.length }}/20</div>
      </div>
      <div class="form-floating mb-3">
        <textarea
          class="form-control"
          id="floatingContent"
          placeholder="Content"
          style="height: 20rem"
          maxlength="500"
          v-model.trim="content"
        />
        <label for="floatingContent">Content</label>
        <div class="text-end">{{ content.length }}/500</div>
      </div>
      <button type="button" class="btn btn-post mb-3" @click.prevent="post">
        Post
      </button>
    </form>
  </div>
  <div class="alert alert-warning mt-5 ms-3" role="alert" v-else>
    <span>填寫名稱才能留言。</span
    ><router-link to="/profile">點我去填寫</router-link>
  </div>
</template>

<style lang="scss" scoped>
  #post {
    padding-bottom: 3rem;
  }

  .btn-post {
    background: var(--btn-color);
    border-radius: 30px;
    &:hover {
      opacity: 0.8;
    }
  }
</style>

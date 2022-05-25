<script>
  import CardList from '@/components/CardList.vue'
  import api from '@/utils/api'
  import { ref } from 'vue'

  export default {
    name: 'Home',
    components: {
      CardList
    },
    setup() {
      const searchInput = ref('')
      const searchData = ref([])
      const getSearch = async (value) => {
        try {
          const { data } = await api.getSearchPosts(searchInput.value)
          searchData.value = data
          searchInput.value = ''
        } catch (error) {}
      }

      return {
        searchInput,
        searchData,
        getSearch
      }
    }
  }
</script>

<template>
  <div id="home">
    <div class="d-flex align-items-center justify-content-between pt-4">
      <h1 class="logo px-2">Space</h1>
      <form class="d-flex justify-content-end" @submit.prevent="getSearch">
        <input
          type="search"
          name="search"
          class="search-bar p-2"
          placeholder="搜尋貼文"
          v-model.trim="searchInput"
          maxlength="20"
        />
      </form>
    </div>
    <article class="article">
      <CardList :search-data="searchData" />
    </article>
  </div>
</template>

<style lang="scss" scoped>
  #home {
    height: calc(100vh - 4rem);
    overflow-y: scroll;
  }
  .article {
    padding-bottom: 3rem;
  }
  input.search-bar {
    width: 50px;
    border: 1px solid #ccc;
    border-radius: 50px;
    box-shadow: 0 3px 10px -2px rgba(0, 0, 0, 0.1);
    outline: none;
    transition: width 0.3s ease-in-out;
    background: #fff url(https://i.imgur.com/seveWIw.png) no-repeat
      calc(100% - 15px) center;
    &::placeholder {
      visibility: hidden;
    }
    &:focus {
      background-image: none;
      width: 100%;
      cursor: text;
      &::placeholder {
        visibility: visible;
        color: #ccc;
      }
    }
  }
  @media screen and (min-width: 768px) {
    #home {
      height: calc(100vh - 1rem);
    }
    .article {
    padding-bottom: 0;
  }
  }
</style>

<script>
  import CardList from '@/components/CardList.vue'

  export default {
    name: 'App',
    components: {
      CardList
    }
  }
</script>

<template>
  <div id="home">
    <div class="d-flex align-items-center justify-content-between pt-4">
      <h1 class="logo px-2">Space</h1>
      <form class="d-flex justify-content-end">
        <input
          type="search"
          name="search"
          class="form-control search-bar"
          placeholder="Search..."
        />
      </form>
    </div>
    <article class="article">
      <CardList v-for="index in 10" />
    </article>
  </div>
</template>

<style lang="scss" scoped>
  .article {
    padding-bottom: 3rem;
  }
  input.search-bar {
    width: 50px;
    border-radius: 50px;
    transition: width 0.3s ease-in-out;
    box-shadow: 0 3px 10px -2px rgba(0, 0, 0, 0.1);
    background: #fff url(https://i.imgur.com/seveWIw.png) no-repeat
      calc(100% - 15px) center;
    &::placeholder {
      visibility: hidden;
      
    }
    &:focus {
      width: 100%;
      cursor: text;
      &::placeholder {
        visibility: visible;
      }
    }
  }
</style>

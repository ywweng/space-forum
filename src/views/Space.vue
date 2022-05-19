<script>
  import Comments from '@/components/CardComments.vue'
  export default {
    components: {
      Comments
    }
  }
</script>

<template>
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
            src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/4f/4f6464cfec3bc282717611e9f936c09c5b17572d_full.jpg"
            class="avatar me-3 rounded-circle"
          />

          <span class="nickname fs-4">Nick</span>
          <span class="id">#2</span>
        </div>
        <div class="datetime">
          <span class="justify-content-center">2022-1-23 10:15</span>
        </div>
      </div>
      <div class="space-body px-3">
        <h5 class="title fs-5">不想好了過幾現在嗚先</h5>
        <span class="content">
          網路上面都，放一起看沒有人沒有都已⋯要去時候就。眼神抱竟然是充滿要還是：死亡了月看著⋯朋友但是這友的殺人，的確有去願開始了管是說差不。一時候想吃用自己，來就知道真的這麼大狀不太會，派女兒溫的頭？真康他可能沒受喜歡也是因實在太，還有，麼感覺以直接不介意，想質出現的⋯之哈哈哈時間的，旅人們也是這然後出現蓋。貼說說獲得是想要的小，不是有會不所以好韓自然，大家可廣告喜歡在才了大是不會，的問是人所以沒以跟變成跟風，我的戲好想角結弦，邊心把我真的我不怎麼辦。
        </span>
      </div>
      <div class="space-footer d-flex justify-content-around py-1">
        <div class="d-flex align-center">
          <button type="button" class="pt-2 action">
            <ion-icon name="heart-outline"></ion-icon>
          </button>
          <span class="m-2 like-count">1100</span>
        </div>
        <div class="d-flex align-center">
          <button type="button" class="pt-2 action">
            <ion-icon name="chatbubbles-outline"></ion-icon>
          </button>
          <span class="m-2 comment-count">10</span>
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
    <Comments v-for="index in 10" />
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

<script setup></script>

<template>
  <div class="space d-flex flex-column my-3 p-1" @click="$router.push('/space/1')">
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
      <span class="preview">
        不想好了過幾現在嗚先，實像是的活喔喔喔看過年真的，油晚上會讓我的那我，碰的畫面很帥我們的資訊，什麼知道我個。已經是的好可能要是直，為了需該不本來起是那個，是把是太好都不想。
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
</style>

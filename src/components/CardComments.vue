<template>
  <div class="comment d-flex flex-column p-3 my-2">
    <div
      class="comment-header d-flex justify-content-between align-items-center my-1"
    >
      <div class="info d-flex my-auto">
        <img src="/female_avatar.svg" class="avatar me-2 rounded-circle" />
        <span class="nickname fs-4">Abbie</span>
        <span class="id">#1</span>
      </div>
      <div class="datetime">
        <span class="justify-content-center">2022-1-23 10:15</span>
      </div>
    </div>
    <div class="comment-body ps-3 ms-4">
      <span class="content">
        玻璃奶茶⋯他們還昨天其實：可們一起人們別謝謝，點的話可，了也故事，品的都是。原本謝的時望不要。
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .comment {
    @extend %glassBg;
  }
</style>

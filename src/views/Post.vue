<template>
  <div id="post">
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
        />
        <label for="floatingTitle">Title</label>
        <div class="text-end">1/20</div>
      </div>
      <div class="form-floating mb-3">
        <textarea
          class="form-control"
          id="floatingContent"
          placeholder="Content"
          style="height: 20rem"
          maxlength="500"
        />
        <label for="floatingContent">Content</label>
        <div class="text-end">1/500</div>
      </div>
      <button type="submit" class="btn btn-post mb-3">Post</button>
    </form>
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

<template>
  <div id="profile">
    <div class="d-flex align-items-center justify-content-between pt-4">
      <h1 class="logo px-2">Profile</h1>
    </div>
    <form class="d-flex flex-column m-3">
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="floatingId"
          placeholder="ID"
          value="1"
          readonly
        />
        <label for="floatingId">ID</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="floatingNickname"
          placeholder="Nickname"
        />
        <label for="floatingNickname">Nickname</label>
      </div>
      <div class="form-floating mb-3">
        <span class="me-3">Gender</span>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio1"
            value="Male"
            checked
          />
          <label class="form-check-label" for="inlineRadio1">Male</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio2"
            value="Female"
          />
          <label class="form-check-label" for="inlineRadio2">Female</label>
        </div>
      </div>
      <button type="submit" class="btn btn-save mb-3">Save</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
  #profile {
    padding-bottom: 3rem;
  }

  .form-check-input {
    color: var(--text-color);
  }

  .btn-save {
    background: var(--btn-color);
    border-radius: 30px;
    &:hover {
      opacity: 0.8;
    }
  }
</style>

<template>
  <div id="icon-description-wrapper">
    <div id="icon-description-overlay">
      <div id="icon-description-inner-wrapper">
        <div class="icon-description">
          <font-awesome-icon class="icon" icon="search"></font-awesome-icon>
          <p>Search stories</p>
        </div>
        <div class="inline">
          <div class="icon-description">
            <font-awesome-icon class="icon" icon="pen-alt"></font-awesome-icon>
            <p>Create stories</p>
          </div>
          <div class="icon-description">
            <font-awesome-icon class="icon" icon="share-alt"></font-awesome-icon>
            <p>Share stories</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.icon {
  font-size: 1.5rem;
}
.icon-description {
  color: #fff;
  margin: 2rem;
}
.inline .icon-description {
  display: inline-block;
}
#description {
  color: #fff;
  padding: 1rem;
  padding-bottom: 2rem;
}

/* Smartphones */
@media screen and (max-width: 500px) {
  #icon-description-wrapper {
    display: none;
  }
}
/* Desktops & Laptops */
@media screen and (min-width: 769px) and (max-width: 1170px) {
  .icon-description {
    background: rgba(255, 255, 255, 0.02);
    padding: 0.1rem;
    padding-top: 1rem;
    border-radius: 10px;
    width: 25vw;
  }
  .inline .icon-description {
    display: block;
  }
  #icon-description-overlay {
    background: rgba(255, 255, 255, 0.02);
    width: 100%;
    margin-left: 3rem;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #icon-description-wrapper {
    width: 40vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #icon-description-inner-wrapper {
    display: block;
  }
}
/* Widescreens */
@media screen and (min-width: 1171px) {
  .icon-description {
    margin: 3rem;
    background: rgba(255, 255, 255, 0.02);
    padding: 0.5rem;
    padding-top: 1rem;
    border-radius: 10px;
    width: 25vw;
  }
  .inline .icon-description {
    display: block;
    margin: 3rem;
  }
  #icon-description-overlay {
    background: rgba(255, 255, 255, 0.02);
    width: 100%;
    margin-left: 3rem;
    height: 82vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #icon-description-wrapper {
    width: 40vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
<template>
  <div class="main-container">
    <!-- <div id="nav">
      <router-link to="/lunch-place">Place Overview</router-link> |
      <router-link to="/lunch-place-detail/:placeId">Place Detail</router-link>|
      <router-link to="/lunch-place-add">Add-place</router-link>
    </div> -->
    <router-view> </router-view>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');

.main-container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  align-items: center;
  color: #2c3e50;
}

html, body {
  background-color: #e9ecef !important;
  font-family: 'Roboto', sans-serif !important;
}

button {
  padding: 1rem 2rem !important;
  font-size: 18px !important;
  border-radius: 10px !important;
  color:white !important;
}

@media (min-width: 351px) and (max-width: 500px) {
  body {
    width: 100%;
  }

  .container-fluid {
    width: 100%;
  }

  .jumbotron {
    width: 185%;
  }

  #save-place > button {
    margin-bottom: 10px;
  }

  .modal-review {
    width: 75%;
  }
}

@media (min-width: 200px) and (max-width: 350px) {
  body {
    width: 100%;
  }

  .container-fluid {
    width: 100%;
  }

  .jumbotron {
    width: 215%;
  }

  #save-place > button {
    margin-bottom: 10px;
  }

  .modal-review {
    width: 75%;
  }
}

@media (min-width: 1000px) and (max-width: 1900px) {
  body {
    width: 100%;
  }
}
</style>


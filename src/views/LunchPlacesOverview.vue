
<template>
  <div>
    <div class="jumbotron" style="font-family: verdana">
      <h1 id="title-lunch-places">Lunch places overview</h1>

      <div class="container-fluid">
        <table class="table table-stripped">
          <thead id="table-head-places" style="text-align: left">
            <th>Place name</th>
            <th>Description for place</th>
            <th>Address</th>
            <th>Place menu</th>
            <th style="text-align: center">Average vote</th>
            <th>Actions</th>
          </thead>

          <tbody>
            <tr
              v-for="(place, index) in lunchPlaces"
              :key="index"
              id="table-row-places"
            >
              <td
                @click="navigateToPlaceDetails(place, index)"
                style="cursor: pointer"
              >
                {{ place.name }}
              </td>
              <td>{{ place.description }}</td>
              <td>{{ place.address }}</td>
              <td>
                <a :href="place.linkToRestaurantMenu" target="_blank"
                  >See menu</a
                >
              </td>
              <td
                v-bind:style="
                  calculateAverageVote(place.votes) >= 7
                    ? 'color: green; font-size:22px; text-align:center;'
                    : 'color: red; font-size:22px; text-align:center;'
                "
              >
                {{ calculateAverageVote(place.votes) }} / 10
              </td>
              <td :title="'Delete ' + place.name">
                <svg
                  class="svg-icon"
                  @click="removePlace(place)"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="none"
                    d="M7.083,8.25H5.917v7h1.167V8.25z M18.75,3h-5.834V1.25c0-0.323-0.262-0.583-0.582-0.583H7.667
								c-0.322,0-0.583,0.261-0.583,0.583V3H1.25C0.928,3,0.667,3.261,0.667,3.583c0,0.323,0.261,0.583,0.583,0.583h1.167v14
								c0,0.644,0.522,1.166,1.167,1.166h12.833c0.645,0,1.168-0.522,1.168-1.166v-14h1.166c0.322,0,0.584-0.261,0.584-0.583
								C19.334,3.261,19.072,3,18.75,3z M8.25,1.833h3.5V3h-3.5V1.833z M16.416,17.584c0,0.322-0.262,0.583-0.582,0.583H4.167
								c-0.322,0-0.583-0.261-0.583-0.583V4.167h12.833V17.584z M14.084,8.25h-1.168v7h1.168V8.25z M10.583,7.083H9.417v8.167h1.167V7.083
								z"
                  ></path>
                </svg>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="add-new-place">
        <button class="btn btn-primary" @click="navigateToAddPlace()">
          Add new place
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import store from "../store/index.js";

export default {
  name: "LunchPlacesOverview",
  data() {
    return {
      lunchPlaces: store.state.lunchPlaces,
    };
  },
  computed: {},
  created() {},
  methods: {
    navigateToPlaceDetails(place, index) {
      this.$router.push({
        name: "LunchPlaceDetail",
        params: {
          placeId: index,
        },
      });
    },

    navigateToAddPlace() {
      this.$router.push({
        name: "AddPlace",
      });
    },

    calculateAverageVote(votes) {
      let sum = 0;

      votes.forEach((element) => {
        sum = sum + element.voteValue;
      });

      return Math.round(sum / votes.length) || "--";
    },

    removePlace(place) {
      this.$store.dispatch("deletePlace", place.id);

      this.showToast("success", place);
    },

    showToast(variant = "success", place) {
      this.$bvToast.toast(`${place.name} successfully deleted.`, {
        title: "DELETED",
        variant: variant,
        solid: true,
      });
    },
  },
};
</script>

<style>
#add-new-place > button:hover {
  opacity: 0.8;
}

#add-new-place > button:disabled {
  cursor: not-allowed;
}

#title-lunch-places {
  font-family: Verdana;
  font-size: 26px;
  color: #14049e;
  text-transform: uppercase;
  margin-bottom: 40px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

#table-head-places {
  font-family: Verdana;
  font-size: 14px;
  color: #0f094b;
  text-transform: uppercase;
  margin: 30px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

#table-row-places {
  text-align: left;
  font-size: 14px;
  color: #127c8f;
}

.svg-icon {
  width: 2em;
  height: 2em;
  cursor: pointer;
  margin-left: 25px;
}

.svg-icon path,
.svg-icon polygon,
.svg-icon rect {
  fill: #f54545;
}

.svg-icon circle {
  stroke: #4691f6;
  stroke-width: 2;
}
</style>
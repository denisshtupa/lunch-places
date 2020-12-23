
<template>
  <div class="jumbotron">
    <div class="col-sm-12" style="border-radius: 10px">
      <b-card bg-variant="info" style="padding-left: 20px">
        <b-form-group
          label="Place name"
          label-for="nested-name"
          label-cols-sm="3"
          style="flex-direction: column; text-align: left"
        >
          <b-form-input
            class="col-sm-8"
            v-model="placeName"
            id="nested-name"
            placeholder="Insert name of place..."
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Description"
          label-for="nested-description"
          label-cols-sm="3"
          style="flex-direction: column; text-align: left"
        >
          <b-form-input
            class="col-sm-8"
            v-model="description"
            id="nested-description"
            placeholder="Insert short description of place..."
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Address of place"
          label-for="nested-address"
          label-cols-sm="3"
          style="flex-direction: column; text-align: left"
        >
          <b-form-input
            class="col-sm-8"
            v-model="address"
            id="nested-address"
            placeholder="Insert address of place..."
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Link of menu"
          label-for="nested-link-menu"
          label-cols-sm="3"
          style="flex-direction: column; text-align: left"
        >
          <b-form-input
            class="col-sm-8"
            v-model="link"
            id="nested-link-menu"
            placeholder="Insert link of place from tripadvisor suggested..."
          ></b-form-input>
        </b-form-group>
      </b-card>

      <div id="save-place">
        <button
          class="btn btn-success col-sm-3"
          style="margin-right: 10px"
          :disabled="!placeName || !description || !address || !link"
          @click="addPlace()"
        >
          Save place
        </button>
        <button
          class="btn btn-warning col-sm-3"
          @click="goToPlaceOverview()"
          >Back to places overview</button
        >
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store/index.js";

export default {
  name: "AddPlace",
  data() {
    return {
      lunchPlaces: store.state.lunchPlaces,
      placeName: "",
      description: "",
      address: "",
      link: "",
    };
  },
  computed: {},
  created() {},
  methods: {
    savePlace() {},

    goToPlaceOverview() {
      this.$router.push({
        name: "LunchPlaceOverview",
      });
    },

    addPlace() {
      var place = {
        name: this.placeName,
        description: this.description,
        address: this.address,
        linkToRestaurantMenu: this.link,
      };

      if (
        this.lunchPlaces.some(
          (x) =>
            x.name.toString().toLowerCase().trim() ==
            this.placeName.toString().toLowerCase().trim()
        )
      ) {
        this.showToastError("danger", this.placeName);
        return;
      }

      this.$store.dispatch("addPlace", place);
      this.goToPlaceOverview();
    },

    showToast(variant = "success", placeName) {
      this.$bvToast.toast(`${placeName} was successfully added.`, {
        title: "CREATED",
        variant: variant,
        solid: true,
      });
    },

    showToastError(variant = "success", placeName) {
      this.$bvToast.toast(`${placeName} already exist.`, {
        title: "ERROR",
        variant: variant,
        solid: true,
      });
    },
  },
};
</script>


<style>
.form-row.form-group > label {
  font-size: 18px;
  color: #14049e;
  letter-spacing: 1px;
  text-transform: uppercase;
}

#save-place {
  padding: 30px;
}

#save-place > button:hover {
  opacity: 0.8;
}

#save-place > button:disabled {
  cursor: not-allowed;
}

.col-sm-12 > .card {
  border-radius: 20px;
}
</style>
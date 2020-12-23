<template>
  <div class="jumbotron">
    <h2 id="place-name-rating">{{ placeName }} rating</h2>

    <p v-if="votes.length == 0" id="no-review-message">
      <strong>{{ placeName }}</strong> doesnt have any feedback. Lets add first
      review for it.
    </p>

    <div class="col-sm-10" v-if="votes.length != 0" style="align-items: center">
      <div
        class="card"
        style="margin-bottom: 20px"
        v-for="vote in votes"
        :key="vote.voteId"
      >
        <div class="card-body">
          <div class="row">
            <div class="col-md-2">
              <b-avatar
                v-if="vote.voteValue >= 8"
                variant="success"
                class="avatar"
              ></b-avatar>

              <b-avatar
                v-if="vote.voteValue >= 5 && vote.voteValue < 8"
                variant="warning"
                class="avatar"
              ></b-avatar>

              <b-avatar
                v-if="vote.voteValue < 5"
                variant="danger"
                class="avatar"
              ></b-avatar>
            </div>
            <div class="col-md-10">
              <h2 class="float-left">
                <strong>{{ vote.voterName }}</strong>
                <span v-bind:style="voteValueColor(vote.voteValue)">
                  {{ vote.voteValue }}
                </span>
              </h2>
              <div class="clearfix"></div>
              <p style="text-align: left">{{ vote.voterComment }}</p>

              <b-button
                id="delete-vote"
                class="col-sm-3 float-right"
                variant="danger"
                @click="deleteVote(vote)"
                >Delete vote</b-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div id="save-place">
        <b-button
          v-if="votes.length > 0"
          variant="info"
          class="col-sm-2"
          style="margin-right: 15px"
          @click="clearReviews()"
          >Clear reviews</b-button
        >
        <b-button
          variant="success"
          class="col-sm-2"
          style="margin-right: 15px"
          v-b-modal.modal-1
          >Add review</b-button
        >
        <b-button
          class="col-sm-3"
          variant="warning"
          @click="goToPlaceOverview()"
          >Back to places overview</b-button
        >
      </div>
    </div>

    <b-modal
      id="modal-1"
      class="modal-review"
      :title="'Add review'"
      ok-only
      @ok="addReview()"
      ok-title="Save review"
      :style="comment && user ? 'cursor:pointer;' : 'cursor:not-allowed;'"
      :ok-disabled="!comment || !user"
    >
      <b-card bg-variant="light">
        <b-form-group label="User" label-cols-sm="4" label-align-sm="left">
          <input
            v-model="user"
            type="text"
            placeholder="User..."
            class="form-control col-sm-12"
          />
        </b-form-group>

        <b-form-group label="Comment" label-cols-sm="4" label-align-sm="left">
          <b-form-textarea
            class="col-sm-12"
            v-model="comment"
            placeholder="Describe place..."
            rows="5"
            max-rows="10"
          ></b-form-textarea>
        </b-form-group>
        <b-form-group label="Vote" label-cols-sm="4" label-align-sm="left">
          <input
            type="range"
            min="1"
            max="10"
            v-model="voteValue"
            :title="voteValue"
            class="slider"
            id="myRange"
            style="margin-top: 6px"
          />
        </b-form-group>
      </b-card>
    </b-modal>
  </div>
</template>


<script>
import store from "../store/index.js";

export default {
  name: "LunchPlaceDetail",
  data() {
    return {
      user: "",
      comment: "",
      voteValue: 1,
      placeId: this.$router.history.current.params.placeId,
      placeName:
        store.state.lunchPlaces[this.$router.history.current.params.placeId]
          .name,
      votes:
        store.state.lunchPlaces[this.$router.history.current.params.placeId]
          .votes,
    };
  },
  computed: {},
  created() {},
  methods: {
    goToPlaceOverview() {
      this.$router.push({
        name: "LunchPlaceOverview",
      });
    },

    deleteVote(vote) {
      var reviewToDelete = {
        voteIndex: vote.voteId,
        placeId: this.placeId,
      };
      this.$store.dispatch("deleteReview", reviewToDelete);
      this.showToast("success", vote.voterName);
    },

    voteValueColor(value) {
      if (value >= 8) return "color: green; font-weight:bold";
      else if (value < 8 && value >= 5)
        return "color: #ffc107; font-weight:bold";
      else return "color: red; font-weight:bold";
    },

    addReview() {
      var review = {
        voterName: this.user,
        voterComment: this.comment,
        voteValue: this.voteValue,
        voteId: this.votes.length,
        index: this.placeId,
      };

      this.$store.dispatch("addReview", review);
      this.showToastReviewAdded("success", this.user);
      this.initFormReview();
    },

    clearReviews() {
      this.$store.dispatch("deleteAllReviews", this.placeId);
      this.showToastClearReviews("success");

      this.votes = store.state.lunchPlaces[this.$router.history.current.params.placeId]
          .votes
    },

    initFormReview() {
      this.user = "";
      this.comment = "";
      this.voteValue = 1;
    },

    showToast(variant = "success", voterName) {
      this.$bvToast.toast(`${voterName}'s review successfully deleted.`, {
        title: "DELETED",
        variant: variant,
        solid: true,
      });
    },

    showToastReviewAdded(variant = "success", voterName) {
      this.$bvToast.toast(
        `${voterName} has added new review for ${this.placeName}.`,
        {
          title: "CREATED",
          variant: variant,
          solid: true,
        }
      );
    },
    showToastClearReviews(variant = "success") {
      this.$bvToast.toast(`All reviews are deleted for ${this.placeName}.`, {
        title: "DELETED",
        variant: variant,
        solid: true,
      });
    },
  },
};
</script>

<style>
button:hover {
  opacity: 0.8;
}

.avatar {
  transform: scale(2);
  margin-bottom: 30px;
  margin-top: 30px;
}

.col-form-label {
  font-family: Verdana;
  font-size: 20px;
  color: #14049e;
  text-transform: uppercase;
  position: relative;
  top: -3px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 25px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.6;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  background: #4caf50;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  background: #4caf50;
  cursor: pointer;
}

#place-name-rating {
  font-family: Verdana;
  font-size: 24px;
  color: #14049e;
  text-transform: uppercase;
  text-align: left;
  margin: 30px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

#no-review-message {
  font-family: verdana;
  font-size: 22px;
  color: #259696;
  text-align: left;
  margin-left: 40px;
}
</style>
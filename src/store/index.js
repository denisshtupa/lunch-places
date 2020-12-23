import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lunchPlaces:
      [
        {
          name: "Jupiter Restaurant",
          id: 0,
          description: "Different dishes from all world",
          linkToRestaurantMenu: "https://www.tripadvisor.com/Restaurant_Review-g187309-d20318223-Reviews-Jupiter_Restaurant_Bar-Munich_Upper_Bavaria_Bavaria.html",
          address: "Einsteinstr 119",
          votes: [
            {
              voteId: 0,
              voterName: "Denis",
              voterComment: "I think that this is the best place in city",
              voteValue: 9
            },
            {
              voteId: 1,
              voterName: "Alban",
              voterComment: "I went once and i dont do it again. Dissapointed.",
              voteValue: 4
            },
            {
              voteId: 2,
              voterName: "Luis",
              voterComment: "Low prices and good quality",
              voteValue: 8
            },
            {
              voteId: 3,
              voterName: "Andi",
              voterComment: "Our lunch takes too much time to be ready",
              voteValue: 6
            }
          ]
        },
        {
          name: "Ratskeller Munchen",
          id: 1,
          description: "Best place in center of Munich.",
          linkToRestaurantMenu: "https://www.tripadvisor.com/Restaurant_Review-g187309-d964526-Reviews-Ratskeller_Munchen-Munich_Upper_Bavaria_Bavaria.html",
          address: "Marienplatz 8",
          votes: [
            {
              voteId: 0,
              voterName: "Dea",
              voterComment: "I think that this is the best place in city",
              voteValue: 10
            },
            {
              voteId: 1,
              voterName: "Andon",
              voterComment: "Low prices and variety of foods",
              voteValue: 8
            },
            {
              voteId: 2,
              voterName: "Erisa",
              voterComment: "I definitely would not suggest it",
              voteValue: 2
            }
          ]
        },
        {
          name: "Restaurant Pfistermuhle",
          id: 2,
          description: "Delicious food",
          linkToRestaurantMenu: "https://www.tripadvisor.com/Restaurant_Review-g187309-d958047-Reviews-Pfistermuhle-Munich_Upper_Bavaria_Bavaria.html",
          address: "Pfisterstr 4",
          votes: [
            {
              voteId: 0,
              voterName: "Franci",
              voterComment: "Very delicious food and good location",
              voteValue: 10
            },
            {
              voteId: 1,
              voterName: "Fjori",
              voterComment: "Very bad service at all",
              voteValue: 2
            }
          ]
        },
        {
          name: "Le Stollberg",
          id: 3,
          description: "Assian food",
          linkToRestaurantMenu: "https://www.tripadvisor.com/Restaurant_Review-g187309-d1340298-Reviews-Le_Stollberg-Munich_Upper_Bavaria_Bavaria.html",
          address: "Stollbergstr 2",
          votes: [
            {
              voteId: 0,
              voterName: "Klajdi",
              voterComment: "I have enjoyed it a lot",
              voteValue: 9
            },
            {
              voteId: 1,
              voterName: "Ersi",
              voterComment: "Good place. I felt like home",
              voteValue: 8
            },
            {
              voteId: 2,
              voterName: "Elsa",
              voterComment: "Dont miss it. Very delicious French food.",
              voteValue: 9
            },
            {
              voteId: 3,
              voterName: "Gazi",
              voterComment: "Our food was too cold and we didnt enjoyed it.",
              voteValue: 2
            }
          ]
        }
      ]
  },
  actions: {
    addReview(context, voteObject) {
      context.commit('addReview', voteObject);
    },
    deleteReview(context, voteObject) {
      context.commit('deleteReview', voteObject);
    },

    addPlace(context, placeObject) {
      context.commit('addPlace', placeObject);
    },
    deletePlace(context, index) {
      context.commit('deletePlace', index);
    }
  },
  mutations: {
    addReview(state, voteObject) {
      state.lunchPlaces[voteObject.index].votes.push({
        voterName: voteObject.voterName,
        voterComment: voteObject.voterComment,
        voteValue: Number(voteObject.voteValue)
      });
    },
    deleteReview(state, deleteObject) {
      let idx = state.lunchPlaces[deleteObject.placeId].votes.findIndex(x => x.voteId == deleteObject.voteIndex);
      state.lunchPlaces[deleteObject.placeId].votes.splice(idx, 1);
    },

    addPlace(state, placeObject) {
      state.lunchPlaces.push({
        name: placeObject.name,
        description: placeObject.description,
        address: placeObject.address,
        linkToRestaurantMenu: placeObject.linkToRestaurantMenu,
        votes: []
      });
    },
    deletePlace(state, index) {
      let idx = state.lunchPlaces.findIndex(x => x.id == index);
      state.lunchPlaces.splice(idx, 1);

    }
  },
  modules: {}
});


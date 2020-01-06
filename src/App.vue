<template>
  <div id="app">
    <SearchQuery v-on:search-query="createInfoResult"/>
    <SearchQueryResult
      v-if="postCodeInLondon"
      v-bind:country="country"
      v-bind:town="nhs_ha"
      v-bind:ward="admin_ward"
      v-bind:lat="latitude"
      v-bind:long="longitude"
    />
    <PostcodesNearby
      v-if="postCodeInLondon"
      v-bind:postcodes="postcodesNearby"
      v-on:postcodes-near-info="getPostcodesNearby"
    />
  </div>
</template>

<script>
const APICALL = `https://api.postcodes.io/postcodes/`;

import SearchQuery from "./components/SearchQuery";
import SearchQueryResult from "./components/SearchQueryResult";
import PostcodesNearby from "./components/PostcodesNearby";
import axios from "axios";

export default {
  name: "app",
  components: {
    SearchQuery,
    SearchQueryResult,
    PostcodesNearby
  },
  data() {
    return {
      country: "",
      nhs_ha: "",
      admin_ward: "",
      latitude: "",
      longitude: "",
      postCodeInLondon: false,
      postcodesNearby: []
    };
  },
  methods: {
    createInfoResult(resultForLondon) {
      this.country = "";
      this.nhs_ha = "";
      this.admin_ward = "";
      this.latitude = "";
      this.longitude = "";
      this.postcodesNearby = [];
      //components SearchQueryResult & PostcodesNearby should only be displayed if the given input is a London postcode
      if (!resultForLondon) {
        console.log("The submitted post code is not in London");
        this.postCodeInLondon = false;
        return;
      }
      this.postCodeInLondon = true;
      const {
        country,
        nhs_ha,
        admin_ward,
        latitude,
        longitude
      } = resultForLondon;
      this.latitude = latitude.toFixed(4).toString();
      this.longitude = longitude.toFixed(4).toString();
      this.country = country;
      this.nhs_ha = nhs_ha;
      this.admin_ward = admin_ward;
      this.getPostcodesNearby(latitude, longitude);
    },
    getPostcodesNearby(lat, long) {
      axios
        .get(`${APICALL}?lon=${long}&lat=${lat}`)
        .then(response => {
          this.postcodesNearby = Object.values(response.data.result)
            .map(el => el.postcode)
            .filter((el, index) => index !== 0);
          this.$emit("postcodes-near-info", this.postcodesNearby);
        })
        .catch(err => {
          console.warn(
            `Error ocurred while get request to postcodes.io: ${err}`
          );
        });
    }
  }
};
</script>

<style>
#app {
  text-align: center;
  font-size: 16px;
  color: #e8f0fe;
  padding-top: 5%;
}
body {
  background-color: #07090b;
  color: #e8f0fe;
  font-family: Work Sans, sans-serif;
  font-size: 16px;
  margin: 0;
}
* {
  box-sizing: border-box;
}
</style>

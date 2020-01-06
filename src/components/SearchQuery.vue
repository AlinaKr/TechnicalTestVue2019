<template>
  <form @submit="searchPostcode" class="search-wrapper">
    <input
      type="text"
      v-model="searchInput"
      name="searchInput"
      placeholder="Enter a postcode..."
      data-search-input
    >
    <input type="submit" value="Search">
  </form>
</template>

<script>
const APICALL = `https://api.postcodes.io/postcodes/`;

import axios from "axios";
export default {
  name: "SearchQuery",
  data() {
    return {
      searchInput: null
    };
  },
  methods: {
    searchPostcode(e) {
      e.preventDefault();
      //remove all white spaces from the input in case the user enters the post code in an unusual format
      let trimmedSearchInput =
        this.searchInput.length > 0
          ? this.searchInput.replace(/\s/g, "")
          : this.searchInput;
      axios
        .get(`${APICALL}${trimmedSearchInput}`)
        .then(response =>
          this.$emit(
            "search-query",
            response.data.result.region.includes("London")
              ? response.data.result
              : null
          )
        )
        .catch(err => {
          this.$emit("search-query", null);
          console.warn(
            `Error ocurred while get request to postcodes.io. ${err}`
          );
        });
    }
  }
};
</script>

<style scoped>
.search-wrapper {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 25px calc(50vw - 480px);
}
.search-wrapper input[type="text"] {
  background: none;
  border: none;
  border-bottom: 3px solid #c95641;
  color: grey;
  font-size: 16px;
  min-width: 250px;
  outline: none;
  padding: 10px 15px;
  text-align: center;
}

.search-wrapper input[type="submit"] {
  color: #eef0f2;
  background: none;
  border: 5px solid transparent;
  cursor: pointer;
  display: inline-block;
  font-size: 0.95em;
  letter-spacing: 0.4em;
  padding: 0.3em 0.36em;
  position: relative;
  margin-top: 0.5em;
}

.search-wrapper input[type="submit"]:focus {
  outline: none !important;
}

.search-wrapper input[type="submit"]:hover {
  color: rgba(201, 86, 65, 0.42);
  transition: color 0.3s ease-in-out;
  transform: scale(0.95);
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px #07090b inset !important;
}

input:-webkit-autofill {
  -webkit-text-fill-color: grey !important;
}
</style>


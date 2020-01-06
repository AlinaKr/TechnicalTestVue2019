<template>
  <div class="wrapper">
    <h5>Other postcodes nearby:</h5>
    <span v-bind:key="postcode.id" v-for="postcode in postcodes">{{postcode}}</span>
  </div>
</template>

<script>
export default {
  name: "PostcodesNearby",
  props: ["postcodes"]
};
</script>

<style scoped>
.wrapper span,
h5 {
  font-size: 12px;
  letter-spacing: 0.4em;
  color: #eef0f2;
  font-variant: petite-caps;
}
h5 {
  color: #c95641;
}
.wrapper span:after {
  content: ", ";
}
.wrapper span:last-child:after {
  content: "";
}
.wrapper {
  padding-top: 2vh;
}
</style>

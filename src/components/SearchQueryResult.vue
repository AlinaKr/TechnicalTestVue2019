<template>
  <div>
    <h5>🏙 {{town}} 🏙</h5>
    <h5>🏘 {{ward}} 🏘</h5>
    <h5>🗺 {{country}} 🗺</h5>
    <h5>Latitude: {{lat}}</h5>
    <h5>Longitude: {{long}}</h5>
  </div>
</template>

<script>
export default {
  name: "SearchQueryResult",
  props: ["country", "ward", "town", "lat", "long"]
};
</script>

<style scoped>
h5 {
  letter-spacing: 0.4em;
  font-variant: petite-caps;
  color: #eef0f2;
  font-size: 12px;
}
</style>

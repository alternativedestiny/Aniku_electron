<template>
  <div>
    <h3>cp1</h3>
    <button v-on:click="count++">You clicked {{count}} times</button>
  </div>
</template>

<script>
module.exports = {
  data: function () {
    return {
      count: 0,
    };
  },
};
</script>
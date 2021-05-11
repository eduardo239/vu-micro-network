<template>
  <Paginator :rows="4" :totalRecords="totalItemsCount"></Paginator>
</template>

<script>
export default {
  name: 'Pagination',
  data() {
    return {
      totalItemsCount: 9,
    };
  },
};
</script>

<style></style>

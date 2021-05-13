<template>
  <Paginator
    :rows="10"
    :totalRecords="totalRecords"
    :rowsPerPageOptions="[10, 20, 30]"
  ></Paginator>
</template>

<script>
export default {
  // TODO
  name: 'Paginator',
  data() {
    return {
      offset: 0,
      totalItemsCount: 10,
      totalRecords: 100,
    };
  },
};
</script>

<style></style>

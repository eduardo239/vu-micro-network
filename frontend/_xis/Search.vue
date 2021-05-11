<template>
  <span class="p-input-icon-right c-100">
    <div class="p-inputgroup">
      <InputText class="c-100" placeholder="Search.." v-model="term" />
      <Button
        icon="pi pi-search"
        class="p-button-primary"
        @click.prevent="onSearch"
      />
    </div>
  </span>
</template>

<script>
export default {
  data() {
    return {
      term: '',
    };
  },
  methods: {
    onSearch() {
      this.$router.push({ query: { q: this.term } });
      console.log(this.$route.query);
    },
  },
};
</script>

<style></style>

<template>
  <div>
    {{ comments }}
    <span>comments</span>
    <div>
      <Chip label="Onyama Limba" :image="image" class="p-mr-2 p-mb-2" />
      <!-- <router-link :to="{ name: 'profile', params: { userId: 123 } }"
        >User</router-link
      > -->
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt
        itaque ipsa illum deserunt quia, laudantium vero numquam deleniti
        assumenda eaque. Iste fugiat porro corrupti reprehenderit fuga aliquid
        ex vel voluptate.
      </p>
    </div>

    <Comment />
  </div>
</template>

<script>
import Comment from './Comment';

export default {
  components: { Comment },
  props: ['comments'],
  data() {
    return {
      image: require('../assets/avatarMolde.jpg'),
    };
  },
};
</script>

<style></style>

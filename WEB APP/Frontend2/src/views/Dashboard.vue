<template>
  <HomeLayout>
    <b-container
      class="
        d-flex
        flex-column
        align-items-start
        justify-content-start
        px-0
        position-relative
      "
    >
    </b-container>
  </HomeLayout>
</template>
<script>
import HomeLayout from "@/layout/HomeLayout";

export default {
  name: "Dashboard",
  components: {
    HomeLayout,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped></style>

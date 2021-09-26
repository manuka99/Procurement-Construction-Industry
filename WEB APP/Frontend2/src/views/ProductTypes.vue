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
      ProductTypes
    </b-container>
  </HomeLayout>
</template>
<script>
import HomeLayout from "@/layout/HomeLayout";

export default {
  name: "ProductTypes",
  components: {
    HomeLayout,
  },
  data() {
    return {};
  },
  mounted() {
    let payloadNotify = {
      isToast: true,
      title: "ERROR! Unable to add video",
      content: "dddd",
      variant: "danger",
    };

    this.$store.dispatch("notification/setNotify", payloadNotify);
  },
  methods: {},
};
</script>

<style scoped></style>

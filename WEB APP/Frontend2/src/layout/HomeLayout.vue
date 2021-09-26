<template>
  <b-container fluid>
    <b-container
      class="
        d-flex
        flex-colum
        align-items-start
        justify-content-start
        px-0
        mx-0
        py-3
      "
    >
      <slot></slot>
    </b-container>
    <ToastNotification />
  </b-container>
</template>

<script>
// components
import ToastNotification from "@/components/common/ToastNotification";

export default {
  name: "HomeLayout",
  components: {
    ToastNotification,
  },
};
</script>
<style scoped></style>

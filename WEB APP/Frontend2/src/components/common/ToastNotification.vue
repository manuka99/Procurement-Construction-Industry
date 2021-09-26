<template>
  <b-toast
    v-model="notify.isToast"
    :variant="notify.variant"
    solid
    toaster="b-toaster-bottom-right"
    header-class="text-uppercase py-0"
  >
    <template v-slot:toast-title>
      <strong class="mr-auto">{{ notify.title }}</strong>
    </template>
    <span class="text-left text-small">{{ notify.content }}</span>
    <ul class="mt-1 mb-0 pl-3" v-if="notify.list && notify.list.length > 0">
      <li v-for="(item, index) in notify.list" :key="index">
        <span class="text-left text-small">{{ item }}</span>
      </li>
    </ul>
  </b-toast>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ToastNotification",
  data() {
    return {
      isToast: true,
    };
  },
  computed: {
    ...mapGetters({
      notify: "notification/getNotify",
    }),
  },
  watch: {
    notify(val) {
      setTimeout(
        () => {
          let payloadNotify = {
            isToast: false,
            title: null,
            content: null,
            list: null,
            // variant: "success",
          };
          this.$store.dispatch("notification/setNotify", payloadNotify);
        },
        val.duration == "short" ? 3000 : 6000
      );
    },
  },
};
</script>

<style scoped></style>

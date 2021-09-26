<template>
  <b-toast
    v-model="notify.isToast"
    :variant="notify.variant"
    solid
    toaster="b-toaster-bottom-right text-white p-2"
    header-class="text-uppercase p-2 text-white"
    body-class="p-2 text-white"
  >
    <template v-slot:toast-title>
      <strong class="mr-auto ctext-small">{{ notify.title }}</strong>
    </template>
    <span class="text-left text-small ctext-small">{{ notify.content }}</span>
    <ul class="mt-1 mb-0 pl-3" v-if="notify.list && notify.list.length > 0">
      <li v-for="(item, index) in notify.list" :key="index">
        <span class="text-left text-small ctext-small  p-2">{{ item }}</span>
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
      isToast: true
    };
  },
  computed: {
    ...mapGetters({
      notify: "notification/getNotify"
    })
  },
  watch: {
    notify(val) {
      setTimeout(
        () => {
          let payloadNotify = {
            isToast: false,
            title: null,
            content: null,
            list: null
            // variant: "success",
          };
          this.$store.dispatch("notification/setNotify", payloadNotify);
        },
        val.duration == "short" ? 3000 : 6000
      );
    }
  }
};
</script>

<style>
.ctext-small {
  font-size: 14px;
}
</style>

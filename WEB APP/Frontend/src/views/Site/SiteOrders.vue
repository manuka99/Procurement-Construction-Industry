<template>
  <div class="h-100">
    <b-overlay
      :show="loading"
      spinner-variant="primary"
      spinner-type="grow"
      spinner-small
      rounded="sm"
      class="h-100"
    >
      <b-row class="w-100 text-white p-4">
        <b-col cols="12">
          <button class="btn btn-success btn-sm" @click="isShow = true">
            Create New Order
          </button>
        </b-col>
        <b-col cols="12">
          <b-alert
            class="mt-3"
            variant="danger"
            dismissible
            fade
            :show="apiError.status == true"
            @dismissed="apiError.status = false"
          >
            {{ apiError.message }}
          </b-alert>
        </b-col>
        <b-col cols="12" class="mt-4" v-if="siteOrders.length > 0">
          <div
            v-for="item in siteOrders"
            :key="item._id"
            class="w-100 bg-white shadow mb-4 px-3 py-2 bg-white rounded"
          >
            <div class="d-flex align-items-center">
              <b-icon
                icon="trash"
                variant="danger"
                font-scale="1.2"
                style="cursor: pointer"
                @click="deleteItem(item._id)"
              ></b-icon>
              <router-link :to="'/orders/' + item._id" target="_blank">
                <a class="btn btn-link ">
                  {{ item.name }}
                </a>
              </router-link>
            </div>
          </div>
        </b-col>
        <b-col v-else class="d-flex justify-content-center align-items-center">
          <div>
            <h4 class="text-white mt-5" style="verticle-align: middle">
              No orders created or available, click on
              <b>Create New Order</b> to create the very first order of this
              Site.
            </h4>
          </div>
        </b-col>
      </b-row>
    </b-overlay>
    <CreateOrder
      :isShow="isShow"
      @onClose="onClose"
      :key="CreateOrderKey"
      :parentSite="siteID"
    />
  </div>
</template>

<script>
// services
import { DeleteSiteOrder, GetSiteOrders } from "@/services/site.service";
import CreateOrder from "./CreateOrder";

export default {
  name: "SiteOrders",
  components: {
    CreateOrder
  },
  data() {
    return {
      isShow: false,
      loading: false,
      siteID: null,
      siteOrders: [],
      apiError: {
        status: null,
        message: null
      },
      CreateOrderKey: new Date().valueOf().toString() + 50005
    };
  },
  mounted() {
    this.siteID = this.$route.params.id;
    this.initFn();
  },
  methods: {
    initFn() {
      this.loading = true;
      GetSiteOrders(this.siteID)
        .then(res => {
          this.siteOrders = res.data.data.siteOrders;
        })
        .catch(e => console.log(e))
        .finally(() => (this.loading = false));
    },
    closeModal() {
      this.$emit("onClose");
    },
    deleteItem(id) {
      this.loading = true;
      DeleteSiteOrder(id)
        .then(res => {
          var payloadNotify = {
            isToast: true,
            title: "SUCCESS! Phase Was Deleted",
            content: "All data were saved successfully",
            variant: "success"
          };
          this.$store.dispatch("notification/setNotify", payloadNotify);
          this.siteOrders = null;
          this.initFn();
        })
        .catch(err => {
          this.apiError.status = true;
          if (err.response && err.response.data && err.response.data.data)
            this.apiError.message = err.response.data.data.message;
          else this.apiError.message = err.message || "Unexpected error";
        })
        .finally(() => (this.loading = false));
    },
    onClose() {
      this.isShow = false;
      this.CreateOrderKey = new Date().valueOf().toString() + 50005;
      this.initFn();
    }
  }
};
</script>

<style scoped></style>

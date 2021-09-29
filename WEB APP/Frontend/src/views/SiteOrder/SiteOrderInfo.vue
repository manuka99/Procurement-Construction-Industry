<template>
  <div>
    <b-overlay
      :show="siteOrderInfo && siteOrderInfo._id ? false : true"
      spinner-variant="primary"
      spinner-type="grow"
      spinner-small
      rounded="sm"
    >
      <b-row class="w-100 text-white p-4">
        <b-col cols="12" sm="6" class="pb-4">
          <h4 class="mt-2 text-white">
            Order Site -
            <router-link
              :to="'/sites/' + siteOrderInfo.site._id"
              class="text-info"
            >
              {{ siteOrderInfo.site.name }}
            </router-link>
          </h4>
          <h4 class="mt-0 text-white">
            Order Placed By -
            <span class="text-info">
              {{
                siteOrderInfo.user.firstName + " " + siteOrderInfo.user.lastName
              }}
              ( {{ siteOrderInfo.user.role }} )
            </span>
          </h4>
        </b-col>
        <b-col cols="12" sm="6" class="pb-4">
          <h4 class="mt-0 text-white">
            Order Status -
            <span class="text-success"> {{ siteOrderInfo.status }} </span>
          </h4>
          <h4 class="mt-0 text-white">
            Order Status Description-
            <span class="text-success" v-if="siteOrderInfo.statusDescription">
              {{ siteOrderInfo.status }} (
              {{ siteOrderInfo.statusDescription }} )
            </span>
            <span class="text-success" v-else>
              No description
            </span>
          </h4>
        </b-col>
        <b-col cols="12" sm="6">
          <b-form-group
            id="input-group-2"
            label="Site Order Title: "
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="siteOrderInfo.name"
              placeholder="Type order title...."
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            id="input-group-2"
            label="Short Description:"
            label-for="input-2"
          >
            <b-form-textarea
              id="textarea"
              v-model="siteOrderInfo.description"
              placeholder="Type short description...."
              rows="3"
              max-rows="6"
            ></b-form-textarea> </b-form-group
        ></b-col>
        <b-col cols="12">
          <base-button
            class="btn btn-primary"
            @click="submitForm"
            :loading="loading"
          >
            Save changes
          </base-button>
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
      </b-row>
    </b-overlay>
  </div>
</template>

<script>
// services
import { UpdateSiteOrder, GetSiteOrder } from "@/services/site.service";
export default {
  name: "SiteOrderInfo",
  data() {
    return {
      loading: false,
      siteID: null,
      siteOrderInfo: {},
      apiError: {
        status: null,
        message: null
      }
    };
  },
  watch: {
    siteOrderInfo(val) {
      if (!val) return (this.siteOrderInfo = {});
      try {
        this.image1 = val.images[0];
        this.image2 = val.images[1];
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    this.siteID = this.$route.params.id;
    this.initFn();
  },
  methods: {
    initFn() {
      GetSiteOrder(this.siteID)
        .then(res => {
          console.log(res.data.data);
          var object = res.data.data.siteOrder;
          object.createdAt = object.createdAt.split("T")[0];
          this.siteOrderInfo = object;
        })
        .catch(e => console.log(e));
    },
    closeModal() {
      this.$emit("onClose");
    },
    submitForm() {
      this.loading = true;
      UpdateSiteOrder(this.siteOrderInfo._id, this.siteOrderInfo)
        .then(res => {
          console.log(res);
          var payloadNotify = {
            isToast: true,
            title: "SUCCESS! Site Order Was Updated",
            content: "All data was saved successfully",
            variant: "success"
          };
          this.$store.dispatch("notification/setNotify", payloadNotify);
          this.$emit("onUpdated");
        })
        .catch(err => {
          this.apiError.status = true;
          if (err.response && err.response.data && err.response.data.data)
            this.apiError.message = err.response.data.data.message;
          else this.apiError.message = err.message || "Unexpected error";
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>

<style scoped></style>

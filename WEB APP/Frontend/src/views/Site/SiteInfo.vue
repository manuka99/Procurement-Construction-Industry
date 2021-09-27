<template>
  <div>
    <b-overlay
      :show="siteInfo && siteInfo._id ? false : true"
      spinner-variant="primary"
      spinner-type="grow"
      spinner-small
      rounded="sm"
    >
      <b-row class="w-100 text-white p-4">
        <b-col cols="12" sm="6">
          <b-form-group
            id="input-group-2"
            :label="siteInfo.type == 'phase' ? 'Phase Title: ' : 'Site Title: '"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="siteInfo.name"
              :placeholder="
                siteInfo.type == 'phase'
                  ? 'Type Phase title....'
                  : 'Type Site title....'
              "
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="6">
          <b-form-group
            id="input-group-1"
            label="Site Location: "
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="siteInfo.location"
              type="text"
              placeholder="Type site location...."
              required
            ></b-form-input> </b-form-group
        ></b-col>
        <b-col cols="12" sm="6">
          <b-form-group
            id="input-group-1"
            label="Site MAX Budget (LKR): "
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="siteInfo.allocatedBudgetValue"
              type="number"
              placeholder="Type site's allocated max budget...."
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="6">
          <b-form-group
            id="input-group-1"
            label="Site Total Usable Space: "
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="siteInfo.totalSpace"
              type="number"
              placeholder="Type site's total usable space...."
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="6">
          <b-form-group
            id="input-group-1"
            label="Total Number Of Workers: "
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="siteInfo.noOfworkers"
              type="number"
              placeholder="Type site's total number of workers...."
              required
            ></b-form-input> </b-form-group
        ></b-col>
        <b-col cols="12" sm="6">
          <b-form-group
            id="input-group-1"
            label="Estimated Date Range: "
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="siteInfo.estimatedDateRange"
              type="text"
              placeholder="Type site's estimated date range...."
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="6">
          <b-form-group
            id="input-group-3"
            label="Product Type"
            label-for="input-3"
          >
            <b-form-select
              id="input-3"
              v-model="siteInfo.type"
              :options="siteTypes"
              required
            ></b-form-select> </b-form-group
        ></b-col>
        <b-col cols="12" sm="6"> </b-col>
        <b-col cols="12" sm="6">
          <b-form-group
            id="input-group-1"
            label="Site Image 1: "
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="image1"
              type="text"
              placeholder="Paste site image 1...."
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="6">
          <b-form-group
            id="input-group-1"
            label="Site Image 2: "
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="image2"
              type="text"
              placeholder="Paste site image 2...."
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
              v-model="siteInfo.description"
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
import { UpdateSite, GetSite } from "@/services/site.service";

export default {
  name: "SiteInfo",
  data() {
    return {
      loading: false,
      image1: null,
      image2: null,
      siteID: null,
      siteInfo: {},
      siteTypes: [
        { text: "Site Phase", value: "phase" },
        { text: "Head Site", value: "regular" }
      ],
      apiError: {
        status: null,
        message: null
      }
    };
  },
  watch: {
    siteInfo(val) {
      if (!val) return (this.siteInfo = {});
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
      GetSite(this.siteID)
        .then(res => {
          console.log(res.data.data);
          var object = res.data.data.site;
          object.createdAt = object.createdAt.split("T")[0];
          this.siteInfo = object;
        })
        .catch(e => console.log(e));
    },
    closeModal() {
      this.$emit("onClose");
    },
    submitForm() {
      this.loading = true;
      this.siteInfo.images = [this.image1, this.image2];
      UpdateSite(this.siteInfo._id, this.siteInfo)
        .then(res => {
          console.log(res);
          var payloadNotify = {
            isToast: true,
            title: "SUCCESS! Site Was Updated",
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

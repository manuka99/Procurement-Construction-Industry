<template>
  <div>
    <b-overlay
      :show="false"
      spinner-variant="primary"
      spinner-type="grow"
      spinner-small
      rounded="sm"
    >
      <b-row class="w-100 text-white p-4">
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
        <b-col cols="12" sm="6">
          <b-form-group
            id="input-group-3"
            label="Product Type (Default QTY = 10)"
            label-for="input-3"
          >
            <b-form-select
              id="input-3"
              v-model="newProductType"
              :options="productTypes"
              required
            ></b-form-select> </b-form-group
        ></b-col>
        <b-col cols="12" sm="6">
          <b-form-group
            id="input-group-2"
            :label="'asa'"
            label-class="text-transparent"
            label-for="input-2"
          >
            <base-button
              class="btn btn-primary"
              @click="createSiteItem"
              :loading="loadingAdd"
            >
              Add Budget Item
            </base-button>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="4" v-for="item in siteItems" :key="item._id">
          <div class="w-100 bg-white shadow p-3 mb-5 bg-white rounded">
            <div class="d-flex align-items-center">
              <b-icon
                icon="trash"
                variant="danger"
                font-scale="1.2"
                style="cursor: pointer"
                @click="deleteItem(item._id)"
              ></b-icon>
              <router-link
                :to="'/types/' + item.productType._id"
                target="_blank"
              >
                <a class="btn btn-link ">
                  {{ item.productType.name }} ({{ item.productType.metric }})
                </a>
              </router-link>
            </div>
            <b-input-group prepend="QTY" class="mb-3">
              <b-form-input
                id="input-1"
                v-model="item.quantity"
                type="number"
                placeholder="Type Item Quantity...."
              ></b-form-input>
            </b-input-group>
            <b-input-group prepend="BRD" class="mb-3">
              <b-form-input
                id="input-1"
                v-model="item.brand"
                type="text"
                placeholder="Type Item Brand...."
              ></b-form-input>
            </b-input-group>
            <b-input-group prepend="DES" class="mb-3">
              <b-form-textarea
                id="textarea"
                v-model="item.description"
                placeholder="Type Short Description..."
                rows="2"
                max-rows="2"
              ></b-form-textarea>
            </b-input-group>
          </div>
        </b-col>
        <b-col cols="12">
          <base-button
            class="btn btn-primary"
            @click="submitForm"
            :loading="loading"
          >
            Save changes
          </base-button>
        </b-col>
      </b-row>
    </b-overlay>
  </div>
</template>

<script>
// services
import {
  UpdateSiteItem,
  CreateSiteItem,
  GetSiteItems
} from "@/services/site.service";
import { GetALL } from "@/services/types.service";

export default {
  name: "SiteInfo",
  data() {
    return {
      loading: false,
      loadingAdd: false,
      newProductType: null,
      productTypes: [{ value: null, text: "Select a product type" }],
      siteItems: [],
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
  mounted() {
    this.siteID = this.$route.params.id;
    this.initFn();
  },
  methods: {
    initFn() {
      GetALL()
        .then(res => {
          var data = res.data.data.productTypes.map(type => {
            return {
              text: type.name + " (" + type.metric + ")",
              value: type._id
            };
          });
          console.log(data);
          this.productTypes = [
            { value: null, text: "Select a product type" },
            ...data
          ];
        })
        .catch(e => console.log(e));
      GetSiteItems(this.siteID)
        .then(res => {
          console.log(res.data.data);
          this.siteItems = res.data.data.siteItems;
        })
        .catch(e => console.log(e));
    },
    closeModal() {
      this.$emit("onClose");
    },
    submitForm() {
      this.loading = true;
      UpdateSiteItem(this.siteItems)
        .then(res => {
          console.log(res);
          var payloadNotify = {
            isToast: true,
            title: "SUCCESS! Budget Items Was Updated",
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
    },
    createSiteItem() {
      this.loadingAdd = true;
      CreateSiteItem({
        site: this.siteID,
        productType: this.newProductType
      })
        .then(res => {
          console.log(res);
          var payloadNotify = {
            isToast: true,
            title: "SUCCESS! Item Was Added",
            content: "All data were saved successfully",
            variant: "success"
          };
          this.$store.dispatch("notification/setNotify", payloadNotify);
          this.newProductType = null;
          this.initFn();
        })
        .catch(err => {
          this.apiError.status = true;
          if (err.response && err.response.data && err.response.data.data)
            this.apiError.message = err.response.data.data.message;
          else this.apiError.message = err.message || "Unexpected error";
        })
        .finally(() => (this.loadingAdd = false));
    },
    deleteItem(id) {
      const idx = this.siteItems.findIndex(val => val._id == id);
      this.siteItems = [
        ...this.siteItems.slice(0, idx),
        ...this.siteItems.slice(idx + 1)
      ];
    }
  }
};
</script>

<style scoped></style>

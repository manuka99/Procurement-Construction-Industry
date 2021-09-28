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
        <b-col cols="12" sm="3">
          <b-form-group
            id="input-group-3"
            label="Product Type"
            label-for="input-3"
          >
            <b-form-select
              id="input-3"
              v-model="newSiteOrderInfo.productType"
              :options="productTypes"
              required
            ></b-form-select> </b-form-group
        ></b-col>
        <b-col cols="12" sm="3">
          <b-form-group
            id="input-group-1"
            label="Quantity: "
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="newSiteOrderInfo.quantity"
              type="number"
              placeholder="Type product quantity...."
              required
            ></b-form-input> </b-form-group
        ></b-col>
        <b-col cols="12" sm="3">
          <b-form-group
            id="input-group-1"
            label="Brand: (optional)"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="newSiteOrderInfo.brand"
              type="text"
              placeholder="Type product brand (optional)...."
              required
            ></b-form-input> </b-form-group
        ></b-col>
        <b-col cols="12" sm="3">
          <b-form-group
            id="input-group-1"
            label="Required Date:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="newSiteOrderInfo.requiredDate"
              type="date"
              placeholder="Type required date...."
              required
            ></b-form-input> </b-form-group
        ></b-col>
        <b-col cols="12" sm="6">
          <b-form-group id="input-group-2" label="Notes:" label-for="input-2">
            <b-form-textarea
              id="textarea"
              v-model="newSiteOrderInfo.description"
              placeholder="Type short description...."
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="6" class="align-self-center">
          <b-form-group
            id="input-group-2"
            :label="'asa'"
            label-class="text-transparent"
            label-for="input-2"
          >
            <base-button
              class="btn btn-primary"
              @click="createSiteOrderItem"
              :loading="loadingAdd"
            >
              Add To Order Item
            </base-button>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="4" v-for="item in siteOrderItems" :key="item._id">
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
                disabled
                v-model="item.quantity"
                type="number"
                placeholder="Item Quantity...."
              ></b-form-input>
            </b-input-group>
            <b-input-group prepend="BRD" class="mb-3">
              <b-form-input
                id="input-1"
                disabled
                v-model="item.brand"
                type="text"
                placeholder="Item Brand...."
              ></b-form-input>
            </b-input-group>
            <b-input-group prepend="RD" class="mb-3">
              <b-form-input
                id="input-1"
                disabled
                v-model="item.requiredDate"
                type="date"
                placeholder="Item Brand...."
              ></b-form-input>
            </b-input-group>
            <b-input-group prepend="DES" class="mb-3">
              <b-form-textarea
                id="textarea"
                disabled
                v-model="item.description"
                placeholder="Short Description..."
                rows="2"
                max-rows="2"
              ></b-form-textarea>
            </b-input-group>
            <b-input-group prepend="Status" class="mb-3">
              <b-form-select
                id="input-3"
                v-model="item.status"
                :options="siteOrderItemStatus"
                required
              ></b-form-select>
            </b-input-group>
            <b-input-group prepend="SDES" class="mb-3">
              <b-form-textarea
                id="textarea"
                v-model="item.statusDescription"
                placeholder="Type Status Description..."
                rows="2"
                max-rows="2"
              ></b-form-textarea>
            </b-input-group>
            <base-button
              class="btn btn-primary"
              @click="updateData(item)"
              :loading="item.loading"
            >
              Update
            </base-button>
            <base-button class="btn btn-light" @click="createSupplierOrder">
              Supplier Order
            </base-button>
          </div>
        </b-col>
      </b-row>
    </b-overlay>
  </div>
</template>

<script>
// services
import {
  GetSiteOrderItems,
  CreateSiteOrderItem,
  DeleteSiteOrderItem,
  UpdateSiteOrderItem
} from "@/services/site.service";
import { GetALL } from "@/services/types.service";

export default {
  name: "SiteOrderItemInfo",
  data() {
    return {
      loading: false,
      loadingAdd: false,
      newProductType: null,
      productTypes: [{ value: null, text: "Select a product type" }],
      siteOrderItems: [],
      orderSiteID: null,
      siteOrderItemStatus: ["Pending", "Approved", "Declined", "Placed"],
      newSiteOrderInfo: {},
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
    this.orderSiteID = this.$route.params.id;
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
      GetSiteOrderItems(this.orderSiteID)
        .then(res => {
          console.log(res.data.data);
          this.siteOrderItems = res.data.data.siteOrderItems;
        })
        .catch(e => console.log(e));
    },
    closeModal() {
      this.$emit("onClose");
    },
    createSiteOrderItem() {
      this.loadingAdd = true;
      CreateSiteOrderItem({
        siteOrderID: this.orderSiteID,
        ...this.newSiteOrderInfo
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
          this.resetFn();
        })
        .catch(err => {
          this.apiError.status = true;
          if (err.response && err.response.data && err.response.data.data)
            this.apiError.message = err.response.data.data.message;
          else this.apiError.message = err.message || "Unexpected error";
        })
        .finally(() => (this.loadingAdd = false));
    },
    resetFn() {
      this.newSiteOrderInfo = {};
    },
    deleteItem(id) {
      DeleteSiteOrderItem(id)
        .then(res => {
          console.log(res);
          var payloadNotify = {
            isToast: true,
            title: "SUCCESS! Item Was Deleted",
            content: "All data were saved successfully",
            variant: "success"
          };
          this.$store.dispatch("notification/setNotify", payloadNotify);
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
    updateData(data) {
      data.loading = true;
      UpdateSiteOrderItem(data._id, data)
        .then(res => {
          console.log(res);
          var payloadNotify = {
            isToast: true,
            title: "SUCCESS! Item Was Updated",
            content: "All data were saved successfully",
            variant: "success"
          };
          this.$store.dispatch("notification/setNotify", payloadNotify);
          this.initFn();
        })
        .catch(err => {
          this.apiError.status = true;
          if (err.response && err.response.data && err.response.data.data)
            this.apiError.message = err.response.data.data.message;
          else this.apiError.message = err.message || "Unexpected error";
        })
        .finally(() => (data.loading = false));
    },
    createSupplierOrder() {}
  }
};
</script>

<style scoped></style>

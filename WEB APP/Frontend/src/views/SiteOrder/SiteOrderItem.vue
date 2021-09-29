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
        <div class="accordion" role="tablist">
          <b-col cols="12" v-for="item in siteOrderItems" :key="item._id">
            <b-card no-body class="mb-3">
              <b-card-header header-tag="header" class="p-0" role="tab">
                <b-button block v-b-toggle="item._id" variant="success"
                  >ITEM #{{ item._id }}</b-button
                >
              </b-card-header>
              <b-collapse
                :id="item._id"
                visible
                accordion="my-accordion"
                role="tabpanel"
              >
                <b-card-body>
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
                        {{ item.productType.name }} ({{
                          item.productType.metric
                        }})
                      </a>
                    </router-link>
                  </div>
                  <b-row>
                    <b-col cols="12" sm="4">
                      <b-input-group prepend="QTY" class="mb-3">
                        <b-form-input
                          id="input-1"
                          disabled
                          v-model="item.quantity"
                          type="number"
                          placeholder="Item Quantity...."
                        ></b-form-input>
                      </b-input-group>
                    </b-col>
                    <b-col cols="12" sm="4">
                      <b-input-group prepend="BRD" class="mb-3">
                        <b-form-input
                          id="input-1"
                          disabled
                          v-model="item.brand"
                          type="text"
                          placeholder="Item Brand...."
                        ></b-form-input>
                      </b-input-group>
                    </b-col>
                    <b-col cols="12" sm="4">
                      <b-input-group prepend="RD" class="mb-3">
                        <b-form-input
                          id="input-1"
                          disabled
                          :value="item.requiredDate.split('T')[0]"
                          type="date"
                          placeholder="Item Brand...."
                        ></b-form-input>
                      </b-input-group>
                    </b-col>
                    <b-col cols="12" sm="12">
                      <b-input-group prepend="DES" class="mb-3">
                        <b-form-textarea
                          id="textarea"
                          disabled
                          v-model="item.description"
                          placeholder="Short Description..."
                          rows="2"
                          max-rows="4"
                        ></b-form-textarea> </b-input-group
                    ></b-col>
                    <b-col cols="12" sm="8">
                      <b-input-group prepend="SDES" class="mb-3">
                        <b-form-textarea
                          id="textarea"
                          v-model="item.statusDescription"
                          placeholder="Type Status Description..."
                          rows="2"
                          max-rows="4"
                        ></b-form-textarea>
                      </b-input-group>
                    </b-col>
                    <b-col cols="12" sm="4"
                      ><b-input-group prepend="Status" class="mb-3">
                        <b-form-select
                          id="input-3"
                          v-model="item.status"
                          :options="siteOrderItemStatus"
                          required
                        ></b-form-select>
                      </b-input-group>
                    </b-col>
                    <b-col cols="12">
                      <base-button
                        class="btn btn-primary"
                        @click="updateData(item)"
                        :loading="item.loading"
                      >
                        Update
                      </base-button>
                    </b-col>
                    <hr class="border-bottom w-100 mt-4 mb-0" />
                    <b-col cols="12" class="mt-4">
                      <base-button
                        class="btn btn-light"
                        @click="
                          createSupplierOrder(item._id, item.productType._id)
                        "
                      >
                        Create Supplier Order
                      </base-button>

                      <hr class="border-bottom w-100 mt-4 mb-0" />

                      <div class="accordion" role="tablist2">
                        <b-col
                          cols="12"
                          v-for="supplierOrder in item.supplierOrders"
                          :key="supplierOrder._id"
                        >
                          <b-card no-body class="mb-3">
                            <b-card-header
                              header-tag="header"
                              class="p-0"
                              role="tab"
                            >
                              <b-button
                                block
                                v-b-toggle="supplierOrder._id"
                                variant="dark"
                                >ORDER #{{ supplierOrder._id }}</b-button
                              >
                            </b-card-header>
                            <b-collapse
                              :id="supplierOrder._id"
                              visible
                              accordion="my-accordion2"
                              role="tabpanel"
                            >
                              <b-card-body>
                                <button
                                  class="btn btn-danger btn-sm mb-2"
                                  @click="
                                    deleteSupplierOrder(supplierOrder._id)
                                  "
                                >
                                  Delete this supplier order
                                </button>
                                <h3>
                                  Order Status:
                                  <span class="text-primary">{{
                                    supplierOrder.status
                                  }}</span>
                                </h3>
                                <h3>
                                  User:
                                  <span class="text-success">{{
                                    supplierOrder.user.firstName +
                                      " " +
                                      supplierOrder.user.lastName
                                  }}</span>
                                </h3>
                                <h3>
                                  Product:
                                  <router-link
                                    target="_blank"
                                    :to="
                                      '/products/' + supplierOrder.product._id
                                    "
                                  >
                                    <span class="text-success">{{
                                      supplierOrder.product.supplier.firstName +
                                        " " +
                                        supplierOrder.product.supplier
                                          .lastName +
                                        " " +
                                        "(" +
                                        supplierOrder.product.brand +
                                        ")"
                                    }}</span>
                                  </router-link>
                                </h3>
                                <h3>
                                  Required Date:
                                  <span class="text-success">{{
                                    supplierOrder.requiredDate.split("T")[0]
                                  }}</span>
                                </h3>
                                <h3>
                                  Quantity:
                                  <span class="text-info">{{
                                    supplierOrder.quantity
                                  }}</span>
                                </h3>
                                <h3>
                                  Price Per Item:
                                  <span class="text-info"
                                    >LKR
                                    {{
                                      supplierOrder.ppItem.toLocaleString()
                                    }}</span
                                  >
                                </h3>
                                <h3>
                                  Total Price:
                                  <span class="text-danger"
                                    >LKR
                                    {{
                                      (
                                        supplierOrder.ppItem *
                                        supplierOrder.quantity
                                      ).toLocaleString()
                                    }}</span
                                  >
                                </h3>
                              </b-card-body></b-collapse
                            ></b-card
                          ></b-col
                        >
                      </div>
                    </b-col>
                  </b-row>
                </b-card-body>
              </b-collapse>
            </b-card>
          </b-col>
        </div>
      </b-row>
    </b-overlay>
    <CreateSupplierOrder
      :isShow="isShow"
      @onClose="onClose"
      :key="supplierOrderKey"
      :siteOrderItemID="siteOrderItemID"
      :productType="productType"
    />
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
import { DeleteSupplierOrder } from "@/services/site.service";
import CreateSupplierOrder from "./CreateSupplierOrder";

export default {
  name: "SiteOrderItemInfo",
  components: {
    CreateSupplierOrder
  },
  data() {
    return {
      loading: false,
      loadingAdd: false,
      newProductType: null,
      productTypes: [{ value: null, text: "Select a product type" }],
      siteOrderItems: [],
      orderSiteID: null,
      siteOrderItemID: null,
      productType: null,
      siteOrderItemStatus: ["Pending", "Approved", "Declined", "Placed"],
      newSiteOrderInfo: {},
      siteTypes: [
        { text: "Site Phase", value: "phase" },
        { text: "Head Site", value: "regular" }
      ],
      apiError: {
        status: null,
        message: null
      },
      isShow: false,
      supplierOrderKey: new Date().valueOf().toString() + 50005
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
    deleteSupplierOrder(id) {
      DeleteSupplierOrder(id)
        .then(res => {
          console.log(res);
          var payloadNotify = {
            isToast: true,
            title: "SUCCESS! Supplier Order Was Deleted",
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
    createSupplierOrder(id, productType) {
      this.siteOrderItemID = id;
      this.productType = productType;
      this.isShow = true;
    },
    onClose() {
      this.isShow = false;
      this.siteOrderItemID = null;
      this.productType = null;
      this.supplierOrderKey = new Date().valueOf().toString() + 50005;
      this.initFn();
    }
  }
};
</script>

<style scoped></style>

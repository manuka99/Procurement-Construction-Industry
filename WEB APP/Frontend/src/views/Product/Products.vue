<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <b-row>
        <b-col xl="3" md="6">
          <stats-card
            title="Total traffic"
            type="gradient-red"
            sub-title="350,897"
            icon="ni ni-active-40"
            class="mb-4"
          >
            <template slot="footer">
              <span class="text-success mr-2">3.48%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card
            title="Total traffic"
            type="gradient-orange"
            sub-title="2,356"
            icon="ni ni-chart-pie-35"
            class="mb-4"
          >
            <template slot="footer">
              <span class="text-success mr-2">12.18%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card
            title="Sales"
            type="gradient-green"
            sub-title="924"
            icon="ni ni-money-coins"
            class="mb-4"
          >
            <template slot="footer">
              <span class="text-danger mr-2">5.72%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card
            title="Performance"
            type="gradient-info"
            sub-title="49,65%"
            icon="ni ni-chart-bar-32"
            class="mb-4"
          >
            <template slot="footer">
              <span class="text-success mr-2">54.8%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
      </b-row>
    </base-header>
    <b-container fluid class="mt--7">
      <template>
        <b-card no-body class="bg-default shadow">
          <b-card-header class="d-flex flex-column bg-transparent border-0">
            <h3 class="mb-3 text-white">All Supplier Products</h3>
            <div>
              <button class="btn btn-success btn-sm" @click="isShow = true">
                New Product Type
              </button>
            </div>
          </b-card-header>
          <b-table
            thead-class="text-white bg-gray-dark"
            :items="items"
            :fields="fields"
            sort-icon-left
            responsive
            hover
            dark
            class="custom-table"
            show-empty
          >
            <template #empty>
              <div class="d-flex text-center justify-content-center">
                <span>
                  There are no product types to show, start adding new product
                  types</span
                >
              </div>
            </template>

            <template #cell(delete)="data">
              <b-icon
                icon="trash"
                variant="danger"
                font-scale="1.6"
                style="cursor: pointer"
                @click="deleteItem(data.item._id)"
              ></b-icon>
            </template>

            <template #cell(productType)="data">
              <router-link :to="'/types/' + data.value._id">
                <div
                  class="d-flex justify-content-center align-items-center"
                  style="cursor: pointer"
                >
                  <b-avatar
                    :text="
                      data.value.name.charAt(0) + data.value.name.charAt(1)
                    "
                    :src="data.value.image"
                    :class="data.value.avatarClass"
                  >
                  </b-avatar>
                  <div
                    class="d-flex justify-content-center align-items-center ml-3"
                  >
                    <b-badge :class="data.value.avatarClass">{{
                      data.value.name
                    }}</b-badge>
                  </div>
                </div>
              </router-link>
            </template>

            <template #cell(supplier)="data">
              <router-link :to="'/suppliers/' + data.value._id">
                <div
                  class="d-flex justify-content-center align-items-center"
                  style="cursor: pointer"
                >
                  <b-avatar
                    :text="
                      data.value.firstName.charAt(0) +
                        data.value.lastName.charAt(0)
                    "
                    :src="data.value.logo"
                    :class="data.value.avatarClass"
                  >
                  </b-avatar>
                  <div
                    class="d-flex justify-content-center align-items-center ml-3"
                  >
                    <b-badge :class="data.value.avatarClass">{{
                      data.value.firstName + " " + data.value.lastName
                    }}</b-badge>
                  </div>
                </div>
              </router-link>
            </template>

            <template #cell(metric)="data">
              {{ data.item.productType.metric }}
            </template>

            <template #cell(isAvailable)="data">
              <b-icon
                :variant="data.value == true ? 'success' : 'danger'"
                icon="circle-fill"
                animation="throb"
                font-scale="1.4"
              ></b-icon>
            </template>

            <template #cell(view)="data">
              <router-link :to="'/products/' + data.item._id">
                <b-icon variant="white" icon="eye" font-scale="1.8"></b-icon>
              </router-link>
            </template>
          </b-table>
        </b-card>
      </template>
    </b-container>
    <CreateProduct
      :isShow="isShow"
      @onClose="onClose"
      :key="createProductKey"
    />
  </div>
</template>

<script>
import {
  GetAllWithProductsAndSuppliers,
  DeleteProduct
} from "@/services/product.service";
import CreateProduct from "./CreateProduct";
export default {
  name: "Products",
  components: { CreateProduct },
  data() {
    return {
      fields: [
        { key: "productType", label: "Type" },
        { key: "supplier", label: "Supplier" },
        { key: "brand", label: "Product Brand" },
        { key: "metric", label: "Measured Metrics" },
        { key: "quantity", label: "QTY" },
        { key: "isAvailable", label: "Availability" },
        { key: "view", label: "View" },
        { key: "delete", label: "Delete" }
      ],
      items: [],
      isShow: false,
      createProductKey: new Date().valueOf().toString()
    };
  },
  mounted() {
    this.initFn();
  },
  methods: {
    initFn() {
      GetAllWithProductsAndSuppliers()
        .then(res => {
          this.items = res.data.data.products.map(object => {
            object.createdAt = object.createdAt.split("T")[0];
            object.supplier.avatarClass = this.getAvatarClass();
            object.productType.avatarClass = this.getAvatarClass();
            return object;
          });
        })
        .catch(e => console.log(e));
    },
    deleteItem(id) {
      DeleteProduct(id)
        .then(res => {
          const id = res.data.data.product._id;
          const idx = this.items.findIndex(val => val._id == id);
          this.items = [
            ...this.items.slice(0, idx),
            ...this.items.slice(idx + 1)
          ];

          var payloadNotify = {
            isToast: true,
            title: "SUCCESS! Product Was Deleted",
            content: "All data related to product was removed successfully",
            variant: "success"
          };
          this.$store.dispatch("notification/setNotify", payloadNotify);
        })
        .catch(e => console.log(e));
    },
    onClose() {
      this.isShow = false;
      this.createProductKey = new Date().valueOf();
      this.initFn();
    },
    getAvatarClass() {
      const val = Math.floor(Math.random() * 4 + 1);
      switch (val) {
        case 1:
          return "bg-yellow text-dark";
        case 2:
          return "bg-green text-white";
        case 3:
          return "bg-primary text-white";
        case 4:
          return "bg-red text-white";
        default:
          break;
      }
    }
  }
};
</script>

<style></style>

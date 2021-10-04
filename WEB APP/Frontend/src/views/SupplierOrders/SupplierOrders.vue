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
            <h3 class="mb-3 text-white">All Supplier Orders</h3>
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
                  There are no supplier orders to show
                </span>
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
              <router-link :to="'/types/' + data.item.product.productType._id">
                <div
                  class="d-flex justify-content-center align-items-center"
                  style="cursor: pointer"
                >
                  <b-avatar
                    :text="
                      data.item.product.productType.name.charAt(0) +
                        data.item.product.productType.name.charAt(1)
                    "
                    :src="data.item.product.productType.image"
                    :class="data.item.product.productType.avatarClass"
                  >
                  </b-avatar>
                  <div
                    class="d-flex justify-content-center align-items-center ml-3"
                  >
                    <b-badge
                      :class="data.item.product.productType.avatarClass"
                      >{{ data.item.product.productType.name }}</b-badge
                    >
                  </div>
                </div>
              </router-link>
            </template>

            <template #cell(supplier)="data">
              <router-link :to="'/suppliers/' + data.item.product.supplier._id">
                <div
                  class="d-flex justify-content-center align-items-center"
                  style="cursor: pointer"
                >
                  <b-avatar
                    :text="
                      data.item.product.supplier.firstName.charAt(0) +
                        data.item.product.supplier.lastName.charAt(0)
                    "
                    :src="data.item.product.supplier.logo"
                    :class="data.item.product.supplier.avatarClass"
                  >
                  </b-avatar>
                  <div
                    class="d-flex justify-content-center align-items-center ml-3"
                  >
                    <b-badge :class="data.item.product.supplier.avatarClass">{{
                      data.item.product.supplier.firstName +
                        " " +
                        data.item.product.supplier.lastName
                    }}</b-badge>
                  </div>
                </div>
              </router-link>
            </template>

            <template #cell(brand)="data">
              {{ data.item.product.brand }}
            </template>

            <template #cell(price)="data">
              LKR {{ data.item.ppItem.toLocaleString() }} ({{
                data.item.product.productType.metric
              }})
            </template>

            <template #cell(updatedAt)="data">
              <span class="text-white">
                {{ data.item.updatedAt }}
              </span>
            </template>

            <template #cell(status)="data">
              <router-link
                :to="'/orders/' + data.item.siteOrderItemID[0].siteOrderID._id"
                target="_blank"
              >
                <b-badge
                  pill
                  :class="data.item.product.productType.avatarClass"
                  class="p-2"
                >
                  {{ data.item.status }}
                </b-badge>
              </router-link>
            </template>
          </b-table>
        </b-card>
      </template>
    </b-container>
  </div>
</template>

<script>
import { GetAllSupplierOrders } from "@/services/site.service";
export default {
  name: "SupplierOrders",
  data() {
    return {
      fields: [
        { key: "updatedAt", label: "Last Update", sortable: true },
        { key: "productType", label: "Type" },
        { key: "supplier", label: "Supplier" },
        { key: "brand", label: "Product Brand" },
        { key: "price", label: "Purchase Price (Per)", sortable: true },
        { key: "quantity", label: "QTY", sortable: true },
        { key: "status", label: "Status" }
      ],
      items: []
    };
  },
  mounted() {
    this.initFn();
  },
  methods: {
    initFn() {
      GetAllSupplierOrders()
        .then(res => {
          console.log(res.data.data.supplierOrders);
          this.items = res.data.data.supplierOrders.map(object => {
            object.createdAt = object.createdAt.split("T")[0];
            object.updatedAt = object.updatedAt.split("T")[0];
            object.product.supplier.avatarClass = this.getAvatarClass();
            object.product.productType.avatarClass = this.getAvatarClass();
            return object;
          });
        })
        .catch(e => console.log(e));
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

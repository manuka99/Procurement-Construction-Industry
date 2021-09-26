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
            <h3 class="mb-3 text-white">Product Types</h3>
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
            responsive="lg"
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

            <template #cell(suppliers)="data">
              <div v-if="data.value.length > 0" class="avatar-group">
                <b-avatar-group size="2rem">
                  <b-avatar
                    v-for="i in data.value.slice(
                      0,
                      data.value.length > 4 ? 3 : 4
                    )"
                    :key="i"
                    :text="i.firstName.charAt(0) + i.lastName.charAt(0)"
                    :src="i.logo"
                    :class="getAvatarClass()"
                  >
                  </b-avatar>
                  <b-avatar
                    v-if="data.value.length > 4"
                    :text="'+' + (data.value.length - 4).toString()"
                    class="bg-white text-dark"
                  >
                  </b-avatar>
                </b-avatar-group>
              </div>
              <div v-else>
                <b-badge variant="success text-white">No Suppliers</b-badge>
              </div>
            </template>
          </b-table>
        </b-card>
      </template>
    </b-container>
    <CreateProductType
      :isShow="isShow"
      @onClose="onClose"
      :key="createProductKey"
    />
  </div>
</template>

<script>
import { GetALL, DeleteType } from "@/services/types.service";
import CreateProductType from "./CreateProductType";
export default {
  name: "ProductTypes",
  components: { CreateProductType },
  data() {
    return {
      fields: [
        { key: "image", label: "Image" },
        { key: "name", label: "Product Name" },
        { key: "createdAt", label: "Created Date" },
        { key: "metric", label: "Measured Metrics" },
        { key: "description", label: "Description" },
        { key: "suppliers", label: "Suppliers" },
        { key: "delete", label: "Delete" }
      ],
      items: [],
      isShow: false,
      createProductKey: new Date().valueOf()
    };
  },
  mounted() {
    this.initFn();
  },
  methods: {
    initFn() {
      GetALL()
        .then(res => {
          this.items = res.data.data.productTypes.map(object => {
            object.createdAt = object.createdAt.split("T")[0];
            return object;
          });
        })
        .catch(e => console.log(e));
    },
    deleteItem(id) {
      DeleteType(id)
        .then(res => {
          const id = res.data.data.productType._id;
          const idx = this.items.findIndex(val => val._id == id);
          this.items = [
            ...this.items.slice(0, idx),
            ...this.items.slice(idx + 1)
          ];
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

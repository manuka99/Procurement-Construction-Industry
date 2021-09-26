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
      <b-row v-if="productType != null">
        <div class="mt-4"></div>
      </b-row>
      <template>
        <b-card no-body class="bg-default shadow">
          <b-card-header class="d-flex flex-column bg-transparent border-0">
            <b-card
              :img-src="productType.image"
              img-alt="Card image"
              img-left
              class="mb-3"
            >
              <b-card-text>
                <h4>{{ productType.name }}</h4>
              </b-card-text>
              <b-card-text>
                Measurement Unit: {{ productType.metric }}
              </b-card-text>
              <b-card-text>
                Created Date: {{ productType.createdAt }}
              </b-card-text>
              <b-card-text>
                {{ productType.description }}
              </b-card-text>
            </b-card>
            <h3 class="mb-3 text-white">Products Available</h3>
            <div>
              <button class="btn btn-success btn-sm" @click="isShow = true">
                New Product
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
                  There are no product to show, start adding new products
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

            <template #cell(isAvailable)="data">
              <b-icon
                :variant="data.value == true ? 'success' : 'danger'"
                icon="circle-fill"
                animation="throb"
                font-scale="1.4"
              ></b-icon>
            </template>

            <template #cell(_id)="data">
              <router-link :to="'/products/' + data.value">
                <div
                  class="d-flex justify-content-center align-items-center"
                  style="cursor: pointer"
                >
                  <b-badge :class="data.item.idClass">{{ data.value }}</b-badge>
                </div>
              </router-link>
            </template>
            <template #cell(supplier)="data">
              <router-link :to="'/suppliers/' + data.value._id">
                <div
                  class="d-flex justify-content-center align-items-center"
                  style="cursor: pointer"
                >
                  <b-avatar-group size="2rem" class="mr-2">
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
                  </b-avatar-group>
                </div>
              </router-link>
            </template>
          </b-table>
        </b-card>
      </template>
    </b-container>
    <CreateProduct
      :isShow="isShow"
      @onClose="onClose"
      :selectedProduct="productType._id"
      :key="createProductKey"
    />
  </div>
</template>

<script>
import { GetType, DeleteType } from "@/services/types.service";
import CreateProduct from "@/views/Product/CreateProduct";

export default {
  name: "ProductType",
  components: { CreateProduct },
  data() {
    return {
      fields: [
        { key: "supplier", label: "Supplier" },
        { key: "_id", label: "Product ID" },
        { key: "quantity", label: "Product Quantity", sortable: true },
        { key: "createdAt", label: "Created Date" },
        { key: "isAvailable", label: "Availability" },
        { key: "threshold", label: "Threshold" },
        { key: "brand", label: "Product Brand" },
        { key: "delete", label: "Delete" }
      ],
      items: [],
      isShow: false,
      productType: {},
      createProductKey: new Date().valueOf()
    };
  },
  mounted() {
    this.initFn();
  },
  methods: {
    initFn() {
      GetType(this.$route.params.id)
        .then(res => {
          console.log(res.data.data);
          this.productType = res.data.data.productType;
          this.items = res.data.data.productType.products.map(object => {
            object.idClass = this.getAvatarClass();
            object.supplier.avatarClass = this.getAvatarClass();
            object.createdAt = object.createdAt.split("T")[0];
            return object;
          });
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
    }
  }
};
</script>

<style></style>

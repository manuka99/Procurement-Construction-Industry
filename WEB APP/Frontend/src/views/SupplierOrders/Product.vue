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
            <h3 class="text-white">Product Type Infomation</h3>
            <b-card-text>
              <button class="btn btn-danger btn-sm" @click="deleteItem">
                Delete
              </button>
            </b-card-text>

            <b-row class="bg-white p-4">
              <b-col cols="12" sm="4" md="2" class="m-0 p-0 mb-3 mb-sm-0">
                <img
                  width="100%"
                  :src="product.productType.image"
                  alt="Card image"
              /></b-col>
              <b-col cols="12" sm="8" md="10"
                ><div>
                  <b-card-text>
                    Type: {{ product.productType.name }}
                  </b-card-text>
                  <b-card-text>
                    Measured By: {{ product.productType.metric }}
                  </b-card-text>
                  <b-card-text>
                    Created Date: {{ product.productType.createdAt }}
                  </b-card-text>
                  <b-card-text>
                    {{ product.productType.description }}
                  </b-card-text>
                </div>
              </b-col>
            </b-row>
          </b-card-header>
        </b-card>
        <b-card no-body class="bg-default shadow mt-4">
          <b-card-header class="d-flex flex-column bg-transparent border-0">
            <h3 class="text-white">Supplier Infomation</h3>
            <b-row class="bg-white p-4">
              <b-col cols="12" sm="4" md="2" class="m-0 p-0 mb-3 mb-sm-0">
                <img width="100%" :src="product.supplier.logo" alt="Card image"
              /></b-col>
              <b-col cols="12" sm="8" md="10"
                ><div>
                  <b-card-text>
                    <h4>
                      <b-icon
                        v-if="product.supplier.isApproved == true"
                        icon="check-circle-fill"
                        scale="1.6"
                        class="mr-3"
                        variant="success"
                      ></b-icon>
                      <b-icon
                        v-if="product.supplier.isApproved == false"
                        icon="x-circle-fill"
                        scale="1.6"
                        class="mr-3"
                        variant="danger"
                      ></b-icon>
                      {{
                        product.supplier.firstName +
                          " " +
                          product.supplier.lastName
                      }}
                    </h4>
                  </b-card-text>
                  <b-card-text>
                    Location: {{ product.supplier.address }}
                  </b-card-text>
                  <b-card-text>
                    Email: {{ product.supplier.email }}
                  </b-card-text>
                  <b-card-text>
                    Contact: {{ product.supplier.phone }}
                  </b-card-text>
                  <b-card-text>
                    Joined Date: {{ product.supplier.createdAt }}
                  </b-card-text>
                  <b-card-text>
                    {{ product.supplier.description }}
                  </b-card-text>
                </div>
              </b-col>
            </b-row>
          </b-card-header>
        </b-card>
      </template>
    </b-container>
  </div>
</template>

<script>
import { GetProduct, DeleteProduct } from "@/services/product.service";

export default {
  name: "Supplier",
  data() {
    return {
      product: {}
    };
  },
  mounted() {
    this.initFn();
  },
  methods: {
    initFn() {
      GetProduct(this.$route.params.id)
        .then(res => {
          this.product = res.data.data.product;
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
    },
    deleteItem() {
      DeleteProduct(this.product._id)
        .then(res => {
          console.log(res);
          this.$router.push({ name: "Products", replace: true });
          var payloadNotify = {
            isToast: true,
            title: "SUCCESS! Product Was Deleted",
            content: "All data was removed successfully",
            variant: "success"
          };
          this.$store.dispatch("notification/setNotify", payloadNotify);
        })
        .catch(e => console.log(e));
    }
  }
};
</script>

<style></style>

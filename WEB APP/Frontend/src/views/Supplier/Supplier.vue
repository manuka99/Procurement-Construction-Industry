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
      <b-row v-if="supplier != null">
        <div class="mt-4"></div>
      </b-row>
      <template>
        <b-card no-body class="bg-default shadow">
          <b-card-header class="d-flex flex-column bg-transparent border-0">
            <b-card
              :img-src="supplier.image"
              img-alt="Card image"
              img-left
              class="mb-3"
            >
              <b-card-text>
                <h4>
                  <b-icon
                    v-if="supplier.isApproved == true"
                    icon="check-circle-fill"
                    scale="1.6"
                    class="mr-3"
                    variant="success"
                  ></b-icon>
                  <b-icon
                    v-if="supplier.isApproved == false"
                    icon="x-circle-fill"
                    scale="1.6"
                    class="mr-3"
                    variant="danger"
                  ></b-icon>
                  {{ supplier.firstName + " " + supplier.lastName }}
                </h4>
              </b-card-text>
              <b-card-text>
                <button class="btn btn-danger btn-sm" @click="deleteSupplier">
                  Delete
                </button>
              </b-card-text>
              <b-card-text> Location: {{ supplier.address }} </b-card-text>
              <b-card-text> Email: {{ supplier.email }} </b-card-text>
              <b-card-text> Contact: {{ supplier.phone }} </b-card-text>
              <b-card-text>
                Created Date: {{ supplier.createdAt }}
              </b-card-text>
              <b-card-text>
                {{ supplier.description }}
              </b-card-text>
              <b-card-text>
                <b-form-group
                  id="input-group-3"
                  label="User status"
                  label-for="input-3"
                  class="text-primary font-weight-bold"
                >
                  <b-form-select
                    id="input-3"
                    v-model="supplier.isApproved"
                    :options="status"
                    required
                  ></b-form-select>
                </b-form-group>
              </b-card-text>
              <b-card-text>
                <b-form-group
                  id="input-group-2"
                  label="Approval Reason:"
                  label-for="input-2"
                  class="text-primary font-weight-bold"
                >
                  <b-form-textarea
                    id="textarea"
                    v-model="supplier.approvalReason"
                    placeholder="Type approval reason:...."
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
                </b-form-group>
              </b-card-text>
              <b-card-text>
                <b-form-group
                  id="input-group-2"
                  label=" Payment Info:"
                  label-for="input-2"
                  class="text-primary font-weight-bold"
                >
                  <b-form-textarea
                    id="textarea"
                    v-model="supplier.paymentInfo"
                    placeholder="Type payment info:...."
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
                </b-form-group>
              </b-card-text>
              <b-card-text>
                <base-button
                  class="btn btn-primary"
                  @click="submitForm"
                  :loading="loading"
                >
                  Save changes
                </base-button>
              </b-card-text>
            </b-card>
            <h3 class="mb-3 text-white">Supplier's Products</h3>
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
            responsive
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

            <template #cell(type)="data">
              <router-link :to="'/types/' + data.item.productType._id">
                <div
                  class="d-flex justify-content-center align-items-center"
                  style="cursor: pointer"
                >
                  <b-avatar
                    class="mr-3"
                    :text="
                      data.item.productType.name.charAt(0) +
                        data.item.productType.name.charAt(1)
                    "
                    :src="data.item.productType.image"
                    :class="data.item.productType.avatarClass"
                  >
                  </b-avatar>
                  <b-badge :class="data.item.productType.avatarClass">{{
                    data.item.productType.name
                  }}</b-badge>
                </div>
              </router-link>
            </template>

            <template #cell(metric)="data">
              {{ data.item.productType.metric }}
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
                  <b-badge>{{ data.value }}</b-badge>
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
      :selectedSupplier="supplier._id"
      :key="createProductKey"
    />
  </div>
</template>

<script>
import {
  GetSupplier,
  DeleteSupplier,
  UpdateSupplier
} from "@/services/supplier.service";
import CreateProduct from "@/views/Product/CreateProduct";
import { DeleteProduct } from "@/services/product.service";

export default {
  name: "Supplier",
  components: {
    CreateProduct
  },
  data() {
    return {
      fields: [
        { key: "type", label: "Product Type" },
        { key: "_id", label: "Product ID" },
        { key: "brand", label: "Product Brand" },
        { key: "metric", label: "Measured Metrics" },
        { key: "quantity", label: "Product Quantity", sortable: true },
        { key: "createdAt", label: "Created Date" },
        { key: "isAvailable", label: "Availability" },
        { key: "threshold", label: "Threshold" },
        { key: "delete", label: "Delete" }
      ],
      items: [],
      status: [
        { text: "Approved", value: true },
        { text: "Not Approved", value: false }
      ],
      isShow: false,
      loading: false,
      supplier: {},
      createProductKey: new Date().valueOf().toString()
    };
  },
  mounted() {
    this.initFn();
  },
  methods: {
    initFn() {
      GetSupplier(this.$route.params.id)
        .then(res => {
          this.supplier = res.data.data.supplier;
          this.items = res.data.data.supplier.productTypes.map(object => {
            object.productType.avatarClass = this.getAvatarClass();
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
    submitForm() {
      this.loading = true;
      UpdateSupplier(this.supplier._id, this.supplier)
        .then(res => {
          console.log(res);
          var payloadNotify = {
            isToast: true,
            title: "SUCCESS! Supplier Was Updated",
            content: "All data was saved successfully",
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
        .finally(() => (this.loading = false));
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
    deleteSupplier() {
      DeleteSupplier(this.supplier._id)
        .then(res => {
          console.log(res);
          this.$router.push({ name: "Suppliers", replace: true });

          var payloadNotify = {
            isToast: true,
            title: "SUCCESS! Supplier Was Deleted",
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

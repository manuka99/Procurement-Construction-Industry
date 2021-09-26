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
            <h3 class="mb-3 text-white">All Raw Material Suppliers</h3>
            <div>
              <button class="btn btn-success btn-sm" @click="isShow = true">
                New Supplier
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
            @row-clicked="onRowClicked"
            show-empty
          >
            <template #empty>
              <div class="d-flex text-center justify-content-center">
                <span>
                  There are no suppliers to show, start adding new suppliers
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

            <template #cell(logo)="data">
              <b-avatar
                :text="
                  data.item.firstName.charAt(0) + data.item.lastName.charAt(0)
                "
                :src="data.value"
                :class="data.item.avatarClass"
              >
              </b-avatar>
            </template>

            <template #cell(name)="data">
              <div style="text-align: start">
                <b-icon
                  v-if="data.item.isApproved == true"
                  icon="check-circle-fill"
                  scale="1.6"
                  class="mr-3"
                  variant="success"
                ></b-icon>
                <b-icon
                  v-if="data.item.isApproved == false"
                  icon="x-circle-fill"
                  scale="1.2"
                  class="mr-3"
                  variant="danger"
                ></b-icon>
                {{ data.item.firstName + " " + data.item.lastName }}
              </div>
            </template>

            <template #cell(productTypes)="data">
              <div v-if="data.value.length > 0" class="avatar-group">
                <b-avatar-group size="2rem">
                  <b-avatar
                    v-for="i in data.value.slice(
                      0,
                      data.value.length > 4 ? 3 : 4
                    )"
                    :key="i"
                    :text="
                      i.productType.name.charAt(0) +
                        i.productType.name.charAt(1)
                    "
                    :src="i.image"
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
                <b-badge variant="success text-white">No Products</b-badge>
              </div>
            </template>
          </b-table>
        </b-card>
      </template>
    </b-container>
    <CreateSupplier
      :isShow="isShow"
      @onClose="onClose"
      :key="createProductKey"
    />
  </div>
</template>

<script>
import { GetALLSuppliersWithProducts } from "@/services/supplier.service";
import CreateSupplier from "./CreateSupplier";
export default {
  name: "Suppliers",
  components: {
    CreateSupplier
  },
  data() {
    return {
      fields: [
        { key: "logo", label: "Logo" },
        { key: "name", label: "Company Name" },
        { key: "createdAt", label: "Joined Date" },
        { key: "address", label: "Location" },
        { key: "phone", label: "Contact" },
        { key: "email", label: "Email" },
        { key: "productTypes", label: "Product Types" },
        { key: "delete", label: "Delete" }
      ],
      items: [],
      isShow: false,
      createProductKey: new Date().valueOf().toString() + 1000
    };
  },
  mounted() {
    this.initFn();
  },
  methods: {
    initFn() {
      GetALLSuppliersWithProducts()
        .then(res => {
          console.log(res.data.data);
          this.items = res.data.data.suppliers.map(object => {
            object.avatarClass = this.getAvatarClass();
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
    },
    onRowClicked(data) {
      this.$router.push({ name: "Supplier", params: { id: data._id } });
    }
  }
};
</script>

<style></style>

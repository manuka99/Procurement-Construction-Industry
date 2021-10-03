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
            <h3 class="mb-3 text-white">All Construction Sites</h3>
            <div>
              <button class="btn btn-success btn-sm" @click="isShow = true">
                Create New Site
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
                  There are no sites to show, create your first construction site
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

            <template #cell(name)="data">
              <router-link :to="'/sites/' + data.item._id">
                <div
                  class="d-flex justify-content-start align-items-center w-100"
                  style="cursor: pointer"
                >
                  <b-avatar
                    size="2rem"
                    :text="data.item.name.charAt(0) + data.item.name.charAt(1)"
                    :class="data.item.avatarClass"
                  >
                  </b-avatar>
                  <div class="ml-3">
                    <b-badge :class="data.item.avatarClass">{{
                      data.item.name
                    }}</b-badge>
                  </div>
                </div>
              </router-link>
            </template>

            <template #cell(type)="data">
              <div style="text-align: start">
                <div v-if="data.value == 'phase'">
                  <b-icon
                    icon="columns-gap"
                    scale="1.2"
                    class="mr-3"
                    variant="success"
                  ></b-icon>
                  Site Phase
                </div>
                <div v-if="data.value == `regular`">
                  <b-icon
                    icon="command"
                    scale="1.2"
                    class="mr-3"
                    variant="danger"
                  ></b-icon>
                  Head Site
                </div>
              </div>
            </template>
          </b-table>
        </b-card>
      </template>
    </b-container>
    <CreateSite :isShow="isShow" @onClose="onClose" :key="createProductKey" />
  </div>
</template>

<script>
import { GetAllSites, DeleteSite } from "@/services/site.service";
import CreateSite from "./CreateSite";
export default {
  name: "Sites",
  components: {
    CreateSite
  },
  data() {
    return {
      fields: [
        { key: "name", label: "Construction Site" },
        { key: "createdAt", label: "Created Date", sortable: true },
        { key: "location", label: "Location Address" },
        { key: "allocatedBudgetValue", label: "Budget Value MAX (LKR)" },
        { key: "type", label: "Site Type" },
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
      GetAllSites()
        .then(res => {
          console.log(res.data.data);
          this.items = res.data.data.sites.map(object => {
            object.avatarClass = this.getAvatarClass();
            object.createdAt = object.createdAt.split("T")[0];
            return object;
          });
        })
        .catch(e => console.log(e));
    },
    deleteItem(id) {
      DeleteSite(id)
        .then(res => {
          const id = res.data.data.site._id;
          const idx = this.items.findIndex(val => val._id == id);
          this.items = [
            ...this.items.slice(0, idx),
            ...this.items.slice(idx + 1)
          ];

          var payloadNotify = {
            isToast: true,
            title: "SUCCESS! Site Was Deleted",
            content: "All data related to site was removed successfully",
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

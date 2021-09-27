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
            <h3 class="mb-3 text-white">
              Construction Site - {{ siteData.name }}
            </h3>
            <div>
              <button class="btn btn-success btn-sm" @click="isShow = true">
                Create New Phase
              </button>
            </div>
          </b-card-header>
          <b-card-body class="pt-0">
            <hr class="text-white border-bottom mt-0 mb-4" />
            <span class="text-white"> {{ JSON.stringify(siteData) }}</span>
            <div>
              <button class="btn btn-success btn-sm" @click="isShow = true">
                Create New Phase
              </button>
              <button class="btn btn-success btn-sm" @click="deleteItem">
                Delete this site
              </button>
            </div>
          </b-card-body>
        </b-card>
      </template>
      <CreateSite
        :isShow="isShow"
        @onClose="onClose"
        :key="createProductKey"
        :parentSite="siteID"
      />
    </b-container>
  </div>
</template>

<script>
import { GetSite, DeleteSite } from "@/services/site.service";
import CreateSite from "./CreateSite";
export default {
  name: "Site",
  components: {
    CreateSite
  },
  data() {
    return {
      isShow: false,
      siteID: null,
      siteData: null,
      createProductKey: new Date().valueOf().toString() + 1000
    };
  },
  mounted() {
    this.siteID = this.$route.params.id;
    this.initFn();
  },
  methods: {
    initFn() {
      GetSite(this.siteID)
        .then(res => {
          console.log(res.data.data);
          var object = res.data.data.site;
          object.avatarClass = this.getAvatarClass();
          object.createdAt = object.createdAt.split("T")[0];
          this.siteData = object;
        })
        .catch(e => console.log(e));
    },
    deleteItem() {
      DeleteSite(this.siteID)
        .then(() => {
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
      this.createProductKey = new Date().valueOf().toString();
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

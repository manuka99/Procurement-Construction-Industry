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
            <h3 class="mb-0 text-white">
              Construction Site Order -
              {{ siteOrderData.name }}
            </h3>
            <div class="mt-3 d-flex align-items-center">
              <div class="mr-2">
                <button class="btn btn-danger btn-sm" @click="deleteItem">
                  Delete this order
                </button>
              </div>
            </div>
          </b-card-header>
          <b-card-body class="pt-0">
            <hr class="text-white border-bottom mt-0 mb-4" />
            <span class="text-white"> {{ siteOrderData.description }}</span>
            <div class="mt-3">
              <b-tabs
                content-class="mt-3 mheight-400"
                nav-class="nav-head"
                active-nav-item-class="activeNav"
                nav-item-class="activeNav"
              >
                <b-tab title="Order Information" active
                  ><div>
                    <SiteOrderInfo
                      :key="siteInfoKey"
                      :siteInfo="siteOrderData"
                      @onUpdated="refreshData"
                    />
                  </div>
                </b-tab>
                <b-tab title="Order Items" lazy
                  ><div>
                    <SiteOrderItem
                      :key="siteBudgetKey"
                      :siteInfo="siteOrderData"
                      @onUpdated="refreshData"
                    /></div
                ></b-tab>
              </b-tabs>
            </div>
          </b-card-body>
        </b-card>
      </template>
    </b-container>
  </div>
</template>

<script>
import { GetSiteOrder, DeleteSiteOrder } from "@/services/site.service";
import SiteOrderInfo from "./SiteOrderInfo";
import SiteOrderItem from "./SiteOrderItem";

export default {
  name: "Site",
  components: {
    SiteOrderInfo,
    SiteOrderItem
  },
  data() {
    return {
      isShow: false,
      siteOrderID: null,
      siteOrderData: {},
      createSiteKey: new Date().valueOf().toString() + 1000,
      siteInfoKey: new Date().valueOf().toString() + 2000,
      siteBudgetKey: new Date().valueOf().toString() + 3000,
      siteOfficersKey: new Date().valueOf().toString() + 4000,
      sitePhasesKey: new Date().valueOf().toString() + 4000
    };
  },
  mounted() {
    this.siteOrderID = this.$route.params.id;
    this.initFn();
  },
  watch: {
    "$route.params": "initFn"
  },
  methods: {
    initFn() {
      this.siteOrderID = this.$route.params.id;
      GetSiteOrder(this.siteOrderID)
        .then(res => {
          console.log(res.data.data);
          var object = res.data.data.siteOrder;
          object.avatarClass = this.getAvatarClass();
          object.createdAt = object.createdAt.split("T")[0];
          this.siteOrderData = object;
        })
        .catch(e => console.log(e));
    },
    deleteItem() {
      DeleteSiteOrder(this.siteOrderID)
        .then(() => {
          var payloadNotify = {
            isToast: true,
            title: "SUCCESS! Site Order Was Deleted",
            content: "All data related to site order was removed successfully",
            variant: "success"
          };
          this.$store.dispatch("notification/setNotify", payloadNotify);
          if (this.siteOrderData.parent)
            this.$router.push({
              name: "Site",
              params: { id: this.siteOrderData.parent._id }
            });
          else this.$router.push({ name: "Sites", replace: true });
        })
        .catch(e => console.log(e));
    },
    refreshData() {
      // this.siteKey = new Date().valueOf().toString();
      this.initFn();
      this.createSiteKey = new Date().valueOf().toString() + 1000;
      this.siteInfoKey = new Date().valueOf().toString() + 2000;
      this.siteBudgetKey = new Date().valueOf().toString() + 3000;
      this.siteOfficersKey = new Date().valueOf().toString() + 4000;
      this.sitePhasesKey = new Date().valueOf().toString() + 4000;
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

<style>
.mheight-400 {
  min-height: 400px;
  background-color: rgb(0, 30, 60);
  direction: ltr;
  border-radius: 10px;
  border: 1px solid rgb(19, 47, 76);
  overflow: auto;
  max-width: calc(100vw - 32px);
}

.nav-head li a {
  background-color: none;
  border-right: 4px solid transparent !important;
  border-left: 4px solid transparent !important;
  border-top: 4px solid transparent !important;
  outline: none !important;
  padding: 14px;
}

.nav-head li a:not(.activeNav) {
  color: #7f8e9d;
  border: 4px solid transparent !important;
}

.nav-head li a:hover {
  outline: none !important;
  border: 4px solid transparent !important;
}

.activeNav {
  color: rgb(144, 202, 249) !important;
  background-color: transparent !important;
  border-bottom: 4px solid rgb(144, 202, 249) !important;
}
</style>

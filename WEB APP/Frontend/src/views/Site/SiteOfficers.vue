<template>
  <div>
    <b-overlay
      :show="false"
      spinner-variant="primary"
      spinner-type="grow"
      spinner-small
      rounded="sm"
    >
      <b-row class="w-100 text-white p-4">
        <b-col cols="12">
          <b-alert
            class="mt-3"
            variant="danger"
            dismissible
            fade
            :show="apiError.status == true"
            @dismissed="apiError.status = false"
          >
            {{ apiError.message }}
          </b-alert>
        </b-col>
        <b-col cols="12" sm="6">
          <b-form-group
            id="input-group-3"
            label="User Account"
            label-for="input-3"
          >
            <b-form-select
              id="input-3"
              v-model="newUserType"
              :options="users"
              required
            ></b-form-select> </b-form-group
        ></b-col>
        <b-col cols="12" sm="6">
          <b-form-group
            id="input-group-2"
            :label="'asa'"
            label-class="text-transparent"
            label-for="input-2"
          >
            <base-button
              class="btn btn-primary"
              @click="createSiteOfficer"
              :loading="loadingAdd"
            >
              Add as an Officer
            </base-button>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="4" v-for="item in siteOfficers" :key="item._id">
          <div class="w-100 bg-white shadow p-3 mb-5 bg-white rounded">
            <div class="d-flex align-items-center">
              <b-icon
                icon="trash"
                variant="danger"
                font-scale="1.2"
                style="cursor: pointer"
                @click="deleteItem(item._id)"
              ></b-icon>
              <router-link :to="'/users/' + item.officer._id" target="_blank">
                <a class="btn btn-link ">
                  {{ item.officer.firstName + " " + item.officer.lastName }} ({{
                    item.officer.email
                  }})
                </a>
              </router-link>
            </div>
            <b-input-group prepend="ROLE" class="mb-3">
              <b-form-input
                id="input-1"
                v-model="item.role"
                type="text"
                placeholder="Type Item Role...."
              ></b-form-input>
            </b-input-group>
            <b-input-group prepend="DES" class="mb-3">
              <b-form-textarea
                id="textarea"
                v-model="item.description"
                placeholder="Type Short Description..."
                rows="2"
                max-rows="2"
              ></b-form-textarea>
            </b-input-group>
          </div>
        </b-col>
        <b-col cols="12">
          <base-button
            class="btn btn-primary"
            @click="submitForm"
            :loading="loading"
          >
            Save changes
          </base-button>
        </b-col>
      </b-row>
    </b-overlay>
  </div>
</template>

<script>
// services
import {
  UpdateSiteOfficer,
  CreateSiteOfficer,
  GetSiteOfficers
} from "@/services/site.service";
import { GetSiteManagers } from "@/services/user.service";

export default {
  name: "SiteInfo",
  data() {
    return {
      loading: false,
      loadingAdd: false,
      newUserType: null,
      users: [{ value: null, text: "Select a user" }],
      siteOfficers: [],
      siteID: null,
      siteInfo: {},
      siteTypes: [
        { text: "Site Phase", value: "phase" },
        { text: "Head Site", value: "regular" }
      ],
      apiError: {
        status: null,
        message: null
      }
    };
  },
  mounted() {
    this.siteID = this.$route.params.id;
    this.initFn();
  },
  methods: {
    initFn() {
      GetSiteManagers()
        .then(res => {
          var data = res.data.data.users.map(user => {
            return {
              text: user.email,
              value: user._id
            };
          });
          console.log(data);
          this.users = [{ value: null, text: "Select a user" }, ...data];
        })
        .catch(e => console.log(e));
      GetSiteOfficers(this.siteID)
        .then(res => {
          console.log(res.data.data);
          this.siteOfficers = res.data.data.siteOfficers;
        })
        .catch(e => console.log(e));
    },
    closeModal() {
      this.$emit("onClose");
    },
    submitForm() {
      this.loading = true;
      UpdateSiteOfficer(this.siteID, this.siteOfficers)
        .then(res => {
          console.log(res);
          var payloadNotify = {
            isToast: true,
            title: "SUCCESS! Site Officers were Updated",
            content: "All data was saved successfully",
            variant: "success"
          };
          this.$store.dispatch("notification/setNotify", payloadNotify);
          this.$emit("onUpdated");
        })
        .catch(err => {
          this.apiError.status = true;
          if (err.response && err.response.data && err.response.data.data)
            this.apiError.message = err.response.data.data.message;
          else this.apiError.message = err.message || "Unexpected error";
        })
        .finally(() => (this.loading = false));
    },
    createSiteOfficer() {
      this.loadingAdd = true;
      CreateSiteOfficer({
        site: this.siteID,
        officer: this.newUserType
      })
        .then(res => {
          console.log(res);
          var payloadNotify = {
            isToast: true,
            title: "SUCCESS! User Was Assigned",
            content: "All data were saved successfully",
            variant: "success"
          };
          this.$store.dispatch("notification/setNotify", payloadNotify);
          this.newUserType = null;
          this.initFn();
        })
        .catch(err => {
          this.apiError.status = true;
          if (err.response && err.response.data && err.response.data.data)
            this.apiError.message = err.response.data.data.message;
          else this.apiError.message = err.message || "Unexpected error";
        })
        .finally(() => (this.loadingAdd = false));
    },
    deleteItem(id) {
      const idx = this.siteOfficers.findIndex(val => val._id == id);
      this.siteOfficers = [
        ...this.siteOfficers.slice(0, idx),
        ...this.siteOfficers.slice(idx + 1)
      ];
    }
  }
};
</script>

<style scoped></style>

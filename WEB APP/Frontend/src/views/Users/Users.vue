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
            <h3 class="mb-3 text-white">All Management Users</h3>
            <div>
              <button class="btn btn-success btn-sm" @click="isShow = true">
                New User
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
                  There are no users to show, start adding new users
                </span>
              </div>
            </template>

            <template #cell(name)="data">
              <span class="text-white">{{
                data.item.firstName + " " + data.item.lastName
              }}</span>
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
            <template #cell(edit)="data">
              <b-icon
                icon="pen"
                variant="info"
                font-scale="1.6"
                style="cursor: pointer"
                @click="editUser(data.item)"
              ></b-icon>
            </template>
          </b-table>
        </b-card>
      </template>
    </b-container>
    <CreateUser
      :isShow="isShow"
      :upUser="upUser"
      @onClose="onClose"
      :key="createUserKey"
    />
  </div>
</template>

<script>
import {
  GetAllManagementUsers,
  DeleteManagementUsers
} from "@/services/user.service";
import CreateUser from "./CreateUser";
export default {
  name: "Suppliers",
  components: {
    CreateUser
  },
  data() {
    return {
      fields: [
        { key: "createdAt", label: "Joined Date", sortable: true },
        { key: "name", label: "Name" },
        { key: "role", label: "Role", sortable: true },
        { key: "phone", label: "Contact" },
        { key: "email", label: "Email" },
        { key: "delete", label: "Delete" },
        { key: "edit", label: "Edit" }
      ],
      items: [],
      isShow: false,
      upUser: null,
      createUserKey: new Date().valueOf().toString() + 1000
    };
  },
  mounted() {
    this.initFn();
  },
  methods: {
    initFn() {
      GetAllManagementUsers()
        .then(res => {
          console.log(res.data.data);
          this.items = res.data.data.users.map(object => {
            object.avatarClass = this.getAvatarClass();
            object.createdAt = object.createdAt.split("T")[0];
            return object;
          });
        })
        .catch(e => console.log(e));
    },
    deleteItem(id) {
      DeleteManagementUsers(id)
        .then(res => {
          var payloadNotify = {
            isToast: true,
            title: "SUCCESS! User Was Deleted",
            content: "All data related to user was removed successfully",
            variant: "success"
          };
          this.$store.dispatch("notification/setNotify", payloadNotify);
          this.initFn();
        })
        .catch(e => console.log(e));
    },
    editUser(user) {
      this.isShow = true;
      this.upUser = user;
    },
    onClose() {
      this.isShow = false;
      this.upUser = null;
      this.createUserKey = new Date().valueOf();
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

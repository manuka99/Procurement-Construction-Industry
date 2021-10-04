<template>
  <!-- order items modal -->
  <b-modal
    size="lg"
    header-class="font-primary"
    header-bg-variant="white"
    header-text-variant="secondary"
    header-border-variant="gray-500"
    footer-bg-variant="gray-300"
    footer-border-variant="light"
    body-class="py-0"
    no-close-on-backdrop
    v-model="isShow"
    centered
    @hide="closeModal()"
  >
    <template v-slot:modal-title>
      <h2>Create Management User</h2>
    </template>
    <template v-slot:modal-footer="{ cancel }">
      <!-- Emulate built in modal footer ok and cancel button actions -->
      <div
        class="
          d-flex
          flex-column flex-sm-row
          align-items-center
          justify-content-center justify-content-sm-end
          mx-0
          w-100
        "
      >
        <button class="btn btn-danger" @click="cancel">
          Cancel
        </button>
        <base-button
          class="btn btn-primary"
          @click="submitForm"
          :loading="loading"
        >
          Save changes
        </base-button>
      </div>
    </template>
    <!-- custom close icon -->
    <template v-slot:modal-header-close>
      <b-icon
        icon="x-circle-fill"
        class="text-secondary"
        @click="closeModal()"
        aria-label="Close Modal"
      ></b-icon>
    </template>

    <b-form class="w-100">
      <b-form-group
        id="input-group-3"
        label="User Role"
        label-for="input-3"
        class="text-primary"
      >
        <b-form-select
          id="input-3"
          v-model="model.role"
          :options="roles"
          required
        ></b-form-select>
      </b-form-group>

      <base-input
        alternative
        class="mb-3"
        prepend-icon="ni ni-circle-08"
        placeholder="First Name"
        name="First Name"
        :rules="{}"
        v-model="model.firstName"
      >
      </base-input>
      <base-input
        alternative
        class="mb-3"
        prepend-icon="ni ni-circle-08"
        placeholder="Last Name"
        name="Last Name"
        :rules="{}"
        v-model="model.lastName"
      >
      </base-input>

      <base-input
        alternative
        class="mb-3"
        prepend-icon="ni ni-email-83"
        placeholder="Email"
        name="Email"
        :rules="{ email: true }"
        v-model="model.email"
      >
      </base-input>
      <base-input
        alternative
        class="mb-3"
        prepend-icon="ni ni-mobile-button"
        placeholder="Phone"
        name="Phone"
        v-model="model.phone"
      >
      </base-input>

      <base-input
        alternative
        class="mb-3"
        prepend-icon="ni ni-world-2"
        placeholder="Address"
        name="Address"
        :rules="{}"
        v-model="model.address"
      >
      </base-input>

      <base-input
        v-if="updatePWD"
        prepend-icon="ni ni-lock-circle-open"
        placeholder="password"
        type="password"
        name="Password"
        :rules="{ min: 8 }"
        v-model="model.password"
      >
      </base-input>

      <b-form-group id="input-group-4">
        <b-form-checkbox v-model="updatePWD"
          ><span class="text-primary">Update password ?</span></b-form-checkbox
        >
      </b-form-group>
    </b-form>
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
  </b-modal>
</template>

<script>
// services
import {
  CreateManagementUsers,
  UpdateManagementUsers
} from "@/services/user.service";

export default {
  name: "CreateUser",
  data() {
    return {
      loading: false,
      model: {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
        password: ""
      },
      roles: ["ADMIN", "SITEMANAGER", "ACCOUNTANT", "MANAGER"],
      updatePWD: true,
      apiError: {
        status: null,
        message: null
      }
    };
  },
  props: {
    isShow: {
      default: false,
      type: Boolean
    },
    upUser: {
      default: false,
      type: Object
    }
  },
  watch: {
    upUser(val) {
      this.model = val;
      // this.model.password = "";
      this.updatePWD = false;
    }
  },
  methods: {
    closeModal() {
      this.$emit("onClose");
    },
    submitForm() {
      this.loading = true;
      if (this.model._id) {
        if (!this.updatePWD) delete this.model.password;
        UpdateManagementUsers(this.model._id, this.model)
          .then(res => {
            console.log(res);
            var payloadNotify = {
              isToast: true,
              title: "SUCCESS! User Was updated",
              content: "All data was saved successfully",
              variant: "success"
            };
            this.$store.dispatch("notification/setNotify", payloadNotify);
            this.closeModal();
          })
          .catch(err => {
            this.apiError.status = true;
            if (err.response && err.response.data && err.response.data.data)
              this.apiError.message = err.response.data.data.message;
            else this.apiError.message = err.message || "Unexpected error";
          })
          .finally(() => (this.loading = false));
      } else {
        CreateManagementUsers(this.model)
          .then(res => {
            console.log(res);
            var payloadNotify = {
              isToast: true,
              title: "SUCCESS! User Was Created",
              content: "All data was saved successfully",
              variant: "success"
            };
            this.$store.dispatch("notification/setNotify", payloadNotify);
            this.closeModal();
          })
          .catch(err => {
            this.apiError.status = true;
            if (err.response && err.response.data && err.response.data.data)
              this.apiError.message = err.response.data.data.message;
            else this.apiError.message = err.message || "Unexpected error";
          })
          .finally(() => (this.loading = false));
      }
    }
  }
};
</script>

<style scoped></style>

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
      <h2>Create Supplier</h2>
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
      <base-input
        alternative
        class="mb-3"
        prepend-icon="ni ni-circle-08"
        placeholder="Company First Name"
        name="Company First Name"
        :rules="{}"
        v-model="model.firstName"
      >
      </base-input>
      <base-input
        alternative
        class="mb-3"
        prepend-icon="ni ni-circle-08"
        placeholder="Company Last Name"
        name="Company Last Name"
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
        placeholder="Company Phone"
        name="Company Phone"
        v-model="model.phone"
      >
      </base-input>

      <base-input
        alternative
        class="mb-3"
        prepend-icon="ni ni-world-2"
        placeholder="Company Address"
        name="Company Address"
        :rules="{}"
        v-model="model.address"
      >
      </base-input>

      <base-input
        alternative
        class="mb-3"
        prepend-icon="ni ni-atom"
        placeholder="Company Logo"
        name="Company Logo"
        :rules="{}"
        v-model="model.logo"
      >
      </base-input>

      <base-input
        alternative
        prepend-icon="ni ni-lock-circle-open"
        placeholder="password"
        type="password"
        name="Password"
        :rules="{ min: 6 }"
        v-model="model.password"
      >
      </base-input>

      <div class="text-muted font-italic mb-3">
        <small
          >password strength:
          <span
            v-if="model.password.length > 12"
            class="text-success font-weight-700"
            >strong</span
          >
          <span
            v-else-if="model.password.length > 6"
            class="text-info font-weight-700"
            >normal</span
          >
          <span v-else class="text-danger font-weight-700">week</span>
        </small>
      </div>
      <textarea
        class="form-control form-control-alternative"
        rows="4"
        placeholder="Write about your company here ..."
        v-model="model.description"
      ></textarea>
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
import { Register } from "@/services/auth.service";

export default {
  name: "CreateSupplier",
  data() {
    return {
      loading: false,
      model: {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
        logo: "",
        description: "",
        password: "",
        role: "SUPPLIER"
      },
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
    }
  },
  methods: {
    closeModal(supplier) {
      this.$emit("onClose", supplier);
    },
    submitForm() {
      this.loading = true;
      Register(this.model)
        .then(res => {
          console.log(res);
          var payloadNotify = {
            isToast: true,
            title: "SUCCESS! Supplier Was Created",
            content: "All data was saved successfully",
            variant: "success"
          };
          this.$store.dispatch("notification/setNotify", payloadNotify);
          this.closeModal(res.data.data.supplier);
        })
        .catch(err => {
          this.apiError.status = true;
          if (err.response && err.response.data && err.response.data.data)
            this.apiError.message = err.response.data.data.message;
          else this.apiError.message = err.message || "Unexpected error";

          let payloadNotify = {
            isToast: true,
            title: "ERROR! Supplier was not Created",
            content: "There are errors that you need to pay attention.",
            list: [this.apiError.message],
            variant: "danger"
          };

          return this.$store.dispatch("notification/setNotify", payloadNotify);
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>

<style scoped></style>

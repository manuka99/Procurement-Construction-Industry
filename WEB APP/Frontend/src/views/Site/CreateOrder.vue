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
      <h2>Create Order</h2>
    </template>
    <template v-slot:modal-footer>
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
        <button class="btn btn-danger" @click="closeModal">
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
        id="input-group-2"
        label="Order Title: "
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="model.name"
          placeholder="Type order title...."
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Short Description:"
        label-for="input-2"
      >
        <b-form-textarea
          id="textarea"
          v-model="model.description"
          placeholder="Type short description...."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
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
import { CreateSiteOrder } from "@/services/site.service";

export default {
  name: "CreateOrder",
  data() {
    return {
      loading: false,
      model: {},
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
    closeModal() {
      this.$emit("onClose");
    },
    submitForm() {
      this.loading = true;
      this.model.site = this.$route.params.id;
      CreateSiteOrder(this.model)
        .then(res => {
          console.log(res);
          var payloadNotify = {
            isToast: true,
            title: "SUCCESS! Order Was Created",
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
};
</script>

<style scoped></style>

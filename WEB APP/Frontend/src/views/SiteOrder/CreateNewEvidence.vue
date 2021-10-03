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
      <h2>Create New Evidence</h2>
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
      <b-form-group id="input-group-2" label="* Header:" label-for="input-2">
        <b-form-input
          id="input-2"
          type="text"
          v-model="model.title"
          placeholder="Type evidence header...."
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Evidence Image/File: "
        label-for="input-2"
      >
        <b-form-file
          v-model="file"
          placeholder="Choose a image or drop it here..."
          drop-placeholder="Drop image/file here..."
        ></b-form-file>
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
import { CreateSupplierOrderEvidences } from "@/services/site.service";

export default {
  name: "CreateNewEvidence",
  data() {
    return {
      loading: false,
      file: null,
      model: {
        product: null
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
    },
    supplierOrderID: {
      type: String,
      required: true
    }
  },
  methods: {
    closeModal() {
      this.$emit("onClose");
    },
    submitForm() {
      var formData = this.getConvertedFormData(this.model);
      formData.append("file", this.file);
      this.loading = true;
      CreateSupplierOrderEvidences(this.supplierOrderID, formData)
        .then(res => {
          console.log(res);
          var payloadNotify = {
            isToast: true,
            title: "SUCCESS! Supplier Order Evidence Was Created",
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
    },
    getConvertedFormData(jsonObject) {
      var form_data = new FormData();
      for (var key in jsonObject) {
        form_data.append(key, jsonObject[key]);
      }
      return form_data;
    }
  }
};
</script>

<style scoped></style>

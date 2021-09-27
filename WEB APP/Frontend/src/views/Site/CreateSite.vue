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
      <h2>Create Site</h2>
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
        :label="model.type == 'phase' ? 'Phase Title: ' : 'Site Title: '"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="model.name"
          :placeholder="
            model.type == 'phase'
              ? 'Type Phase title....'
              : 'Type Site title....'
          "
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-1"
        label="Site Location: "
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="model.location"
          type="text"
          placeholder="Type site location...."
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-1"
        label="Site MAX Budget (LKR): "
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="model.allocatedBudgetValue"
          type="number"
          placeholder="Type site's allocated max budget...."
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-1"
        label="Site Total Usable Space: "
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="model.totalSpace"
          type="number"
          placeholder="Type site's total usable space...."
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-1"
        label="Total Number Of Workers: "
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="model.noOfworkers"
          type="number"
          placeholder="Type site's total number of workers...."
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-1"
        label="Estimated Date Range: "
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="model.estimatedDateRange"
          type="text"
          placeholder="Type site's estimated date range...."
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Product Type" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="model.type"
          :options="siteTypes"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group
        id="input-group-1"
        label="Site Image 1: "
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="image1"
          type="text"
          placeholder="Paste site image 1...."
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-1"
        label="Site Image 2: "
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="image2"
          type="text"
          placeholder="Paste site image 2...."
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
import { CreateSite } from "@/services/site.service";

export default {
  name: "CreateSite",
  data() {
    return {
      loading: false,
      image1: null,
      image2: null,
      model: {
        type: "regular"
      },
      siteTypes: [
        { text: "Site Phase", value: "phase" },
        { text: "Head Site", value: "regular" }
      ],
      suppliers: [],
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
    parentSite: {
      type: String
    }
  },
  watch: {
    parentSite(val) {
      this.model.parent = val;
      this.model.type = "phase";
    }
  },
  mounted() {
    this.model.parent = this.parentSite;
    if (this.model.parent) this.model.type = "phase";
  },
  methods: {
    closeModal() {
      this.$emit("onClose");
    },
    submitForm() {
      this.loading = true;
      this.model.images = [this.image1, this.image2];
      CreateSite(this.model)
        .then(res => {
          console.log(res);
          var payloadNotify = {
            isToast: true,
            title: "SUCCESS! Site Was Created",
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

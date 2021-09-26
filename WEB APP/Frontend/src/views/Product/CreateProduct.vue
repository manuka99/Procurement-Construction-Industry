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
      <h2>Create Product</h2>
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
      <b-form-group id="input-group-3" label="Product Type" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="model.productType"
          :options="productTypes"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-3" label="Supplier" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="model.supplier"
          :options="suppliers"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-4">
        <b-form-checkbox :value="true" v-model="model.isAvailable"
          ><span class="text-primary"
            >Product is available and visible for sales?</span
          ></b-form-checkbox
        >
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Product Brand:"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="model.brand"
          placeholder="Type product brand...."
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-1"
        label="Product Quantity: "
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="model.quantity"
          type="number"
          placeholder="Enter product quantity...."
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Product Threshold:"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="model.threshold"
          type="number"
          placeholder="Type product threshold...."
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
import { GetALL } from "@/services/types.service";
import { GetALLSuppliers } from "@/services/supplier.service";
import { CreateProduct } from "@/services/product.service";

export default {
  name: "CreateProduct",
  data() {
    return {
      loading: false,
      model: {},
      productTypes: [],
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
    selectedProduct: {
      type: String
    },
    selectedSupplier: {
      type: String
    }
  },
  watch: {
    selectedProduct(val) {
      this.model.productType = val;
    },
    selectedSupplier(val) {
      this.model.supplier = val;
    }
  },
  mounted() {
    this.initFn();
    this.model.productType = this.selectedProduct;
    this.model.supplier = this.selectedSupplier;
  },
  methods: {
    initFn() {
      GetALL()
        .then(res => {
          this.productTypes = res.data.data.productTypes.map(type => {
            return { text: type.name, value: type._id };
          });
        })
        .catch(e => console.log(e));
      GetALLSuppliers()
        .then(res => {
          this.suppliers = res.data.data.suppliers.map(supplier => {
            return {
              text: `${supplier.firstName} ${supplier.lastName}`,
              value: supplier._id
            };
          });
        })
        .catch(e => console.log(e));
    },
    closeModal(productType) {
      this.$emit("onClose", productType);
    },
    submitForm() {
      this.loading = true;
      CreateProduct(this.model)
        .then(res => {
          console.log(res);
          var payloadNotify = {
            isToast: true,
            title: "SUCCESS! Product Was Created",
            content: "All data was saved successfully",
            variant: "success"
          };
          this.$store.dispatch("notification/setNotify", payloadNotify);
          this.closeModal(res.data.data.productType);
        })
        .catch(err => {
          this.apiError.status = true;
          if (err.response && err.response.data && err.response.data.data)
            this.apiError.message = err.response.data.data.message;
          else this.apiError.message = err.message || "Unexpected error";

          let payloadNotify = {
            isToast: true,
            title: "ERROR! Product was not Created",
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

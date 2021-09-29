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
      <h2>Create Supplier Order</h2>
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

    <b-form-group id="input-group-3" label="Select Product" label-for="input-3">
      <b-form-select
        id="input-3"
        v-model="model.product"
        :options="products"
        required
      ></b-form-select>
    </b-form-group>

    <b-form class="w-100">
      <b-form-group
        id="input-group-2"
        label="Product Quantity: "
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          type="number"
          v-model="model.quantity"
          placeholder="Type product quantity...."
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Order Required Date: "
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          type="date"
          v-model="model.requiredDate"
          placeholder="Type order required date...."
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Delivery Location: "
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="model.deliveryLocation"
          placeholder="Type delivery location...."
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
import { CreateSupplierOrder } from "@/services/site.service";
import { GetProductsForType } from "@/services/product.service";

export default {
  name: "CreateSupplierOrder",
  data() {
    return {
      loading: false,
      model: {
        product: null
      },
      products: [{ value: null, text: "Select a product" }],
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
    siteOrderItemID: {
      type: String,
      required: true
    },
    productType: {
      type: String,
      required: true
    }
  },
  watch: {
    productType(val) {
      console.log(this.siteOrderItemID, val);
      this.products = [{ value: null, text: "Select a product" }];
      this.initFn();
    }
  },
  methods: {
    initFn() {
      GetProductsForType(this.productType)
        .then(res => {
          var data = res.data.data.products.map(product => {
            return {
              text:
                product.supplier.firstName +
                " " +
                product.supplier.lastName +
                " (" +
                product.brand +
                ") - LKR " +
                product.price.toLocaleString(),
              value: product._id
            };
          });
          this.products = [{ value: null, text: "Select a product" }, ...data];
        })
        .catch(e => console.log(e));
    },
    closeModal() {
      this.$emit("onClose");
    },
    submitForm() {
      this.loading = true;
      this.model.siteOrderItemID = this.siteOrderItemID;
      CreateSupplierOrder(this.model)
        .then(res => {
          console.log(res);
          var payloadNotify = {
            isToast: true,
            title: "SUCCESS! Supplier Order Was Created",
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

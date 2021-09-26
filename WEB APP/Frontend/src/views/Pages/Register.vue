<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <b-container class="container">
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-white">Create a Supplier account</h1>
              <p class="text-lead text-white">
                Login to explore all features to manage your construction sites.
              </p>
            </b-col>
          </b-row>
        </div>
      </b-container>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            class="fill-default"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <b-container class="mt--8 pb-5">
      <!-- Table -->
      <b-row class="justify-content-center">
        <b-col lg="6" md="8">
          <b-card no-body class="bg-secondary border-0">
            <b-card-body class="px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                Sign up with credentials
              </div>
              <validation-observer
                v-slot="{ handleSubmit }"
                ref="formValidator"
              >
                <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
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
                      <span v-else class="text-danger font-weight-700"
                        >week</span
                      >
                    </small>
                  </div>

                  <textarea
                    class="form-control form-control-alternative"
                    rows="4"
                    placeholder="Write about your company here ..."
                    v-model="model.description"
                  ></textarea>

                  <b-row class=" my-4">
                    <b-col cols="12">
                      <base-input name="Privacy" Policy>
                        <b-form-checkbox v-model="model.agree">
                          <span class="text-muted"
                            >I agree with the
                            <a href="#!">Privacy Policy</a></span
                          >
                        </b-form-checkbox>
                      </base-input>
                    </b-col>
                  </b-row>
                  <b-alert
                    variant="danger"
                    dismissible
                    fade
                    :show="apiError.status == true"
                    @dismissed="apiError.status = false"
                  >
                    {{ apiError.message }}
                  </b-alert>
                  <div class="text-center">
                    <base-button
                      :loading="isLoading"
                      nativeType="submit"
                      class="mt-4"
                      >Create account</base-button
                    >
                  </div>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { Register } from "@/services/auth.service";
import { APP_USER, APP_USER_TOKEN } from "@/services/config";
export default {
  name: "register",
  data() {
    return {
      model: {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
        logo: "",
        description: "",
        password: "",
        role: "SUPPLIER",
        agree: false
      },
      apiError: {
        status: null,
        message: null
      },
      isLoading: false
    };
  },
  methods: {
    onSubmit() {
      // this will be called only after form is valid. You can do an api call here to register users
      if (!this.model.agree) {
        let payloadNotify = {
          isToast: true,
          title: "ERROR! Unable to Register",
          content:
            "You have to accept our terms and conditions to Complete the Registration",
          variant: "danger"
        };

        return this.$store.dispatch("notification/setNotify", payloadNotify);
      }

      this.isLoading = true;
      Register(this.model)
        .then(res => {
          const { supplier, token } = res.data.data;
          localStorage.setItem(APP_USER_TOKEN, token);
          localStorage.setItem(APP_USER, JSON.stringify(supplier));
          this.$router.push({ name: "Dashboard", replace: true });
        })
        .catch(err => {
          this.apiError.status = true;
          if (err.response && err.response.data && err.response.data.data)
            this.apiError.message = err.response.data.data.message;
          else this.apiError.message = err.message || "Unexpected error";

          let payloadNotify = {
            isToast: true,
            title: "ERROR! Unable to Register",
            content: "There are errors that you need to pay attention.",
            list: [this.apiError.message],
            variant: "danger"
          };

          return this.$store.dispatch("notification/setNotify", payloadNotify);
        })
        .finally(() => (this.isLoading = false));
    }
  }
};
</script>
<style></style>

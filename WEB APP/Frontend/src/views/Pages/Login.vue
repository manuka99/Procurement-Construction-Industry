<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-white">Welcome!</h1>
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
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card no-body class="bg-secondary border-0 mb-0">
            <b-card-body class="px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                Sign in with credentials
              </div>
              <validation-observer
                v-slot="{ handleSubmit }"
                ref="formValidator"
              >
                <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <base-input
                    alternative
                    class="mb-3"
                    name="Email"
                    :rules="{ required: true, email: true }"
                    prepend-icon="ni ni-email-83"
                    placeholder="Email"
                    v-model="model.email"
                  >
                  </base-input>

                  <base-input
                    alternative
                    class="mb-3"
                    name="Password"
                    :rules="{ required: true, min: 6 }"
                    prepend-icon="ni ni-lock-circle-open"
                    type="password"
                    placeholder="Password"
                    v-model="model.password"
                  >
                  </base-input>

                  <b-form-checkbox v-model="model.rememberMe"
                    >Remember me</b-form-checkbox
                  >
                  <b-alert
                    variant="danger"
                    dismissible
                    fade
                    :show="apiError.status == true"
                    @dismissed="apiError.status = false"
                    class="mt-3 mb-2"
                  >
                    {{ apiError.message }}
                  </b-alert>
                  <div class="text-center">
                    <base-button
                      :loading="isLoading"
                      nativeType="submit"
                      class="mt-2"
                      >Sign in</base-button
                    >
                  </div>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
          <b-row class="mt-3">
            <b-col cols="6">
              <router-link to="/dashboard" class="text-light"
                ><small>Forgot password?</small></router-link
              >
            </b-col>
            <b-col cols="6" class="text-right">
              <router-link to="/register" class="text-light"
                ><small>Create new account</small></router-link
              >
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { Login } from "@/services/auth.service";
import { APP_USER, APP_USER_TOKEN } from "@/services/config";
export default {
  data() {
    return {
      model: {
        email: "",
        password: "",
        rememberMe: false
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
      this.isLoading = true;
      Login(this.model)
        .then(res => {
          const { user, token } = res.data.data;
          localStorage.setItem(APP_USER_TOKEN, token);
          localStorage.setItem(APP_USER, JSON.stringify(user));
          this.$router.push({ name: "Dashboard", replace: true });
        })
        .catch(err => {
          this.apiError.status = true;
          if (err.response && err.response.data && err.response.data.data)
            this.apiError.message = err.response.data.data.message;
          else this.apiError.message = err.message || "Unexpected error";

          let payloadNotify = {
            isToast: true,
            title: "ERROR! Unable to Login",
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

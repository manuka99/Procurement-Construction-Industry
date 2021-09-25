export default {
    namespaced: true,
    state: {
        isToast: false,
        title: null,
        content: null,
        list: null,
        variant: "success", // success, danger, warning
        duration: "short" // short, long
    },
    mutations: {
        SET_NOTIFY(state, payload) {
            state.isToast = payload.isToast;
            state.title = payload.title;
            state.content = payload.content;
            state.list = payload.list;
            state.variant = payload.variant;
            state.duration = payload.duration;
        },
    },
    actions: {
        setNotify({
            commit
        }, payload) {
            commit("SET_NOTIFY", payload);
        },
    },
    getters: {
        getNotify: (state) => {
            return {
                isToast: state.isToast,
                title: state.title,
                content: state.content,
                list: state.list,
                variant: state.variant,
                duration: state.duration
            }
        },
    },
};
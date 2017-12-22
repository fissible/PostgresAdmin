
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('v-button', require('./components/Button.vue'))
Vue.component('modal', require('./components/Modal.vue'))
Vue.component('admin-content', require('./components/admin/Content.vue'))
Vue.component('database-connections', require('./components/Connections.vue'))
Vue.component('app-form', require('./components/forms/Form.vue'))
Vue.component('multi-input-text', require('./components/forms/fields/MultiInputText'))
Vue.component('primary-content', require('./components/Content.vue'))
Vue.component('tabs', require('./components/Tabs.vue'))
Vue.component('tab', require('./components/admin/Tab.vue'))

Vue.prototype.$http = axios
Vue.mixin(require( './mixins/Settings.vue'))

window.bus = new Vue()
window.store = {
    debug: true,
    driver: 'postgres',
    state: {
        activeTab: 0,
        closingTab: false,
        connection: null,
        errors: [],
        loadingTable: false,
        processing: false,
        tables: [],
		masked: false
    },
    uuid() {
        return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36)
    },
    setProcessing(newValue) {
        this.state.processing = !! newValue
    },
    isProcessing () {
        if (this.debug) console.log('clearMessageAction triggered')
        this.state.message = ''
    },
    titleCase(string) {
        return string.replace(/_/g, ' ').replace(/(^[a-z])|(\s+[a-z])/g, txt => txt.toUpperCase())
    }
}
window.util = {
    icon(type) {
        switch (type) {
            case "add": {
                return "glyphicon glyphicon-plus"
            }
            case "cog": {
                return "glyphicon glyphicon-cog"
            }
            case "content": {
                return "glyphicon glyphicon-th-list"
            }
            case "link": {
                return "glyphicon glyphicon-link"
            }
            case "query": {
                return "glyphicon glyphicon-search"
            }
            case "refresh": {
                return "glyphicon glyphicon-refresh"
            }
            case "structure": {
                return "glyphicon glyphicon-info-sign"
            }
			case "star":
			case "primary-key": {
				return "glyphicon glyphicon-star"
			}
			case "star-empty":
			case "foreign-key": {
				return "glyphicon glyphicon-star-empty"
			}
            case "trash": {
                return "glyphicon glyphicon-trash"
            }
        }
    },
    titleCase(string) {
        return string.replace(/_/g, ' ').replace(/(^[a-z])|(\s+[a-z])/g, txt => txt.toUpperCase())
    },
    uuid() {
        return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36)
    }
}
window.App = new Vue({
    el: '#app',
    created() {
        // setup axios
        const { attributes } = document.getElementById('axiosConfig')
        this.baseUrl = attributes.baseUrl.value
        this.accessToken = attributes.accessToken.value
        this.$http.defaults.baseURL = this.baseUrl
        this.$http.defaults.headers.post['Content-Type'] = 'application/json'
        this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + this.accessToken
    }
});

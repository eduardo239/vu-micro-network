import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './css/reset.css';
import './css/normalize.css';
import './css/app.css';

import PrimeVue from 'primevue/config';

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Message from 'primevue/message';
import Menubar from 'primevue/menubar';
import Paginator from 'primevue/paginator';
import Divider from 'primevue/divider';
import Avatar from 'primevue/avatar';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Chip from 'primevue/chip';
import FileUpload from 'primevue/fileupload';
import Badge from 'primevue/badge';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Card from 'primevue/card';
import Inplace from 'primevue/inplace';
import Textarea from 'primevue/textarea';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmPopup from 'primevue/confirmpopup';
import ProgressSpinner from 'primevue/progressspinner';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ConfirmationService from 'primevue/confirmationservice';

//import 'primevue/resources/themes/saga-blue/theme.css'; //theme
// import 'primevue/resources/themes/arya-orange/theme.css';
// import 'primevue/resources/themes/arya-green/theme.css';
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css';
import 'primevue/resources/primevue.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css';

createApp(App)
  .use(store)
  .use(PrimeVue, { ripple: true })
  .use(ToastService)
  .use(ConfirmationService)
  .component('Column', Column)
  .component('DataTable', DataTable)
  .component('InputText', InputText)
  .component('Button', Button)
  .component('Message', Message)
  .component('Menubar', Menubar)
  .component('Paginator', Paginator)
  .component('Avatar', Avatar)
  .component('TabView', TabView)
  .component('TabPanel', TabPanel)
  .component('Chip', Chip)
  .component('FileUpload', FileUpload)
  .component('Badge', Badge)
  .component('Divider', Divider)
  .component('Card', Card)
  .component('Toast', Toast)
  .component('Inplace', Inplace)
  .component('Textarea', Textarea)
  .component('ConfirmDialog', ConfirmDialog)
  .component('ProgressSpinner', ProgressSpinner)
  .component('ConfirmPopup', ConfirmPopup)
  .use(router)
  .mount('#app');

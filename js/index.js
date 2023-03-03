import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.47/vue.cjs.min.js';

const apiRoot = 'https://vue3-course-api.hexschool.io/v2/';
const aipPath = 'jamievue';

const app = createApp({
    data() {
        return {
            products:[],
            tempProduct:{}
        }
    },
    methods: {
        checkLogin(){
            const url = `${apiRoot}api/user/check`;
            axios.post(url, this.user)
                .then((res)=>{
                    const { token, expired } = res.data;

                    // 存token
                    document.cookie = `hexschool=${token}; exxpires=${new Data(expired)}`;
                    axios.defaults.headers.common['Authorization']=token;

                    this.getPorducts();
                   
                })
                .catch(err=>{
                    window.location = '/login.html';
                });
        },
        getPorducts(){
            const url = `${apiRoot}api/${aipPath}/admin/products/all`;

            axios.get(url)
                  .then((res)=>{
                      this.products = res.data.products;
                  })
                  .catch(error=>{
                    console.log(error);
                  });
        }
    },
    mounted() {
        //取登入token
        const token = document.cookie.replace((/(?:(?:^|.*;\s*)hexschool\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        
        //axios預設帶token
        axios.defaults.headers.common['Authorization']=token;
        this.checkLogin();
    },
});

app.mount('#app');
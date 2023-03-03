import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.47/vue.cjs.min.js';

const apiRoot = 'https://vue3-course-api.hexschool.io/v2/';

const app = createApp({
    data() {
        return {
            user: {
                username: '',
                password: '',
            }
        }
    },
    methods: {
        login(){
            const url = `${apiRoot}admin/signin`;
            axios.post(url, this.user)
                .then((res)=>{
                    const { token, expired } = res.data;

                    // 存token
                    document.cookie = `hexschool=${token}; exxpires=${new Data(expired)}`;
                    axios.defaults.headers.common['Authorization']=token;

                    window.location = '/index.html'
                })
                .catch(err=>{
                    console.log(err)
                });
        }
    },
    mounted() {
        
    },
});

app.mount('#app');
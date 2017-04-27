<template>
    <div>
        <input  v-on:change="change()" v-model="greeting"/>
        <p  v-on:click="con()" > {{greeting}} World!</p>
    </div>
</template>
<
<script>
   
export default {
    data() {
        return {
            greeting: "maple"
        }

    },
    mounted(){
        console.log("mounted --start");
        console.log(this.greeting);
        this.greeting ="sunshine";
    },
    methods:{
        change(){
           
           this.$store.state.greeting =this.greeting;
           this.$store.commit('show');
        },
        con(){
            console.log("con" );
            console.log(this.$store.state.greeting);
             
        }
    },
}
</script>


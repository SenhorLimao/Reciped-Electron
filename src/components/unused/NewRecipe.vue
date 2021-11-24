<template>
    <div>
        <new-recipe-first v-if="state===1"></new-recipe-first>
        <new-recipe-second v-else-if="state===2"></new-recipe-second>
        <v-btn color="success" outlined @click="state>1?state--:state=state">Anterior</v-btn>
        <v-btn color="success" @click="state<2?state++:state=state">Próximo</v-btn>
    </div>
</template>

<script>
import NewRecipeFirst from './NewRecipeFirst.vue'
import NewRecipeSecond from './NewRecipeSecond.vue'

export default {
    
    components:{
        NewRecipeFirst,
        NewRecipeSecond
    },
    data() {
        return {
            state:1
        }
    },
}
</script>

<style>

</style>
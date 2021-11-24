<template>
    <div>
        <h3 class="headline mb-0">{{getRecipe.title}}</h3>
        <recipe-review-cards :stepToGo="1">
            <template #title>
                <h3 class="headline mb-0">{{getCardTitles[0]}}</h3>
            </template>
            <template #items>
                <h4>Author: {{getAuthor.name}}</h4>
                <h4>Rendimento: {{getYieldType&&getYieldType.value?getRecipe.yield_amount:``}} {{getYieldType&&getYieldType.value?getYieldType.name:`Não informado`}}</h4>
                <h4>Categoria: {{getCategory.name}}</h4>
            </template>
        </recipe-review-cards>
        <hr style="color:white;">
        <recipe-review-cards :stepToGo="2">
            <template #title>
                <h3 class="headline mb-0">{{getCardTitles[1]}}</h3>
            </template>
            <template #items>
                    <!-- :headers="ingredient_list_header" -->
                <v-data-table
                    :headers="getSubSetIngredientListHeaders"
                    :items="ingredient_list"
                    class="elevation-1"
                >
                </v-data-table>
            </template>
        </recipe-review-cards>
        <hr style="color:white;">
        <recipe-review-cards :stepToGo="3">
            <template #title>
                <h3 class="headline mb-0">{{getCardTitles[2]}}</h3>
            </template>
            <template #items>
                <h4>Modo de preparo: {{getRecipe.instructions}}</h4>
                <h4>Tempo de preparo: {{getRecipe.prep_time}}</h4>
            </template>
        </recipe-review-cards>
    </div>


        <!-- <div>Review da receita para salvar ou ajustar</div> -->
        <!-- list author and ingredient_list -->
        
        <!-- <v-btn color="success" @click="log">text</v-btn> -->
        <!-- <v-btn color="success" @click="saveRecipe">Salvar</v-btn> -->
</template>

<script>
import RecipeMixin from '@/components/new/recipemixin.js'
import RecipeReviewCards from './RecipeReviewCards.vue'
export default {
    mixins:[RecipeMixin],
    components:{
        RecipeReviewCards
    },
    created() {
        
    },
    computed:{
        getCardTitles(){
            return this.getStepperTitles
        },
        getSubSetIngredientListHeaders(){
            return this.ingredient_list_header.filter(item => {
                return item.value!=='edit' && item.value!=='delete'
            })
        }
    },
    methods: {
        
        log(){
            console.log(this.getRecipe)
            console.log(this.getAuthor)
            console.log(this.getCategory)
            console.log(this.getYieldType)
            console.log(this.getPrepMethod)
            console.log(this.getIngredientList)
        }
    },
/**
 * Insert Recipe with Title, Instructions, Yield_Amount, Yield_Type_Id, Prep_Time
 * Insert Author_List with Author_Id, Recipe_Id
 * Insert Category_List with Category_Id, Recipe_Id
 * Insert all Ingredient_List with Recipe_Id, Ingredient_Id, Amount, Unit_Id, Group_Id (ingredient_group), Substitute_For
 * 
 * 
 */
}
</script>

<style scoped>
    /* .containerBtn {
        display: flex;
        justify-content: flex-end;
    } */

</style>
<template>
    <v-container>
        <div>
            <!-- Título da receita -->
            <v-row justify="space-around" class="mt-4">
                <v-card class="grey lighten-2">
                    <v-card-title primary-title class="d-flex justify-space-between">
                        {{recipe.title | uppercase}}
                        
                    </v-card-title>
                </v-card>
            </v-row>
            <!-- Nome do autor da receita.
            Ao clicar no card, carrega a página do autor, com a lista de
            receitas dele -->
            <v-row v-if="author" justify="space-around" class="mt-4">
                <v-card
                    elevation="4"
                    outlined
                    dark
                    width="60vw"
                     
                >
                    <v-card-text class="d-flex justify-space-between">
                        <span class="clickable" @click="$emit('showAuthor',author)"><strong>Autor:</strong> {{author.name | uppercase}}</span>
                        <v-btn color="primary" x-small fab @click="editAuthorDialog(author)">
                            <v-icon dense>mdi-pencil</v-icon>
                        </v-btn>
                    </v-card-text>

                </v-card>
            </v-row>
            <!-- Mostra a lista de ingredientes da receita -->
            <!-- TODO: alterar para mostrar a ingredient_list, com os parâmetros, ao invés de somente os
            ingredientes utilizados -->
            <v-row justify="space-around" class="mt-4">
                <v-card
                    elevation="4"
                    outlined
                    dark
                    width="60vw"
                >
                    <v-card-title primary-title class="d-flex justify-space-between">
                        <span>Ingredientes</span>

                        <!-- <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn fab dark small color="primary" @click.stop="newIngredientDialog=true"
                                    v-bind="attrs" v-on="on">
                                    <v-icon dark>mdi-food-variant</v-icon>
                                </v-btn>
                            </template>
                            <span>Criar novo Ingrediente</span>
                        </v-tooltip> -->

                        <!-- <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="primary" x-small fab @click.stop="editIngredientListDialog=true"
                                v-bind="attrs" v-on="on">
                                    <v-icon dense>mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn color="primary" x-small fab @click="editIngredientListDialog(ingredientList)">
                                    <v-icon dense>mdi-pencil</v-icon>
                                </v-btn>
                            </template>
                            <span>Editar Lista de Ingredientes</span>
                        </v-tooltip> -->
                    </v-card-title>
                    <v-card-text>
                        <!-- TODO: Mudar para DataTable: copiar de RecipeStepper 2, mantendo botões para 
                        editar e excluir.
                        Utilizar uma janela de diálogo para editar, e um diálogo de confirmação para
                        excluir -->
                        <!-- <ul>
                            <li v-for="il in ingredientList" :key="il.id">
                                {{il.i_name}} - Quantidade: {{il.amount}} {{il.u_name}} - Usado para: {{il.g_name}}
                            </li>
                        </ul> -->
                        <v-data-table
                                :headers="ingredientListHeader"
                                :items="ingredient_list"
                                class="elevation-1"
                                item-key="key"
                            >
                                <!-- Botão para editar o item da lista de ingredientes -->
                                <template v-slot:[`item.edit`]="{ item }">
                                    <v-btn icon @click="editIngredientListItem(item)">
                                        <v-icon color="orange lighten-2">mdi-pencil-outline</v-icon>
                                    </v-btn>
                                </template>
                                <!-- Botão para excluir o item da lista de ingredientes -->
                                <template v-slot:[`item.delete`]="{ item }">
                                    <v-btn icon @click="remove(item)">
                                        <v-icon color="red lighten-1">mdi-close-outline</v-icon>
                                    </v-btn>
                                </template>
                            </v-data-table>
                    </v-card-text>
                </v-card>
            </v-row>

            <edit-ingredient-list :visible="editIngredientListDialog" @close="closeIngredientListDialog($event)" />
            <edit-ingredient-list-item-dialog
                v-if="editIngredientListItemDialog" 
                :visible="editIngredientListItemDialog" 
                @close="closeIngredientListItemDialog($event)"
                :ingredientListItem="ingredientListItemEdit" />
            <!-- Mostra as instruções de prepado da receita -->
            <v-row  justify="space-around" class="mt-4">
                <v-card
                    elevation="4"
                    outlined
                    dark
                    width="60vw"
                >
                    <v-card-title primary-title>
                        Modo de Preparo
                    </v-card-title>
                    <v-card-text>
                        {{recipe.instructions}}
                    </v-card-text>
                </v-card>
            </v-row>
            <!-- Mostra o rednmento da receita, se este tiver sido especificado -->
            <v-row v-if="yield_type" justify="space-around" class="mt-4">
                <v-card
                    elevation="4"
                    outlined
                    dark
                    width="60vw"
                >
                    <v-card-title primary-title>
                        Rendimento
                    </v-card-title>
                    <v-card-text>
                        {{yield_type.yield_amount}} {{yield_type.name}}
                    </v-card-text>
                </v-card>
            </v-row>
        </div>
    </v-container>
</template>

<script>
import EditIngredientList from './EditDialogs/EditIngredientList.vue'
import RecipeMixin from '@/components/new/recipemixin.js'
import EditIngredientListItemDialog from './EditDialogs/EditIngredientListItemDialog.vue'
export default {
  components: { EditIngredientList, EditIngredientListItemDialog },
    props: ['recipe'],
    mixins: [RecipeMixin],
    data() {
        return {
            editIngredientListDialog: false,
            editIngredientListItemDialog: false,
            ingredientListItemEdit: {},
            ingredients:[],
            // yield_type:null,
            // author:null,
            // ingredientList:[],
            ingredientListHeader:[
                {
                    text: 'Ingrediente',
                    align: 'start',
                    sortable: true,
                    value: 'i_name',
                },
                {
                    text: 'Pode ser substituído por',
                    align: 'start',
                    sortable: true,
                    value: 'substitute_for',
                },
                {
                    text: 'Modo de Preparo',
                    align: 'start',
                    sortable: true,
                    value: 'prm_name',
                },
                {
                    text: 'Quantidade',
                    align: 'start',
                    sortable: true,
                    value: 'amount',
                },
                {
                    text: 'Unidade de Medida',
                    align: 'start',
                    sortable: true,
                    value: 'unit',
                },
                {
                    text: 'Usado para',
                    align: 'start',
                    sortable: true,
                    value: 'g_name',
                },
                {
                    text: 'Editar',
                    align: 'start',
                    sortable: true,
                    value: 'edit',
                },
                {
                    text: 'Excluir',
                    align: 'start',
                    sortable: true,
                    value: 'delete',
                },
            ],
        }
    },
    methods: {
        goto(id){
            this.$emit('showRecipe', id)
        },
        closeIngredientListDialog(event){
            // this.loadUnits()
            console.log(event)
            this.editIngredientListDialog=false
        },
        closeIngredientListItemDialog(event){
            // this.loadUnits()
            console.log(event)
            this.editIngredientListItemDialog=false
        },
        editIngredientListItem(item){
            console.log(item)
            this.ingredientListItemEdit = item
            this.editIngredientListItemDialog=true
        },
    },
    created(){
        // Ao iniciar o componente, busca na sequência as informações
        // da tabela de receitas, da tabela de rendimento da receita
        // e da tabela de autores da receita

        // TODO: incluir a lista de ingredientes da receita
        // com método de preparo e outras informações relevantes
        // Utilizar como parâmetro as informações incluídas no
        // component RecipeStep2.vue
        this.axios.get(`ingredient_list/recipe/${this.recipe.id}`)
            .then(response => {
                this.ingredient_list = response.data.map(ingredient => {
                    return {
                        ...ingredient, key: `${ingredient.id}-${ingredient.pm_id}`,
                    }
                })
                console.log(this.ingredient_list)
            })
        this.axios.get(`ingredients/recipe/${this.recipe.id}`)
            .then(i=>{
                this.ingredients = i.data
            })
        this.axios.get(`yield/recipe/${this.recipe.id}`)
            .then(y=>{
                this.yield_type = y.data[0]
            })
            
        this.axios.get(`author/recipe/${this.recipe.id}`)
            .then(y=>{
                this.author = y.data[0]
            })

    }
}
</script>

<style scoped>
.clickable{
    cursor: pointer;
}
</style>
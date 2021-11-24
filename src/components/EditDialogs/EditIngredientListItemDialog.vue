<template>
    <v-dialog v-model="show" max-width="80vw">
        <v-card class="blue-grey lighten-3">
            <v-card-title>
                <span class="text-h5">Editar Item da Lista de Ingredientes</span>
            </v-card-title>
            <v-card-text>
                <v-form v-model="valid" ref="form" lazy-validation>
                    <div class="pa-6">
                        <v-container fluid>
                            <v-row>
                                <!-- Seletor de ingrediente -->
                                <v-col cols="5">
                                    <v-autocomplete 
                                        label="Ingrediente" 
                                        :items="ingredients" 
                                        v-model="ingredient"
                                        item-text="name"
                                        item-value="id"
                                    >
                                    </v-autocomplete>
                                </v-col>
                                <!-- Botão para incluir novo ingrediente -->
                                <v-col cols="1">
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn fab dark small color="primary" @click.stop="newIngredientDialog=true"
                                                v-bind="attrs" v-on="on">
                                                <v-icon dark>mdi-food-variant</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Criar novo Ingrediente</span>
                                    </v-tooltip>
                                </v-col>
                                <!-- Seletor de ingrediente substituto ao principal -->
                                <v-col cols="5">
                                    <v-autocomplete 
                                        label="Pode ser substituído por:" 
                                        :items="substitutes"
                                        v-model="substitute_for"
                                        item-text="name"
                                        item-value="id">
                                    </v-autocomplete>
                                </v-col>
                                <!-- Componente de diálogo para criação de novo ingrediente -->
                                <new-ingredient :visible="newIngredientDialog" @close="closeIngredientDialog()" />
                            </v-row>
                            <v-row>
                                <!-- Seletor do uso do ingrediente -->
                                <v-col cols="5">
                                    <v-autocomplete
                                        label="Usado para"
                                        :items="ingredient_groups"
                                        v-model="ingredient_group"
                                        item-text="name"
                                        item-value="id"
                                    ></v-autocomplete>
                                </v-col>
                                <!-- Botão para criar uma nova opção de uso do ingrediente -->
                                <v-col cols="1">
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn fab dark small color="primary" @click.stop="newIngredientGroupDialog=true"
                                                v-bind="attrs" v-on="on">
                                                <v-icon dark>mdi-bowl-mix-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Criar novo Uso para Ingrediente</span>
                                    </v-tooltip>
                                </v-col>
                                <!-- Componente de diálogo de adição de novo uso de ingrediente -->
                                <new-ingredient-group :visible="newIngredientGroupDialog" @close="closeIngredientGroupDialog()" />
                                
                                <!-- Seletor de método de preparo -->
                                <v-col cols="5">
                                    <v-autocomplete
                                        label="Método de Preparo"
                                        :items="prep_methods"
                                        v-model="prep_method"
                                        item-text="name"
                                        item-value="id"
                                    ></v-autocomplete>
                                </v-col>
                                <!-- Seletor para inclusão de novo método de preparo do ingrediente -->
                                <v-col cols="1">
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn fab dark small color="primary" @click.stop="newPrepMethodDialog=true"
                                                v-bind="attrs" v-on="on">
                                                <v-icon dark>mdi-toaster-oven</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Criar novo Método de Preparo</span>
                                    </v-tooltip>
                                </v-col>
                                <!-- Componente de diálogo para criação de novo método de preparo -->
                                <new-prep-method :visible="newPrepMethodDialog" @close="closePrepMethodDialog()" />
                            </v-row>
                            <v-row>
                                <!-- Iclui a quantidade numérica do ingrediente -->
                                <v-col cols="2">
                                    <v-text-field 
                                        label="Quantidade" 
                                        v-model="amount" 
                                        required
                                        :min="0"
                                        type="number">
                                    </v-text-field>
                                </v-col>
                                <!-- Seletor da unidade de medida utilizada para o ingrediente -->
                                <v-col cols="6">
                                    <v-autocomplete
                                        label="Unidade de Medida"
                                        :items="units"
                                        v-model="unit"
                                        item-text="name"
                                        item-value="id"
                                    ></v-autocomplete>
                                </v-col>
                                <!-- Botão para criar nova unidade de medida -->
                                <v-col cols="1">
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn fab dark small color="primary" @click.stop="newUnitDialog=true"
                                                v-bind="attrs" v-on="on">
                                                <v-icon dark>mdi-ruler-square-compass</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Adicionar Unidade de Medida</span>
                                    </v-tooltip>
                                </v-col>
                                <v-col cols="2"></v-col>
                                <!-- Componente de diálogo para criação de nova unidade de medida -->
                                <new-unit :visible="newUnitDialog" @close="closeUnitDialog()" />
                            </v-row>
                        </v-container>
                    </div>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" outlined @click.stop="show = false">
                    Cancelar
                </v-btn>
                <v-btn color="blue darken-1" text @click.stop="saveAndClose">
                    Salvar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import NewIngredient from '../NewIngredient.vue'
import NewIngredientGroup from '../NewIngredientGroup.vue'
import NewPrepMethod from '../NewPrepMethod.vue'
import NewUnit from '../NewUnit.vue'
import recipemixin from '@/components/new/recipemixin'
export default {
  components: { NewIngredient, NewIngredientGroup, NewPrepMethod, NewUnit },

    props: ['visible','ingredientListItem'],
    mixins: [recipemixin],
    data: () => ({
        valid: true,
        dialog: false,
        newIngredientDialog: false,
        newIngredientGroupDialog: false,
        newPrepMethodDialog: false,
        newUnitDialog: false,

        substitute_for: {},
        prep_methods: [],
        prep_method: {},
        units: [],
        unit: {},
        ingredient_groups: [],
        ingredient_group: {},
        ingredients: [],
        ingredient: {},
        amount: 0,
    }),
    computed: {
        show: {
            get() {
                return this.visible
            },
            set(value) {
                if (!value) {
                    this.$emit('close')
                }
            }
        },
        ingredientObj:{
            get() {
                return this.ingredient
            },
            set(value) {
                this.ingredient = value
            }
        },
        // ingredient: {
        //     get() {
        //         let ingredientTmp=this.getIngredientById(this.ingredientListItem.ingredient_id)
        //         console.log("🚀 ~ file: EditIngredientListItemDialog.vue ~ line 182 ~ get ~ ingredientTmp", ingredientTmp)
        //         return {text: ingredientTmp.name, value: ingredientTmp.id, ...ingredientTmp}
        //     },
        //     set(value) {
        //         console.log(value)
        //         this.ingredientListItem.ingredient_id = value.id
        //     }
        // },
        // substitutes:{
        //     get() {
        //         return this.ingredients
        //     },
        //     set(value) {
        //         this.ingredients = value
        //     }
        // },
        substitutes(){
            return [{name:'Nenhum', id:null,}, ...this.ingredients]
        }
    },
    created() {
        this.dialog = this.open
        this.getIngredientById(this.ingredientListItem.ingredient_id)
        console.log("🚀 ~ file: EditIngredientListItemDialog.vue ~ line 205 ~ created ~ this.ingredientListItem", this.ingredientListItem)
        console.log("🚀 ~ file: EditIngredientListItemDialog.vue ~ line 205 ~ created ~ ingredient", this.ingredient)
        this.axios.get('ingredients')
            .then(response => {
                this.ingredients = response.data
            })
        this.loadTable('ingredient_groups').then(response => this.ingredient_groups = response)
        this.loadTable('prep_methods').then(response => this.prep_methods = response)
        this.loadTable('units').then(response => this.units = response)
        // this.ingredient_groups = await (this.loadTable('ingredient_groups').then(response => response))
        console.log("🚀 ~ file: EditIngredientListItemDialog.vue ~ line 229 ~ created ~ this.ingredient_groups", this.ingredient_groups)
    },
    mounted() {
        
    },
    methods: {
        getIngredientById(id) {
            this.axios.get(`/ingredient/${id}`)
                .then(response => {
                    this.ingredient = response.data
                    console.log("🚀 ~ file: EditIngredientListItemDialog.vue ~ line 224 ~ getIngredientById ~ this.ingredient", this.ingredient)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        clear() {
            this.name = ''
        },
        saveAndClose() {
            this.axios.post('', {
                    name: this.name
                })
                .then((result) => {
                    // this.group_id = result.data.id
                    this.$emit('close', {
                        text: result.data.name,
                        value: result.data.id,
                        ...result.data
                    })
                })
                .then(() => this.clear())
                .catch((err) => {
                    console.error(err)
                })
            // .finally(()=>this.$emit('close',this.group_id));
        },
        closeIngredientDialog() {
            this.loadTable('ingredients').then(response => this.ingredients = response)
            this.newIngredientDialog = false
        },
        closeIngredientGroupDialog() {
            this.loadTable('ingredient_groups').then(response => this.ingredient_groups = response)
            this.newIngredientGroupDialog = false
        },
        closePrepMethodDialog() {
            this.loadTable('prep_methods').then(response => this.prep_methods = response)
            this.newPrepMethodDialog = false
        },
        closeUnitDialog() {
            this.loadTable('units').then(response => this.units = response)
            this.newUnitDialog = false
        }
    },
}

</script>

<style>

</style>
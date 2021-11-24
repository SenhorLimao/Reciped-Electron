
<template>
    <v-container>
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
                            ></v-autocomplete>
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
                            ></v-autocomplete>
                        </v-col>
                        <!-- Componente de diálogo para criação de novo ingrediente -->
                        <new-ingredient :visible="newIngredientDialog" @close="closeIngredientDialog($event)" />
                    </v-row>
                    <v-row>
                        <!-- Seletor do uso do ingrediente -->
                        <v-col cols="5">
                            <v-autocomplete
                                label="Usado para"
                                :items="ingredient_groups"
                                v-model="ingredient_group"
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
                        <new-ingredient-group :visible="newIngredientGroupDialog" @close="closeIngredientGroupDialog($event)" />
                        
                        <!-- Seletor de método de preparo -->
                        <v-col cols="5">
                            <v-autocomplete
                                label="Método de Preparo"
                                :items="prep_methods"
                                v-model="prep_method"
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
                        <new-prep-method :visible="newPrepMethodDialog" @close="closePrepMethodDialog($event)" />
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
                        <new-unit :visible="newUnitDialog" @close="closeUnitDialog($event)" />

                        <!-- Botão para incluir ingrediente e parâmetros à lista -->
                        <v-col cols="1">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn fab dark small color="primary" @click.stop="insertIntoIngredientList"
                                        v-bind="attrs" v-on="on">
                                        <v-icon dark>mdi-playlist-plus</v-icon>
                                    </v-btn>
                                </template>
                                <span>Adicionar à Lista de Ingredientes</span>
                            </v-tooltip>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <!-- Tabela com a lista de ingredientes já adicionados -->
                            <v-data-table
                                :headers="ingredient_list_header"
                                :items="ingredient_list"
                                class="elevation-1"
                            >
                                <!-- Botão para editar o item da lista de ingredientes -->
                                <template v-slot:[`item.edit`]="{ item }">
                                    <v-btn icon @click="edit(item)">
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
                        </v-col>
                    </v-row>
                </v-container>
            </div>
        </v-form>
    </v-container>
</template>

<script>
// Importação dos componentes utilizados
import NewPrepMethod from '@/components/NewPrepMethod'
import NewIngredient from '@/components/NewIngredient'
import NewIngredientGroup from '@/components/NewIngredientGroup'
import NewUnit from '@/components/NewUnit'

// Importação do mixin utilizado
import RecipeMixin from '@/components/new/recipemixin.js'

export default {
    mixins:[RecipeMixin],
    components:{
        NewPrepMethod,
        NewIngredient,
        NewIngredientGroup,
        NewUnit
    },
    data() {
        return {
            valid:true,
            // Lista de ingredientes existentes
            ingredients:[],
            ingredient:{},
            substitute_for:null,

            // Lista de grupos de ingredientes
            ingredient_groups:[],
            ingredient_group:{},

            // Lista de método de preparo existentes
            prep_methods:[],
            prep_method:{},

            // Lista de unidades de medida existentes
            units:[],
            unit:{},
            amount:0,

            // Variáveis de controle de visibilidade de componentes de diálogo
            newPrepMethodDialog:false,
            newIngredientDialog:false,
            newIngredientGroupDialog:false,
            newUnitDialog:false,

            // Operação a ser realizada quando clicar em Adicionar à Lista de Ingredientes
            // Padrão: 'add'
            operation: 'add',
            ingredient_list_position: 0,
            // ingredient_list_tmp: {},
        }
    },
    methods: {
        // TODO: implementar edição de item da lista de ingredientes
        edit(item){
            this.ingredient_group = {value:item.group_id, id:item.group_id, text:item.group, name:item.group}
            this.prep_method = {value:item.prep_method_id, id:item.prep_method_id, text:item.prep_method, name:item.prep_method}
            this.unit = {value:item.unit_id, id:item.unit_id, text:item.unit, name:item.unit}
            this.ingredient = {value:item.ingredient_id, id:item.ingredient_id, text:item.ingredient, name:item.ingredient}
            this.amount = item.amount
            this.substitute_for = {value:item.substitute_for_id, id:item.substitute_for_id, text:item.substitute_for, name:item.substitute_for}
            this.operation = 'edit'

            this.ingredient_list_position = this.ingredient_list.indexOf(item)
            // this.ingredient_list_tmp = item
            console.log(item)
        },

        // Remove item da lista de ingredientes
        remove(item){
            this.ingredient_list.splice(this.ingredient_list.indexOf(item),1)
        },

        // Fecha o diálogo de criação de nova unidade de medida, carregando novamente a lista de unidades
        closeUnitDialog(unit){
            this.loadUnits()
            this.newUnitDialog=false
            this.unit=unit
        },

        // Fecha o diálogo de criação de novo ingrediente, carregando novamente a lista de ingredientes
        closeIngredientDialog(ingredient){
            this.loadIngredients()
            this.newIngredientDialog=false
            this.ingredient=ingredient
            console.log(this.ingredient)

        },
        // Fecha o diálogo de novo uso de ingrediente, carregando novamente a lista de usos
        closeIngredientGroupDialog(group){
            this.loadIngredientGroups()
            this.newIngredientGroupDialog=false
            this.ingredient_group=group
        },
        // Fecha o diálogo de criação de novo método de preparo, carregando novamente a lista de métodos
        closePrepMethodDialog(prep_method){
            this.loadPrepMethods()
            this.newPrepMethodDialog=false
            this.prep_method=prep_method
        },

        // Carrega as unidades de medida existentes à variável do seletor correspondente
        loadUnits(){
            this.axios.get('units')
                .then(r=>{
                    this.units = r.data.map(a=>{
                        return {text:a.name, value:a.id, ...a}
                    })
                })
        },
        // Carrega os ingredientes existentes à variável do seletor correspondente
        loadIngredients(){
            this.axios.get('ingredients')
                .then(r=>{
                    this.ingredients = r.data.map(a=>{
                        return {text:a.name, value:a.id, ...a}
                    })
                })
        },
        // Carrega os usos de ingredientes existentes à variável do seletor correspondente
        loadIngredientGroups(){
            this.axios.get('ingredient_groups')
                .then(r=>{
                    this.ingredient_groups = r.data.map(a=>{
                        return {text:a.name, value:a.id, ...a}
                    })
                    // Inclui opção inicial de informação inexistente
                    this.ingredient_groups.unshift({text:'Nenhum', value:0, id:0})
                })
        },
        // Carrega os métodos de preparo existentes à variável do seletor correspondente
        loadPrepMethods(){
            this.axios.get('prep_methods')
                .then(r=>{
                    this.prep_methods = r.data.map(a=>{
                        return {text:a.name, value:a.id, ...a}
                    })
                })
        },

        // Adiciona um novo ingrediente e seus parâmetros à lista de ingredientes
        insertIntoIngredientList(){
            // Pesquisa pelo ingrediente selecionado
            let ingredient = this.ingredients.find(i=>{
                    let obj = typeof(this.ingredient)==='object'?this.ingredient.id:this.ingredient
                    return i.id===obj
                })
            // Pesquisa pelo método de preparo selecionado
            let prep_method = this.prep_methods.find(pm=>{
                    let obj = typeof(this.prep_method)==='object'?this.prep_method.id:this.prep_method
                    return pm.id===obj
                })
            // Pesquisa pelo ingrediente substituto selecionado, caso exista
            let substitute_for = this.substitute_for?this.substitutes.find(i=>{
                    let obj = typeof(this.substitute_for)==='object'?this.substitute_for.id:this.substitute_for
                    return i.id===obj
                }):null
            // Pesquisa pela unidade de medida selecionada
            let unit = this.units.find(u=>{
                    let obj = typeof(this.unit)==='object'?this.unit.id:this.unit
                    return u.id===obj
                })
            // Pesquisa pelo uso do ingrediente selecionado
            let ingredient_group = this.ingredient_groups.find(ig=>{
                    let obj = typeof(this.ingredient_group)==='object'?this.ingredient_group.id:this.ingredient_group
                    return ig.id===obj
                })

            // Cria um objeto com os dados inseridos, para ser inserido na lista de ingredientes ou alterado
            let ingredient_list_tmp = {
                        ingredient:ingredient.text,
                        ingredient_id: ingredient.id,
                        substitute_for: substitute_for?substitute_for.text:null,
                        substitute_for_id: substitute_for?substitute_for.id:null,
                        prep_method: prep_method.text,
                        prep_method_id: prep_method.id,
                        amount:this.amount,
                        unit:unit.text,
                        unit_id:unit.id,
                        group:ingredient_group.text,
                        group_id:ingredient_group.id,
                        edit:'',
                        delete:'',
                    }
            // Adiciona o ingrediente à lista de ingredientes, se a operação definida for add
            if (this.operation==='add'){
                // Altera os dados do ingrediente na lista de ingredientes
                // Se todos os campos foram preenchidos, adiciona o ingrediente à lista
                this.ingredient_list.push(ingredient_list_tmp
                    // {
                    //     ingredient:ingredient.text,
                    //     ingredient_id: ingredient.id,
                    //     substitute_for: substitute_for?substitute_for.text:null,
                    //     substitute_for_id: substitute_for?substitute_for.id:null,
                    //     prep_method: prep_method.text,
                    //     prep_method_id: prep_method.id,
                    //     amount:this.amount,
                    //     unit:unit.text,
                    //     unit_id:unit.id,
                    //     group:ingredient_group.text,
                    //     group_id:ingredient_group.id,
                    //     edit:'',
                    //     delete:'',
                    // }
                )
            }
            // Caso a operação definida seja edit, altera os dados do item na lista de ingredientes
            else if (this.operation==='edit'){
                Object.assign(this.ingredient_list[this.ingredient_list_position],ingredient_list_tmp)
            }
            // Reseta os campos do formulário
            this.ingredient = null
            this.prep_method = null
            this.substitute_for = null
            this.unit = null
            this.ingredient_group = null
            this.amount = 0
            this.operation='add'
        },

        // Popula a lista de ingredientes com os dados do banco de dados, relizando
        // inserindo os dados na lista de ingredientes
        populateIfEditingRecipe(){
            this.ingredient_list = this.ingredient_list.map((ingredient_list_item)=>{
                // Pesquisa pelo ingrediente selecionado
                let ingredient = this.ingredients.find(i=>{
                        console.log(i)
                        return i.id===ingredient_list_item.ingredient_id
                    })
                // Pesquisa pelo método de preparo selecionado
                let prep_method = this.prep_methods.find(pm=>{
                        return pm.id===ingredient_list_item.pm_id
                    })
                // Pesquisa pelo ingrediente substituto selecionado, caso exista
                let substitute_for = this.substitutes.find(sf=>{
                        return sf.id===ingredient_list_item.substitute_for_id
                    })
                // Pesquisa pela unidade de medida selecionada
                let unit = this.units.find(u=>{
                        return u.id===ingredient_list_item.unit_id
                    })
                // Pesquisa pelo uso do ingrediente selecionado
                let ingredient_group = this.ingredient_groups.find(ig=>{
                        return ig.id===ingredient_list_item.group_id
                })
                console.error(ingredient)
                return {
                        ingredient:ingredient.text,
                        ingredient_id: ingredient.id,
                        substitute_for: substitute_for?substitute_for.text:null,
                        substitute_for_id: substitute_for?substitute_for.id:null,
                        prep_method: prep_method.text,
                        prep_method_id: prep_method.id,
                        amount:ingredient_list_item.amount,
                        unit:unit.text,
                        unit_id:unit.id,
                        group:ingredient_group.text,
                        group_id:ingredient_group.id,
                        edit:'',
                        delete:'',
                }        
            })
        }
    },
    created() {
        // Ao carregar o componente, carrega as variáveis com os dados dos seletores correspondentes
        this.loadIngredientGroups()
        this.loadIngredients()
        this.loadPrepMethods()
        this.loadUnits()
        if (this.ingredient_list.length>0){
            this.populateIfEditingRecipe()
        }
        // this.substitute_for =

    },
    computed:{
        // Variável computada com a lista de ingredientes, para o seletor de ingrediente substituto
        // incluindo opção de nenhum ingrediente possível de usar como substituto
        substitutes(){
            return [{text:'Nenhum', value:null, id:null}, ...this.ingredients]
        }
    }
}
</script>

<style>

</style>

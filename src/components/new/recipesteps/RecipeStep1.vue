<template>
    <v-container>
        <v-form v-model="valid" ref="form" lazy-validation>
            <div class="pa-6">
                <v-container fluid>
                    <!-- Título da receita (nome) -->
                    <v-row>
                        <v-col>
                            <v-text-field label="Título" v-model="title" :rules="titleRules" :counter="30" required>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <!-- Seletor do autor da receita -->
                    <v-row>
                        <v-col cols="11">
                            <v-select 
                                label="Autor"
                                return-object 
                                v-model="author" 
                                :items="author_list" 
                                :rules="authorRules" 
                                @change="authorChange"
                                required>
                            </v-select>
                        </v-col>
                        <!-- Botão usado para inserir novo autor na tabela de autores -->
                        <v-col cols="1">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn fab dark small color="primary" @click.stop="newAuthorDialog=true"
                                        v-bind="attrs" v-on="on">
                                        <v-icon dark>mdi-account-plus-outline</v-icon>
                                    </v-btn>
                                </template>
                                <span>Criar novo Autor</span>
                            </v-tooltip>
                        </v-col>
                        <!-- Diálogo aberto para fornecer o nome do autor a ser incluído -->
                        <new-author :visible="newAuthorDialog" @close="closeDialog($event)" />

                    </v-row>
                    <v-row>
                        <!-- Quantidade numérica de rendimento da receita -->
                        <v-col cols="2">
                            <v-text-field 
                                label="Rendimento" 
                                v-model="yield_amount" 
                                :min="0"
                                type="number">
                            </v-text-field>
                        </v-col>
                        <!-- Seletor do tipo de quantidade do rendimento -->
                        <v-col cols="9">
                            <v-select 
                                label="Quantidade" 
                                return-object 
                                v-model="yield_type" 
                                :items="yield_type_items">
                            </v-select>
                        </v-col>
                        <!-- Botão para incluir novo tipo de quantidade de rendimento -->
                        <v-col cols="1">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn fab dark small color="primary" @click.stop="newYieldTypeDialog=true"
                                        v-bind="attrs" v-on="on">
                                        <v-icon dark>mdi-beaker-plus-outline</v-icon>
                                    </v-btn>
                                </template>
                                <span>Adicionar unidade de medida</span>
                            </v-tooltip>
                        </v-col>
                        <!-- Diálogo aberto para fornecer o nome do tipo de quantidade de rendimento a ser incluído -->
                        <new-yield-type :visible="newYieldTypeDialog" @close="closeYieldDialog($event)" />
                    </v-row>
                    <v-row>
                        <v-col cols="11">
                            <!-- Seletor de categoria da receita -->
                            <v-select 
                                label="Categoria" 
                                return-object 
                                v-model="category" 
                                :items="categories_list" 
                                :rules="categoryRules" 
                                required>
                            </v-select>
                        </v-col>
                        <!-- Botão para incluir nova categoria -->
                        <v-col cols="1">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn fab dark small color="primary" @click.stop="newCategoryDialog=true"
                                        v-bind="attrs" v-on="on">
                                        <v-icon dark>mdi-format-list-bulleted-type</v-icon>
                                    </v-btn>
                                </template>
                                <span>Criar nova Categoria</span>
                            </v-tooltip>
                        </v-col>
                        <!-- Diálogo aberto para fornecer o nome da categoria a ser incluída -->
                        <new-category v-if="newCategoryDialog" :categories="categories_list" :visible="newCategoryDialog" @close="closeCategoryDialog($event)" />
                    </v-row>
                </v-container>
            </div>
        </v-form>
    </v-container>
</template>

<script>
import NewAuthor from '@/components/NewAuthor.vue';
import NewYieldType from '@/components/NewYieldType.vue'
import NewCategory from '@/components/NewCategory.vue'

import RecipeMixin from '@/components/new/recipemixin'
export default {
    mixins:[
        RecipeMixin
    ],
    components: { 
        NewAuthor,
        NewYieldType,
        NewCategory
    },
    data: () => ({
        valid: true,
        yield_type_items:[],
        author_list:[],
        categories_list:[],
        titleRules:[v => !!v || "É necessário fornecer um título para a receita"],
        // yieldAmountRules:[v=>!!v || "É necessário fornecer um rendimento"],
        // yieldTypeRules:[],
        authorRules:[],
        categoryRules:[],
        newAuthorDialog:false,
        newYieldTypeDialog:false,
        newCategoryDialog:false,
    }),
    computed: {
    },
    watch:{
    },
    methods: {
        authorChange(){
            console.warn(this.author)
        },
        closeDialog(author_obj){
            this.loadAuthors()
            this.newAuthorDialog=false
            this.author=author_obj
            console.warn(this.author)
        },
        closeCategoryDialog(category_obj){
            this.loadCategories()
            this.newCategoryDialog=false
            this.category=category_obj
        },
        closeYieldDialog(yield_obj){
            this.loadYieldTypes()
            this.newYieldTypeDialog=false
            this.yield_type=yield_obj
        },
        clear() {
            this.$refs.form.reset();
        },
        loadAuthors(){
            this.axios.get('authors')
                .then(r=>{
                    this.author_list = r.data.map(a=>{
                        return {text:a.name, value:a.id, ...a}
                    })
                })
        },
        loadYieldTypes(){
            this.yield_type=null
            this.axios.get('yield_types')
                .then(r=>{
                    this.yield_type_items = r.data.map(y=>{
                        return {text:y.name, value:y.id, ...y}
                    })
                    this.yield_type_items.unshift({text:'Não informado', value:null})
                })
        },
        loadCategories(){
            this.axios.get('categories')
                .then(r=>{
                    this.categories_list = r.data.map(cl=>{
                        return {text:cl.name, value:cl.id, ...cl}
                    })
                })
        }
    },
    created() {
        this.loadAuthors()
        this.loadYieldTypes()
        this.loadCategories()
    },
    beforeDestroy(){
        console.table(this.author_list)
    }
};
</script>

<style>

</style>
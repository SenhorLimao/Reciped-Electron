<template>
    <v-container>
        <v-form v-model="valid" ref="form" lazy-validation>
            <div class="pa-6">
                <v-container fluid>
                    <v-row>
                        <v-col>
                            <v-text-field label="Título" v-model="title" :rules="titleRules" :counter="30" required>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="11">
                            <v-select label="Autor" v-model="author" :items="author_list" :rules="authorRules" required>
                            </v-select>
                        </v-col>
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
                        <!-- <v-btn color="accent" large @click.stop="newAuthorDialog=true"></v-btn> -->
                        <new-author :visible="newAuthorDialog" @close="closeDialog" />

                    </v-row>
                    <v-row>
                        <v-col cols="2">
                            <v-text-field label="Rendimento" v-model="yield_amount" :rules="yieldAmountRules" required
                                type="number"></v-text-field>
                        </v-col>
                        <v-col cols="9">
                            <v-select label="Unidade de Medida" v-model="yield_type" :items="yield_type_items"
                                :rules="yieldTypeRules" required></v-select>
                        </v-col>
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
                        <!-- <v-btn color="accent" large @click.stop="newAuthorDialog=true"></v-btn> -->
                        <new-yield-type :visible="newYieldTypeDialog" @close="closeYieldDialog" />
                    </v-row>
                    <v-row>
                        <v-col cols="11">
                            <v-select label="Categoria" v-model="category" :items="categories_list" :rules="categoryRules" required>
                            </v-select>
                        </v-col>
                        <v-col cols="1">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn fab dark small color="primary" @click.stop="newCategoryDialog=true"
                                        v-bind="attrs" v-on="on">
                                        <v-icon dark>mdi-account-plus-outline</v-icon>
                                    </v-btn>
                                </template>
                                <span>Criar nova Categoria</span>
                            </v-tooltip>
                        </v-col>
                        <!-- <v-btn color="accent" large @click.stop="newAuthorDialog=true"></v-btn> -->
                        <new-category v-if="newCategoryDialog" :categories="categories_list" :visible="newCategoryDialog" @close="closeCategoryDialog" />
                    </v-row>
                </v-container>
            </div>
        </v-form>
        <v-btn color="success" @click="log">text</v-btn>
    </v-container>
</template>

<script>
import axios from "axios";
import NewAuthor from '@/components/NewAuthor.vue';
import NewYieldType from '@/components/NewYieldType.vue'
import NewCategory from '@/components/NewCategory.vue'

import RecipeMixin from '@/components/new/recipemixin.js'
export default {
    mixins:[RecipeMixin],
    components: { 
        NewAuthor,
        NewYieldType,
        NewCategory
    },
    data: () => ({
        valid: true,
        name: "",
        nameRules: [v => !!v || "Name is required", v => (v && v.length <= 10) || "Name must be less than 10 characters"],
        email: "",
        emailRules: [v => !!v || "E-mail is required", v => /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/.test(v) || "E-mail must be valid"],
        select: null,
        items: ["Item 1", "Item 2", "Item 3", "Item 4"],
        checkbox: false,
        title:'',
        yield_type:'',
        yield_type_items:[],
        yield_amount:0,
        author:'',
        author_list:[],
        categories_list:[],
        category:{},
        titleRules:[v => !!v || "E-mail is required", v => /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/.test(v) || "E-mail must be valid"],
        yieldAmountRules:[],
        yieldTypeRules:[],
        authorRules:[],
        categoryRules:[],
        newAuthorDialog:false,
        newYieldTypeDialog:false,
        newCategoryDialog:false,
        
    }),
    watch:{
        // author_list: {
        //     deep: true
        // },
        // title(val){
        //     this.$store.state.recipe.title = val
        //     console.log(this.$store.state.recipe.title)
        // }
    },
    methods: {
        log(){
            console.log(this.$store.state.recipe.title)
        },
        closeDialog(){
            this.loadAuthors()
            this.newAuthorDialog=false
        },
        closeCategoryDialog(){
            this.loadCategories()
            this.newCategoryDialog=false
        },
        closeYieldDialog(){
            this.loadYieldTypes()
            this.newYieldTypeDialog=false
        },
        submit() {
            if (this.$refs.form.validate()) {
                // Native form submission is not yet supported
                axios.post("/api/submit", {
                    name: this.name,
                    email: this.email,
                    select: this.select,
                    checkbox: this.checkbox
                });
            }
        },
        clear() {
            this.$refs.form.reset();
        },
        newAuthor(){
        },
        loadAuthors(){
            this.axios.get('authors')
                .then(r=>{
                    this.author_list = r.data.map(a=>{
                        return {text:a.name, value:a.id, ...a}
                    })
                    console.table(this.author_list)
                })
        },
        loadYieldTypes(){
            this.axios.get('yield_types')
                .then(r=>{
                    this.yield_type_items = r.data.map(y=>{
                        return {text:y.name, value:y.id, ...y}
                    })
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
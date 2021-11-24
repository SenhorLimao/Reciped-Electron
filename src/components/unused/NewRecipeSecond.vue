<template>
    <v-container grid-list-md>
        <v-card dark>
            <v-form v-model="valid" ref="form" lazy-validation>
                <div class="pa-6">
                    <v-container fluid>
                        <v-row>
                            <v-col>
                                Lista de Ingredientes
                                <ul>
                                    <li v-for="ingredient in ingredient_list" :key="ingredient">
                                        {{ingredient.name}}
                                    </li>
                                </ul>
                            </v-col>
                            <v-col cols="1">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn fab dark small color="primary"
                                            @click.stop="newIngredientListDialog=true"
                                            v-bind="attrs" v-on="on">
                                            <v-icon dark>mdi-beaker-plus-outline</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Adicionar Ingrediente</span>
                                </v-tooltip>
                            </v-col>
                            <!-- <v-btn color="accent" large @click.stop="newAuthorDialog=true"></v-btn> -->
                            <new-ingredient-list :visible="newIngredientListDialog" @close="closeIngredientListDialog" />
                        </v-row>
                        <v-row>
                            <v-col cols="2">
                            </v-col>
                            <v-col cols="9"></v-col>
                            <v-col cols="1">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn fab dark small color="primary"
                                            @click.stop="newYieldTypeDialog=true"
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
                            </v-col>
                            <!-- <v-btn color="accent" large @click.stop="newAuthorDialog=true"></v-btn> -->

                        </v-row>
                    
                        <v-btn
                            @click="submit"
                            :disabled="!valid"
                        >
                            submit
                        </v-btn>
                        <v-btn @click="clear">clear</v-btn>
                    </v-container>
                </div>
            </v-form>
        </v-card>
        
    </v-container>
</template>


<script>
import axios from "axios";
import NewYieldType from './NewYieldType.vue'
import NewIngredientList from './NewIngredientList.vue';

export default {
    components: { 
        NewYieldType,
        NewIngredientList
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
        instructions:'',
        titleRules:[v => !!v || "E-mail is required", v => /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/.test(v) || "E-mail must be valid"],
        yieldAmountRules:[],
        yieldTypeRules:[],
        authorRules:[],
        newAuthorDialog:false,
        newYieldTypeDialog:false,
        newIngredientListDialog:false,
        ingredient_list:[],
    }),
    watch:{
        author_list: {
            deep: true
        }
    },
    methods: {
        closeDialog(){
            this.loadAuthors()
            this.newAuthorDialog=false
        },
        closeYieldDialog(){
            this.loadYieldTypes()
            this.newYieldTypeDialog=false
        },
        closeIngredientListDialog(){
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
        loadIngredients(){
            this.axios.get('ingredients')
                .then(r=>{
                    this.ingredient_list = r.data.map(il=>{
                        return {text:il.name, value:il.id, ...il}
                    })
                })
        }
    },
    created() {
        this.loadIngredients()
    },
};
</script>

<style>

</style>
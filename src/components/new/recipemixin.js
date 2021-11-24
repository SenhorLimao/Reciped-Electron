import { mapGetters } from 'vuex'
export default {
    data:()=>({
        snackbar: false,
    }),
    // Dados computados da store do vuex
    computed: {
        recipe_id:{
            get(){return this.getRecipe.id},
            set(value){this.$store.commit('setRecipeProp',{value,prop:'id'})}
        },
        title:{
            get(){return this.getRecipe.title},
            set(value){this.$store.commit('setRecipeProp',{value,prop:'title'})}
        },
        yield_amount:{
            get(){return this.getRecipe.yield_amount},
            set(value){this.$store.commit('setRecipeProp',{value,prop:'yield_amount'})}
        },
        yield_type:{
            get(){return this.getYieldType},
            set(value){
                this.$store.commit('setRecipeProp',{value:value?value.value||0:0,prop:'yield_type_id'})
                console.log(value)
                this.$store.commit('setYieldType',value)
            }
        },
        category:{
            get(){return this.getCategory},
            set(value){this.$store.commit('setCategory',value)}
        },
        author:{
            get(){return this.getAuthor},
            set(value){this.$store.commit('setAuthor',value)}
        },
        ingredient_list: {
            get(){return this.getIngredientList},
            set(value){this.$store.commit('setIngredientList',value)}
        },
        ingredient_list_header: {
            get(){return this.getIngredientListHeader},
            set(value){this.$store.commit('setIngredientListHeader',value)}
        },
        instructions: {
            get(){return this.getRecipe.instructions},
            set(value){this.$store.commit('setRecipeProp',{value,prop:'instructions'})}
        },
        prep_time: {
            get(){return this.getRecipe.prep_time},
            set(value){this.$store.commit('setRecipeProp',{value,prop:'prep_time'})}
        },
        steps:{
            get(){return this.getStepperSteps},
            set(value){this.$store.commit('setStepperSteps',value)}
        },
        titles:{
                get(){return this.getStepperTitles},
                set(value){this.$store.commit('setStepperTitles',value)}
        },
        e1:{
                get(){return this.getStepperActualStep},
                set(value){this.$store.commit('setStepperActualStep',value)}
        },
        ...mapGetters([
            'getRecipe',
            'getCategory',
            'getYieldType',
            'getAuthor',
            'getIngredientList',
            'getIngredientListHeader',
            'getPrepMethod',
            'getStepperTitles',
            'getStepperSteps',
        ])

    },
    methods: {
        // Salva a lista de ingredientes
        saveIngredientList(){
            // Para cada elemento da lista de ingredientes, insere na tabela
            this.getIngredientList.forEach(element => {
                element.recipe_id = this.recipe_id
                this.axios.post('ingredient_list/save', element)
                    .then(r => {
                        console.log('il',r.data)
                        this.savePrepMethodList(r.data.id, element.prep_method_id)
                    })
                    .catch(err=>console.error(err))
            });
        },
        // Salva a referencia da receita ao autor
        saveAuthorList(){
            this.axios.post('author_list/save',
                {author_id:this.getAuthor.id,recipe_id:this.recipe_id})
                .then(r=>console.log(r.data))
                .catch(err=>console.error(err))
        },
        // Salva a referencia da receita à categoria
        saveCategoryList(){
            this.axios.post('category_list/save',
                {category_id:this.getCategory.id,recipe_id:this.recipe_id})
                .then(r=>console.log(r.data))
                .catch(err=>console.error(err))
        },
        // Salva a referencia da receita ao método de preparo
        savePrepMethodList(ingredient_list_id, prep_method_id){
            console.log(ingredient_list_id, prep_method_id)
            this.axios.post('prep_method_list/save',
                {prep_method_id,ingredient_list_id})
                .then(r=>console.log(r.data))
                .catch(err=>console.error(err))
        },
        // Salva a receita e as tabelas auxiliares
        saveRecipe(){
            // save recipe
            // save ingredient_list
            // save prep_method_list
            // save author_list
            // save category_list
            //Salva a receita
            this.axios.post('recipe/save',this.getRecipe)
                // Seta o id da receita
                .then((r)=>this.recipe_id = r.data.id)
                // Salva a lista de ingredientes
                .then(()=>this.saveIngredientList())
                // Salva a referência à categoria
                .then(()=>this.saveCategoryList())
                // Salva a referência ao autor
                .then(()=>this.saveAuthorList())
                .then(()=>console.log(this.getRecipe))
                // Limpa o formulário
                .then(()=>{
                  this.$store.state.recipe = this.$store.state.recipe_default
                  this.$store.state.category = this.$store.state.category_default
                  this.$store.state.yield_type = this.$store.state.yield_type_default
                  this.$store.state.prep_method = this.$store.state.prep_method_default
                  this.$store.state.author = this.$store.state.author_default
                  this.$store.state.ingredient_list = this.$store.state.ingredient_list_default
                  // Apresenta na tela uma mensagem de sucesso
                  this.snackbar = true
                })
                .then(()=>{
                    // Retorna ao primeiro passo do stepper
                    setTimeout(()=>{
                        this.$store.state.stepper.e1 = 1
                    },2000)
                })
                .catch(err=>console.error(err))
        },

        async loadTable(table){
            return this.axios.get(`${table}/`)
                .then(res=> res.data)
                .catch(err=> err)
        }
    },
}

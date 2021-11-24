import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    recipe: {
      id:null,
      title:'',
      yield_amount:0,
      yield_type_id:null,
      instructions:'',
      prep_time:null
    },
    recipe_default: {
      id:null,
      title:'',
      yield_amount:0,
      yield_type_id:null,
      instructions:'',
      prep_time:null
    },
    category: {
      id:null,
      name:'',
      parent_id:null
    },
    category_default: {
      id:null,
      name:'',
      parent_id:null
    },
    yield_type: {
      id:null,
      name:''
    },
    yield_type_default: {
      id:null,
      name:''
    },
    prep_method: {
      id: null,
      name: ''
    },
    prep_method_default: {
      id: null,
      name: ''
    },
    author:{
      id:null,
      name:''
    },
    author_default:{
      id:null,
      name:''
    },
    ingredient_list:[],
    ingredient_list_default:[],
    ingredient_list_header:[
      {
          text: 'Ingrediente',
          align: 'start',
          sortable: true,
          value: 'ingredient',
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
          value: 'prep_method',
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
          value: 'group',
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
    stepper:{
      e1:1,
      steps:4,
      titles: ['Título, Autor, Rendimento, Categoria',
                  'Lista de Ingredientes',
                  'Instruções',
                  'Review']
    }


    // ingredient_list:[],
    // ingredient_list_header:[{

    // }],

  },
  getters:{
      getRecipe:state=>state.recipe,
      getCategory:state=>state.category,
      getAuthor:state=>state.author,
      getYieldType:state=>state.yield_type,
      getPrepMethod:state=>state.prep_method,
      getIngredientList:state=>state.ingredient_list,
      getIngredientListHeader:state=>state.ingredient_list_header,
      getStepperSteps:state=>state.stepper.steps,
      getStepperTitles:state=>state.stepper.titles,
      getStepperActualStep:state=>state.stepper.e1

  },
  mutations: {
      setRecipe:(state, payload)=>state.recipe=payload,
      setRecipeProp:(state, payload)=>state.recipe[payload.prop]=payload.value,
      setCategory:(state, payload)=>state.category=payload,
      setAuthor:(state, payload)=>state.author=payload,
      setYieldType:(state,payload)=>state.yield_type=payload,
      setYieldTypeProp:(state,payload)=>state.yield_type[payload.prop]=payload.value,
      setPrepMethod:(state,payload)=>state.prep_method=payload,
      setIngredientList:(state,payload)=>state.ingredient_list=payload,
      setIngredientListHeader:(state,payload)=>state.ingredient_list_header=payload,
      setStepperSteps:(state,payload)=>state.stepper.steps=payload,
      setStepperTitles:(state,payload)=>state.stepper.titles=payload,
      setStepperActualStep:(state,payload)=>state.stepper.e1=payload,

  },
  actions: {
  },
  modules: {
  }
})

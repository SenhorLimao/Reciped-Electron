import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default function(){
  const Store = new Vuex.Store({

    state: {
      recipe: {
        // title:'',
        // yield_amount:0,
        // yield_type_id:0,
        // instructions:'',
        // prep_time:''
      }
      
    },
    getters:{
      getRecipe:state=>state.recipe,
      
    },
    mutations: {
      setRecipe:(state, payload)=>state.recipe=payload,
      setRecipeProp:(state,payload, prop)=>state[prop]=payload
    },
    actions: {
    },
    modules: {
    }
  })
}
  
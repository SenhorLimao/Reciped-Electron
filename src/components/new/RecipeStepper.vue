<template>
    <v-container grid-list-md>
        <v-card dark>
          <!-- Stepper de inserção de nova receita -->
          <v-stepper dark v-model="e1">
            <!-- Cabeçalho do stepper -->
              <v-stepper-header>
                  <template v-for="n in steps">
                      <v-stepper-step :key="`${n}-step`" :complete="e1 > n" :step="n" editable>
                          {{ titles[n-1] }}
                      </v-stepper-step>
                      <v-divider v-if="n !== steps" :key="n"></v-divider>
                  </template>
              </v-stepper-header>
              <!-- Itens do stepper -->
              <v-stepper-items>
                  <v-stepper-content v-for="n in steps" :key="`${n}-content`" :step="n">
                    <!-- Card que mostra o componente atualmente sendo exibido no stepper
                    (recipe-step-(1-4)) -->
                      <v-card dark class="mb-12">
                          <component :is="`recipe-step-${n}`" :ref="`step${n}`"></component>
                      </v-card>
                      <!-- Componente utilizado para emitir alertas na tela -->
                      <!-- TODO: personalizar cor e mensagem, para exibir mensagens
                      de erro também -->
                      <v-snackbar
                        :timeout="2000"
                        v-model="snackbar"
                        absolute
                        centered
                        color="deep-purple accent-4"
                        elevation="24"
                      >
                        Receita Salva com Sucesso!
                      </v-snackbar>
                      <div class="d-flex justify-space-between">
                        <v-btn color="warning">
                            Cancelar
                        </v-btn>
                        <v-btn v-if="n==4" color="success" @click="saveRecipe" :disabled="notFilled">
                            Salvar
                        </v-btn>
                        <v-btn v-else color="primary" @click="nextStep(n)">
                            Continuar
                        </v-btn>
                      </div>
                  </v-stepper-content>
              </v-stepper-items>
          </v-stepper>
        </v-card>
    </v-container>
</template>

<script>
// Importação dos componentes responsáveis por cada passo do stepper
import RecipeStep1 from './recipesteps/RecipeStep1.vue'
import RecipeStep2 from './recipesteps/RecipeStep2.vue'
import RecipeStep3 from './recipesteps/RecipeStep3.vue'
import RecipeStep4 from './recipesteps/RecipeStep4.vue'

// Importação do mapeamento dos getters da store do vuex
import { mapGetters } from 'vuex'
// Importação do mixin de receitas
import RecipeMixin from './recipemixin'
export default {
  mixins: [RecipeMixin],
  components: { RecipeStep1, RecipeStep2, RecipeStep3, RecipeStep4 },
    data () {
      return {
        
      }
    },
    watch: {
      // Se o valor de e1 mudar, atualiza o valor de step
      steps (val) {
        if (this.e1 > val) {
          this.e1 = val
        }
      },
    },

    computed: {
      // Verifica se os campos obrigatórios foram preenchidos para habilitar o botão de salvar
      notFilled(){
        // Verifica se os campos da receita foram preenchidos
        let recipeNotFilled = !(!!this.getRecipe.title &&
                 !!this.getRecipe.prep_time &&
                 !!this.getRecipe.instructions)
                //  !!this.getRecipe.yield_amount &&
                //  !!this.getRecipe.yield_type_id &&
        
        // Verifica se a lista de ingredientes foi preenchida
        let ingredientListNotFilled = this.getIngredientList.length == 0

        // Verifica se a categoria foi preenchida
        let categoryNotFilled = !this.getCategory.id

        // Verifica se o autor foi preenchido
        let authorNotFilled = !this.getAuthor.id

        console.log('falsies Recipe,IngredientList,Category,Author',
          recipeNotFilled, 
          ingredientListNotFilled, 
          categoryNotFilled, 
          authorNotFilled)

        // Retorna true se nem todos os campos obrigatórios estiverem preenchidos
        return recipeNotFilled || ingredientListNotFilled || categoryNotFilled || authorNotFilled
        // return !(!!this.getRecipe.title &&
        //          !!this.getRecipe.prep_time &&
        //          !!this.getRecipe.yield_amount &&
        //          !!this.getRecipe.yield_type_id &&
        //          !!this.getRecipe.instructions)
      },
      // Mapeia os getters da store do vuex
      ...mapGetters([
        'getStepperTitles',
        'getStepperSteps',
        'getStepperActualStep'
      ])
    },
    methods: {
      // Avança para o próximo passo do stepper
      nextStep (n) {
        // this.$store.state.recipe.yield_type_id=this.$store.state.yield_type.id?this.$store.state.yield_type.id:null
        if (n === this.steps) {
          this.e1 = 1
        } else {
          this.e1 = n + 1
        }
      },
      save(){
        console.log(this.$refs.step1[0].title)
        console.log(this.$refs.step1[0].author)
      }
    },
    created() {
    },
  }
</script>

<style>

</style>
<template>
  <v-app class="dark">
    <v-app-bar
      app
      color="blue-grey darken-4"
      dark
    >
    <!-- Botão para adicionar nova receita -->
      <v-row align-center>
        <div class="d-flex align-center">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn fab dark small color="primary"
                @click="selected='new->recipe'"
                v-bind="attrs" v-on="on">
                  <v-icon dark>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>Nova Receita</span>
          </v-tooltip>
        </div>
        <v-spacer></v-spacer>
        
        <!-- Botão para mostrar o índice de receitas -->
        <div class="d-flex align-center">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn fab dark small color="primary"
                  @click="showIndex"
                  v-bind="attrs" v-on="on">
                <v-icon dark>mdi-format-list-bulleted-type</v-icon>
              </v-btn>
            </template>
            <span>Mostrar Índice</span>
          </v-tooltip>
        </div>
        <v-spacer></v-spacer>

        <!-- Botão para mostrar a lista de autores -->
        <div class="d-flex align-center">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn fab dark small color="primary"
                  @click="showAuthors"
                  v-bind="attrs" v-on="on">
                <v-icon dark>mdi-account-details</v-icon>
              </v-btn>
            </template>
            <span>Listar Autores</span>
          </v-tooltip>
        </div>
        <v-spacer></v-spacer>

        <!-- Campo de busca por nome da receita ou autor -->
        <div class="d-flex align-end">
          <v-text-field
            dense
            filled
            rounded
            solo
            style="margin-bottom: -25px"
            prepend-inner-icon="mdi-magnify"
            color="primary"
            v-model="searchFieldRecipesAndAuthors"
            @keyup="searchRecipesAndAuthors"
          ></v-text-field>

          <!-- Lista de resultados da busca do campo acima -->
          <div v-if="searching" class="searchResults">
            <ul v-if="authorsSearch.length>0">
              <em>Autores:</em>
              <li v-for="aS in authorsSearch" :key="aS.id"
                @click="searchFieldRecipesAndAuthors='';showAuthor(aS)">{{aS.name}}</li>
            </ul>
            <ul v-if="recipesSearch.length>0">
              <em>Receitas:</em>
              <li v-for="rS in recipesSearch" :key="rS.id"
                @click="searchFieldRecipesAndAuthors='';showRecipe(rS)">{{rS.title}}</li>
            </ul>
          </div>
        </div>
      </v-row>
    </v-app-bar>

    <!-- Painel principal -->
    <v-main class="dark">
      <!-- Mostra uma receita caso a tela selecionada seja uma receita.
      Caso receba um evento de showAuthor, chama a função para mostrar a 
      lista de receitas do autor -->
      <Recipe v-if="selected==='recipe'" :recipe="recipe" @showAuthor="showAuthor($event)" />

      <!-- Mostra o índice de receitas caso a tela selecionada seja o índice -->
      <index v-else-if="selected==='index'" @showRecipe="showRecipe($event)" />

      <!-- Mostra a lista de autores caso a tela selecionada seja a lista de autores
      Caso receba um evento de showAuthor, chama a função para mostrar a 
      lista de receitas do autor -->
      <author-list v-else-if="selected==='authors'" @showAuthor="showAuthor($event)" />

      <!-- Mostra a lista de receitas de um autor. Caso receba um evento de showRecipe,
      chama a função para mostrar a receita. -->
      <author v-else-if="selected==='author'" :author="author" @showRecipe="showRecipe($event)" />
      
      <!-- Mostra a tela de cadastro de nova receita -->
      <recipe-stepper v-else-if="selected==='new->recipe'" :author="author" />
    </v-main>
  </v-app>
</template>

<script>

// Importacoes
import Index from './components/Index.vue';
import Recipe from './components/Recipe.vue';
import AuthorList from './components/AuthorList.vue';
import Author from './components/Author.vue';
import RecipeStepper from './components/new/RecipeStepper.vue';

export default {
  name: 'App',
  components: {
    Recipe,
    Index,
    AuthorList,
    Author,
    RecipeStepper,
  },
  data: () => ({
    selected: 'index', // Tela selecionada
    recipe: {}, // Receita selecionada
    author: {}, // Autor selecionado
    searchFieldRecipesAndAuthors:'', // Campo de busca
    timeout: null, // Temporizador para busca
    authorsSearch:[], // Resultados da busca por autor
    recipesSearch:[], // Resultados da busca por receita
  }),
  computed:{
    // Mostra os resultados da busca por autor ou receita, 
    // caso o campo de busca esteja preenchido
    searching(){
      return (this.searchFieldRecipesAndAuthors.length>0)
    }
  },
  methods: {
    // Chama a tela de cadastro de nova receita
    newRecipe(){
      this.selected='newRecipe'
    },
    // Chama a tela de índice de receitas
    showIndex(){
      this.selected='index'
    },
    // Chama a tela de lista de autores
    showAuthors(){
      this.selected='authors'
    },
    // Chama a tela de uma receita selecionada (evento de showRecipe)
    showRecipe(event){
      this.recipe = event
      this.selected="recipe"
    },
    // Chama a tela de um autor selecionado (evento de showAuthor)
    showAuthor(event){
      this.author = event,
      this.selected='author'
    },
    // TODO: Fazer o debounce da pesquisa por autor e receita
    searchDebounce(){
      if(this.timeout){
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(() => {
        console.log(this.searchFieldRecipesAndAuthors)
      }, 500);
    },

    // Realiza a busca por autor e receita
    searchRecipesAndAuthors(){
      if(this.timeout){
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(() => {
        // Busca por autor e insere os resultados na lista de resultados da pesquisa
        this.axios.get(`authors/namelike/${this.searchFieldRecipesAndAuthors}`)
          .then((result) => {
            this.authorsSearch=result.data[0]
          }).catch((err) => {
            console.error(err)
          });
        // Busca por receita e insere os resultados na lista de resultados da pesquisa
        this.axios.get(`recipes/namelike/${this.searchFieldRecipesAndAuthors}`)
          .then((result) => {
            this.recipesSearch=result.data[0]
          }).catch((err) => {
            console.error(err)
          });
      }, 500);
    }
  },
};
</script>
<style scoped>
.dark{
  background-color: dimgray;
}
.searchResults{
  position: absolute;
  top: 55px;
  border: 1px solid gray;
  background-color: #444444;
  border-radius: 15px;
}
.searchResults>ul>li{
  cursor: pointer;
}
.searchResults>ul>li:hover{
  background-color:#8888aa;
  color: black;
}
</style>
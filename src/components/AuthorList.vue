<template>
    <v-container>
      <v-list dark three-line class="list">
          <template v-if="loaded">
              <!-- <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider> -->
              <div  v-for="author in authors" :key="author.id">

                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-list-item :key="author.id" @click="$emit('showAuthor',author)" v-bind="attrs" v-on="on">
                            
                                <v-list-item-avatar>
                                    <h2>{{author.id}}</h2>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>{{author.name|uppercase}}</v-list-item-title>
                                    <!-- TODO: tooltip com a lista de receitas do author, ao passar o mouse por cima -->
                                </v-list-item-content>

                        </v-list-item>
                    </template>
                    <span>
                        <!-- <ul>
                            <li v-for="recipe in author.recipes" :key="recipe.id">{{recipe.title}}</li>
                        </ul> -->
                        <div v-if="hasRecipes(author)">
                                <div v-for="(recipe,index) in author.recipes" :key="recipe.id" >
                                    {{index+1}}. {{recipe.title}}
                                </div>
                        </div>
                        <div v-else>
                                <h3>Este autor ainda não possui receitas</h3>
                        </div>
                    </span>
                </v-tooltip>
              </div>
          </template>
      </v-list>
  </v-container>
    <!-- <ul>
        <li v-for="author in authors" :key="author.id" @click="$emit('showAuthor',author)" >
            {{author.name}}
        </li>
    </ul> -->
</template>

<script>
export default {
    data() {
        return {
            authors:[],
            // recipes:[],
            tooltip:'hoje',
            loaded:false,

        }
    },
    created() {
        this.axios.get('authors')
            .then((result) => {
                this.authors = result.data
                this.authors.forEach(author=>{
                    Object.assign(author,{recipes:[]})
                    this.axios.get(`recipes/author/${author.id}`)
                        .then((res) => {
                            author.recipes = res.data
                        })
                        .catch((err) => {
                            console.error(err)
                        })
                })
            }).then(()=>{
                setTimeout(()=>{
                    this.loaded = true
                },250)
                // this.loaded = true
            }).catch((err) => {
                console.warn(err)
            })
        // this.axios.get('recipes')
        //     .then((result) => {
        //         this.recipes = result.data
        //     }).catch((err) => {
        //         console.error(err)
        //     });
    },
    methods: {
        alertar(author){
            console.log(author)
        },
        hasRecipes(author){
            return author.recipes.length > 0
        },
        showRecipesFromAuthor(author){
            let result = ''
            for(let i=0;i<author.recipes.length;i++){
                result += `<div>${author.recipes[i].title}</div>`
            }
            console.log(result)
            return result
        },

    },
    computed: {
    }
}
</script>

<style scoped>
.list {
    width: 70vw;
}
</style>
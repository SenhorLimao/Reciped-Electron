<template>
  <v-container>
      <v-list dark three-line>
          <template v-for="item in items" class="list">
              <v-list-item @click="goto(item)" :key="item.id">
                  <v-list-item-avatar>
                      <h2>{{item.id}}</h2>
                  </v-list-item-avatar>
                  <v-list-item-content>
                      <v-list-item-title>{{item.title|uppercase}}</v-list-item-title>
                      <v-list-item-subtitle>{{item.instructions|resumee}}</v-list-item-subtitle>
                  </v-list-item-content>
              </v-list-item>
          </template>
      </v-list>
  </v-container>
</template>

<script>
export default {
    data() {
        return {
            items:[]
        }
    },
    filters:{
        
    },
    methods: {
        // Carrega a receita do item clicado
        goto(item){
            this.$emit('showRecipe', item)
        },

        // TODO: carregar imagem da receita
        getImgUri(blob){
            var URL = window.URL || window.webkitURL
            if(blob){

                var uri = URL.createObjectURL(new Blob([...blob]));
                console.log(uri)
                return uri
            }
            // img.src = uri;
            return ''
        },

        // DEPRECATED: método para mostrar um resumo da receita.
        // Substituído por um filtro de mesmo nome
        resumee(value){
            return value.lenght<100?value:`${value.substr(0,97)}...`
        }
    },
    created(){
        // Carrega a lista de receitas salvas no índice
        this.axios.get('recipes')
            .then((r)=>{
                this.items = r.data
            })
    }
}
</script>

<style scoped>
.list{
    width: 70vw;
}
</style>
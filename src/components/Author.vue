<template>
    <v-container>
        <v-row justify="space-around" class="mt-4">
            <v-card class="grey lighten-2">
                <v-card-title primary-title>
                    {{author.name | uppercase}}
                </v-card-title>
            </v-card>
        </v-row>
        <v-row justify="space-around" class="mt-4">
            <v-list dark three-line class="list">
              <template v-for="recipe in recipes">
                  <!-- <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider> -->
                  <v-list-item @click="$emit('showRecipe',recipe)" :key="recipe.id">
                      <v-list-item-avatar>
                          <h2>{{recipe.id}}</h2>
                      </v-list-item-avatar>
                      <v-list-item-content>
                          <v-list-item-title>{{recipe.title|uppercase}}</v-list-item-title>
                          <v-list-item-subtitle>{{recipe.instructions|resumee}}</v-list-item-subtitle>
                      </v-list-item-content>
                  </v-list-item>
              </template>
            </v-list>
        </v-row>
        <!-- <ul>
            <li v-for="recipe in recipes" :key="recipe.id" @click="$emit('showRecipe',recipe)">
                {{recipe.title | uppercase}}
            </li>
        </ul> -->
    </v-container>
</template>

<script>
export default {
    props:['author'],
    data() {
        return {
            recipes:[]
        }
    },
    created() {
        this.axios.get(`recipes/author/${this.author.id}`)
            .then((result) => {
                this.recipes = result.data
            }).catch((err) => {
                console.error(err)
            });
    },
}
</script>

<style scoped>
.list {
    width: 70vw;
}
</style>
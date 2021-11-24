<template>
        <div>
            <v-text-field dense filled rounded solo style="margin-bottom: -25px" prepend-inner-icon="mdi-magnify"
                color="primary"></v-text-field>
            <div v-if="searching" class="searchResults">
                <ul v-if="authorsSearch.length>0">
                    <em>Autores:</em>
                    <li v-for="aS in authorsSearch" :key="aS.id" @click="searchFieldRecipesAndAuthors='';showAuthor(aS)">
                        {{aS.name}}</li>
                </ul>
                <ul v-if="recipesSearch.length>0">
                    <em>Receitas:</em>
                    <li v-for="rS in recipesSearch" :key="rS.id" @click="searchFieldRecipesAndAuthors='';showRecipe(rS)">
                        {{rS.title}}</li>
                </ul>
            </div>
        </div>
</template>

<script>
export default {
    props:{
        dense:{
            type: Boolean
        },
        rounded:{
            type: Boolean
        },
        color:{
            type: String
        },
        prependInnerIcon:{
            type: String
        }
    }
}
</script>

<style scoped>
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
</style>
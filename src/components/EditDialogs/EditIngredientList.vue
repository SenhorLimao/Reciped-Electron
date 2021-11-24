<template>
    <v-dialog v-model="show" max-width="80vw">
        <v-card class="blue-grey lighten-3">
            <v-card-title>
                <span class="text-h5">Editar Lista de Ingredientes</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <recipe-step-2 />
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" outlined @click.stop="show = false">
                    Cancelar
                </v-btn>
                <v-btn color="blue darken-1" text @click.stop="saveAndClose">
                    Salvar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import RecipeStep2 from '../new/recipesteps/RecipeStep2.vue'
export default {
components: {
        RecipeStep2
    },
    props: ['visible'],
    data: () => ({
        dialog: false,
    }),
    computed: {
        show: {
            get() {
                return this.visible
            },
            set(value) {
                if (!value) {
                    this.$emit('close')
                }
            }
        }
    },
    created() {
        this.dialog = this.open
    },
    methods: {
        clear() {
            this.name = ''
        },
        saveAndClose() {
            this.axios.post('', {
                    name: this.name
                })
                .then((result) => {
                    // this.group_id = result.data.id
                    this.$emit('close', {
                        text: result.data.name,
                        value: result.data.id,
                        ...result.data
                    })
                })
                .then(() => this.clear())
                .catch((err) => {
                    console.error(err)
                })
            // .finally(()=>this.$emit('close',this.group_id));
        }
    },
}

</script>

<style>

</style>
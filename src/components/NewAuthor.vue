<template>
    <v-dialog v-model="show" max-width="500px">
        <v-card class="blue-grey lighten-3">
        <v-card-title>
          <span class="text-h5">Novo Autor</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"

              >
              <!-- Campo de texto com o nome do autor a ser criado -->
                <v-text-field
                  label="Nome"
                  required
                  v-model="name"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*Requerido</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          // Cancela o diálogo
          <v-btn
            color="blue darken-1"
            outlined
            @click.stop="show = false"
          >
            Cancelar
          </v-btn>
          <!-- Botão para salvar o autor -->
          <v-btn
            color="blue darken-1"
            text
            @click.stop="saveAndClose"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
  export default {
    props:['visible'],
    data: () => ({
      dialog: false,
      name:'',
      // author_obj:null
    }),
    computed: {
        show:{
            get() {
                return this.visible
            },
            set(value){
                if(!value){
                    this.$emit('close')
                }
            }
        }
    },
    created() {
        this.dialog=this.open
    },
    methods: {
        clear(){
            this.name=''
        },
        // Cria um novo autor e fecha o diálogo
        saveAndClose(){
            this.axios.post('author/save',{name:this.name})
                .then((result) => {
                    // this.author_obj=result.data
                    // Fecha o diálogo e retorna o autor criado
                    this.$emit('close', {value:result.data.id, text:result.data.name, ...result.data})
                })
                .then(() => this.clear())
                .catch((err) => {
                    console.error(err)
                })
                // .finally(()=>this.$emit('close', this.author_obj));
        }
    },
  }
</script>
<template>
    <v-dialog v-model="show" max-width="500px">
        <v-card class="blue-grey lighten-3">
        <v-card-title>
          <span class="text-h5">Novo Método de Preparo</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"

              >
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
          <v-btn
            color="blue darken-1"
            outlined
            @click.stop="show = false"
          >
            Cancelar
          </v-btn>
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
      prep_method_id:null
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
        saveAndClose(){
            this.axios.post('prep_method/save',{name:this.name})
                .then((result) => {
                    // this.prep_method_id=result.data.id
                    this.$emit('close',{
                      value:result.data.id,
                      text:result.data.name,
                      ...result.data
                    })
                })
                .then(() => this.clear())
                .catch((err) => {
                    console.error(err)
                })
                // .finally(()=>this.$emit('close',this.prep_method_id));
        }
    },
  }
</script>
<template>
    <v-dialog v-model="show" max-width="500px">
        <v-card class="blue-grey lighten-3">
        <v-card-title>
          <span class="text-h5">Nova Unidade de Medida</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select 
                  label="Ingrediente" 
                  v-model="ingredient" 
                  :items="ingredient_items"
                  :rules="ingredientListRules" required></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"

              >
                <v-text-field
                  label="Quantidade"
                  required
                  v-model="name"
                  type="number"
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
      ingredient:{},
      ingredient_items:[],
      ingredientListRules:[]
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
        this.axios.get('ingredients')
          .then((result) => {
            this.ingredient_items=result.data.map(i=>{
              return {text:i.name, value:i.id, ...i}
            })
          }).catch((err) => {
            console.error(err)
          });
    },
    methods: {
        saveAndClose(){
            this.axios.post('yield_type/save',{name:this.name})
                .then((result) => {
                    console.log(result.data)
                }).catch((err) => {
                    console.error(err)
                })
                .finally(()=>this.$emit('close'));
        }
    },
  }
</script>
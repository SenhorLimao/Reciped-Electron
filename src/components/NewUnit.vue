<template>
    <v-dialog v-model="show" max-width="500px">
        <v-card class="blue-grey lighten-3">
        <v-card-title>
          <span class="text-h5">Nova Unidade de Medida</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="6"

              >
                <v-text-field
                  label="Nome"
                  required
                  v-model="name"
                ></v-text-field>
              </v-col>
              <v-col
                cols="6"

              >
                <v-text-field
                  label="Abreviatura"
                  required
                  v-model="name_abbrev"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="6"

              >
                <v-text-field
                  label="Plural"
                  required
                  v-model="plural"
                ></v-text-field>
              </v-col>
              <v-col
                cols="6"

              >
                <v-text-field
                  label="Abreviatura no plural"
                  required
                  v-model="plural_abbrev"
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
      name_abbrev:'',
      plural:'',
      plural_abbrev:'',
      unit_id:null
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
          this.name_abbrev=''
          this.plural=''
          this.plural_abbrev=''
        },
        saveAndClose(){
            this.axios.post('unit/save',
              {
                name:this.name,
                name_abbrev:this.name_abbrev,
                plural:this.plural,
                plural_abbrev:this.plural_abbrev,
              })
              .then((result) => {
                  // this.unit_id=result.data.id
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
              // .finally(()=>this.$emit('close',this.unit_id));
        }
    },
  }
</script>
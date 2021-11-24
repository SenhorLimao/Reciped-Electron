<template>
    <v-dialog v-model="show" max-width="500px">
        <v-card class="blue-grey lighten-3">
        <v-card-title>
          <span class="text-h5">Nova Categoria</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="11">
                  <v-select label="Categoria Pai" v-model="category_father" :items="categories_list">
                  </v-select>
              </v-col>
            </v-row>
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
    props:['visible', 'categories'],
    data: () => ({
      dialog: false,
      name:'',
      // category_father:{text:"Nenhuma",value:null},
      category_father:null,
      categories_list:[],
      category_id:null,
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
        console.table(this.category_father)
        this.categories_list=[{text:"Nenhuma",value:null}, ...this.categories]
    },
    methods: {
        clear(){
            this.name=''
            this.category_father=null
        },
        saveAndClose(){
          // let parent_id=null



          // if(this.category_father){
          //   if(typeof(this.category_father.value)=='undefined'){
          //     parent_id=this.category_father
          //   }
          //   else {
          //     parent_id=this.category_father.value
          //   }
          // }
          // console.log('parent id',parent_id)
            let data = {name:this.name, parent_id:this.category_father}

            // check if category father is an empty object. If so, set parent_id to null
            // if 0, set parent_id to null
            // if(this.category_father == null ||
            //  this.category_father == undefined || 
            //  this.category_father == "" || 
            //  this.category_father == 0 ||
            //  this.category_father == {}){
            //     data.parent_id = null
            // }
            console.table(data)
            this.axios.post('category/save',data)
                .then((result) => {
                    // this.category_id=result.data.id
                    this.$emit('close', {
                        value:result.data.id,
                        text:result.data.name,
                        ...result.data
                    })
                })
                .then(() => this.clear())
                .catch((err) => {
                    console.error(err)
                })
        }
    },
  }
</script>
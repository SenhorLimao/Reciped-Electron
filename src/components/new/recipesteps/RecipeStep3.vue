<template>
    <v-container>
        <v-form v-model="valid" ref="form" lazy-validation>
            <div class="pa-6">
                <v-container fluid>
                    <v-row>
                        <v-col cols="9">
                            <v-textarea
                            outlined
                            name="input-7-4"
                            label="Modo de Preparo"
                            v-model="instructions"
                            ></v-textarea>
                        </v-col>
                    
                        <v-col cols="3">
                            <!-- <v-time-picker
                                v-model="picker"
                            ></v-time-picker> -->
                            <v-text-field
                                label="Tempo de Preparo"
                                value="00:00"
                                type="time"
                                v-model="prep_time"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </div>
        </v-form>
    </v-container>
</template>

<script>
import RecipeMixin from '@/components/new/recipemixin.js'
export default {
    mixins:[RecipeMixin],
    data() {
        return {
            valid:true
            // picker:null,
            // instructions:''
        }
    },
}
</script>

<style>

</style>
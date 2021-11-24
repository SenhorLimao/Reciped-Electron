<template>
  <v-card>
        <v-card-title primary-title class="d-flex justify-space-between">
                <slot name="title"></slot>
                <v-btn color="primary" x-small fab @click="goto(stepToGo)">
                    <v-icon dense>mdi-pencil</v-icon>
                </v-btn>
        </v-card-title>
        <v-card-text>
            <slot name="items"></slot>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: ['stepToGo'],
    methods: {
        goto(step){
            this.$store.commit('setStepperActualStep',step)
        },
    },
}
</script>

<style>

</style>
<template>
  <v-container class="grey lighten-5">
    <div class="text-center" v-if="loading">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    {{ clue.title }}
  </v-container>
</template>

<script>
const { cluesCollection } = require("@/plugins/firebase.js");

export default {
  name: "Clue",
  components: {
    //
  },
  data() {
    return {
      clue: {},
      loading: false
    };
  },
  mounted() {
    if (this.$route.params.clue) {
      this.clue = this.$route.params.clue;
    } else {
      this.fetchClue(this.$route.params.cid);
    }
  },
  methods: {
    async fetchClue(cid) {
      this.loading = true;

      let clueDoc = await cluesCollection.doc(cid).get();
      let clueData = clueDoc.data();
      clueData.id = clueDoc.id;
      this.clue = clueData;

      this.loading = false;
    }
  },
  beforeDestroy() {
    this.clue = null;

    delete this.clue;
  }
};
</script>

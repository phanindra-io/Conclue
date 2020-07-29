<template>
  <v-container class="grey lighten-5">
    <v-form
      class="ml-4"
      ref="clue_form"
      :lazy-validation="true"
      onSubmit="return false;"
    >
      <v-row>
        <v-col cols="9" sm="10" md="10" class="pb-0">
          <v-text-field
            v-model="clue"
            ref="clue"
            :rules="rules.clue"
            outlined
            label="Clue"
            class="py-0"
            :loading="loading.add"
            v-on:keyup.enter="saveClue"
            autocomplete="off"
            dense
            clearable
          ></v-text-field>
        </v-col>

        <v-col cols="2" md="2">
          <v-btn @click="saveClue" :loading="loading.add">
            Add
          </v-btn>
        </v-col>
      </v-row>
    </v-form>

    <ClueList :clues="clues" />
  </v-container>
</template>

<script>
const { auth, cluesCollection } = require("@/plugins/firebase.js");
import ClueList from "@/components/Dashboard/List";

export default {
  name: "Dashboard",
  components: {
    ClueList
  },
  data() {
    return {
      loading: {
        add: false
      },
      clue: null,
      rules: {},
      clues: []
    };
  },
  watch: {
    //
  },
  mounted() {
    this.fetchClues();
  },
  methods: {
    async fetchClues() {
      const query = await cluesCollection
        .where("createdBy", "==", auth.currentUser.uid)
        .where("head", "==", true)
        .get();
      for (let i = 0; i < query.docs.length; i++) {
        let data = query.docs[i].data();
        data.id = query.docs[i].id;

        this.clues.push(data);
      }
    },
    saveClue() {
      this.rules.clue = [v => !!v || "Clue is required"];
      const self = this;
      setTimeout(async function() {
        if (self.$refs.clue_form.validate()) {
          self.loading.add = true;
          let clueDoc = cluesCollection.doc();

          let obj = {
            title: self.clue,
            head: true,
            status: 1,
            createdAt: new Date(),
            createdBy: auth.currentUser.uid
          };
          await clueDoc.set(obj);

          obj.id = clueDoc.id;
          self.clues.push(obj);

          self.$refs.clue_form.reset();
          self.loading.add = false;
        }
      });
    }
  },
  beforeDestroy() {
    this.loading = null;
    this.clue = null;
    this.rules = null;

    delete this.loading;
    delete this.clue;
    delete this.rules;
  }
};
</script>

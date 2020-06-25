<template>
  <v-container class="grey lighten-5">
    <div class="text-center" v-if="loading">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <div v-else>
      <v-row>
        <v-col cols="12" md="10" offset-md="1">
          <div class="text-center mb-6">
            <v-btn
              class="mx-2"
              @click="$router.back()"
              fab
              dark
              small
              color="primary"
            >
              <v-icon dark>mdi-arrow-up-thick</v-icon>
            </v-btn>
          </div>

          <v-card class="py-2" max-width="800">
            <p class="text-center mb-0">{{ clue.title }}</p>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-btn class="mb-3" block color="success" @click="openDialog(1)"
            >Add support</v-btn
          >

          <v-card
            v-for="(support, cid) in clue.support"
            :key="cid"
            class="py-2"
            max-width="800"
            @click="openClue(cid)"
          >
            <p class="text-center mb-0">{{ support.title }}</p>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-btn class="mb-3" block color="error" @click="openDialog(2)"
            >Add criticism</v-btn
          >

          <v-card
            v-for="(criticism, cid) in clue.criticism"
            :key="cid"
            class="py-2"
            max-width="800"
            @click="openClue(cid)"
          >
            <p class="text-center mb-0">{{ criticism.title }}</p>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-btn class="mb-3" block dark @click="openDialog(3)"
            >Add question</v-btn
          >

          <v-card
            v-for="(question, cid) in clue.questions"
            :key="cid"
            class="py-2"
            max-width="800"
            @click="openClue(cid)"
          >
            <p class="text-center mb-0">{{ question.title }}</p>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <v-row justify="center">
      <v-dialog v-model="dialog.display" persistent max-width="550">
        <v-card class="text-center">
          <v-card-title class="headline"
            >Add {{ dialog.description }}</v-card-title
          >
          <v-card-text class="mt-4">
            <v-form ref="dialog_form" v-model="dialog.valid">
              <v-textarea
                auto-grow
                autofocus
                dense
                counter="180"
                outlined
                :loading="dialog.isLoading"
                v-model="dialog.title"
                :label="dialog.description"
                :rules="rules.content"
              ></v-textarea>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-row class="mx-0">
              <v-col cols="6">
                <v-btn block color="green" text @click="closeDialog"
                  >Cancel</v-btn
                >
              </v-col>
              <v-col cols="6">
                <v-btn
                  :disabled="!dialog.valid"
                  block
                  :loading="dialog.isLoading"
                  color="green white--text"
                  @click="saveDialog"
                  >Save</v-btn
                >
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-snackbar
      v-model="snackbar.display"
      top
      :timeout="3000"
      :color="snackbar.color"
    >
      {{ snackbar.message }}
      <v-btn text @click="snackbar.display = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
const { cluesCollection, functions } = require("@/plugins/firebase.js");

export default {
  name: "Clue",
  components: {
    //
  },
  data() {
    return {
      clue: {},
      loading: false,

      dialog: {
        display: false,
        isLoading: false,
        valid: true
      },
      rules: {
        content: [
          v => !!v || "Please enter something..",
          v => (v && v.length <= 180) || "Max. characters allowed are 200"
        ]
      },
      snackbar: {
        display: false,
        message: null,
        color: null
      }
    };
  },
  mounted() {
    this.fetchClue(this.$route.params.cid);
  },
  methods: {
    async fetchClue(cid) {
      this.loading = true;

      let clueDoc = await cluesCollection.doc(cid).get();
      let clueData = clueDoc.data();
      clueData.id = clueDoc.id;
      this.clue = clueData;

      this.loading = false;
    },

    saveDialog() {
      this.dialog.isLoading = true;
      if (this.$refs.dialog_form.validate()) {
        let obj = {
          cid: this.clue.id,
          title: this.dialog.title,
          type: this.dialog.type
        };
        const self = this;
        const clueCreate = functions.httpsCallable("clueCreate");
        clueCreate(obj)
          .then(function(result) {
            self.snackbar = {
              display: true,
              message: "Successfully added",
              color: "success"
            };
            self.addChild(result.data.cid, self.dialog.title, self.dialog.type);
            self.closeDialog();
          })
          .catch(function(error) {
            self.snackbar = {
              display: true,
              message: error.message,
              color: "error"
            };
          })
          .finally(function() {
            self.dialog.loading = false;
          });
      }
    },

    openClue(cid) {
      this.$router.push({
        name: "Clue",
        params: { cid: cid }
      });
    },

    openDialog(type) {
      this.dialog.type = type;
      this.dialog.display = true;
      this.dialog = {
        type: type,
        display: true,
        valid: true
      };
      switch (type) {
        case 1:
          this.dialog.description = "Support";
          break;
        case 2:
          this.dialog.description = "Criticism";
          break;
        case 3:
          this.dialog.description = "Question";
          break;
      }
    },

    closeDialog() {
      this.$refs.dialog_form.reset();
      this.dialog = {
        display: false,
        loading: false
      };
    },

    addChild(cid, title, type) {
      switch (type) {
        case 1:
          type = "support";
          break;

        case 2:
          type = "criticism";
          break;

        case 3:
          type = "questions";
          break;
      }
      if (!this.clue[type]) {
        this.clue[type] = {};
      }
      this.clue[type][cid] = {
        title: title
      };
    }
  },
  beforeDestroy() {
    this.clue = null;

    delete this.clue;
  }
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="10" md="8" class="py-0">
        <div class="text-center" v-if="loading">
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
        <v-card v-else-if="clues.length > 0" max-width="800" tile>
          <v-list class="py-0">
            <template v-for="(item, index) in clues">
              <v-list-item :key="index" @click="openClue(item.id)">
                <v-list-item-content>
                  <v-list-item-title>
                    <v-flex class="d-flex justify-space-between">
                      <span class="text--secondary">{{ item.title }}</span>
                    </v-flex>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider :key="index + 'd'"></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "DashboardList",
  components: {
    //
  },
  data() {
    return {
      loading: true
    };
  },
  props: ["clues"],
  watch: {
    clues: function(val) {
      if (val) {
        this.loading = false;
      }
    }
  },
  mounted() {
    //
  },
  methods: {
    openClue(cid) {
      this.$router.push({
        name: "Clue",
        params: { cid: cid }
      });
    }
  },
  beforeDestroy() {
    this.loading = null;

    delete this.loading;
  }
};
</script>

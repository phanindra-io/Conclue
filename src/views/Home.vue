<template>
  <div>
    <Introduction />
    <Features />
  </div>
</template>

<script>
// @ is an alias to /src
import Introduction from "@/components/Home/Introduction";
import Features from "@/components/Home/Features";

export default {
  name: "Home",
  components: {
    Introduction,
    Features
  }
};
</script>

<template>
  <div>
    <TheSidebarSettings v-slot:default="{ node, selected, select }">
      <TheSidebarTree
        :node="node"
        :selected="selected"
        :select="select"
      ></TheSidebarTree>
    </TheSidebarSettings>
  </div>
</template>

<script>
import TheSidebarSettings from "./TheSidebarSettings";
import TheSidebarTree from "./TheSidebarTree";

export default {
  name: "TheSidebar",
  components: {
    TheSidebarSettings,
    TheSidebarTree
  }
};
</script>

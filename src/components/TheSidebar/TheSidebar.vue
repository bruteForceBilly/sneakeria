<template>
  <div>
    
    <TheSidebarSettings v-slot:default="{ node, selected, select }">

        <SidebarTransition :appear="true" animation="slide">
            <TheSidebarTree
            v-if="show"
            :set-show="setShow"
            :node="node"
            :selected="selected"
            :select="select"
            />
        </SidebarTransition>
        </TheSidebarSettings>
  </div>
</template>

<script>
import TheSidebarSettings from "./TheSidebarSettings";
import TheSidebarTree from "./TheSidebarTree";
import SidebarTransition from "./SidebarTransition";

export default {
  name: "TheSidebar",
  components: {
    TheSidebarSettings,
    TheSidebarTree,
    SidebarTransition
  },
  props: {
    show: {
      type: Boolean
    },
    setShow: {
      type: Function
    }
  }
};
</script>

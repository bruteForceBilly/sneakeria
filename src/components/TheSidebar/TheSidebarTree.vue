<template>
  <div class="h-screen bg-white text-4xl relative z-0">
    <SidebarTransition :appear="true" animation="fade">
      <div
        v-if="selected.name === node.name"
        :key="selected.name + node.name"
        class="border-b flex justify-center items-center h-16 mb-4"
      >
        <span> ❦ </span>
      </div>
    </SidebarTransition>

    <div
      @click="$emit('toggle')"
      class="absolute top-0 right-0 z-10 mr-6 mt-3 text-2xl"
    >
      <span> ✕ </span>
    </div>

    <SidebarTransition :appear="true" animation="slide-fade">
      <SidebarTreeNode
        :key="node.name"
        class="overflow-hidden"
        :expanded-init="true"
        :node="node"
        :parent="node"
        :select="select"
        :selected="selected"
      />
    </SidebarTransition>
  </div>
</template>

<script>
import SidebarTreeNode from "./SidebarTreeNode.vue";
import SidebarTransition from "./SidebarTransition.vue";

export default {
  name: "TheSidebarTree",
  props: {
    node: {
      type: Object
    },
    selected: {
      type: Object
    },
    select: {
      type: Function
    }
  },
  components: {
    SidebarTreeNode,
    SidebarTransition
  }
};
</script>

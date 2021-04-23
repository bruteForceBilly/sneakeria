<template>
  <div
    class="h-screen overflow-hidden bg-white text-4xl fixed top-0 z-70 shadow-lg"
    :class="$mq == 'xl' || $mq == 'lg' ? 'w-1/2' : 'w-full'"
  >
    <SidebarTransitionGroup :appear="true" animation="slide-fade">
      <div
        v-if="selected.name === node.name"
        :key="selected.name + node.name"
        class="border-b flex justify-center items-center mb-4"
        style="height: 50px"
      >
        <img src="@/assets/logo.svg" />
      </div>
    </SidebarTransitionGroup>

    <img
      @click="setShow($event)"
      src="@/assets/x.svg"
      class="absolute z-50 top-0 right-0 mt-2 mr-5 p-1"
    />

    <SidebarTransitionGroup :appear="true" animation="slide-fade">
      <SidebarTreeNode
        :key="node.name"
        class="overflow-hidden"
        :expanded-init="true"
        :node="node"
        :parent="node"
        :select="select"
        :selected="selected"
        :set-show="setShow"
      />
    </SidebarTransitionGroup>
  </div>
</template>

<script>
import SidebarTreeNode from "./SidebarTreeNode.vue";
import SidebarTransitionGroup from "./SidebarTransitionGroup.vue";

export default {
  name: "TheSidebarTree",
  props: {
    node: {
      type: Object,
    },
    selected: {
      type: Object,
    },
    select: {
      type: Function,
    },
    show: {
      type: Boolean,
    },
    setShow: {
      type: Function,
    },
  },
  components: {
    SidebarTreeNode,
    SidebarTransitionGroup,
  },
};
</script>

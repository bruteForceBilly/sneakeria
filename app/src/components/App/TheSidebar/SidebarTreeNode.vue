<template>
  <div class="no-select">
    <SidebarTransitionGroup animation="slide-fade">
      <div v-if="showing && node.name != parent.name" :key="keyProp">
        <div
          v-if="expanded"
          class="border-b flex items-center"
          :class="[node.name === 'Root' ? '' : 'mb-3']"
          style="height: 50px"
          :key="keyProp"
          @click="[expand(), select(parent)]"
        >
          <img src="@/assets/chevron-l.svg" class="mx-4" />
          <span class="pt-1 text-lg tracking-wide font-semibold uppercase select-none"
            >{{ node.label }}
          </span>
        </div>

        <div
          v-else-if="hasChildren"
          @click="[expand(), select(node)]"
          :key="keyProp"
          class="flex justify-between items-center mr-5"
          :class="[
            parent.name === 'Root' ? 'ml-8 font-semibold uppercase select-none' : 'ml-16',
          ]"
        >
          <span class="text-lg tracking-wider py-2">{{ node.label }}</span>
          <img src="@/assets/chevron-r.svg" class="pb-1" />
        </div>

        <div
          v-else
          :key="keyProp"
          class="flex justify-between items-center ml-16 mr-5"
        >
          <span
            @click="[setByRoute(true), setShow($event)]"
            class="text-lg tracking-wider py-2 select-none"
          >
            <router-link
              :to="{
                name: 'searchRequestRoute',
                params: { id: node.value },
              }"
            >
              {{ node.label }}
            </router-link>
          </span>
        </div>
      </div>

      <div v-if="expanded" :key="keyProp + 'children'">
        <SidebarTreeNode
          v-for="child in node.children"
          :key="child.name"
          :node="child"
          :parent="node"
          :select="select"
          :selected="selected"
          :set-show="setShow"
        />
      </div>
    </SidebarTransitionGroup>
  </div>
</template>

<script>
import SidebarTransitionGroup from "./SidebarTransitionGroup.vue";

export default {
  name: "SidebarTreeNode",
  components: {
    SidebarTransitionGroup,
  },
  props: {
    node: {
      type: Object,
    },
    parent: {
      type: Object,
    },
    select: {
      type: Function,
    },
    selected: {
      type: Object,
    },
    expandedInit: {
      type: Boolean,
      default: false,
    },
    setShow: {
      type: Function,
    },
  },
  data() {
    return {
      expanded: this.expandedInit,
      showing: true,
    };
  },
  methods: {
    expand() {
      return (this.expanded = !this.expanded);
    },
    setByRoute(arg) {
      return this.$store.commit("setByRoute", arg);
    },
  },
  computed: {
    keyProp() {
      return this.node.name + this.parent.name + this.expanded;
    },
    hasChildren() {
      return this.node.children;
    },
  },
  watch: {
    selected: function (newVal) {
      this.node.name === newVal.name ||
      newVal.children.map((child) => child.name).includes(this.node.name)
        ? (this.showing = true)
        : (this.showing = false);
    },
  },
};
</script>
<style>
.no-select {
  cursor: default;
  background: none;  
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

</style>
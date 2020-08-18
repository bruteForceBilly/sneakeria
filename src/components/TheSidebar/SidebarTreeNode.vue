<template>
  <div>
    <SidebarTransition animation="slide-fade">
      <div v-if="showing && node.name != parent.name" :key="keyProp" class="">
        <div
          v-if="expanded"
          class="border-b flex items-center h-16 mb-2"
          @click="[expand(), select(parent)]"
        >
          <span class="mx-4">☚</span>
          <span>{{ node.name }} </span>
        </div>

        <div
          v-else-if="hasChildren"
          @click="[expand(), select(node)]"
          class="ml-8"
        >
          {{ node.name }}<span class="mx-4">☛</span>
        </div>

        <span v-else class="ml-8">{{ node.name }}</span>
      </div>

      <div v-if="expanded" :key="keyProp + 'children'">
        <SidebarTreeNode
          v-for="child in node.children"
          :key="child.name"
          :node="child"
          :parent="node"
          :select="select"
          :selected="selected"
        />
      </div>
    </SidebarTransition>
  </div>
</template>

<script>
import SidebarTransition from "./SidebarTransition.vue";

export default {
  name: "SidebarTreeNode",
  components: {
    SidebarTransition
  },
  props: {
    node: {
      type: Object
    },
    parent: {
      type: Object
    },
    select: {
      type: Function
    },
    selected: {
      type: Object
    },
    expandedInit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      expanded: this.expandedInit,
      showing: true
    };
  },
  methods: {
    expand() {
      return (this.expanded = !this.expanded);
    }
  },
  computed: {
    keyProp() {
      return this.node.name + this.parent.name + this.expanded;
    },
    hasChildren() {
      return this.node.children;
    }
  },
  watch: {
    selected: function(newVal) {
      this.node.name === newVal.name ||
      newVal.children.map(child => child.name).includes(this.node.name)
        ? (this.showing = true)
        : (this.showing = false);
    }
  }
};
</script>

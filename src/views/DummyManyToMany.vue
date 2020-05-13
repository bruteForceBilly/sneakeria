<template>
  <div>
    <ul v-for="role in roles" :key="role.id">
      {{
        role.title
      }}
      <li v-for="user in role.users" :key="user.id" v-text="user.name"></li>
    </ul>
  </div>
</template>

<script>
import User from "@/classes/User";
import Role from "@/classes/Role";

export default {
  props: {},
  mounted() {
    User.insert({
      data: [
        {
          id: 28,
          name: "luke",
          email: "luksen@luke.com",
          roles: [
            { id: 12, title: "admin" },
            { id: 13, title: "chef" }
          ]
        },
        {
          id: 29,
          name: "max",
          email: "max@luke.com",
          roles: [{ id: 13, title: "chef" }]
        }
      ]
    });
  },
  computed: {
    roles() {
      return Role.query()
        .with("users")
        .get();
    }
  }
};
</script>

<style lang="scss" scoped></style>

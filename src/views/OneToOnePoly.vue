<template>
  <div>
    <div v-for="image in images" :key="image.id" :src="image.url">
      {{ image.imageable.constructor.entity }}
    </div>
  </div>
</template>

<script>
import Image from "@/classes/Image";
import User from "@/classes/User";
import Post from "@/classes/Post";

export default {
  created() {
    User.insert({
      data: {
        id: 27,
        name: "luke",
        image: {
          id: 1,
          url: "https://i.imgflip.com/w3ibs.jpg"
        }
      }
    });
    Post.insert({
      data: {
        id: 34,
        title: "day at the races",
        image: {
          id: 2,
          url:
            "http://3.bp.blogspot.com/-5LtDOUWZkTw/UJnl-96gbkI/AAAAAAAAAY8/JdpLlyKSKPc/s400/Sem_T_tulo-1.jpg"
        }
      }
    });
  },
  computed: {
    user() {
      return User.query()
        .with("image")
        .find(27);
    },
    post() {
      return Post.query()
        .with("image")
        .find(34);
    },
    images() {
      return Image.query()
        .with("imageable")
        .get();
    }
  }
};
</script>

<template>
  <div>
    One To Many Poly
    <!-- <div>
      <div v-for="video in videos" :key="video.id">
        {{ video.url }}
        <div v-for="comment in video.comments" :key="comment.id">
          {{ comment.body }}
        </div>
      </div>
    </div>
    <div>
      <div v-for="post in posts" :key="post.id">
        {{ post.title }}
        <div v-for="comment in post.comments" :key="comment.id">
          {{ comment.body }}
        </div>
      </div>
    </div> -->
    <div v-for="comment in comments" :key="comment.id">
      {{ comment.body }} {{ comment.commentable.constructor.entity }}
    </div>
  </div>
</template>

<script>
import Video from "@/classes/Video";
import Post from "@/classes/Post";
import Comment from "@/classes/Comment";

export default {
  mounted() {
    Video.insert({
      data: [
        {
          id: 12,
          url: "https://www.youtube.com/",
          comments: [
            {
              id: 12,
              body: "amazing course!"
            },
            {
              id: 11,
              body: "really good"
            }
          ]
        }
      ]
    });
    Post.insert({
      data: [
        {
          id: 12,
          title: "loco in acapulco",
          comments: [
            {
              id: 10,
              body: "lol!"
            },
            {
              id: 19,
              body: "noooo?"
            }
          ]
        }
      ]
    });
  },
  computed: {
    videos() {
      return Video.query()
        .with("comments")
        .get();
    },
    posts() {
      return Post.query()
        .with("comments")
        .get();
    },
    comments() {
      return Comment.query()
        .with("commentable")
        .get();
    }
  }
};
</script>

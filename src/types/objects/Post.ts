import { objectType } from 'nexus';

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.published();
    t.model.author();
    t.model.title();
    t.model.content();
  },
});

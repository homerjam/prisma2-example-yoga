import { objectType } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    // t.model.auth0Users();
    t.model.name();
    t.model.email();
    t.model.profile();
    t.model.posts();
  },
});

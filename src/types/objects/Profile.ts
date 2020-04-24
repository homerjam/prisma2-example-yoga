import { objectType } from 'nexus';

export const Profile = objectType({
  name: 'Profile',
  definition(t) {
    t.model.id();
    t.model.user();
    t.model.bio();
  },
});

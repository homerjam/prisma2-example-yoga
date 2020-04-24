import { queryType } from 'nexus';

export const Query = queryType({
  definition(t) {
    t.crud.user();
    t.crud.users({
      filtering: true,
    });
    t.crud.post();
    t.crud.posts({
      filtering: true,
    });
    t.crud.profile();
    t.crud.profiles({
      filtering: true,
    });
  },
});

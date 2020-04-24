import { mutationType } from 'nexus';

export const Mutation = mutationType({
  definition(t) {
    t.crud.createOneUser();
    t.crud.updateOneUser();
    t.crud.deleteOneUser();

    t.crud.createOnePost();
    t.crud.updateOnePost();
    t.crud.deleteOnePost();

    t.crud.createOneProfile();
    t.crud.updateOneProfile();
    t.crud.deleteOneProfile();
  },
});

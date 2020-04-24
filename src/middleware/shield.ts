import { shield } from 'graphql-shield';
import { permissions } from '../permissions/permissions';

export default shield(permissions, {
  allowExternalErrors: true,
});

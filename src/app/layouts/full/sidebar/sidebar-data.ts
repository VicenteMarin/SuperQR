import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Home',
    iconName: 'key',
    route: ''
  },
  {
    displayName: 'Administrar solicitudes',
    iconName: 'settings',
    route: '/solicitud'
  },
  {
    displayName: 'Ver usuarios objetivo',
    iconName: 'users-group',
    route: '/gobjetivo'
  }
];

const users = {
  ADMIN: () => ['admin'],
  GERENTE: () => ['admin', 'gerente'],
  IMPRESSOR: () => ['admin', 'gerente', 'impressor'],
};

export default users;

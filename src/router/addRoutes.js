const routes = [
  {
    path: "/user",
    name: "user",
    meta: {
      title: "用户",
      icon: "UsergroupAddOutlined",
    },
    children: [
      {
        path: "list",
        name: "userList",
        meta: {
          title: "用户列表",
          icon: "OrderedListOutlined",
        },
        component: "userList",
      },
    ],
  },
];

export default routes;

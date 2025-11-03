export const paths = {
  admin: {
    path: "/admin",
    getHref: () => "/admin",
    payment: {
      path: "/admin/payment",
      getHref: (id?: string) =>
        `/admin/payment${id ? `?id=${encodeURIComponent(id)}` : ""}`,
    },
  },
  user: {
    path: "/user",
    getHref: () => "/user",
  },
};

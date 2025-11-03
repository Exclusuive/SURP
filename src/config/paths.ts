export const paths = {
  admin: {
    path: "/admin",
    getHref: () => "/admin",
    payment: {
      path: "/admin/payment",
      getHref: (digest?: string) =>
        `/admin/payment${
          digest ? `?digest=${encodeURIComponent(digest)}` : ""
        }`,
    },
  },
  user: {
    path: "/user",
    getHref: () => "/user",
  },
};
